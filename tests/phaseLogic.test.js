'use strict';

const {
  initDeck,
  drawCards,
  assignRoles,
  setupCharacterHp,
  calculateDistance,
  checkDiscardRequirement,
  getSanitizedRoomState,
  getAllHeroes
} = require('../dist/game/phaseLogic');

describe('game/phaseLogic Module', () => {
  describe('initDeck()', () => {
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
});
