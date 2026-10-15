"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRed = exports.heroId = void 0;
exports.canRespond = canRespond;
exports.removeOwnedCard = removeOwnedCard;
exports.resolveHeroResponse = resolveHeroResponse;
exports.expireHeroResponse = expireHeroResponse;
exports.prepareHeroTurn = prepareHeroTurn;
exports.judgeWithHeroes = judgeWithHeroes;
exports.queueDamageSkills = queueDamageSkills;
exports.healAmount = healAmount;
exports.startFanjian = startFanjian;
exports.startLijian = startLijian;
exports.useKurou = useKurou;
exports.startLordSkill = startLordSkill;
exports.botHeroAction = botHeroAction;
const catalog_1 = require("../shared/catalog");
const phaseLogic_1 = require("./phaseLogic");
const combatLogic_1 = require("./combatLogic");
const cardLogic_1 = require("./cardLogic");
const runtime_1 = require("./runtime");
const presentationEvents_1 = require("./presentationEvents");
const heroId = (p) => (0, catalog_1.canonicalHero)(p.character);
exports.heroId = heroId;
const isRed = (c) => c.suit === 'HEART' || c.suit === 'DIAMOND';
exports.isRed = isRed;
function canRespond(player, card, required) {
    if (card.name === required || required === 'SLASH' && card.name === 'THUNDER_ATTACK')
        return true;
    const id = (0, exports.heroId)(player);
    return id === 'ZHAO_YUN' && ((required === 'SLASH' && card.name === 'DODGE') || (required === 'DODGE' && card.name === 'SLASH')) ||
        required === 'SLASH' && id === 'GUAN_YU' && (0, exports.isRed)(card) || required === 'DODGE' && id === 'ZHEN_JI' && !(0, exports.isRed)(card);
}
function removeOwnedCard(room, player, id, equipment = true) {
    const index = player.hand.findIndex(c => c.id === id);
    if (index >= 0)
        return player.hand.splice(index, 1)[0];
    if (!equipment)
        return null;
    for (const slot of Object.keys(player.equipment || {})) {
        const card = player.equipment[slot];
        if (card?.id === id) {
            player.equipment[slot] = null;
            if (card.name === 'SILVER_LION_HELMET')
                player.hp = Math.min(player.maxHp, player.hp + 1);
            return card;
        }
    }
    return null;
}
function prompt(room, data, onResponse) {
    const pending = { ...data, timeoutAt: (0, runtime_1.deadline)(room) };
    pending.resume = (0, runtime_1.once)((response) => { if (room.pendingAction !== pending && !response?.disconnect)
        return; onResponse(response); });
    room.pendingAction = pending;
    room._broadcastFn?.();
    const target = room.players[data.targetPlayerId];
    if (target?.isBot)
        (0, runtime_1.schedule)(room, () => {
            if (room.pendingAction !== pending)
                return;
            let response = { accept: true };
            if (data.type === 'GUANXING')
                response = { topIds: [...data.cards].sort((a, b) => (a.name === 'PEACH' ? -1 : 0) - (b.name === 'PEACH' ? -1 : 0)).map((c) => c.id), bottomIds: [] };
            if (data.type === 'GUICAI') {
                const desired = target.hand.find(c => data.reason === 'LIGHTNING' ? !(c.suit === 'SPADE' && c.rank >= 2 && c.rank <= 9) : data.reason === 'ACEDIA' ? c.suit === 'HEART' : data.reason === 'STARVATION' ? c.suit === 'CLUB' : (0, exports.isRed)(c));
                response = { accept: !!desired, cardId: desired?.id };
            }
            if (data.type === 'LORD_SKILL') {
                const card = target.hand.find(c => canRespond(target, c, data.requestType));
                const friendly = target.role === 'LOYALIST' || target.role === 'LORD';
                response = { accept: !!card && friendly, cardId: card?.id };
            }
            if (data.type === 'FANJIAN')
                response = { guess: ['SPADE', 'HEART', 'CLUB', 'DIAMOND'][Math.floor(Math.random() * 4)] };
            if (data.type === 'DAMAGE_SKILL')
                response = { accept: true, slot: 'hand' };
            resolveHeroResponse(room, target.id, response);
        }, 600);
}
function resolveHeroResponse(room, playerId, data) {
    const pending = room.pendingAction;
    if (!pending || !['GUANXING', 'GUICAI', 'DAMAGE_SKILL', 'FANJIAN', 'LORD_SKILL'].includes(pending.type))
        return false;
    if (pending.targetPlayerId !== playerId)
        return false;
    if (pending.timeoutAt && Date.now() >= pending.timeoutAt) {
        expireHeroResponse(room);
        return false;
    }
    pending.resume(data || {});
    return true;
}
function expireHeroResponse(room) {
    const pending = room.pendingAction;
    if (!pending || !['GUANXING', 'GUICAI', 'DAMAGE_SKILL', 'FANJIAN', 'LORD_SKILL'].includes(pending.type))
        return false;
    if (Date.now() < Number(pending.timeoutAt))
        return false;
    pending.resume({ accept: false, timeout: true });
    return true;
}
function prepareHeroTurn(room, player, done) {
    if ((0, exports.heroId)(player) !== 'ZHUGE_LIANG')
        return done();
    const cards = (0, phaseLogic_1.drawCards)(room, Math.min(5, room.turnOrder.filter(id => room.players[id]?.isAlive).length));
    if (!cards.length)
        return done();
    (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'GUANXING');
    room.currentPhase = 'PREPARATION';
    prompt(room, { type: 'GUANXING', targetPlayerId: player.id, cards }, data => {
        const top = data.topIds || cards.map(c => c.id), bottom = data.bottomIds || [];
        const ids = [...top, ...bottom];
        const valid = ids.length === cards.length && new Set(ids).size === ids.length && ids.every(id => cards.some(c => c.id === id));
        const arrangedTop = valid ? top.map(id => cards.find(c => c.id === id)) : cards;
        const arrangedBottom = valid ? bottom.map(id => cards.find(c => c.id === id)) : [];
        room.deck = [...arrangedBottom.reverse(), ...room.deck, ...arrangedTop.reverse()];
        room.pendingAction = null;
        done();
    });
}
function judgeWithHeroes(room, target, drawn, reason, done) {
    const originalPending = room.pendingAction;
    const index = Math.max(0, room.currentTurnIndex);
    const candidates = [...room.turnOrder.slice(index), ...room.turnOrder.slice(0, index)].map(id => room.players[id]).filter(p => p?.isAlive && (0, exports.heroId)(p) === 'SIMA_YI' && p.hand.length);
    let current = drawn;
    const next = () => {
        const sima = candidates.shift();
        if (!sima) {
            room.pendingAction = originalPending;
            done(current);
            return;
        }
        if (!sima.isAlive || !sima.hand.length) {
            next();
            return;
        }
        prompt(room, { type: 'GUICAI', targetPlayerId: sima.id, judgeTargetId: target.id, judgeCard: current, reason: reason.name }, data => {
            if (data.accept && data.cardId) {
                const replacement = removeOwnedCard(room, sima, data.cardId, false);
                if (replacement) {
                    room.discardPile.push(current);
                    current = replacement;
                    (0, presentationEvents_1.emitHeroSkill)(room, sima.id, 'GUICAI', [target.id]);
                }
            }
            room.pendingAction = null;
            next();
        });
    };
    next();
}
function queueDamageSkills(room, target, sourceId, card, attack) {
    const id = (0, exports.heroId)(target);
    if (!['CAO_CAO', 'SIMA_YI'].includes(id))
        return;
    const materialIds = [...new Set(attack?.materialCardIds || (card ? [card.id] : []))];
    room._postDamageQueue || (room._postDamageQueue = []);
    room._postDamageQueue.push((done) => {
        if (!target.isAlive)
            return done();
        if (id === 'CAO_CAO') {
            const available = room.discardPile.find(c => materialIds.includes(c.id));
            if (!available)
                return done();
            prompt(room, { type: 'DAMAGE_SKILL', targetPlayerId: target.id, sourcePlayerId: sourceId, skill: 'JIANXIONG', card: available }, data => {
                if (data.accept) {
                    let gained = 0;
                    for (const id of materialIds) {
                        const idx = room.discardPile.findIndex(c => c.id === id);
                        if (idx >= 0) {
                            target.hand.push(room.discardPile.splice(idx, 1)[0]);
                            gained++;
                        }
                    }
                    if (gained)
                        (0, presentationEvents_1.emitHeroSkill)(room, target.id, 'JIANXIONG');
                }
                room.pendingAction = null;
                done();
            });
        }
        else {
            const source = sourceId ? room.players[sourceId] : null;
            if (!source?.isAlive || !source.hand.length && !Object.values(source.equipment).some(Boolean))
                return done();
            prompt(room, { type: 'DAMAGE_SKILL', targetPlayerId: target.id, sourcePlayerId: source.id, skill: 'FANKUI' }, data => {
                if (data.accept) {
                    let stolen = null;
                    if (data.slot && data.slot !== 'hand' && source.equipment[data.slot])
                        stolen = removeOwnedCard(room, source, source.equipment[data.slot].id);
                    else if (source.hand.length)
                        stolen = source.hand.splice(Math.floor(Math.random() * source.hand.length), 1)[0];
                    else {
                        const eq = Object.values(source.equipment).find(Boolean);
                        if (eq)
                            stolen = removeOwnedCard(room, source, eq.id);
                    }
                    if (stolen) {
                        target.hand.push(stolen);
                        (0, presentationEvents_1.emitHeroSkill)(room, target.id, 'FANKUI', [source.id]);
                    }
                }
                room.pendingAction = null;
                done();
            });
        }
    });
}
function healAmount(target, rescuer, card) {
    return card.name === 'PEACH' && target.role === 'LORD' && (0, exports.heroId)(target) === 'SUN_QUAN' && rescuer.id !== target.id && catalog_1.HERO_BY_ID[(0, exports.heroId)(rescuer)]?.faction === 'WU' ? 2 : 1;
}
function startFanjian(room, player, data) {
    const target = room.players[data.targetPlayerId];
    if ((0, exports.heroId)(player) !== 'ZHOU_YU' || player.skillZhouYuUsed || !target?.isAlive || target.id === player.id)
        return false;
    const held = removeOwnedCard(room, player, data.cardId, false);
    if (!held)
        return false;
    player.skillZhouYuUsed = true;
    (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'FANJIAN', [target.id]);
    prompt(room, { type: 'FANJIAN', sourcePlayerId: player.id, targetPlayerId: target.id, heldCard: held }, response => {
        if (!target.isAlive) {
            room.discardPile.push(held);
            room.pendingAction = null;
            (0, combatLogic_1.resumeAfterAttack)(room);
            return;
        }
        target.hand.push(held);
        room.pendingAction = null;
        if (response.guess !== held.suit)
            (0, combatLogic_1.dealDamage)(room, target.id, 1, null, player.id);
        if (!room.pendingAction)
            (0, combatLogic_1.resumeAfterAttack)(room);
        room._broadcastFn?.();
    });
    return true;
}
function startLijian(room, player, data) {
    const a = room.players[data.targetPlayerId], b = room.players[data.secondaryTargetId];
    if ((0, exports.heroId)(player) !== 'DIAO_CHAN' || player.skillDiaoChanUsed || !a?.isAlive || !b?.isAlive || a.id === b.id || a.id === player.id || b.id === player.id)
        return false;
    if (catalog_1.HERO_BY_ID[(0, exports.heroId)(a)]?.gender !== 'MALE' || catalog_1.HERO_BY_ID[(0, exports.heroId)(b)]?.gender !== 'MALE')
        return false;
    const cost = removeOwnedCard(room, player, data.cardId, false);
    if (!cost)
        return false;
    room.discardPile.push(cost);
    player.skillDiaoChanUsed = true;
    (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'LIJIAN', [a.id, b.id]);
    room.pendingAction = { type: 'WAITING_FOR_SLASH_DUEL', sourcePlayerId: a.id, targetPlayerId: b.id, currentPlayerToSlash: b.id, slashNeeded: (0, exports.heroId)(a) === 'LV_BU' ? 2 : 1, damage: 1, timeoutAt: (0, runtime_1.deadline)(room) };
    const duel = room.pendingAction;
    room._broadcastFn?.();
    if (b.isBot)
        (0, runtime_1.schedule)(room, () => { if (room.pendingAction !== duel)
            return; const { handleBotDuelSlash } = require('./botAI'); handleBotDuelSlash(room); }, 600);
    return true;
}
function useKurou(room, player) {
    if ((0, exports.heroId)(player) !== 'HUANG_GAI')
        return false;
    player.hp -= 1;
    (0, presentationEvents_1.emitHeroSkill)(room, player.id, 'KUROU');
    const draw = () => { if (player.isAlive)
        player.hand.push(...(0, phaseLogic_1.drawCards)(room, 2)); room._broadcastFn?.(); };
    if (player.hp <= 0) {
        room._postDamageQueue || (room._postDamageQueue = []);
        room._postDamageQueue.push((done) => { draw(); done(); });
        (0, combatLogic_1.startDyingPhase)(room, player.id, null);
    }
    else
        draw();
    return true;
}
function startLordSkill(room, lord, data) {
    if (room.status !== 'PLAYING' || !lord.isAlive)
        return false;
    const required = (0, exports.heroId)(lord) === 'CAO_CAO' ? 'DODGE' : (0, exports.heroId)(lord) === 'LIU_BEI' ? 'SLASH' : null;
    if (lord.role !== 'LORD' || !required)
        return false;
    const suspended = room.pendingAction;
    if (suspended && (suspended.type === 'LORD_SKILL' || suspended.lordSkillAttempted))
        return false;
    if (required === 'DODGE' && (!suspended || (suspended.targets?.[suspended.currentTargetIndex] || suspended.targetPlayerId) !== lord.id || !(suspended.type === 'WAITING_FOR_DODGE' || suspended.type === 'WAITING_FOR_AOE' && suspended.aoeType === 'ARROW_BARRAGE')))
        return false;
    if (required === 'SLASH' && suspended && (!(suspended.type === 'WAITING_FOR_SLASH_DUEL' || suspended.type === 'WAITING_FOR_AOE' && suspended.aoeType === 'BARBARIAN_INVASION' || suspended.type === 'WAITING_FOR_BORROW_SLASH') || (suspended.currentPlayerToSlash || suspended.targets?.[suspended.currentTargetIndex] || suspended.targetPlayerId) !== lord.id))
        return false;
    if (!suspended) {
        const target = room.players[data.targetPlayerId];
        if (required !== 'SLASH' || room.currentPhase !== 'PLAY' || room.turnOrder[room.currentTurnIndex] !== lord.id || !target?.isAlive || target.id === lord.id || (0, phaseLogic_1.calculateDistance)(room, lord.id, target.id) > (lord.equipment.weapon?.range || 1) || room.attacksPlayedInTurn >= 1 && lord.equipment.weapon?.name !== 'ZHUGE_CROSSBOW' || (0, phaseLogic_1.hasCharacter)(target, 'ZHUGE_LIANG') && !target.hand.length)
            return false;
    }
    const faction = required === 'DODGE' ? 'WEI' : 'SHU';
    const start = room.turnOrder.indexOf(lord.id);
    const helpers = [...room.turnOrder.slice(start + 1), ...room.turnOrder.slice(0, start)].map(id => room.players[id]).filter(p => p?.isAlive && p.id !== lord.id && catalog_1.HERO_BY_ID[(0, exports.heroId)(p)]?.faction === faction);
    if (!helpers.length)
        return false;
    (0, presentationEvents_1.emitHeroSkill)(room, lord.id, required === 'DODGE' ? 'HUJIA' : 'JIJIANG', data.targetPlayerId ? [data.targetPlayerId] : []);
    if (suspended)
        suspended.lordSkillAttempted = true;
    const next = () => {
        const helper = helpers.shift();
        if (!helper) {
            room.pendingAction = suspended;
            if (suspended)
                suspended.timeoutAt = (0, runtime_1.deadline)(room);
            room._broadcastFn?.();
            if (!suspended)
                (0, combatLogic_1.resumeAfterAttack)(room);
            else if (lord.isBot) {
                if (suspended.type === 'WAITING_FOR_BORROW_SLASH')
                    room._borrowedProxyResponse?.(lord.id, null);
                else
                    (0, cardLogic_1.handleResolvePending)(room, null, { playerId: lord.id, response: 'PASS' });
            }
            return;
        }
        if (!helper.isAlive) {
            next();
            return;
        }
        prompt(room, { type: 'LORD_SKILL', sourcePlayerId: lord.id, targetPlayerId: helper.id, requestType: required, skill: required === 'DODGE' ? 'HUJIA' : 'JIJIANG', originalTargetId: data.targetPlayerId }, response => {
            const found = helper.hand.find(c => c.id === response.cardId) || (required === 'SLASH' && (0, exports.heroId)(helper) === 'GUAN_YU' ? Object.values(helper.equipment).find(c => c?.id === response.cardId) : undefined);
            if (!response.accept || !found || !canRespond(helper, found, required)) {
                room.pendingAction = null;
                next();
                return;
            }
            const provided = removeOwnedCard(room, helper, found.id, required === 'SLASH' && (0, exports.heroId)(helper) === 'GUAN_YU');
            const virtual = { ...provided, id: 'proxy_' + provided.id, name: required === 'SLASH' && provided.name === 'THUNDER_ATTACK' ? 'THUNDER_ATTACK' : required, presentationCard: (0, presentationEvents_1.publicPlayedCard)(provided) };
            lord.hand.push(virtual);
            room.pendingAction = suspended;
            if (suspended)
                suspended.timeoutAt = (0, runtime_1.deadline)(room);
            const socket = { id: lord.socketId, emit: () => { }, _playerId: lord.id };
            if (suspended?.type === 'WAITING_FOR_BORROW_SLASH')
                room._borrowedProxyResponse?.(lord.id, virtual.id);
            else if (suspended)
                (0, cardLogic_1.handleResolvePending)(room, null, { playerId: lord.id, cardId: virtual.id, response: 'USE_CARD', roomId: room.roomId });
            else
                (0, cardLogic_1.handleUseCard)(room, null, { playerId: lord.id, cardId: virtual.id, targetPlayerId: data.targetPlayerId, roomId: room.roomId });
            const remaining = lord.hand.findIndex(c => c.id === virtual.id);
            if (remaining >= 0) {
                lord.hand.splice(remaining, 1);
                helper.hand.push(provided);
            }
            else {
                provided.effectName = required;
                const discard = room.discardPile.findIndex(c => c.id === virtual.id);
                if (discard >= 0)
                    room.discardPile[discard] = provided;
                if (room.pendingAction?.cardUsedId === virtual.id)
                    room.pendingAction.cardUsedId = provided.id;
            }
            room._broadcastFn?.();
            if (!room.pendingAction)
                (0, combatLogic_1.resumeAfterAttack)(room);
        });
    };
    next();
    return true;
}
function botHeroAction(room, bot) {
    if (room.pendingAction || room.currentPhase !== 'PLAY' || room.turnOrder[room.currentTurnIndex] !== bot.id)
        return false;
    const id = (0, exports.heroId)(bot), enemies = Object.values(room.players).filter(p => p.isAlive && p.id !== bot.id && (bot.role === 'REBEL' ? p.role === 'LORD' || p.role === 'LOYALIST' : bot.role === 'LORD' || bot.role === 'LOYALIST' ? p.role === 'REBEL' || p.role === 'RENEGADE' : true));
    if (id === 'SUN_QUAN' && !bot.skillResignationUsed) {
        const unwanted = bot.hand.filter(c => c.type === 'EQUIPMENT' && !!bot.equipment[require('../shared/catalog').CARD_BY_ID[c.name]?.slot] || c.name === 'WINE' && bot.hand.filter(c => c.name === 'WINE').length > 1);
        if (unwanted.length) {
            for (const c of unwanted) {
                const removed = removeOwnedCard(room, bot, c.id, false);
                if (removed)
                    room.discardPile.push(removed);
            }
            bot.hand.push(...(0, phaseLogic_1.drawCards)(room, unwanted.length));
            bot.skillResignationUsed = true;
            (0, presentationEvents_1.emitHeroSkill)(room, bot.id, 'ZHIHENG');
            room._broadcastFn?.();
            (0, combatLogic_1.resumeAfterAttack)(room);
            return true;
        }
    }
    if (id === 'ZHOU_YU' && !bot.skillZhouYuUsed && bot.hand.length > 1 && enemies.length)
        return startFanjian(room, bot, { cardId: bot.hand[bot.hand.length - 1].id, targetPlayerId: enemies[0].id });
    if (id === 'DIAO_CHAN' && !bot.skillDiaoChanUsed && bot.hand.length) {
        const men = enemies.filter(p => catalog_1.HERO_BY_ID[(0, exports.heroId)(p)]?.gender === 'MALE');
        if (men.length >= 2)
            return startLijian(room, bot, { cardId: bot.hand[bot.hand.length - 1].id, targetPlayerId: men[0].id, secondaryTargetId: men[1].id });
    }
    if (id === 'LIU_BEI' && !bot._botRendeUsed && bot.role === 'LOYALIST' && bot.hand.length >= 4) {
        const lord = Object.values(room.players).find(p => p.role === 'LORD' && p.isAlive);
        if (lord) {
            lord.hand.push(...bot.hand.splice(-2));
            bot._botRendeUsed = true;
            bot.cardsGivenThisTurn = (bot.cardsGivenThisTurn || 0) + 2;
            if (!bot.liuBeiHealedThisTurn) {
                bot.hp = Math.min(bot.maxHp, bot.hp + 1);
                bot.liuBeiHealedThisTurn = true;
            }
            (0, presentationEvents_1.emitHeroSkill)(room, bot.id, 'RENDE', [lord.id]);
            room._broadcastFn?.();
            (0, combatLogic_1.resumeAfterAttack)(room);
            return true;
        }
    }
    if (id === 'LIU_BEI' && bot.role === 'LORD' && !bot._botJijiangUsed && !bot.hand.some(c => canRespond(bot, c, 'SLASH'))) {
        const target = enemies.find(p => (0, phaseLogic_1.calculateDistance)(room, bot.id, p.id) <= (bot.equipment.weapon?.range || 1));
        if (target) {
            bot._botJijiangUsed = true;
            return startLordSkill(room, bot, { targetPlayerId: target.id });
        }
    }
    return false;
}
//# sourceMappingURL=heroLogic.js.map