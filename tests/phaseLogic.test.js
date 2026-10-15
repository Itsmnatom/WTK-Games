'use strict';

const {
  initDeck,
  drawCards,
  assignRoles,
  setupCharacterHp,
  calculateDistance,
  checkDiscardRequirement,
  getSanitizedRoomState,
  getAllHeroes,
  hasCharacter,
  startDraftPhase,
  startPlayerTurn,
} = require('../dist/game/phaseLogic');
const { CARDS, HEROES, RULES } = require('../dist/shared/catalog');

describe('game/phaseLogic Module', () => {
  describe('initDeck()', () => {
    test('should preserve all 41 card types in the agreed 176-card profile', () => {
      const deck = initDeck(123);
      expect(deck).toHaveLength(176);
      expect(new Set(deck.map(card => card.name)).size).toBe(41);
      expect(new Set(deck.map(card => card.id)).size).toBe(176);
      for (const definition of CARDS) {
        const cards = deck.filter(card => card.name === definition.id);
        expect(cards).toHaveLength(definition.count);
        expect(cards.every(card => card.type === definition.kind && card.rank >= 1 && card.rank <= 13)).toBe(true);
        if (definition.range) expect(cards.every(card => card.range === definition.range)).toBe(true);
      }
    });

    test('should reproduce ranks and deck order with an explicit simulation seed', () => {
      expect(initDeck(194)).toEqual(initDeck(194));
      expect(initDeck(194)).not.toEqual(initDeck(195));
    });

    test('should initialize a valid deck with over 100 cards', () => {
      const deck = initDeck();
      expect(Array.isArray(deck)).toBe(true);
      expect(deck.length).toBeGreaterThan(100);

      const firstCard = deck[0];
      expect(firstCard).toHaveProperty('id');
      expect(firstCard).toHaveProperty('name');
      expect(firstCard).toHaveProperty('suit');
      expect(firstCard).toHaveProperty('rank');
      expect(firstCard).toHaveProperty('type');
    });
  });

  describe('assignRoles()', () => {
    test('should assign roles correctly for 4 players', () => {
      const players = {
        p1: { id: 'p1', name: 'P1' },
        p2: { id: 'p2', name: 'P2' },
        p3: { id: 'p3', name: 'P3' },
        p4: { id: 'p4', name: 'P4' },
      };
      const room = { players, turnOrder: ['p1', 'p2', 'p3', 'p4'] };
      assignRoles(room);

      const roles = Object.values(room.players).map(p => p.role);
      expect(roles).toContain('LORD');
      expect(roles).toContain('LOYALIST');
      expect(roles).toContain('REBEL');
      expect(roles).toContain('RENEGADE');
      expect(room.turnOrder[0]).toBe(Object.values(room.players).find(p => p.role === 'LORD').id);
    });

    test('should give LORD extra +1 HP when players >= 6', () => {
      const playerIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
      const players = {};
      playerIds.forEach(id => { players[id] = { id, name: id }; });
      const room = { players, turnOrder: [...playerIds] };

      assignRoles(room);
      const lord = Object.values(room.players).find(p => p.role === 'LORD');
      expect(lord).toBeDefined();

      setupCharacterHp(lord, 6);
      expect(lord.maxHp).toBe(5);
      expect(lord.hp).toBe(5);
    });
  });

  describe('canonical hero catalog', () => {
    test('should offer the complete 13-hero roster including Huang Gai', () => {
      const heroes = getAllHeroes();
      expect(heroes).toHaveLength(13);
      expect(new Set(heroes.map(hero => hero.id)).size).toBe(13);
      expect(heroes.map(hero => hero.id)).toEqual(HEROES.map(hero => hero.id));
      expect(heroes.find(hero => hero.id === 'HUANG_GAI')).toMatchObject({ hp: 4, gender: 'MALE' });
      const player = { id: 'p1', role: 'LORD', isBot: false };
      const room = { players: { p1: player }, turnOrder: ['p1'] };
      startDraftPhase(room);
      expect(player.characterChoices.slice(0, 3).map(hero => hero.id)).toEqual(['CAO_CAO', 'LIU_BEI', 'SUN_QUAN']);
      expect(room.draftDeadline - Date.now()).toBeGreaterThan(89000);
    });

    test.each(HEROES.map(hero => [hero.id, hero.hp]))('should use exact catalog HP for %s', (id, hp) => {
      const player = { character: id, role: 'REBEL' };
      setupCharacterHp(player, 10);
      expect(player).toMatchObject({ hp, maxHp: hp });
      player.role = 'LORD';
      setupCharacterHp(player, 5);
      expect(player).toMatchObject({ hp, maxHp: hp });
      setupCharacterHp(player, 6);
      expect(player).toMatchObject({ hp: hp + 1, maxHp: hp + 1 });
    });

    test('should accept legacy display strings, aliases and object identities', () => {
      expect(hasCharacter({ character: 'Lady Zhen (Zhen Ji)' }, 'ZHEN_JI')).toBe(true);
      expect(hasCharacter({ character: 'ZHEN_JI' }, 'LADY_ZHEN')).toBe(true);
      expect(hasCharacter({ character: { id: 'Lu Bu' } }, 'LV_BU')).toBe(true);
      expect(hasCharacter({ character: 'LV_BU' }, 'LU_BU')).toBe(true);
      expect(hasCharacter({ character: 'LV_BU' }, 'CAO_CAO')).toBe(false);
      const player = { character: { name: 'Sima Yi' }, role: 'LORD' };
      setupCharacterHp(player, 6);
      expect(player).toMatchObject({ hp: 4, maxHp: 4 });
    });
  });

  describe('calculateDistance()', () => {
    test('should calculate correct default distance between adjacent players', () => {
      const p1 = { id: 'p1', isAlive: true, equipment: {} };
      const p2 = { id: 'p2', isAlive: true, equipment: {} };
      const p3 = { id: 'p3', isAlive: true, equipment: {} };
      const room = {
        players: { p1, p2, p3 },
        turnOrder: ['p1', 'p2', 'p3']
      };

      expect(calculateDistance(room, 'p1', 'p2')).toBe(1);
      expect(calculateDistance(room, 'p1', 'p3')).toBe(1);
    });

    test('should modify distance based on offensive and defensive horses', () => {
      const p1 = { id: 'p1', isAlive: true, equipment: { offensiveHorse: 'RED_HARE' } };
      const p2 = { id: 'p2', isAlive: true, equipment: { defensiveHorse: 'DILU' } };
      const p3 = { id: 'p3', isAlive: true, equipment: {} };
      const room = {
        players: { p1, p2, p3 },
        turnOrder: ['p1', 'p2', 'p3']
      };

      // p1 to p2: base 1 - 1 (off) + 1 (def) = 1
      expect(calculateDistance(room, 'p1', 'p2')).toBe(1);

      // p3 to p2: base 1 + 1 (def) = 2
      expect(calculateDistance(room, 'p3', 'p2')).toBe(2);
    });
  });

  describe('drawCards()', () => {
    test('should draw specified number of cards from deck', () => {
      const deck = initDeck();
      const initialDeckCount = deck.length;
      const room = { deck, discardPile: [] };

      const drawn = drawCards(room, 2);
      expect(drawn.length).toBe(2);
      expect(room.deck.length).toBe(initialDeckCount - 2);
    });
  });

  describe('getSanitizedRoomState()', () => {
    const card = { id: 'secret-card', name: 'PEACH', suit: 'HEART', rank: 9, type: 'BASIC' };
    const privateRoom = () => ({
      roomId: 'privacy', status: 'PLAYING', currentTurnIndex: 0, turnOrder: ['p1', 'p2'],
      players: {
        p1: { id: 'p1', role: 'REBEL', isAlive: true, hand: [] },
        p2: { id: 'p2', role: 'RENEGADE', isAlive: true, hand: [card] },
      },
      deck: [card], discardPile: [], actionChain: [], negatePassedPlayers: [],
    });

    test('should expose Guanxing cards only to their owner and omit continuations', () => {
      const room = privateRoom();
      room.pendingAction = {
        type: 'GUANXING', targetPlayerId: 'p1', cards: [card],
        resume: () => {}, internal: { cards: [card], resume: () => {} },
      };
      const owner = getSanitizedRoomState(room, 'p1');
      expect(owner.pendingAction.cards).toEqual([card]);
      const opponent = getSanitizedRoomState(room, 'p2');
      expect(opponent.pendingAction).toEqual({ type: 'GUANXING', targetPlayerId: 'p1' });
      expect(owner.pendingAction).not.toHaveProperty('resume');
      expect(owner.pendingAction).not.toHaveProperty('internal');
      expect(opponent.players.p1.role).toBe('UNKNOWN');
      expect(opponent.deckCount).toBe(1);
      expect(opponent.discardCount).toBe(0);
      expect(opponent.rulesVersion).toBe(RULES.version);
    });

    test('should hide the Fanjian held card and ID from the guessing target', () => {
      const room = privateRoom();
      room.pendingAction = {
        type: 'FANJIAN', sourcePlayerId: 'p1', targetPlayerId: 'p2',
        heldCard: card, cardUsedId: card.id, resume: () => {},
      };
      const caster = getSanitizedRoomState(room, 'p1');
      expect(caster.pendingAction.heldCard).toEqual(card);
      expect(caster.pendingAction.cardUsedId).toBe(card.id);
      const guesser = getSanitizedRoomState(room, 'p2');
      expect(guesser.pendingAction).not.toHaveProperty('heldCard');
      expect(guesser.pendingAction).not.toHaveProperty('cardUsedId');
      expect(JSON.stringify(guesser.pendingAction)).not.toContain('HEART');
    });

    test('should publish counter-Negate metadata without serializing private action data', () => {
      const room = privateRoom();
      room.pendingAction = { type: 'WAITING_FOR_NEGATE', sourcePlayerId: 'p1', timeoutAt: 1234 };
      room.actionChain = [
        { type: 'DUEL', sourceId: 'p1', targetId: 'p2', cardUsed: card, secret: 'private', resume: () => {} },
        { type: 'NEGATE', sourceId: 'p2', cardUsed: { ...card, id: 'counter', name: 'NEGATE' } },
      ];
      room.negatePassedPlayers = ['p2'];
      room.draftDeadline = 9000;
      const state = getSanitizedRoomState(room, 'p1');
      expect(state.actionChain).toHaveLength(2);
      expect(state.actionChain[0]).toMatchObject({ type: 'DUEL', sourceId: 'p1', targetId: 'p2', cardUsed: card });
      expect(state.actionChain[0]).not.toHaveProperty('secret');
      expect(state.actionChain[0]).not.toHaveProperty('resume');
      expect(state.negatePassedPlayers).toEqual(['p2']);
      expect(state.draftDeadline).toBe(9000);
    });

    test('should mask hand cards of other players', () => {
      const room = {
        roomId: 'TEST_ROOM',
        status: 'PLAYING',
        mode: 'ONLINE',
        turnOrder: ['p1', 'p2'],
        currentTurnIndex: 0,
        currentPhase: 'PLAY',
        hostSocketId: 'sock1',
        players: {
          p1: { id: 'p1', socketId: 'sock1', hand: [{ id: 'c1', name: 'SLASH' }] },
          p2: { id: 'p2', socketId: 'sock2', hand: [{ id: 'c2', name: 'PEACH' }] }
        }
      };

      const stateForP1 = getSanitizedRoomState(room, 'p1');
      expect(stateForP1.players.p1.hand).toEqual([{ id: 'c1', name: 'SLASH' }]);
      expect(stateForP1.players.p2.hand).toBeNull();
      expect(stateForP1.players.p2.handCount).toBe(1);
    });
  });

  describe('turn orchestration hooks', () => {
    const player = (id, character = 'GUAN_YU') => ({
      id, character, hand: [], hp: 4, maxHp: 4, isAlive: true, isBot: false,
      delayedKitZone: [], equipment: {},
    });
    const roomFor = p1 => ({
      status: 'PLAYING', currentTurnIndex: 0, turnOrder: ['p1', 'p2'],
      players: { p1, p2: player('p2') }, discardPile: [],
      deck: initDeck(31), pendingAction: null,
    });

    test('should pause before judgment and draw until preparation resumes once', () => {
      const room = roomFor(player('p1'));
      let resume;
      room._prepareTurn = (currentPlayer, next) => { expect(currentPlayer.id).toBe('p1'); resume = next; };
      startPlayerTurn(room);
      expect(room.currentPhase).toBe('PREPARATION');
      expect(room.players.p1.hand).toHaveLength(0);
      resume();
      expect(room.currentPhase).toBe('PLAY');
      expect(room.players.p1.hand).toHaveLength(2);
      resume();
      expect(room.players.p1.hand).toHaveLength(2);
    });

    test('should apply a replaced delayed judgment once and then draw normally', () => {
      const p1 = player('p1');
      p1.delayedKitZone = [{ id: 'delay', name: 'STARVATION', suit: 'CLUB', rank: 10, type: 'DELAYED' }];
      const room = roomFor(p1);
      let resolve;
      room._judgeCard = (owner, drawnJudge, delayedCard, next) => {
        expect(owner.id).toBe('p1');
        expect(delayedCard.name).toBe('STARVATION');
        room.discardPile.push(drawnJudge);
        resolve = next;
      };
      startPlayerTurn(room);
      expect(room.currentPhase).toBe('JUDGEMENT');
      const replacement = { id: 'replacement', name: 'SLASH', suit: 'CLUB', rank: 3, type: 'BASIC' };
      resolve(replacement);
      expect(room.currentPhase).toBe('PLAY');
      expect(p1.hand).toHaveLength(2);
      expect(room.discardPile.filter(card => card.id === 'replacement')).toHaveLength(1);
      resolve(replacement);
      expect(p1.hand).toHaveLength(2);
      expect(room.discardPile.filter(card => card.id === 'replacement')).toHaveLength(1);
    });

    test('should expose a timed Luoshen prompt before drawing and continue through its callback', () => {
      const room = roomFor(player('p1', 'ZHEN_JI'));
      startPlayerTurn(room);
      const pending = room.pendingAction;
      expect(pending.type).toBe('LUO_RIVER');
      expect(pending.timeoutAt - Date.now()).toBeGreaterThan(19000);
      expect(room.players.p1.hand).toHaveLength(0);
      room.pendingAction = null;
      pending.resume();
      expect(room.currentPhase).toBe('PLAY');
      expect(room.players.p1.hand).toHaveLength(2);
      pending.resume();
      expect(room.players.p1.hand).toHaveLength(2);
    });

    test('should let replaced bot Luoshen judgments decide whether to continue preparation', () => {
      jest.useFakeTimers();
      try {
        const p1 = player('p1', 'ZHEN_JI');
        p1.isBot = true;
        p1._botRendeUsed = true;
        const room = roomFor(p1);
        const card = (id, suit) => ({ id, name: 'SLASH', suit, rank: 4, type: 'BASIC' });
        room.deck = [card('draw-1', 'HEART'), card('draw-2', 'CLUB'), card('old-black', 'SPADE'), card('old-red', 'HEART')];
        const callbacks = [];
        room._judgeCard = (owner, drawn, reason, done) => {
          expect(owner.id).toBe('p1');
          expect(reason.name).toBe('LUO_RIVER');
          room.discardPile.push(drawn);
          callbacks.push(done);
        };
        startPlayerTurn(room);
        expect(p1._botRendeUsed).toBe(false);
        expect(room.currentPhase).toBe('PREPARATION');
        expect(p1.hand).toHaveLength(0);
        const black = card('replacement-black', 'CLUB');
        callbacks[0](black);
        expect(callbacks).toHaveLength(2);
        expect(p1.hand).toEqual([black]);
        expect(room.currentPhase).toBe('PREPARATION');
        const red = card('replacement-red', 'DIAMOND');
        callbacks[1](red);
        expect(room.currentPhase).toBe('PLAY');
        expect(p1.hand.map(c => c.id)).toEqual(['replacement-black', 'draw-2', 'draw-1']);
        expect(room.discardPile.map(c => c.id)).toEqual(['old-red', 'old-black', 'replacement-red']);
        callbacks[0](black);
        callbacks[1](red);
        expect(p1.hand).toHaveLength(3);
        expect(room.discardPile).toHaveLength(3);
      } finally {
        jest.clearAllTimers();
        jest.useRealTimers();
      }
    });

    test('should complete bot Luoshen synchronously when no judgment hook is installed', () => {
      const p1 = player('p1', 'ZHEN_JI');
      p1.isBot = true;
      const room = roomFor(p1);
      room._schedule = jest.fn();
      const card = (id, suit) => ({ id, name: 'SLASH', suit, rank: 4, type: 'BASIC' });
      room.deck = [card('draw-1', 'HEART'), card('draw-2', 'CLUB'), card('stop-red', 'DIAMOND'), card('gain-black', 'SPADE')];
      startPlayerTurn(room);
      expect(room.currentPhase).toBe('PLAY');
      expect(p1.hand.map(c => c.id)).toEqual(['gain-black', 'draw-2', 'draw-1']);
      expect(room.discardPile.map(c => c.id)).toEqual(['stop-red']);
    });
  });
});
