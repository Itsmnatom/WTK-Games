'use strict';
/**
 * WTKSchema.js — Colyseus 0.15 JavaScript Schema definitions
 * 
 * ใช้ Plain Objects แทน Schema Classes เนื่องจากเป็น JS-only
 * Colyseus 0.15 รองรับ Room ที่ใช้ setState() กับ plain state object ได้
 * แต่เพื่อให้ได้ Delta Encoding จำเป็นต้องใช้ @colyseus/schema
 * 
 * วิธีนี้ใช้ MapSchema/ArraySchema จาก @colyseus/schema แต่ไม่ใช้ TypeScript decorator
 */

const { Schema, MapSchema, ArraySchema, type } = require('@colyseus/schema');

// ─── CardSchema ───────────────────────────────────────────────────────────────
class CardSchema extends Schema {
  constructor() {
    super();
    this.id = '';
    this.name = '';
    this.suit = '';
    this.rank = 0;
    this.cardType = '';
    this.range = 0;
  }
}
type('string')(CardSchema.prototype, 'id');
type('string')(CardSchema.prototype, 'name');
type('string')(CardSchema.prototype, 'suit');
type('uint8')(CardSchema.prototype, 'rank');
type('string')(CardSchema.prototype, 'cardType');
type('uint8')(CardSchema.prototype, 'range');

// ─── EquipmentSchema ──────────────────────────────────────────────────────────
class EquipmentSchema extends Schema {
  constructor() {
    super();
    this.weaponId = '';
    this.weaponName = '';
    this.weaponRange = 0;
    this.armorName = '';
    this.offensiveHorseName = '';
    this.defensiveHorseName = '';
    this.treasureName = '';
  }
}
type('string')(EquipmentSchema.prototype, 'weaponId');
type('string')(EquipmentSchema.prototype, 'weaponName');
type('uint8')(EquipmentSchema.prototype, 'weaponRange');
type('string')(EquipmentSchema.prototype, 'armorName');
type('string')(EquipmentSchema.prototype, 'offensiveHorseName');
type('string')(EquipmentSchema.prototype, 'defensiveHorseName');
type('string')(EquipmentSchema.prototype, 'treasureName');

// ─── PlayerSchema ─────────────────────────────────────────────────────────────
class PlayerSchema extends Schema {
  constructor() {
    super();
    this.id = '';
    this.name = '';
    this.role = 'UNKNOWN';
    this.character = '';
    this.hp = 4;
    this.maxHp = 4;
    this.isAlive = true;
    this.isBot = false;
    this.isDisconnected = false;
    this.isHost = false;
    this.wineActive = false;
    this.slashedThisTurn = false;
    this.skillResignationUsed = false;
    this.skillDiaoChanUsed = false;
    this.skillZhouYuUsed = false;
    this.isChained = false;
    this.handCount = 0;            // for non-self players
    this.equipment = new EquipmentSchema();
    // hand = ArraySchema<CardSchema> — only sent to the owner
    // delayedKitZone = serialized as JSON string to reduce overhead
    this.delayedKitZoneJson = '[]';
    this.handJson = '[]';          // only populated for the requesting player
  }
}
type('string')(PlayerSchema.prototype, 'id');
type('string')(PlayerSchema.prototype, 'name');
type('string')(PlayerSchema.prototype, 'role');
type('string')(PlayerSchema.prototype, 'character');
type('int8')(PlayerSchema.prototype, 'hp');
type('uint8')(PlayerSchema.prototype, 'maxHp');
type('boolean')(PlayerSchema.prototype, 'isAlive');
type('boolean')(PlayerSchema.prototype, 'isBot');
type('boolean')(PlayerSchema.prototype, 'isDisconnected');
type('boolean')(PlayerSchema.prototype, 'isHost');
type('boolean')(PlayerSchema.prototype, 'wineActive');
type('boolean')(PlayerSchema.prototype, 'slashedThisTurn');
type('boolean')(PlayerSchema.prototype, 'skillResignationUsed');
type('boolean')(PlayerSchema.prototype, 'skillDiaoChanUsed');
type('boolean')(PlayerSchema.prototype, 'skillZhouYuUsed');
type('boolean')(PlayerSchema.prototype, 'isChained');
type('uint8')(PlayerSchema.prototype, 'handCount');
type(EquipmentSchema)(PlayerSchema.prototype, 'equipment');
type('string')(PlayerSchema.prototype, 'delayedKitZoneJson');
type('string')(PlayerSchema.prototype, 'handJson');

// ─── WTKState (Root State) ────────────────────────────────────────────────────
class WTKState extends Schema {
  constructor() {
    super();
    this.roomId = '';
    this.status = 'LOBBY';         // LOBBY | DRAFTING | PLAYING | ENDED
    this.mode = 'ONLINE';          // ONLINE | BOT
    this.currentPhase = 'START';   // START | JUDGEMENT | PREPARATION | DRAW | PLAY | DISCARD
    this.currentTurnPlayerId = '';
    this.winnerRole = '';
    this.winnerText = '';
    this.pendingActionJson = 'null'; // JSON string of pendingAction
    this.bumperHarvestCardsJson = '[]';
    this.chatJson = '[]';
    this.turnOrderJson = '[]';
    this.isBotPassive = false;
    this.players = new MapSchema();
    this.characterChoicesJson = '{}'; // { playerId: choices[] }
  }
}
type('string')(WTKState.prototype, 'roomId');
type('string')(WTKState.prototype, 'status');
type('string')(WTKState.prototype, 'mode');
type('string')(WTKState.prototype, 'currentPhase');
type('string')(WTKState.prototype, 'currentTurnPlayerId');
type('string')(WTKState.prototype, 'winnerRole');
type('string')(WTKState.prototype, 'winnerText');
type('string')(WTKState.prototype, 'pendingActionJson');
type('string')(WTKState.prototype, 'bumperHarvestCardsJson');
type('string')(WTKState.prototype, 'chatJson');
type('string')(WTKState.prototype, 'turnOrderJson');
type('boolean')(WTKState.prototype, 'isBotPassive');
type({ map: PlayerSchema })(WTKState.prototype, 'players');
type('string')(WTKState.prototype, 'characterChoicesJson');

module.exports = { WTKState, PlayerSchema, EquipmentSchema, CardSchema };
