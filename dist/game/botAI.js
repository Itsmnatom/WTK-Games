'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBotTurn = runBotTurn;
exports.botWantsToAttack = botWantsToAttack;
exports.handleBotDodge = handleBotDodge;
exports.handleBotDuelSlash = handleBotDuelSlash;
exports.handleBotAOE = handleBotAOE;
exports.handleBotSeduction = handleBotSeduction;
exports.handleBotZhouYu = handleBotZhouYu;
exports.handleBotBumperPick = handleBotBumperPick;
exports.handleBotBorrowSlash = handleBotBorrowSlash;
/**
 * game/botAI.ts
 * Bot AI brain — runBotTurn + all bot response handlers
 */
const phaseLogic_1 = require("./phaseLogic");
const combatLogic_1 = require("./combatLogic");
// ─── Bot wants to attack helper ───────────────────────────────────────────────
function botWantsToAttack(bot, target, room) {
    if (bot.id === target.id || !target.isAlive)
        return false;
    if (bot.role === 'LORD' || bot.role === 'LOYALIST')
        return target.role === 'REBEL' || target.role === 'RENEGADE';
    if (bot.role === 'REBEL')
        return target.role === 'LORD' || target.role === 'LOYALIST';
    if (bot.role === 'RENEGADE') {
        const rebelsAlive = Object.values(room.players).some((p) => p.isAlive && p.role === 'REBEL');
        if (rebelsAlive)
            return target.role === 'REBEL';
        const loyalistsAlive = Object.values(room.players).some((p) => p.isAlive && p.role === 'LOYALIST');
        if (loyalistsAlive)
            return target.role === 'LOYALIST';
        return target.role === 'LORD';
    }
    return false;
}
// ─── Main Bot Turn ────────────────────────────────────────────────────────────
function runBotTurn(room, botId) {
    const bot = room.players[botId];
    if (!bot || !bot.isAlive || room.status !== 'PLAYING')
        return;
    const isTestRoom = room.roomId === 'ROOM_TEST' || room.roomId.startsWith('ROOM_TEST');
    if (room.isBotPassive || (isTestRoom && room.isBotPassive !== false)) {
        console.log(`🤖 Bot Passive Mode: ${bot.name} stays passive.`);
        return;
    }
    let actionTaken = false;
    // 1. Heal with PEACH if damaged
    if (!actionTaken && bot.hp < bot.maxHp) {
        const peachIdx = bot.hand.findIndex((c) => c.name === 'PEACH');
        if (peachIdx !== -1) {
            const card = bot.hand.splice(peachIdx, 1)[0];
            room.discardPile.push(card);
            bot.hp += 1;
            room._emitAll && room._emitAll('card_played', { playerId: botId, cardName: 'PEACH' });
            actionTaken = true;
        }
    }
    // 2. EX_NIHILO draw 2
    if (!actionTaken) {
        const idx = bot.hand.findIndex((c) => c.name === 'EX_NIHILO');
        if (idx !== -1) {
            const card = bot.hand.splice(idx, 1)[0];
            room.discardPile.push(card);
            room._emitAll && room._emitAll('card_played', { playerId: botId, cardName: 'EX_NIHILO' });
            (0, phaseLogic_1.drawCards)(room, 2).forEach((c) => bot.hand.push(c));
            room._broadcastFn && room._broadcastFn();
            actionTaken = true;
        }
    }
    // 3. Equip Weapon
    if (!actionTaken) {
        const WEAPONS = ['ZHUGE_CROSSBOW', 'BLUE_STEEL_SWORD', 'SIX_SWORDS_WU', 'KIRIN_BOW', 'FEATHERED_FAN', 'SERPENT_SPEAR', 'FROST_SWORD', 'TWO_BLADED_TRIDENT', 'ROCK_CLEAVING_AXE', 'GREEN_DRAGON_BLADE', 'SKY_PIERCING_HALBERD', 'YIN_YANG_SWORDS'];
        const WEAPON_RANGE = { 'ZHUGE_CROSSBOW': 1, 'BLUE_STEEL_SWORD': 2, 'SIX_SWORDS_WU': 2, 'KIRIN_BOW': 5, 'FEATHERED_FAN': 4, 'SERPENT_SPEAR': 3, 'FROST_SWORD': 2, 'TWO_BLADED_TRIDENT': 3, 'ROCK_CLEAVING_AXE': 3, 'GREEN_DRAGON_BLADE': 3, 'SKY_PIERCING_HALBERD': 4, 'YIN_YANG_SWORDS': 2 };
        const wIdx = bot.hand.findIndex((c) => WEAPONS.includes(c.name));
        if (wIdx !== -1) {
            const w = bot.hand[wIdx];
            if (!bot.equipment.weapon || bot.equipment.weapon.name !== w.name) {
                bot.hand.splice(wIdx, 1);
                if (bot.equipment.weapon)
                    room.discardPile.push(bot.equipment.weapon);
                w.range = WEAPON_RANGE[w.name] || 1;
                bot.equipment.weapon = w;
                room._emitAll && room._emitAll('card_played', { playerId: botId, cardName: w.name });
                actionTaken = true;
            }
        }
    }
    // 3b. Equip Horse
    if (!actionTaken) {
        const hIdx = bot.hand.findIndex((c) => ['RED_HARE', 'LIGHTNING_HOOF', 'FERGANA_STEED', 'SHADOWRUNNER'].includes(c.name));
        if (hIdx !== -1) {
            const h = bot.hand[hIdx];
            const isOff = h.name === 'RED_HARE' || h.name === 'FERGANA_STEED';
            if (isOff && !bot.equipment.offensiveHorse) {
                bot.hand.splice(hIdx, 1);
                bot.equipment.offensiveHorse = h;
                actionTaken = true;
            }
            else if (!isOff && !bot.equipment.defensiveHorse) {
                bot.hand.splice(hIdx, 1);
                bot.equipment.defensiveHorse = h;
                actionTaken = true;
            }
        }
    }
    // 3c. Equip Armor
    if (!actionTaken) {
        const aIdx = bot.hand.findIndex((c) => ['NIO_SHIELD', 'EIGHT_TRIGRAMS_FORMATION', 'SILVER_LION_HELMET', 'RATTAN_ARMOR'].includes(c.name));
        if (aIdx !== -1) {
            const arm = bot.hand[aIdx];
            if (!bot.equipment.armor || bot.equipment.armor.name !== arm.name) {
                bot.hand.splice(aIdx, 1);
                if (bot.equipment.armor) {
                    room.discardPile.push(bot.equipment.armor);
                    if (bot.equipment.armor.name === 'SILVER_LION_HELMET')
                        bot.hp = Math.min(bot.maxHp, bot.hp + 1);
                }
                bot.equipment.armor = arm;
                actionTaken = true;
            }
        }
    }
    // 3d. AOE (BARBARIAN_INVASION / ARROW_BARRAGE)
    if (!actionTaken) {
        const aoeIdx = bot.hand.findIndex((c) => ['BARBARIAN_INVASION', 'ARROW_BARRAGE'].includes(c.name));
        if (aoeIdx !== -1) {
            const aoeCard = bot.hand.splice(aoeIdx, 1)[0];
            room.discardPile.push(aoeCard);
            const myIdx = room.turnOrder.indexOf(botId);
            const targets = [];
            for (let i = 1; i < room.turnOrder.length; i++) {
                const pid = room.turnOrder[(myIdx + i) % room.turnOrder.length];
                if (room.players[pid]?.isAlive)
                    targets.push(pid);
            }
            if (targets.length > 0) {
                room.pendingAction = {
                    type: 'WAITING_FOR_AOE', aoeType: aoeCard.name, sourcePlayerId: botId,
                    targets, currentTargetIndex: 0, cardUsedId: aoeCard.id, timeoutAt: Date.now() + 15000
                };
                room._emitAll && room._emitAll('card_played', { playerId: botId, cardName: aoeCard.name });
                room._broadcastFn && room._broadcastFn();
                actionTaken = true;
                if (room.players[targets[0]]?.isBot)
                    setTimeout(() => handleBotAOE(room), 1200);
                else
                    setTimeout(() => {
                        if (room.pendingAction?.type === 'WAITING_FOR_AOE' && room.pendingAction.currentTargetIndex === 0) {
                            (0, combatLogic_1.dealDamage)(room, targets[0], 1, (0, combatLogic_1.getCardById)(room, aoeCard.id), botId);
                            if (room.pendingAction?.type === 'WAITING_FOR_AOE')
                                handleBotAOE(room);
                        }
                    }, 15000);
                return;
            }
        }
    }
    // 3e. Delayed (ACEDIA / STARVATION)
    if (!actionTaken) {
        const dIdx = bot.hand.findIndex((c) => ['ACEDIA', 'STARVATION'].includes(c.name));
        if (dIdx !== -1) {
            const cardName = bot.hand[dIdx].name;
            for (const pid of room.turnOrder) {
                if (pid === botId)
                    continue;
                const target = room.players[pid];
                if (botWantsToAttack(bot, target, room)) {
                    const alreadyHas = target.delayedKitZone?.some((c) => c.name === cardName);
                    if (!alreadyHas) {
                        const card = bot.hand.splice(dIdx, 1)[0];
                        target.delayedKitZone = target.delayedKitZone || [];
                        target.delayedKitZone.push(card);
                        room._emitAll && room._emitAll('card_played', { playerId: botId, cardName, targetId: pid });
                        room._broadcastFn && room._broadcastFn();
                        actionTaken = true;
                        break;
                    }
                }
            }
        }
    }
    // 4. SABOTAGE
    if (!actionTaken) {
        const sIdx = bot.hand.findIndex((c) => c.name === 'SABOTAGE');
        if (sIdx !== -1) {
            for (const pid of room.turnOrder) {
                const target = room.players[pid];
                if (botWantsToAttack(bot, target, room) && (target.hand.length > 0 || target.equipment?.weapon || target.equipment?.defensiveHorse || target.equipment?.offensiveHorse)) {
                    const card = bot.hand.splice(sIdx, 1)[0];
                    room.discardPile.push(card);
                    let discardedCard = null;
                    if (target.hand.length > 0)
                        discardedCard = target.hand.splice(Math.floor(Math.random() * target.hand.length), 1)[0];
                    else if (target.equipment?.defensiveHorse) {
                        discardedCard = target.equipment.defensiveHorse;
                        target.equipment.defensiveHorse = null;
                    }
                    else if (target.equipment?.weapon) {
                        discardedCard = target.equipment.weapon;
                        target.equipment.weapon = null;
                    }
                    else if (target.equipment?.offensiveHorse) {
                        discardedCard = target.equipment.offensiveHorse;
                        target.equipment.offensiveHorse = null;
                    }
                    if (discardedCard)
                        room.discardPile.push(discardedCard);
                    room._emitAll && room._emitAll('card_played', { playerId: botId, cardName: 'SABOTAGE', targetId: pid });
                    room._broadcastFn && room._broadcastFn();
                    actionTaken = true;
                    break;
                }
            }
        }
    }
    // 4b. STEAL
    if (!actionTaken) {
        const sIdx = bot.hand.findIndex((c) => c.name === 'STEAL');
        if (sIdx !== -1) {
            for (const pid of room.turnOrder) {
                const target = room.players[pid];
                const dist = (0, phaseLogic_1.calculateDistance)(room, botId, pid);
                if (dist <= 1 && botWantsToAttack(bot, target, room) && (target.hand.length > 0 || target.equipment?.weapon || target.equipment?.defensiveHorse)) {
                    const card = bot.hand.splice(sIdx, 1)[0];
                    room.discardPile.push(card);
                    let stolenCard = null;
                    if (target.hand.length > 0)
                        stolenCard = target.hand.splice(Math.floor(Math.random() * target.hand.length), 1)[0];
                    else if (target.equipment?.defensiveHorse) {
                        stolenCard = target.equipment.defensiveHorse;
                        target.equipment.defensiveHorse = null;
                    }
                    else if (target.equipment?.weapon) {
                        stolenCard = target.equipment.weapon;
                        target.equipment.weapon = null;
                    }
                    if (stolenCard) {
                        bot.hand.push(stolenCard);
                        if (stolenCard.name === 'SILVER_LION_HELMET')
                            target.hp = Math.min(target.maxHp, target.hp + 1);
                    }
                    room._emitAll && room._emitAll('card_played', { playerId: botId, cardName: 'STEAL', targetId: pid });
                    room._broadcastFn && room._broadcastFn();
                    actionTaken = true;
                    break;
                }
            }
        }
    }
    // 4c. DUEL
    if (!actionTaken) {
        const dIdx = bot.hand.findIndex((c) => c.name === 'DUEL');
        if (dIdx !== -1) {
            for (const pid of room.turnOrder) {
                const target = room.players[pid];
                if (botWantsToAttack(bot, target, room) && !((0, phaseLogic_1.hasCharacter)(target, 'ZHUGE_LIANG') && target.hand.length === 0)) {
                    const card = bot.hand.splice(dIdx, 1)[0];
                    room.discardPile.push(card);
                    room.pendingAction = {
                        type: 'WAITING_FOR_SLASH_DUEL', sourcePlayerId: botId, targetPlayerId: pid,
                        currentPlayerToSlash: pid, cardUsedId: card.id, damage: 1, timeoutAt: Date.now() + 15000
                    };
                    room._broadcastFn && room._broadcastFn();
                    actionTaken = true;
                    if (room.players[pid]?.isBot)
                        setTimeout(() => handleBotDuelSlash(room), 1200);
                    return;
                }
            }
        }
    }
    // 5. Wine buff before SLASH
    if (!actionTaken) {
        const hasWine = bot.hand.some((c) => c.name === 'WINE');
        const hasSlash = bot.hand.some((c) => c.name === 'SLASH' || c.name === 'THUNDER_ATTACK');
        if (hasWine && hasSlash && !bot.wineActive) {
            const weaponRange = bot.equipment?.weapon?.range || 1;
            const enemyInRange = room.turnOrder.some((pid) => {
                const t = room.players[pid];
                return botWantsToAttack(bot, t, room) && (0, phaseLogic_1.calculateDistance)(room, botId, pid) <= weaponRange;
            });
            if (enemyInRange) {
                const wIdx = bot.hand.findIndex((c) => c.name === 'WINE');
                const wCard = bot.hand.splice(wIdx, 1)[0];
                room.discardPile.push(wCard);
                bot.wineActive = true;
                actionTaken = true;
            }
        }
    }
    // 6. SLASH / THUNDER_ATTACK
    if (!actionTaken) {
        const slashIdx = bot.hand.findIndex((c) => c.name === 'SLASH' || c.name === 'THUNDER_ATTACK');
        if (slashIdx !== -1) {
            const weaponRange = bot.equipment?.weapon?.range || 1;
            const hasZhuge = bot.equipment?.weapon?.name === 'ZHUGE_CROSSBOW';
            const isZhangFei = (0, phaseLogic_1.hasCharacter)(bot, 'ZHANG_FEI');
            for (const pid of room.turnOrder) {
                const target = room.players[pid];
                if (botWantsToAttack(bot, target, room)) {
                    const dist = (0, phaseLogic_1.calculateDistance)(room, botId, pid);
                    if (dist <= weaponRange && (room.attacksPlayedInTurn === 0 || hasZhuge || isZhangFei)) {
                        const attackCard = bot.hand.splice(slashIdx, 1)[0];
                        room.discardPile.push(attackCard);
                        const isThunder = attackCard.name === 'THUNDER_ATTACK';
                        const damage = bot.wineActive ? 2 : 1;
                        bot.wineActive = false;
                        room.attacksPlayedInTurn += 1;
                        bot.slashedThisTurn = true;
                        const dodgeNeeded = (0, phaseLogic_1.hasCharacter)(bot, 'LV_BU') ? 2 : 1;
                        room.pendingAction = {
                            type: 'WAITING_FOR_DODGE', sourcePlayerId: botId, targetPlayerId: pid,
                            cardUsedId: attackCard.id, damage, dodgeNeeded,
                            damageType: isThunder ? 'THUNDER' : 'NORMAL', timeoutAt: Date.now() + 15000
                        };
                        room._emitAll && room._emitAll('card_played', { playerId: botId, cardName: attackCard.name, targetId: pid });
                        room._broadcastFn && room._broadcastFn();
                        actionTaken = true;
                        if (room.players[pid]?.isBot)
                            setTimeout(() => handleBotDodge(room, pid, damage), 1000);
                        return;
                    }
                }
            }
        }
    }
    if (actionTaken) {
        setTimeout(() => runBotTurn(room, botId), 1200);
    }
    else {
        room.currentPhase = 'DISCARD';
        (0, phaseLogic_1.checkDiscardRequirement)(room);
    }
}
// ─── Bot Response Handlers ────────────────────────────────────────────────────
function handleBotDodge(room, botId, damage) {
    const bot = room.players[botId];
    if (!bot || !bot.isAlive || !room.pendingAction)
        return;
    const pending = room.pendingAction;
    // Eight Trigrams
    if (bot.equipment?.armor?.name === 'EIGHT_TRIGRAMS_FORMATION' && !pending.eightTrigramsUsed) {
        const judgeCard = (0, phaseLogic_1.drawCards)(room, 1)[0];
        if (judgeCard) {
            room.discardPile.push(judgeCard);
            const isRed = judgeCard.suit === 'HEART' || judgeCard.suit === 'DIAMOND';
            room.chat = room.chat || [];
            room.chat.push({ sender: 'System', text: `🔮 (Bot) ${bot.name} ใช้ประยุทธ์แปดทิศ ทอยได้ ${judgeCard.name}(${judgeCard.suit}) - ${isRed ? 'สำเร็จ!' : 'ล้มเหลว'}`, time: new Date().toLocaleTimeString('th-TH') });
            pending.eightTrigramsUsed = true;
            if (isRed) {
                pending.dodgeNeeded = (pending.dodgeNeeded || 1) - 1;
                if (pending.dodgeNeeded <= 0) {
                    room.pendingAction = null;
                    room._broadcastFn && room._broadcastFn();
                    (0, combatLogic_1.resumeAfterAttack)(room);
                    return;
                }
            }
        }
    }
    let dodgeIdx = bot.hand.findIndex((c) => c.name === 'DODGE');
    if (dodgeIdx === -1 && ((0, phaseLogic_1.hasCharacter)(bot, 'ZHEN_JI') || (0, phaseLogic_1.hasCharacter)(bot, 'LADY_ZHEN'))) {
        dodgeIdx = bot.hand.findIndex((c) => c.suit === 'SPADE' || c.suit === 'CLUB');
    }
    if (dodgeIdx !== -1) {
        const card = bot.hand.splice(dodgeIdx, 1)[0];
        room.discardPile.push(card);
        pending.dodgeNeeded = (pending.dodgeNeeded || 1) - 1;
        if (pending.dodgeNeeded <= 0) {
            room.pendingAction = null;
            room._broadcastFn && room._broadcastFn();
            (0, combatLogic_1.resumeAfterAttack)(room);
        }
        else {
            room._broadcastFn && room._broadcastFn();
            setTimeout(() => handleBotDodge(room, botId, damage), 600);
        }
    }
    else {
        const attackerId = pending?.sourcePlayerId || null;
        const cardUsed = pending ? (0, combatLogic_1.getCardById)(room, pending.cardUsedId) : null;
        room.pendingAction = null;
        (0, combatLogic_1.dealDamage)(room, botId, damage, cardUsed, attackerId);
        if (!room.pendingAction)
            (0, combatLogic_1.resumeAfterAttack)(room);
    }
}
function handleBotDuelSlash(room) {
    const pending = room.pendingAction;
    if (!pending || pending.type !== 'WAITING_FOR_SLASH_DUEL')
        return;
    const botId = pending.currentPlayerToSlash;
    const bot = room.players[botId];
    if (!bot || !bot.isAlive)
        return;
    const slashIdx = bot.hand.findIndex((c) => c.name === 'SLASH');
    if (slashIdx !== -1) {
        const card = bot.hand.splice(slashIdx, 1)[0];
        room.discardPile.push(card);
        pending.currentPlayerToSlash = pending.currentPlayerToSlash === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId;
        pending.timeoutAt = Date.now() + 15000;
        room._broadcastFn && room._broadcastFn();
        if (room.players[pending.currentPlayerToSlash]?.isBot) {
            setTimeout(() => handleBotDuelSlash(room), 1200);
        }
        else {
            setTimeout(() => {
                if (room.pendingAction?.type === 'WAITING_FOR_SLASH_DUEL' && room.pendingAction.currentPlayerToSlash === pending.currentPlayerToSlash) {
                    const atkId = pending.currentPlayerToSlash === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId;
                    const cu = (0, combatLogic_1.getCardById)(room, pending.cardUsedId);
                    room.pendingAction = null;
                    (0, combatLogic_1.dealDamage)(room, pending.currentPlayerToSlash, 1, cu, atkId);
                    if (!room.pendingAction)
                        (0, combatLogic_1.resumeAfterAttack)(room);
                    room._broadcastFn && room._broadcastFn();
                }
            }, 15000);
        }
    }
    else {
        const damagedId = botId;
        const atkId = damagedId === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId;
        const cu = (0, combatLogic_1.getCardById)(room, pending.cardUsedId);
        room.pendingAction = null;
        (0, combatLogic_1.dealDamage)(room, damagedId, 1, cu, atkId);
        if (!room.pendingAction)
            (0, combatLogic_1.resumeAfterAttack)(room);
    }
}
function handleBotAOE(room) {
    const pending = room.pendingAction;
    if (!pending || pending.type !== 'WAITING_FOR_AOE')
        return;
    const botId = pending.targets[pending.currentTargetIndex];
    const bot = room.players[botId];
    if (!bot || !bot.isAlive) {
        pending.currentTargetIndex++;
        if (pending.currentTargetIndex >= pending.targets.length) {
            room.pendingAction = null;
            room._broadcastFn && room._broadcastFn();
            (0, combatLogic_1.resumeAfterAttack)(room);
        }
        else {
            pending.timeoutAt = Date.now() + 15000;
            room._broadcastFn && room._broadcastFn();
            const nextBot = room.players[pending.targets[pending.currentTargetIndex]];
            if (nextBot?.isBot)
                setTimeout(() => handleBotAOE(room), 1200);
        }
        return;
    }
    let playedIdx = -1;
    if (pending.aoeType === 'BARBARIAN_INVASION') {
        playedIdx = bot.hand.findIndex((c) => c.name === 'SLASH');
        if (playedIdx === -1 && (0, phaseLogic_1.hasCharacter)(bot, 'GUAN_YU'))
            playedIdx = bot.hand.findIndex((c) => c.suit === 'HEART' || c.suit === 'DIAMOND');
    }
    else if (pending.aoeType === 'ARROW_BARRAGE') {
        playedIdx = bot.hand.findIndex((c) => c.name === 'DODGE');
        if (playedIdx === -1 && ((0, phaseLogic_1.hasCharacter)(bot, 'ZHEN_JI') || (0, phaseLogic_1.hasCharacter)(bot, 'LADY_ZHEN'))) {
            playedIdx = bot.hand.findIndex((c) => c.suit === 'SPADE' || c.suit === 'CLUB');
        }
    }
    if (playedIdx !== -1) {
        const card = bot.hand.splice(playedIdx, 1)[0];
        room.discardPile.push(card);
        pending.currentTargetIndex++;
        if (pending.currentTargetIndex >= pending.targets.length) {
            room.pendingAction = null;
            room._broadcastFn && room._broadcastFn();
            (0, combatLogic_1.resumeAfterAttack)(room);
        }
        else {
            pending.timeoutAt = Date.now() + 15000;
            room._broadcastFn && room._broadcastFn();
            if (room.players[pending.targets[pending.currentTargetIndex]]?.isBot)
                setTimeout(() => handleBotAOE(room), 1200);
        }
    }
    else {
        const cardUsed = (0, combatLogic_1.getCardById)(room, pending.cardUsedId);
        (0, combatLogic_1.dealDamage)(room, botId, 1, cardUsed, pending.sourcePlayerId);
        if (room.pendingAction?.type === 'WAITING_FOR_AOE') {
            pending.currentTargetIndex++;
            if (pending.currentTargetIndex >= pending.targets.length) {
                room.pendingAction = null;
                room._broadcastFn && room._broadcastFn();
                (0, combatLogic_1.resumeAfterAttack)(room);
            }
            else {
                pending.timeoutAt = Date.now() + 15000;
                room._broadcastFn && room._broadcastFn();
                if (room.players[pending.targets[pending.currentTargetIndex]]?.isBot)
                    setTimeout(() => handleBotAOE(room), 1200);
            }
        }
    }
}
function handleBotSeduction(room, botId) {
    const bot = room.players[botId];
    if (!bot || !bot.isAlive || !room.pendingAction)
        return;
    const slashIdx = bot.hand.findIndex((c) => c.name === 'SLASH');
    if (slashIdx !== -1) {
        const card = bot.hand.splice(slashIdx, 1)[0];
        room.discardPile.push(card);
        room.pendingAction = null;
        room._broadcastFn && room._broadcastFn();
        (0, combatLogic_1.resumeAfterAttack)(room);
    }
    else {
        const atkId = room.pendingAction?.sourcePlayerId || null;
        room.pendingAction = null;
        (0, combatLogic_1.dealDamage)(room, botId, 1, null, atkId);
        if (!room.pendingAction)
            (0, combatLogic_1.resumeAfterAttack)(room);
    }
}
function handleBotZhouYu(room, botId, requiredColor) {
    const bot = room.players[botId];
    if (!bot || !bot.isAlive || !room.pendingAction)
        return;
    const matchingIdx = bot.hand.findIndex((c) => {
        const color = (c.suit === 'HEART' || c.suit === 'DIAMOND') ? 'RED' : 'BLACK';
        return color === requiredColor;
    });
    if (matchingIdx !== -1) {
        const card = bot.hand.splice(matchingIdx, 1)[0];
        room.discardPile.push(card);
        room.pendingAction = null;
        room._broadcastFn && room._broadcastFn();
        (0, combatLogic_1.resumeAfterAttack)(room);
    }
    else {
        const atkId = room.pendingAction?.sourcePlayerId || null;
        room.pendingAction = null;
        (0, combatLogic_1.dealDamage)(room, botId, 1, null, atkId);
        if (!room.pendingAction)
            (0, combatLogic_1.resumeAfterAttack)(room);
    }
}
function handleBotBumperPick(room) {
    if (!room.pendingAction || room.pendingAction.type !== 'WAITING_FOR_BUMPER_PICK')
        return;
    const pickerId = room.pendingAction.currentPickerId;
    const picker = room.players[pickerId];
    if (!picker?.isBot || !room.bumperHarvestCards?.length)
        return;
    const rIdx = Math.floor(Math.random() * room.bumperHarvestCards.length);
    const picked = room.bumperHarvestCards.splice(rIdx, 1)[0];
    picker.hand.push(picked);
    room.chat = room.chat || [];
    room.chat.push({ sender: 'System', text: `${picker.name} เลือก ${picked.name}(${picked.suit}) จากเสบียงอุดมสมบูรณ์`, time: new Date().toLocaleTimeString('th-TH') });
    if (room.bumperHarvestCards.length > 0) {
        const myIdx = room.turnOrder.indexOf(pickerId);
        let nextPickerId = null;
        for (let i = 1; i < room.turnOrder.length; i++) {
            const tid = room.turnOrder[(myIdx + i) % room.turnOrder.length];
            if (room.players[tid]?.isAlive) {
                nextPickerId = tid;
                break;
            }
        }
        if (nextPickerId) {
            room.pendingAction.currentPickerId = nextPickerId;
            room.pendingAction.timeoutAt = Date.now() + 15000;
            room._broadcastFn && room._broadcastFn();
            if (room.players[nextPickerId]?.isBot)
                setTimeout(() => handleBotBumperPick(room), 1200);
        }
        else {
            room.discardPile.push(...room.bumperHarvestCards);
            room.bumperHarvestCards = [];
            room.pendingAction = null;
            (0, combatLogic_1.resumeAfterAttack)(room);
            room._broadcastFn && room._broadcastFn();
        }
    }
    else {
        room.bumperHarvestCards = [];
        room.pendingAction = null;
        (0, combatLogic_1.resumeAfterAttack)(room);
        room._broadcastFn && room._broadcastFn();
    }
}
function handleBotBorrowSlash(room) {
    const pending = room.pendingAction;
    if (!pending || pending.type !== 'WAITING_FOR_BORROW_SLASH')
        return;
    const botId = pending.targetPlayerId;
    const bot = room.players[botId];
    if (!bot?.isAlive)
        return;
    const slashIdx = bot.hand.findIndex((c) => c.name === 'SLASH');
    if (slashIdx !== -1) {
        const slashCard = bot.hand.splice(slashIdx, 1)[0];
        room.discardPile.push(slashCard);
        const damage = bot.wineActive ? 2 : 1;
        bot.wineActive = false;
        room.pendingAction = {
            type: 'WAITING_FOR_DODGE', sourcePlayerId: botId, targetPlayerId: pending.victimId,
            damage, cardUsedId: slashCard.id, originalAttackerId: pending.sourcePlayerId,
            timeoutAt: Date.now() + 15000, dodgeNeeded: (0, phaseLogic_1.hasCharacter)(bot, 'LV_BU') ? 2 : 1,
            damageType: bot.equipment?.weapon?.name === 'FEATHERED_FAN' ? 'FIRE' : 'NORMAL'
        };
        room._broadcastFn && room._broadcastFn();
        if (room.players[pending.victimId]?.isBot)
            setTimeout(() => handleBotDodge(room, pending.victimId, damage), 1200);
    }
    else {
        if (bot.equipment?.weapon) {
            const weapon = bot.equipment.weapon;
            bot.equipment.weapon = null;
            const playerA = room.players[pending.sourcePlayerId];
            if (playerA)
                playerA.hand.push(weapon);
        }
        room.pendingAction = null;
        (0, combatLogic_1.resumeAfterAttack)(room);
        room._broadcastFn && room._broadcastFn();
    }
}
//# sourceMappingURL=botAI.js.map