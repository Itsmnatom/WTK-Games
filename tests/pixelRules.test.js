'use strict';

const { CARDS, HEROES, RULES } = require('../dist/shared/catalog');
const { validateCommand } = require('../dist/game/commandPolicy');
const { attachRoomLifecycle } = require('../dist/game/roomLifecycle');
const { startPlayerTurn, startDraftPhase, initDeck } = require('../dist/game/phaseLogic');
const phaseLogic = require('../dist/game/phaseLogic');
const { handleUseCard } = require('../dist/game/cardLogic');
const { dealDamage, rescueDying, killPlayer } = require('../dist/game/combatLogic');

const card = (id, name = 'SLASH', suit = 'SPADE') => ({ id, name, suit, rank: 6, type: 'BASIC' });
const player = (id, role, character = 'GUAN_YU') => ({
  id, name: id, socketId: 'session-' + id, role, character, hp: 4, maxHp: 4,
  isAlive: true, isBot: false, hand: [], delayedKitZone: [], isChained: false,
  equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
});

function fixture() {
  const players = {
    p1: player('p1', 'LORD'), p2: player('p2', 'REBEL'),
    p3: player('p3', 'REBEL'), p4: player('p4', 'RENEGADE'),
  };
  const room = {
    roomId: 'pixel-rules', status: 'PLAYING', mode: 'ONLINE', players,
    hostSocketId: players.p1.socketId, turnOrder: Object.keys(players), currentTurnIndex: 0,
    currentPhase: 'PLAY', deck: initDeck(42), discardPile: [], pendingAction: null,
    actionChain: [], negatePassedPlayers: [], bumperHarvestCards: [], attacksPlayedInTurn: 0,
    chat: [], _broadcastFn: jest.fn(), _emitAll: jest.fn(),
  };
  const timeouts = [], intervals = [];
  const clock = {
    setTimeout: (callback, delay) => { const task = { callback, delay }; timeouts.push(task); return task; },
    setInterval: (callback, delay) => { const task = { callback, delay }; intervals.push(task); return task; },
  };
  room._schedule = clock.setTimeout;
  return { room, clock, timeouts, intervals, poll: () => intervals.forEach(task => task.callback()) };
}

describe('Pixel rules and authoritative flow', () => {
  let now;
  beforeEach(() => {
    now = 1_000_000;
    jest.spyOn(Date, 'now').mockImplementation(() => now);
  });
  afterEach(() => jest.restoreAllMocks());

  test('shares the complete 176-card, 41-type and 13-hero rules profile', () => {
    expect(CARDS).toHaveLength(41);
    expect(CARDS.reduce((sum, c) => sum + c.count, 0)).toBe(176);
    expect(new Set(CARDS.map(c => c.id)).size).toBe(41);
    expect(HEROES).toHaveLength(13);
    expect(new Set(HEROES.map(h => h.id)).size).toBe(13);
    expect(HEROES.find(h => h.id === 'HUANG_GAI').hp).toBe(4);
    expect(HEROES.find(h => h.id === 'LV_BU').hp).toBe(5);
    expect(RULES).toMatchObject({ minPlayers: 4, maxPlayers: 10, defaultPlayers: 6, reactionMs: 20000, draftMs: 90000, reconnectSeconds: 45, turnDeadline: null });
  });

  test('only the current host can start a game or change bot seats', () => {
    const { room } = fixture();
    room.status = 'LOBBY';
    for (const command of ['start_game', 'add_bot', 'remove_bot']) {
      expect(validateCommand(room, 'session-p1', command, {})).toBeNull();
      expect(validateCommand(room, 'session-p2', command, {})).toEqual(expect.any(String));
    }
    room.hostSocketId = 'session-p2';
    expect(validateCommand(room, 'session-p1', 'start_game', {})).toEqual(expect.any(String));
    expect(validateCommand(room, 'session-p2', 'start_game', {})).toBeNull();
  });

  test.each(['use_card', 'end_turn', 'use_huang_gai_skill', 'use_zhou_yu_skill'])('%s requires an alive current player in an unblocked play phase', command => {
    const { room } = fixture();
    expect(validateCommand(room, 'session-p1', command, {})).toBeNull();
    expect(validateCommand(room, 'session-p2', command, {})).toEqual(expect.any(String));
    room.pendingAction = { type: 'DYING', targetPlayerId: 'p2' };
    expect(validateCommand(room, 'session-p1', command, {})).toEqual(expect.any(String));
    room.pendingAction = null;
    room.currentPhase = 'DISCARD';
    expect(validateCommand(room, 'session-p1', command, {})).toEqual(expect.any(String));
    room.currentPhase = 'PLAY';
    room.players.p1.isAlive = false;
    expect(validateCommand(room, 'session-p1', command, {})).toEqual(expect.any(String));
  });

  test('rejects unowned sessions and malformed or duplicate card lists before dispatch', () => {
    const { room } = fixture();
    expect(validateCommand(room, 'unknown', 'chat_message', {})).toEqual(expect.any(String));
    expect(validateCommand(room, 'session-p1', 'use_card', null)).toEqual(expect.any(String));
    expect(validateCommand(room, 'session-p1', 'use_card', [])).toEqual(expect.any(String));
    expect(validateCommand(room, 'session-p1', 'use_sun_quan_skill', { cardIds: ['a', 'a'] })).toEqual(expect.any(String));
    expect(validateCommand(room, 'session-p1', 'use_card', { cardId: { id: 'a' } })).toEqual(expect.any(String));
    expect(validateCommand(room, 'session-p2', 'hero_response', { accept: false })).toBeNull();
  });

  test('does not force an end turn after unrestricted human thinking time', () => {
    const { room, clock, poll, timeouts } = fixture();
    attachRoomLifecycle(room, clock, room._broadcastFn);
    startPlayerTurn(room);
    expect(timeouts).toHaveLength(0);
    now += 2 * 60 * 60 * 1000;
    poll();
    expect(room.currentTurnIndex).toBe(0);
    expect(room.currentPhase).toBe('PLAY');
    expect(room.players.p1.hand).toHaveLength(2);
    expect(room.pendingAction).toBeNull();
  });

  test('selects the first offered hero at 90 seconds without an earlier draft timeout', () => {
    const { room, clock, poll } = fixture();
    for (const p of Object.values(room.players)) p.character = null;
    room.players.p1.character = null;
    attachRoomLifecycle(room, clock, room._broadcastFn);
    startDraftPhase(room);
    const firstChoices = Object.fromEntries(Object.values(room.players).map(p => [p.id, p.characterChoices[0].id]));
    expect(room.draftDeadline).toBe(now + 90000);
    now += 89999;
    poll();
    expect(room.status).toBe('DRAFTING');
    expect(Object.values(room.players).every(p => !p.character)).toBe(true);
    now += 1;
    poll();
    expect(room.status).toBe('PLAYING');
    expect(room.draftDeadline).toBeNull();
    for (const p of Object.values(room.players)) expect(p.character).toBe(firstChoices[p.id]);
  });

  test('a 20-second defense timeout passes without spending a human Dodge', () => {
    const { room, clock, poll } = fixture();
    attachRoomLifecycle(room, clock, room._broadcastFn);
    room.players.p1.hand = [card('attack')];
    const dodge = card('keep-dodge', 'DODGE', 'HEART');
    room.players.p2.hand = [dodge];
    handleUseCard(room, null, { playerId: 'p1', cardId: 'attack', targetPlayerId: 'p2' });
    expect(room.pendingAction).toMatchObject({ type: 'WAITING_FOR_DODGE', timeoutAt: now + 20000 });
    now += 19999;
    poll();
    expect(room.players.p2.hp).toBe(4);
    now += 1;
    poll();
    expect(room.players.p2.hp).toBe(3);
    expect(room.players.p2.hand).toEqual([dodge]);
    expect(room.pendingAction).toBeNull();
  });

  test('applies elemental damage simultaneously and rescues in clockwise order from the target', () => {
    const { room } = fixture();
    for (const id of ['p2', 'p3', 'p4']) room.players[id].isChained = true;
    room.players.p2.hp = room.players.p3.hp = 1;
    room.players.p4.hp = 4;
    room.players.p3.hand = [card('p3-wine-1', 'WINE'), card('p3-wine-2', 'WINE')];
    room.players.p2.hand = [card('p2-peach-1', 'PEACH', 'HEART'), card('p2-peach-2', 'PEACH', 'HEART')];
    const firstPrompts = [];
    room._broadcastFn = () => {
      if (room.pendingAction?.type === 'DYING') firstPrompts.push({ target: room.pendingAction.targetPlayerId, p2: room.players.p2.hp, p3: room.players.p3.hp });
    };
    dealDamage(room, 'p3', 2, null, 'p1', 'FIRE');
    expect(room.players.p2.hp).toBe(-1);
    expect(room.players.p3.hp).toBe(-1);
    expect(room.players.p4.hp).toBe(2);
    expect(['p2', 'p3', 'p4'].every(id => !room.players[id].isChained)).toBe(true);
    expect(firstPrompts[0]).toEqual({ target: 'p3', p2: -1, p3: -1 });
    expect(room.pendingAction).toMatchObject({ targetPlayerId: 'p3', peachNeeded: 2 });
    expect(room.dyingQueue.map(q => q.dyingPlayerId)).toEqual(['p2']);
    expect(rescueDying(room, 'p3', 'p3-wine-1')).toBe(true);
    expect(room.pendingAction.peachNeeded).toBe(1);
    expect(rescueDying(room, 'p3', 'p3-wine-2')).toBe(true);
    expect(room.pendingAction).toMatchObject({ targetPlayerId: 'p2', peachNeeded: 2 });
    expect(rescueDying(room, 'p2', 'p2-peach-1')).toBe(true);
    expect(rescueDying(room, 'p2', 'p2-peach-2')).toBe(true);
    expect(room.players.p2.hp).toBe(1);
    expect(room.players.p3.hp).toBe(1);
    expect(room.pendingAction).toBeNull();
    expect(room.dyingQueue).toHaveLength(0);
  });

  test('active player death uses endPlayerTurn and disposes all owned cards', () => {
    const { room } = fixture();
    room.currentTurnIndex = 1;
    room.players.p2.hand = [card('dead-hand')];
    room.players.p2.delayedKitZone = [{ ...card('dead-delayed', 'ACEDIA'), type: 'DELAYED' }];
    room.players.p2.equipment.armor = { ...card('dead-armor', 'SILVER_LION_HELMET'), type: 'EQUIPMENT' };
    room._turnContinuation = jest.fn();
    const endTurn = jest.spyOn(phaseLogic, 'endPlayerTurn');
    killPlayer(room, 'p2');
    expect(endTurn).toHaveBeenCalledTimes(1);
    expect(room.players.p2).toMatchObject({ isAlive: false, hp: 0, hand: [], delayedKitZone: [] });
    expect(room.discardPile.map(c => c.id).sort()).toEqual(['dead-armor', 'dead-delayed', 'dead-hand']);
    expect(room.currentTurnIndex).toBe(2);
    expect(room.currentPhase).toBe('PLAY');
    expect(room.players.p3.hand).toHaveLength(2);
    expect(room._turnContinuation).toBeNull();
  });

  test('delays an active-player turn transition until the remaining rescue queue completes', () => {
    const { room } = fixture();
    room.currentTurnIndex = 1;
    room.players.p3.hp = 0;
    room.players.p3.hand = [card('save-p3', 'PEACH', 'HEART')];
    room.dyingQueue = [{ dyingPlayerId: 'p3', attackerId: null }];
    const endTurn = jest.spyOn(phaseLogic, 'endPlayerTurn');
    killPlayer(room, 'p2');
    expect(endTurn).not.toHaveBeenCalled();
    expect(room.currentTurnIndex).toBe(1);
    expect(room.pendingAction.targetPlayerId).toBe('p3');
    rescueDying(room, 'p3', 'save-p3');
    expect(endTurn).toHaveBeenCalledTimes(1);
    expect(room.currentTurnIndex).toBe(2);
    expect(room.players.p3.hp).toBe(1);
    expect(room.currentPhase).toBe('PLAY');
  });
});
