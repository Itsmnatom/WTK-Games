'use strict';

const {
  checkGameOver,
  dealDamage,
  startDyingPhase,
  getCardById
} = require('../dist/game/combatLogic');

describe('game/combatLogic Module', () => {
  let room;

  beforeEach(() => {
    room = {
      roomId: 'TEST_COMBAT',
      status: 'PLAYING',
      turnOrder: ['p1', 'p2', 'p3'],
      currentTurnIndex: 0,
      discardPile: [],
      chat: [],
      players: {
        p1: { id: 'p1', name: 'LordPlayer', role: 'LORD', hp: 4, maxHp: 4, isAlive: true, hand: [], delayedKitZone: [] },
        p2: { id: 'p2', name: 'RebelPlayer', role: 'REBEL', hp: 3, maxHp: 3, isAlive: true, hand: [], delayedKitZone: [] },
        p3: { id: 'p3', name: 'LoyalistPlayer', role: 'LOYALIST', hp: 3, maxHp: 3, isAlive: true, hand: [], delayedKitZone: [] }
      }
    };
  });

  describe('dealDamage()', () => {
    test('should reduce target HP by damage amount', () => {
      dealDamage(room, 'p2', 1, null, 'p1', 'NORMAL');
      expect(room.players.p2.hp).toBe(2);
    });

    test('should trigger dying phase when HP drops to 0 or below', () => {
      dealDamage(room, 'p2', 3, null, 'p1', 'NORMAL');
      expect(room.players.p2.hp).toBe(0);
      expect(room.pendingAction).toBeDefined();
      expect(room.pendingAction.type).toBe('DYING');
    });
  });

  describe('checkGameOver()', () => {
    test('should declare REBEL victory if LORD dies', () => {
      room.players.p1.isAlive = false;
      const isOver = checkGameOver(room);
      expect(isOver).toBe(true);
      expect(room.status).toBe('ENDED');
      expect(room.winnerRole).toBe('REBEL');
    });

    test('should declare LORD victory if all REBELs and RENEGADEs are dead', () => {
      room.players.p2.isAlive = false; // Only REBEL is dead
      const isOver = checkGameOver(room);
      expect(isOver).toBe(true);
      expect(room.status).toBe('ENDED');
      expect(room.winnerRole).toBe('LORD');
    });

    test('should not declare game over if LORD and REBEL are both alive', () => {
      const isOver = checkGameOver(room);
      expect(isOver).toBe(false);
      expect(room.status).toBe('PLAYING');
    });
  });

  describe('getCardById()', () => {
    test('should retrieve card from player hand or discard pile', () => {
      const cardInHand = { id: 'card_101', name: 'PEACH' };
      const cardInDiscard = { id: 'card_102', name: 'SLASH' };
      room.players.p1.hand.push(cardInHand);
      room.discardPile.push(cardInDiscard);

      expect(getCardById(room, 'card_101')).toEqual(cardInHand);
      expect(getCardById(room, 'card_102')).toEqual(cardInDiscard);
      expect(getCardById(room, 'non_existent')).toBeNull();
    });
  });
});
