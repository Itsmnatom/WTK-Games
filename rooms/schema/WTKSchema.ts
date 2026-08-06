'use strict';
/**
 * rooms/schema/WTKSchema.ts — Colyseus 0.15 TypeScript Schema definitions
 */

import { Schema, MapSchema, type } from '@colyseus/schema';

// ─── CardSchema ───────────────────────────────────────────────────────────────
export class CardSchema extends Schema {
  @type('string') id: string = '';
  @type('string') name: string = '';
  @type('string') suit: string = '';
  @type('uint8') rank: number = 0;
  @type('string') cardType: string = '';
  @type('uint8') range: number = 0;
}

// ─── EquipmentSchema ──────────────────────────────────────────────────────────
export class EquipmentSchema extends Schema {
  @type('string') weaponId: string = '';
  @type('string') weaponName: string = '';
  @type('uint8') weaponRange: number = 0;
  @type('string') armorName: string = '';
  @type('string') offensiveHorseName: string = '';
  @type('string') defensiveHorseName: string = '';
  @type('string') treasureName: string = '';
}

// ─── PlayerSchema ─────────────────────────────────────────────────────────────
export class PlayerSchema extends Schema {
  @type('string') id: string = '';
  @type('string') name: string = '';
  @type('string') role: string = 'UNKNOWN';
  @type('string') character: string = '';
  @type('int8') hp: number = 4;
  @type('uint8') maxHp: number = 4;
  @type('boolean') isAlive: boolean = true;
  @type('boolean') isBot: boolean = false;
  @type('boolean') isDisconnected: boolean = false;
  @type('boolean') isHost: boolean = false;
  @type('boolean') wineActive: boolean = false;
  @type('boolean') slashedThisTurn: boolean = false;
  @type('boolean') skillResignationUsed: boolean = false;
  @type('boolean') skillDiaoChanUsed: boolean = false;
  @type('boolean') skillZhouYuUsed: boolean = false;
  @type('boolean') isChained: boolean = false;
  @type('uint8') handCount: number = 0;
  @type(EquipmentSchema) equipment: EquipmentSchema = new EquipmentSchema();
  @type('string') delayedKitZoneJson: string = '[]';
  @type('string') handJson: string = '[]';
}

// ─── WTKState (Root State) ────────────────────────────────────────────────────
export class WTKState extends Schema {
  @type('string') roomId: string = '';
  @type('string') status: string = 'LOBBY';
  @type('string') mode: string = 'ONLINE';
  @type('string') currentPhase: string = 'START';
  @type('string') currentTurnPlayerId: string = '';
  @type('string') winnerRole: string = '';
  @type('string') winnerText: string = '';
  @type('string') pendingActionJson: string = 'null';
  @type('string') bumperHarvestCardsJson: string = '[]';
  @type('string') chatJson: string = '[]';
  @type('string') turnOrderJson: string = '[]';
  @type('boolean') isBotPassive: boolean = false;
  @type({ map: PlayerSchema }) players: MapSchema<PlayerSchema> = new MapSchema<PlayerSchema>();
  @type('string') characterChoicesJson: string = '{}';
}
