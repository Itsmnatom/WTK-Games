'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WTKState = exports.PlayerSchema = exports.EquipmentSchema = exports.CardSchema = void 0;
/**
 * rooms/schema/WTKSchema.ts — Colyseus 0.15 TypeScript Schema definitions
 */
const schema_1 = require("@colyseus/schema");
// ─── CardSchema ───────────────────────────────────────────────────────────────
class CardSchema extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.id = '';
        this.name = '';
        this.suit = '';
        this.rank = 0;
        this.cardType = '';
        this.range = 0;
    }
}
exports.CardSchema = CardSchema;
__decorate([
    (0, schema_1.type)('string')
], CardSchema.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)('string')
], CardSchema.prototype, "name", void 0);
__decorate([
    (0, schema_1.type)('string')
], CardSchema.prototype, "suit", void 0);
__decorate([
    (0, schema_1.type)('uint8')
], CardSchema.prototype, "rank", void 0);
__decorate([
    (0, schema_1.type)('string')
], CardSchema.prototype, "cardType", void 0);
__decorate([
    (0, schema_1.type)('uint8')
], CardSchema.prototype, "range", void 0);
// ─── EquipmentSchema ──────────────────────────────────────────────────────────
class EquipmentSchema extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.weaponId = '';
        this.weaponName = '';
        this.weaponRange = 0;
        this.armorName = '';
        this.offensiveHorseName = '';
        this.defensiveHorseName = '';
        this.treasureName = '';
    }
}
exports.EquipmentSchema = EquipmentSchema;
__decorate([
    (0, schema_1.type)('string')
], EquipmentSchema.prototype, "weaponId", void 0);
__decorate([
    (0, schema_1.type)('string')
], EquipmentSchema.prototype, "weaponName", void 0);
__decorate([
    (0, schema_1.type)('uint8')
], EquipmentSchema.prototype, "weaponRange", void 0);
__decorate([
    (0, schema_1.type)('string')
], EquipmentSchema.prototype, "armorName", void 0);
__decorate([
    (0, schema_1.type)('string')
], EquipmentSchema.prototype, "offensiveHorseName", void 0);
__decorate([
    (0, schema_1.type)('string')
], EquipmentSchema.prototype, "defensiveHorseName", void 0);
__decorate([
    (0, schema_1.type)('string')
], EquipmentSchema.prototype, "treasureName", void 0);
// ─── PlayerSchema ─────────────────────────────────────────────────────────────
class PlayerSchema extends schema_1.Schema {
    constructor() {
        super(...arguments);
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
        this.handCount = 0;
        this.equipment = new EquipmentSchema();
        this.delayedKitZoneJson = '[]';
        this.handJson = '[]';
    }
}
exports.PlayerSchema = PlayerSchema;
__decorate([
    (0, schema_1.type)('string')
], PlayerSchema.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)('string')
], PlayerSchema.prototype, "name", void 0);
__decorate([
    (0, schema_1.type)('string')
], PlayerSchema.prototype, "role", void 0);
__decorate([
    (0, schema_1.type)('string')
], PlayerSchema.prototype, "character", void 0);
__decorate([
    (0, schema_1.type)('int8')
], PlayerSchema.prototype, "hp", void 0);
__decorate([
    (0, schema_1.type)('uint8')
], PlayerSchema.prototype, "maxHp", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], PlayerSchema.prototype, "isAlive", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], PlayerSchema.prototype, "isBot", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], PlayerSchema.prototype, "isDisconnected", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], PlayerSchema.prototype, "isHost", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], PlayerSchema.prototype, "wineActive", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], PlayerSchema.prototype, "slashedThisTurn", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], PlayerSchema.prototype, "skillResignationUsed", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], PlayerSchema.prototype, "skillDiaoChanUsed", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], PlayerSchema.prototype, "skillZhouYuUsed", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], PlayerSchema.prototype, "isChained", void 0);
__decorate([
    (0, schema_1.type)('uint8')
], PlayerSchema.prototype, "handCount", void 0);
__decorate([
    (0, schema_1.type)(EquipmentSchema)
], PlayerSchema.prototype, "equipment", void 0);
__decorate([
    (0, schema_1.type)('string')
], PlayerSchema.prototype, "delayedKitZoneJson", void 0);
__decorate([
    (0, schema_1.type)('string')
], PlayerSchema.prototype, "handJson", void 0);
// ─── WTKState (Root State) ────────────────────────────────────────────────────
class WTKState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.roomId = '';
        this.status = 'LOBBY';
        this.mode = 'ONLINE';
        this.currentPhase = 'START';
        this.currentTurnPlayerId = '';
        this.winnerRole = '';
        this.winnerText = '';
        this.pendingActionJson = 'null';
        this.bumperHarvestCardsJson = '[]';
        this.chatJson = '[]';
        this.turnOrderJson = '[]';
        this.isBotPassive = false;
        this.players = new schema_1.MapSchema();
        this.characterChoicesJson = '{}';
    }
}
exports.WTKState = WTKState;
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "roomId", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "status", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "mode", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "currentPhase", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "currentTurnPlayerId", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "winnerRole", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "winnerText", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "pendingActionJson", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "bumperHarvestCardsJson", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "chatJson", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "turnOrderJson", void 0);
__decorate([
    (0, schema_1.type)('boolean')
], WTKState.prototype, "isBotPassive", void 0);
__decorate([
    (0, schema_1.type)({ map: PlayerSchema })
], WTKState.prototype, "players", void 0);
__decorate([
    (0, schema_1.type)('string')
], WTKState.prototype, "characterChoicesJson", void 0);
//# sourceMappingURL=WTKSchema.js.map