"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachRoomLifecycle = attachRoomLifecycle;
const catalog_1 = require("../shared/catalog");
const phaseLogic_1 = require("./phaseLogic");
const combatLogic_1 = require("./combatLogic");
const cardLogic_1 = require("./cardLogic");
const heroLogic_1 = require("./heroLogic");
const experimental_1 = require("./experimental");
const expandedHeroes_1 = require("./expandedHeroes");
function attachRoomLifecycle(room, clock, broadcast) {
    room._schedule = (callback, ms) => clock.setTimeout(callback, ms);
    room._prepareTurn = (player, done) => (0, heroLogic_1.prepareHeroTurn)(room, player, done);
    room._judgeCard = (player, drawn, reason, done) => (0, heroLogic_1.judgeWithHeroes)(room, player, drawn, reason, done);
    room._afterDamage = (player, source, card, damage, attack) => (0, heroLogic_1.queueDamageSkills)(room, player, source, card, attack, damage);
    room._botHeroAction = (player) => (0, heroLogic_1.botHeroAction)(room, player);
    room._botLordResponse = (player, _required) => (0, heroLogic_1.startLordSkill)(room, player, {});
    room._drawWithHeroes = (player, done) => (0, expandedHeroes_1.drawWithHeroes)(room, player, done);
    room._offerRedirection = () => (0, expandedHeroes_1.offerRedirection)(room);
    clock.setInterval(() => {
        if (room._disposed || room.status === 'ENDED')
            return;
        if (room.status === 'STRATEGY') {
            (0, experimental_1.finishStrategies)(room);
            return;
        }
        if (room.status === 'DRAFTING' && room.draftDeadline && Date.now() >= room.draftDeadline) {
            for (const p of Object.values(room.players)) {
                if (p.isAlive && !p.character && p.characterChoices?.length) {
                    p.character = (0, catalog_1.canonicalHero)(p.characterChoices[0].id);
                    (0, phaseLogic_1.setupCharacterHp)(p, room.turnOrder.length);
                }
            }
            if (Object.values(room.players).filter(p => p.isAlive).every(p => p.character))
                (0, phaseLogic_1.startPlayPhase)(room);
            else
                broadcast();
            return;
        }
        const p = room.pendingAction;
        if (!p)
            return;
        if (!p.timeoutAt)
            p.timeoutAt = Date.now() + catalog_1.RULES.reactionMs;
        if (Date.now() < p.timeoutAt)
            return;
        if (p.type === 'DYING') {
            (0, combatLogic_1.advanceDyingAsker)(room);
            return;
        }
        if (p.type === 'LUO_RIVER') {
            room.pendingAction = null;
            p.resume?.();
            broadcast();
            return;
        }
        if ((0, heroLogic_1.expireHeroResponse)(room))
            return;
        (0, cardLogic_1.resolvePendingAction)(room, p);
    }, 250);
}
//# sourceMappingURL=roomLifecycle.js.map