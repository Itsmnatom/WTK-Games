'use strict';

const {
  startNegateWindow,
  resolveActionChain,
  executeOriginalAction,
  handleUseCard,
  handleResolvePending
} = require('../dist/game/cardLogic');

describe('game/cardLogic Comprehensive Module Test Suite', () => {
  let room;
  let socketMock1;
  let socketMock2;

  beforeEach(() => {
    room = {
      roomId: 'TEST_CARD_SUITE',
      status: 'PLAYING',
      turnOrder: ['p1', 'p2'],
      currentTurnIndex: 0,
      currentPhase: 'PLAY',
      deck: [
        { id: 'deck_1', name: 'SLASH', suit: 'HEART', rank: 5, type: 'BASIC' },
        { id: 'deck_2', name: 'DODGE', suit: 'DIAMOND', rank: 6, type: 'BASIC' },
        { id: 'deck_3', name: 'PEACH', suit: 'HEART', rank: 7, type: 'BASIC' }
      ],
      discardPile: [],
      chat: [],
      attacksPlayedInTurn: 0,
      players: {
        p1: {
          id: 'p1', name: 'Player1', hp: 3, maxHp: 4, isAlive: true,
          hand: [], delayedKitZone: [], socketId: 'p1_sock', wineActive: false, isChained: false,
          slashedThisTurn: false, equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null }
        },
        p2: {
          id: 'p2', name: 'Player2', hp: 3, maxHp: 4, isAlive: true,
          hand: [], delayedKitZone: [], socketId: 'p2_sock', wineActive: false, isChained: false,
          slashedThisTurn: false, equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null }
        }
      }
    };

    socketMock1 = { id: 'p1_sock', emit: jest.fn(), send: jest.fn() };
    socketMock2 = { id: 'p2_sock', emit: jest.fn(), send: jest.fn() };
  });

  // ─── 1. Basic Cards ────────────────────────────────────────────────────────
  describe('Basic Cards Logic', () => {
    test('PEACH: should heal player when HP < maxHp', () => {
      const peachCard = { id: 'peach_1', name: 'PEACH', type: 'BASIC', suit: 'HEART', rank: 8 };
      room.players.p1.hand.push(peachCard);
      room.players.p1.hp = 2;

      handleUseCard(room, socketMock1, { cardId: 'peach_1' });
      expect(room.players.p1.hp).toBe(3);
      expect(room.discardPile).toContainEqual(peachCard);
    });

    test('WINE: should set wineActive to true', () => {
      const wineCard = { id: 'wine_1', name: 'WINE', type: 'BASIC', suit: 'DIAMOND', rank: 9 };
      room.players.p1.hand.push(wineCard);

      handleUseCard(room, socketMock1, { cardId: 'wine_1' });
      expect(room.players.p1.wineActive).toBe(true);
      expect(room.discardPile).toContainEqual(wineCard);
    });

    test('SLASH: should initiate WAITING_FOR_DODGE pendingAction against target in range', () => {
      const slashCard = { id: 'slash_1', name: 'SLASH', type: 'BASIC', suit: 'SPADE', rank: 10 };
      room.players.p1.hand.push(slashCard);

      handleUseCard(room, socketMock1, { cardId: 'slash_1', targetPlayerId: 'p2' });
      expect(room.attacksPlayedInTurn).toBe(1);
      expect(room.players.p1.slashedThisTurn).toBe(true);
      expect(room.pendingAction).toBeDefined();
      expect(room.pendingAction.type).toBe('WAITING_FOR_DODGE');
      expect(room.pendingAction.targetPlayerId).toBe('p2');
    });

    test('THUNDER_ATTACK: should set damageType to THUNDER in pendingAction', () => {
      const thunderCard = { id: 'thunder_1', name: 'THUNDER_ATTACK', type: 'BASIC', suit: 'SPADE', rank: 4 };
      room.players.p1.hand.push(thunderCard);

      handleUseCard(room, socketMock1, { cardId: 'thunder_1', targetPlayerId: 'p2' });
      expect(room.pendingAction).toBeDefined();
      expect(room.pendingAction.damageType).toBe('THUNDER');
    });
  });

  // ─── 2. Equipment Cards ───────────────────────────────────────────────────
  describe('Equipment Cards Logic', () => {
    test('WEAPON: should equip weapon and update equipment slot', () => {
      const weaponCard = { id: 'w_1', name: 'ZHUGE_CROSSBOW', type: 'EQUIPMENT', suit: 'DIAMOND', rank: 1 };
      room.players.p1.hand.push(weaponCard);

      handleUseCard(room, socketMock1, { cardId: 'w_1' });
      expect(room.players.p1.equipment.weapon).toBeDefined();
      expect(room.players.p1.equipment.weapon.name).toBe('ZHUGE_CROSSBOW');
      expect(room.players.p1.equipment.weapon.range).toBe(1);
    });

    test('ARMOR: should equip armor and discard existing armor', () => {
      const armorCard1 = { id: 'arm_1', name: 'NIO_SHIELD', type: 'EQUIPMENT', suit: 'SPADE', rank: 2 };
      const armorCard2 = { id: 'arm_2', name: 'EIGHT_TRIGRAMS_FORMATION', type: 'EQUIPMENT', suit: 'CLUB', rank: 2 };
      room.players.p1.hand.push(armorCard1, armorCard2);

      handleUseCard(room, socketMock1, { cardId: 'arm_1' });
      expect(room.players.p1.equipment.armor.name).toBe('NIO_SHIELD');

      handleUseCard(room, socketMock1, { cardId: 'arm_2' });
      expect(room.players.p1.equipment.armor.name).toBe('EIGHT_TRIGRAMS_FORMATION');
      expect(room.discardPile).toContainEqual(expect.objectContaining({ name: 'NIO_SHIELD' }));
    });

    test('HORSES: should equip defensive and offensive horses correctly', () => {
      const defHorse = { id: 'h_def', name: 'LIGHTNING_HOOF', type: 'EQUIPMENT', suit: 'HEART', rank: 13 };
      const offHorse = { id: 'h_off', name: 'RED_HARE', type: 'EQUIPMENT', suit: 'HEART', rank: 5 };
      room.players.p1.hand.push(defHorse, offHorse);

      handleUseCard(room, socketMock1, { cardId: 'h_def' });
      expect(room.players.p1.equipment.defensiveHorse.name).toBe('LIGHTNING_HOOF');

      handleUseCard(room, socketMock1, { cardId: 'h_off' });
      expect(room.players.p1.equipment.offensiveHorse.name).toBe('RED_HARE');
    });

    test('TREASURE: WOODEN_CART should equip to treasure slot', () => {
      const cart = { id: 'cart_1', name: 'WOODEN_CART', type: 'EQUIPMENT', suit: 'DIAMOND', rank: 1 };
      room.players.p1.hand.push(cart);

      handleUseCard(room, socketMock1, { cardId: 'cart_1' });
      expect(room.players.p1.equipment.treasure.name).toBe('WOODEN_CART');
    });
  });

  // ─── 3. Kit / Stratagem Cards ─────────────────────────────────────────────
  describe('Kit Cards Logic', () => {
    test('EX_NIHILO: should initiate negate window for EX_NIHILO', () => {
      const exCard = { id: 'ex_1', name: 'EX_NIHILO', type: 'KIT', suit: 'HEART', rank: 3 };
      room.players.p1.hand.push(exCard);

      handleUseCard(room, socketMock1, { cardId: 'ex_1' });
      expect(room.pendingAction).toBeDefined();
      expect(room.pendingAction.type).toBe('WAITING_FOR_NEGATE');
      expect(room.actionChain[0].cardUsed.name).toBe('EX_NIHILO');
    });

    test('STEAL: should initiate negate window targeting target player', () => {
      const stealCard = { id: 'steal_1', name: 'STEAL', type: 'KIT', suit: 'SPADE', rank: 4 };
      room.players.p1.hand.push(stealCard);

      handleUseCard(room, socketMock1, { cardId: 'steal_1', targetPlayerId: 'p2', targetZone: 'HAND' });
      expect(room.pendingAction).toBeDefined();
      expect(room.pendingAction.type).toBe('WAITING_FOR_NEGATE');
      expect(room.actionChain[0].type).toBe('STEAL');
    });

    test('SABOTAGE: should initiate negate window targeting target player', () => {
      const sabCard = { id: 'sab_1', name: 'SABOTAGE', type: 'KIT', suit: 'CLUB', rank: 3 };
      room.players.p1.hand.push(sabCard);

      handleUseCard(room, socketMock1, { cardId: 'sab_1', targetPlayerId: 'p2' });
      expect(room.pendingAction).toBeDefined();
      expect(room.actionChain[0].type).toBe('SABOTAGE');
    });

    test('DUEL: should initiate negate window for DUEL', () => {
      const duelCard = { id: 'duel_1', name: 'DUEL', type: 'KIT', suit: 'SPADE', rank: 1 };
      room.players.p1.hand.push(duelCard);

      handleUseCard(room, socketMock1, { cardId: 'duel_1', targetPlayerId: 'p2' });
      expect(room.pendingAction).toBeDefined();
      expect(room.actionChain[0].type).toBe('DUEL');
    });

    test('FIRE_ATTACK: should initiate negate window for FIRE_ATTACK', () => {
      const fireCard = { id: 'fire_1', name: 'FIRE_ATTACK', type: 'KIT', suit: 'HEART', rank: 2 };
      room.players.p1.hand.push(fireCard);
      room.players.p2.hand.push({ id: 'card_p2', name: 'DODGE', type: 'BASIC', suit: 'HEART', rank: 5 });

      handleUseCard(room, socketMock1, { cardId: 'fire_1', targetPlayerId: 'p2' });
      expect(room.pendingAction).toBeDefined();
      expect(room.actionChain[0].type).toBe('FIRE_ATTACK');
    });

    test('IRON_CHAIN: targetless should cycle card draw, targeted should initiate negate window', () => {
      const chainCard1 = { id: 'ic_1', name: 'IRON_CHAIN', type: 'KIT', suit: 'SPADE', rank: 11 };
      const chainCard2 = { id: 'ic_2', name: 'IRON_CHAIN', type: 'KIT', suit: 'CLUB', rank: 12 };
      room.players.p1.hand.push(chainCard1, chainCard2);

      // Targetless -> recycle card draw
      handleUseCard(room, socketMock1, { cardId: 'ic_1' });
      expect(room.players.p1.hand).toHaveLength(2); // drew 1 card

      // Targeted -> negate window
      handleUseCard(room, socketMock1, { cardId: 'ic_2', targetPlayerId: 'p2' });
      expect(room.pendingAction).toBeDefined();
      expect(room.actionChain[0].type).toBe('IRON_CHAIN');
    });

    test('BORROWED_SWORD: should validate target equipped weapon and initiate negate window', () => {
      const bsCard = { id: 'bs_1', name: 'BORROWED_SWORD', type: 'KIT', suit: 'CLUB', rank: 12 };
      room.players.p1.hand.push(bsCard);
      room.players.p2.equipment.weapon = { id: 'w_1', name: 'ZHUGE_CROSSBOW', type: 'EQUIPMENT', range: 1 };

      handleUseCard(room, socketMock1, { cardId: 'bs_1', targetPlayerId: 'p2', secondaryTargetId: 'p1' });
      expect(room.pendingAction).toBeDefined();
      expect(room.actionChain[0].type).toBe('BORROWED_SWORD');
      expect(room.actionChain[0].targetId).toBe('p2');
      expect(room.actionChain[0].victimId).toBe('p1');
    });
  });

  // ─── 4. Delayed Kit Cards ──────────────────────────────────────────────────
  describe('Delayed Kit Cards Logic', () => {
    test('ACEDIA / STARVATION / LIGHTNING: should initiate negate window and place in delayedKitZone when resolved', () => {
      const acediaCard = { id: 'acedia_1', name: 'ACEDIA', type: 'DELAYED', suit: 'SPADE', rank: 6 };
      room.players.p1.hand.push(acediaCard);

      handleUseCard(room, socketMock1, { cardId: 'acedia_1', targetPlayerId: 'p2' });
      expect(room.pendingAction).toBeDefined();
      expect(room.actionChain[0].type).toBe('DELAYED');

      // Resolve action chain
      resolveActionChain(room);
      expect(room.players.p2.delayedKitZone).toContainEqual(acediaCard);
    });
  });

  // ─── 5. Execution of Original Actions (`executeOriginalAction`) ─────────
  describe('executeOriginalAction() Effects', () => {
    test('EX_NIHILO execution: should draw 2 cards for source player', () => {
      const action = { type: 'EX_NIHILO', sourceId: 'p1', cardUsed: { name: 'EX_NIHILO' } };
      executeOriginalAction(room, action);
      expect(room.players.p1.hand).toHaveLength(2);
    });

    test('STEAL execution: should steal 1 card from target hand', () => {
      const stolenCard = { id: 'stolen_c', name: 'PEACH', type: 'BASIC', suit: 'HEART', rank: 9 };
      room.players.p2.hand.push(stolenCard);

      const action = { type: 'STEAL', sourceId: 'p1', targetId: 'p2', targetZone: 'HAND' };
      executeOriginalAction(room, action);
      expect(room.players.p2.hand).toHaveLength(0);
      expect(room.players.p1.hand).toContainEqual(stolenCard);
    });

    test('SABOTAGE execution: should discard 1 card from target hand', () => {
      const discardedCard = { id: 'disc_c', name: 'SLASH', type: 'BASIC', suit: 'SPADE', rank: 7 };
      room.players.p2.hand.push(discardedCard);

      const action = { type: 'SABOTAGE', sourceId: 'p1', targetId: 'p2', targetZone: 'HAND' };
      executeOriginalAction(room, action);
      expect(room.players.p2.hand).toHaveLength(0);
      expect(room.discardPile).toContainEqual(discardedCard);
    });

    test('PEACH_GARDEN execution: should heal all damaged players by 1 HP', () => {
      room.players.p1.hp = 2;
      room.players.p2.hp = 1;

      const action = { type: 'PEACH_GARDEN', sourceId: 'p1' };
      executeOriginalAction(room, action);
      expect(room.players.p1.hp).toBe(3);
      expect(room.players.p2.hp).toBe(2);
    });

    test('IRON_CHAIN execution: should toggle chained status', () => {
      expect(room.players.p2.isChained).toBe(false);

      const action = { type: 'IRON_CHAIN', sourceId: 'p1', targetId: 'p2' };
      executeOriginalAction(room, action);
      expect(room.players.p2.isChained).toBe(true);

      executeOriginalAction(room, action);
      expect(room.players.p2.isChained).toBe(false);
    });
  });

  // ─── 6. Negate Window & Resolve Action Chain ──────────────────────────────
  describe('Negate Chain Resolution', () => {
    test('startNegateWindow() and resolveActionChain() odd chain -> executes action', () => {
      const actionData = { sourceId: 'p1', type: 'EX_NIHILO', cardUsed: { id: 'ex_1', name: 'EX_NIHILO' } };
      startNegateWindow(room, actionData);
      expect(room.pendingAction.type).toBe('WAITING_FOR_NEGATE');

      resolveActionChain(room); // Odd chain length (1) -> Execute
      expect(room.pendingAction).toBeNull();
      expect(room.players.p1.hand).toHaveLength(2); // Drew 2 cards from EX_NIHILO
    });

    test('resolveActionChain() even chain -> negates action', () => {
      room.actionChain = [
        { sourceId: 'p1', type: 'EX_NIHILO', cardUsed: { id: 'ex_1', name: 'EX_NIHILO' } },
        { sourceId: 'p2', type: 'NEGATE', cardUsed: { id: 'neg_1', name: 'NEGATE' } }
      ];

      resolveActionChain(room); // Even chain length (2) -> Negated
      expect(room.pendingAction).toBeNull();
      expect(room.players.p1.hand).toHaveLength(0); // Did NOT draw
      expect(room.chat.some(msg => msg.text.includes('ถูกยกเลิกโดยไร้ข้อกังขา'))).toBe(true);
    });
  });
});
