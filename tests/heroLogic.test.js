'use strict';

const {
  prepareHeroTurn, judgeWithHeroes, resolveHeroResponse, expireHeroResponse,
  startFanjian, healAmount, useKurou, startLijian, startLordSkill,
} = require('../dist/game/heroLogic');
const { getSanitizedRoomState, drawCards } = require('../dist/game/phaseLogic');
const { rescueDying, getCardById } = require('../dist/game/combatLogic');

const card = (id, name = 'SLASH', suit = 'SPADE') => ({ id, name, suit, rank: 6, type: 'BASIC' });
const player = (id, character, role = 'REBEL') => ({
  id, name: id, character, role, socketId: 'session-' + id, hp: 4, maxHp: 4,
  isAlive: true, isBot: false, hand: [], delayedKitZone: [],
  equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
});
function fixture(firstHero = 'GUAN_YU') {
  const players = {
    p1: player('p1', firstHero, 'LORD'), p2: player('p2', 'GUAN_YU'),
    p3: player('p3', 'ZHANG_FEI'), p4: player('p4', 'ZHEN_JI', 'RENEGADE'),
  };
  const tasks = [];
  return {
    roomId: 'hero-contracts', status: 'PLAYING', mode: 'ONLINE', players,
    hostSocketId: players.p1.socketId, turnOrder: Object.keys(players), currentTurnIndex: 0,
    currentPhase: 'PLAY', pendingAction: null, attacksPlayedInTurn: 0,
    deck: ['a', 'b', 'c', 'd', 'e', 'f'].map(id => card(id)), discardPile: [],
    actionChain: [], negatePassedPlayers: [], chat: [], bumperHarvestCards: [],
    _broadcastFn: jest.fn(), _emitAll: jest.fn(),
    _schedule: (callback, delay) => { const task = { callback, delay }; tasks.push(task); return task; },
    _scheduledTasks: tasks,
  };
}

describe('Migrated hero skill contracts', () => {
  let now;
  beforeEach(() => {
    now = 2_000_000;
    jest.spyOn(Date, 'now').mockImplementation(() => now);
  });
  afterEach(() => jest.restoreAllMocks());

  test('Guanxing preserves every card while ordering the top and bottom privately', () => {
    const room = fixture('ZHUGE_LIANG');
    const completed = jest.fn();
    prepareHeroTurn(room, room.players.p1, completed);
    expect(room.pendingAction.cards.map(c => c.id)).toEqual(['f', 'e', 'd', 'c']);
    expect(room.pendingAction.timeoutAt).toBe(now + 20000);
    expect(getSanitizedRoomState(room, 'p1').pendingAction.cards).toHaveLength(4);
    expect(getSanitizedRoomState(room, 'p2').pendingAction).not.toHaveProperty('cards');
    expect(getSanitizedRoomState(room, 'p1').pendingAction).not.toHaveProperty('resume');
    const pending = room.pendingAction;
    expect(resolveHeroResponse(room, 'p2', { topIds: ['e', 'f'], bottomIds: ['c', 'd'] })).toBe(false);
    expect(resolveHeroResponse(room, 'p1', { topIds: ['e', 'f'], bottomIds: ['c', 'd'] })).toBe(true);
    expect(completed).toHaveBeenCalledTimes(1);
    pending.resume({ topIds: ['e', 'f'], bottomIds: ['c', 'd'] });
    expect(completed).toHaveBeenCalledTimes(1);
    expect(new Set(room.deck.map(c => c.id)).size).toBe(6);
    expect(drawCards(room, 6).map(c => c.id)).toEqual(['e', 'f', 'b', 'a', 'c', 'd']);
    expect(room.discardPile).toHaveLength(0);
  });

  test.each(['invalid', 'expired'])('Guanxing %s ordering keeps the original deck order and count', response => {
    const room = fixture('ZHUGE_LIANG');
    const originalIds = room.deck.map(c => c.id);
    const completed = jest.fn();
    prepareHeroTurn(room, room.players.p1, completed);
    if (response === 'invalid') resolveHeroResponse(room, 'p1', { topIds: ['f', 'f'], bottomIds: ['d', 'c'] });
    else {
      expect(expireHeroResponse(room)).toBe(false);
      now += 20000;
      expect(expireHeroResponse(room)).toBe(true);
    }
    expect(room.deck.map(c => c.id)).toEqual(originalIds);
    expect(completed).toHaveBeenCalledTimes(1);
    expect(room.pendingAction).toBeNull();
  });

  test('Guicai consumes one replacement and discards the old judgment only once', () => {
    const room = fixture();
    room.players.p3.character = 'SIMA_YI';
    const replacement = card('replacement', 'PEACH', 'HEART');
    room.players.p3.hand = [replacement];
    const original = card('original-judge');
    const suspended = { type: 'WAITING_FOR_DODGE', sourcePlayerId: 'p1', targetPlayerId: 'p2', timeoutAt: now + 10000 };
    room.pendingAction = suspended;
    const completed = jest.fn(finalCard => room.discardPile.push(finalCard));
    judgeWithHeroes(room, room.players.p2, original, { name: 'ACEDIA' }, completed);
    expect(room.pendingAction).toMatchObject({ type: 'GUICAI', targetPlayerId: 'p3', judgeTargetId: 'p2', judgeCard: original });
    expect(getSanitizedRoomState(room, 'p1').players.p3.hand).toBeNull();
    const pending = room.pendingAction;
    expect(resolveHeroResponse(room, 'p2', { accept: true, cardId: replacement.id })).toBe(false);
    resolveHeroResponse(room, 'p3', { accept: true, cardId: replacement.id });
    expect(room.players.p3.hand).toHaveLength(0);
    expect(room.pendingAction).toBe(suspended);
    expect(completed).toHaveBeenCalledWith(replacement);
    expect(room.discardPile).toEqual([original, replacement]);
    pending.resume({ accept: true, cardId: replacement.id });
    expect(completed).toHaveBeenCalledTimes(1);
    expect(room.discardPile).toEqual([original, replacement]);
  });

  test('Fanjian hides the selected card until a wrong guess transfers it and deals damage', () => {
    const room = fixture('ZHOU_YU');
    const held = card('hidden-fanjian', 'PEACH', 'HEART');
    room.players.p1.hand = [held];
    expect(startFanjian(room, room.players.p1, { cardId: held.id, targetPlayerId: 'p2' })).toBe(true);
    expect(room.players.p1.hand).toHaveLength(0);
    expect(room.players.p2.hand).toHaveLength(0);
    const targetSnapshot = getSanitizedRoomState(room, 'p2');
    expect(targetSnapshot.pendingAction).not.toHaveProperty('heldCard');
    expect(JSON.stringify(targetSnapshot.pendingAction)).not.toContain(held.id);
    expect(JSON.stringify(targetSnapshot.pendingAction)).not.toContain('HEART');
    expect(getSanitizedRoomState(room, 'p1').pendingAction.heldCard).toEqual(held);
    const pending = room.pendingAction;
    resolveHeroResponse(room, 'p2', { guess: 'SPADE' });
    expect(room.players.p2.hand).toEqual([held]);
    expect(room.players.p2.hp).toBe(3);
    expect(room.pendingAction).toBeNull();
    pending.resume({ guess: 'SPADE' });
    expect(room.players.p2.hand).toEqual([held]);
    expect(room.players.p2.hp).toBe(3);
    expect(startFanjian(room, room.players.p1, { cardId: held.id, targetPlayerId: 'p2' })).toBe(false);
  });

  test('Fanjian correct suit guess transfers the card without damage', () => {
    const room = fixture('ZHOU_YU');
    const held = card('safe-fanjian', 'DODGE', 'DIAMOND');
    room.players.p1.hand = [held];
    startFanjian(room, room.players.p1, { cardId: held.id, targetPlayerId: 'p2' });
    resolveHeroResponse(room, 'p2', { guess: 'DIAMOND' });
    expect(room.players.p2.hand).toEqual([held]);
    expect(room.players.p2.hp).toBe(4);
  });

  test('Jiuyuan adds healing only for another Wu hero Peach to Lord Sun Quan', () => {
    const lord = player('lord', 'SUN_QUAN', 'LORD');
    const wu = player('wu', 'ZHOU_YU');
    const shu = player('shu', 'GUAN_YU');
    const peach = card('peach', 'PEACH', 'HEART');
    expect(healAmount(lord, wu, peach)).toBe(2);
    expect(healAmount(lord, shu, peach)).toBe(1);
    expect(healAmount(lord, lord, peach)).toBe(1);
    expect(healAmount(lord, wu, card('wine', 'WINE'))).toBe(1);
    expect(healAmount({ ...lord, role: 'REBEL' }, wu, peach)).toBe(1);
  });

  test('Kurou waits for self-rescue before drawing and resumes with exactly two cards', () => {
    const room = fixture('HUANG_GAI');
    room.players.p1.hp = 1;
    const wine = card('self-wine', 'WINE');
    room.players.p1.hand = [wine];
    const deckBefore = room.deck.length;
    expect(useKurou(room, room.players.p1)).toBe(true);
    expect(room.pendingAction).toMatchObject({ type: 'DYING', targetPlayerId: 'p1', peachNeeded: 1 });
    expect(room.players.p1.hp).toBe(0);
    expect(room.players.p1.hand).toEqual([wine]);
    expect(room.deck).toHaveLength(deckBefore);
    expect(rescueDying(room, 'p1', wine.id)).toBe(true);
    expect(room.players.p1.hp).toBe(1);
    expect(room.players.p1.hand).toHaveLength(2);
    expect(room.deck).toHaveLength(deckBefore - 2);
    expect(room.discardPile).toEqual([wine]);
    expect(room.pendingAction).toBeNull();
    expect(room._postDamageQueue).toHaveLength(0);
  });

  test.each([
    ['p2', 'p4'], ['p2', 'p2'], ['p1', 'p2'], ['missing', 'p2'],
  ])('Lijian rejects targets %s/%s without consuming the skill cost', (first, second) => {
    const room = fixture('DIAO_CHAN');
    const cost = card('lijian-cost');
    room.players.p1.hand = [cost];
    expect(startLijian(room, room.players.p1, { cardId: cost.id, targetPlayerId: first, secondaryTargetId: second })).toBe(false);
    expect(room.players.p1.hand).toEqual([cost]);
    expect(room.discardPile).toHaveLength(0);
    expect(room.pendingAction).toBeNull();
  });

  test('Lijian spends one card and initiates Lu Bu duel with two required Slashes', () => {
    const room = fixture('DIAO_CHAN');
    room.players.p2.character = 'LV_BU';
    const cost = card('lijian-cost');
    room.players.p1.hand = [cost];
    expect(startLijian(room, room.players.p1, { cardId: cost.id, targetPlayerId: 'p2', secondaryTargetId: 'p3' })).toBe(true);
    expect(room.players.p1.hand).toHaveLength(0);
    expect(room.discardPile).toEqual([cost]);
    expect(room.pendingAction).toMatchObject({ type: 'WAITING_FOR_SLASH_DUEL', sourcePlayerId: 'p2', targetPlayerId: 'p3', slashNeeded: 2, timeoutAt: now + 20000 });
    expect(room.players.p1.skillDiaoChanUsed).toBe(true);
  });

  function lordDefenseFixture() {
    const room = fixture('CAO_CAO');
    room.players.p2.character = 'SIMA_YI';
    room.players.p4.character = 'ZHANG_FEI';
    room.players.p2.hand = [card('helper-dodge', 'DODGE', 'HEART')];
    room.pendingAction = {
      type: 'WAITING_FOR_DODGE', sourcePlayerId: 'p3', targetPlayerId: 'p1',
      dodgeNeeded: 1, damage: 1, timeoutAt: now + 20000,
    };
    return room;
  }

  test('Lord Hujia decline keeps the helper card and resumes the original defense', () => {
    const room = lordDefenseFixture();
    const original = room.pendingAction;
    const helperCard = room.players.p2.hand[0];
    expect(startLordSkill(room, room.players.p1, {})).toBe(true);
    expect(room.pendingAction).toMatchObject({ type: 'LORD_SKILL', targetPlayerId: 'p2', requestType: 'DODGE' });
    resolveHeroResponse(room, 'p2', { accept: false });
    expect(room.pendingAction).toBe(original);
    expect(room.players.p2.hand).toEqual([helperCard]);
    expect(room.discardPile).toHaveLength(0);
    expect(room.players.p1.hp).toBe(4);
    expect(startLordSkill(room, room.players.p1, {})).toBe(false);
  });

  test('Lord Hujia spends the helper original card exactly once to satisfy Dodge', () => {
    const room = lordDefenseFixture();
    const helperCard = room.players.p2.hand[0];
    startLordSkill(room, room.players.p1, {});
    const pending = room.pendingAction;
    resolveHeroResponse(room, 'p2', { accept: true, cardId: helperCard.id });
    expect(room.players.p2.hand).toHaveLength(0);
    expect(room.players.p1.hand).toHaveLength(0);
    expect(room.discardPile).toEqual([helperCard]);
    expect(room.pendingAction).toBeNull();
    expect(room.players.p1.hp).toBe(4);
    pending.resume({ accept: true, cardId: helperCard.id });
    expect(room.discardPile).toEqual([helperCard]);
  });

  test('Lord Jijiang preserves the consumed helper card as the pending attack source', () => {
    const room = fixture('LIU_BEI');
    room.players.p3.character = 'SIMA_YI';
    room.players.p4.character = 'CAO_CAO';
    const helperCard = card('helper-slash');
    room.players.p2.hand = [helperCard];
    expect(startLordSkill(room, room.players.p1, { targetPlayerId: 'p4' })).toBe(true);
    resolveHeroResponse(room, 'p2', { accept: true, cardId: helperCard.id });
    expect(room.players.p2.hand).toHaveLength(0);
    expect(room.players.p1.hand).toHaveLength(0);
    expect(room.discardPile).toEqual([helperCard]);
    expect(room.pendingAction).toMatchObject({ type: 'WAITING_FOR_DODGE', sourcePlayerId: 'p1', targetPlayerId: 'p4' });
    expect(getCardById(room, room.pendingAction.cardUsedId)).toEqual(helperCard);
  });
});
