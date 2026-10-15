"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawWithHeroes = drawWithHeroes;
exports.expandedDamageSkills = expandedDamageSkills;
exports.claimJudgment = claimJudgment;
exports.queueTacticDraw = queueTacticDraw;
exports.qingnang = qingnang;
exports.validRedirect = validRedirect;
exports.offerRedirection = offerRedirection;
exports.expandedBotAction = expandedBotAction;
const catalog_1 = require("../shared/catalog");
const phaseLogic_1 = require("./phaseLogic");
const heroLogic_1 = require("./heroLogic");
const combatLogic_1 = require("./combatLogic");
const presentationEvents_1 = require("./presentationEvents");
const runtime_1 = require("./runtime");
const experimental_1 = require("./experimental");
function drawWithHeroes(room, player, done) {
    const generation = room._turnGeneration;
    const current = () => room.status === 'PLAYING' && player.isAlive && room._turnGeneration === generation && room.turnOrder[room.currentTurnIndex] === player.id;
    const normal = () => {
        if (!current())
            return;
        if ((0, catalog_1.canonicalHero)(player.character) === 'ZHANG_LIAO' && Object.values(room.players).some(p => p.isAlive && p.id !== player.id && p.hand.length)) {
            (0, heroLogic_1.prompt)(room, { type: 'ZHANG_LIAO_DRAW', targetPlayerId: player.id }, data => {
                if (!current()) {
                    room.pendingAction = null;
                    (0, combatLogic_1.resumeAfterAttack)(room);
                    return;
                }
                const ids = data.targetPlayerIds;
                if (data.accept && Array.isArray(ids) && ids.length > 0 && ids.length <= 2 && new Set(ids).size === ids.length && ids.every(id => typeof id === 'string' && id !== player.id && room.players[id]?.isAlive && room.players[id].hand.length)) {
                    for (const id of ids) {
                        const target = room.players[id];
                        player.hand.push(target.hand.splice(Math.floor(Math.random() * target.hand.length), 1)[0]);
                    }
                    (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'TUXI', ids);
                }
                else
                    player.hand.push(...(0, phaseLogic_1.drawCards)(room, 2));
                room.pendingAction = null;
                done();
            });
            return;
        }
        player.hand.push(...(0, phaseLogic_1.drawCards)(room, (0, phaseLogic_1.hasCharacter)(player, 'ZHOU_YU') ? 3 : 2));
        if ((0, phaseLogic_1.hasCharacter)(player, 'ZHOU_YU'))
            (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'YINGZI');
        done();
    };
    if ((0, experimental_1.experimental)(room) && player.strategy === 'SUPPLY' && !player.strategyUsed && player.hp < player.maxHp) {
        (0, heroLogic_1.prompt)(room, { type: 'SUPPLY_PLAN', targetPlayerId: player.id }, data => {
            room.pendingAction = null;
            if (!current()) {
                (0, combatLogic_1.resumeAfterAttack)(room);
                return;
            }
            if (data.accept) {
                player.strategyUsed = true;
                player.hp = Math.min(player.maxHp, player.hp + 1);
                (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'PLAN_SUPPLY');
                done();
            }
            else
                normal();
        });
    }
    else
        normal();
}
function expandedDamageSkills(room, player, damage) {
    if ((0, catalog_1.canonicalHero)(player.character) !== 'GUO_JIA')
        return;
    room._postDamageQueue || (room._postDamageQueue = []);
    for (let point = 0; point < damage; point++)
        room._postDamageQueue.push((done) => {
            if (!player.isAlive)
                return done();
            (0, heroLogic_1.prompt)(room, { type: 'GUO_JIA_ACCEPT', targetPlayerId: player.id }, data => {
                room.pendingAction = null;
                if (!data.accept || !player.isAlive) {
                    done();
                    return;
                }
                const cards = (0, phaseLogic_1.drawCards)(room, 2);
                if (!cards.length) {
                    done();
                    return;
                }
                (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'YIJI');
                (0, heroLogic_1.prompt)(room, { type: 'GUO_JIA_DISTRIBUTE', targetPlayerId: player.id, cards }, response => {
                    const assignments = response.allocations;
                    const valid = Array.isArray(assignments) && assignments.length === cards.length && new Set(assignments.map(a => a?.cardId)).size === cards.length && assignments.every(a => a && cards.some(c => c.id === a.cardId) && room.players[a.playerId]?.isAlive);
                    for (const card of cards) {
                        const recipient = valid ? room.players[assignments.find(a => a.cardId === card.id).playerId] : player;
                        if (recipient.isAlive)
                            recipient.hand.push(card);
                        else
                            room.discardPile.push(card);
                    }
                    room.pendingAction = null;
                    done();
                    room._broadcastFn?.();
                });
            });
        });
}
/** Claim is resolved after judgment result, before continuing the suspended action. */
function claimJudgment(room, player, card, done) {
    if ((0, catalog_1.canonicalHero)(player.character) !== 'GUO_JIA' || !player.isAlive) {
        done();
        return;
    }
    const suspended = room.pendingAction;
    const index = room.discardPile.findIndex(c => c.id === card.id);
    if (index < 0) {
        done();
        return;
    }
    // Reserve the public judgment card so a reshuffle cannot reuse it during the prompt.
    const held = room.discardPile.splice(index, 1)[0];
    (0, heroLogic_1.prompt)(room, { type: 'GUO_JIA_JUDGE', targetPlayerId: player.id, judgeCard: held }, data => {
        if (data.accept && player.isAlive) {
            player.hand.push(held);
            (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'TIANDU');
        }
        else
            room.discardPile.push(held);
        if (!player.isAlive) {
            room.pendingAction = null;
            (0, combatLogic_1.resumeAfterAttack)(room);
            return;
        }
        room.pendingAction = suspended;
        if (suspended)
            suspended.timeoutAt = (0, runtime_1.deadline)(room);
        done();
    });
}
function queueTacticDraw(room, playerId) {
    const player = room.players[playerId];
    if ((0, catalog_1.canonicalHero)(player?.character) !== 'HUANG_YUEYING')
        return;
    room._postDamageQueue || (room._postDamageQueue = []);
    room._postDamageQueue.push((done) => {
        if (!player.isAlive)
            return done();
        (0, heroLogic_1.prompt)(room, { type: 'HUANG_DRAW', targetPlayerId: player.id }, data => {
            room.pendingAction = null;
            if (data.accept && player.isAlive) {
                player.hand.push(...(0, phaseLogic_1.drawCards)(room, 1));
                (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'JIZHI');
            }
            done();
            room._broadcastFn?.();
        });
    });
}
function qingnang(room, player, data) {
    const target = room.players[data.targetPlayerId];
    if ((0, catalog_1.canonicalHero)(player.character) !== 'HUA_TUO' || player.skillQingnangUsed || !target?.isAlive || target.hp >= target.maxHp)
        return false;
    const cost = (0, heroLogic_1.removeOwnedCard)(room, player, data.cardId, false);
    if (!cost)
        return false;
    room.discardPile.push(cost);
    player.skillQingnangUsed = true;
    target.hp = Math.min(target.maxHp, target.hp + 1);
    (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'QINGNANG', [target.id]);
    room._broadcastFn?.();
    return true;
}
function validRedirect(room, player, target, sourceId, costId) {
    if (!target?.isAlive || target.id === player.id || target.id === sourceId || (0, phaseLogic_1.hasCharacter)(target, 'ZHUGE_LIANG') && !target.hand.length)
        return false;
    const costSlot = Object.keys(player.equipment).find(slot => player.equipment[slot]?.id === costId);
    const adjusted = costSlot ? { ...player, equipment: { ...player.equipment, [costSlot]: null } } : player;
    const local = { ...room, players: { ...room.players, [player.id]: adjusted } };
    return (0, phaseLogic_1.calculateDistance)(local, player.id, target.id) <= (adjusted.equipment.weapon?.range || 1);
}
function offerRedirection(room) {
    const attack = room.pendingAction;
    if (attack?.type !== 'WAITING_FOR_DODGE' || attack.redirectChecked)
        return false;
    attack.redirectChecked = true;
    const player = room.players[attack.targetPlayerId];
    if (!player?.isAlive || (0, catalog_1.canonicalHero)(player.character) !== 'DA_QIAO' || attack.redirectedBy?.includes(player.id) || !player.hand.length && !Object.values(player.equipment).some(Boolean))
        return false;
    (0, heroLogic_1.prompt)(room, { type: 'DA_QIAO_REDIRECT', targetPlayerId: player.id, sourcePlayerId: attack.sourcePlayerId, attackSourceId: attack.sourcePlayerId }, data => {
        if (!room.players[attack.sourcePlayerId]?.isAlive) {
            room.pendingAction = null;
            (0, combatLogic_1.resumeAfterAttack)(room);
            room._broadcastFn?.();
            return;
        }
        const target = room.players[data.targetPlayerId];
        const held = player.hand.find(c => c.id === data.cardId) || Object.values(player.equipment).find(c => c?.id === data.cardId);
        if (player.isAlive && data.accept && held && validRedirect(room, player, target, attack.sourcePlayerId, data.cardId)) {
            const cost = (0, heroLogic_1.removeOwnedCard)(room, player, data.cardId);
            room.discardPile.push(cost);
            attack.redirectedBy = [...(attack.redirectedBy || []), player.id];
            attack.targetPlayerId = target.id;
            attack.redirectChecked = false;
            attack.eightTrigramsUsed = false;
            (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'LIULI', [target.id]);
        }
        room.pendingAction = room.players[attack.targetPlayerId]?.isAlive ? attack : null;
        if (!room.pendingAction) {
            (0, combatLogic_1.resumeAfterAttack)(room);
            return;
        }
        attack.timeoutAt = (0, runtime_1.deadline)(room);
        room._broadcastFn?.();
        if (room.pendingAction === attack && room.players[attack.targetPlayerId]?.isBot)
            (0, runtime_1.schedule)(room, () => { if (room.pendingAction === attack) {
                const { handleBotDodge } = require('./botAI');
                handleBotDodge(room, attack.targetPlayerId, attack.damage);
            } }, 600);
    });
    return true;
}
function expandedBotAction(room, bot) {
    if ((0, catalog_1.canonicalHero)(bot.character) === 'HUA_TUO' && !bot.skillQingnangUsed && bot.hand.length) {
        const injured = Object.values(room.players).find(p => p.isAlive && p.hp < p.maxHp && (p.id === bot.id || (0, experimental_1.publicFriendly)(room, bot, p)));
        if (injured)
            return qingnang(room, bot, { cardId: bot.hand[bot.hand.length - 1].id, targetPlayerId: injured.id });
    }
    return false;
}
//# sourceMappingURL=expandedHeroes.js.map