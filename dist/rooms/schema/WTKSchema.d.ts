/**
 * rooms/schema/WTKSchema.ts — Colyseus 0.15 TypeScript Schema definitions
 */
import { Schema, MapSchema } from '@colyseus/schema';
export declare class CardSchema extends Schema {
    id: string;
    name: string;
    suit: string;
    rank: number;
    cardType: string;
    range: number;
}
export declare class EquipmentSchema extends Schema {
    weaponId: string;
    weaponName: string;
    weaponRange: number;
    armorName: string;
    offensiveHorseName: string;
    defensiveHorseName: string;
    treasureName: string;
}
export declare class PlayerSchema extends Schema {
    id: string;
    name: string;
    role: string;
    character: string;
    hp: number;
    maxHp: number;
    isAlive: boolean;
    isBot: boolean;
    isDisconnected: boolean;
    isHost: boolean;
    wineActive: boolean;
    slashedThisTurn: boolean;
    skillResignationUsed: boolean;
    skillDiaoChanUsed: boolean;
    skillZhouYuUsed: boolean;
    isChained: boolean;
    handCount: number;
    equipment: EquipmentSchema;
    delayedKitZoneJson: string;
    handJson: string;
}
export declare class WTKState extends Schema {
    roomId: string;
    status: string;
    mode: string;
    currentPhase: string;
    currentTurnPlayerId: string;
    winnerRole: string;
    winnerText: string;
    pendingActionJson: string;
    bumperHarvestCardsJson: string;
    chatJson: string;
    turnOrderJson: string;
    isBotPassive: boolean;
    players: MapSchema<PlayerSchema>;
    characterChoicesJson: string;
}
//# sourceMappingURL=WTKSchema.d.ts.map