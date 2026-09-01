'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNegateWindow = startNegateWindow;
exports.resolveActionChain = resolveActionChain;
exports.executeOriginalAction = executeOriginalAction;
exports.handleUseCard = handleUseCard;
exports.handleResolvePending = handleResolvePending;
/**
 * game/cardLogic.ts
 * All use_card / socket event handlers for card plays
 * Provides: handleUseCard, startNegateWindow, resolveActionChain, executeOriginalAction
 * Plus all weapon-skill / character-skill resolve handlers
 */
const phaseLogic_1 = require("./phaseLogic");
const combatLogic_1 = require("./combatLogic");
const botAI_1 = require("./botAI");
// ─── Negate Window ────────────────────────────────────────────────────────────
function startNegateWindow(room, actionData) {
    room.actionChain = [actionData];
    room.negatePassedPlayers = [];
    room.pendingAction = {
        type: 'WAITING_FOR_NEGATE',
        sourcePlayerId: actionData.sourceId,
        targetPlayerId: actionData.targetId,
        cardUsedId: actionData.cardUsed?.id || null,
        timeoutAt: Date.now() + 5000
    };
    room._broadcastFn && room._broadcastFn();
    // Bots auto-pass
    Object.values(room.players).forEach((p) => {
        if (p.isBot && p.isAlive) {
            setTimeout(() => {
                if (room.pendingAction?.type === 'WAITING_FOR_NEGATE') {
                    if (!room.negatePassedPlayers.includes(p.id))
                        room.negatePassedPlayers.push(p.id);
                    const aliveCount = Object.values(room.players).filter((pl) => pl.isAlive).length;
                    if (room.negatePassedPlayers.length >= aliveCount)
                        resolveActionChain(room);
                }
            }, 1500 + Math.random() * 1000);
        }
    });
    const chainLen = room.actionChain.length;
    setTimeout(() => {
        if (room.pendingAction?.type === 'WAITING_FOR_NEGATE' && room.actionChain.length === chainLen) {
            resolveActionChain(room);
        }
    }, 5000);
}
function resolveActionChain(room) {
    if (!room.actionChain || room.actionChain.length === 0)
        return;
    const isNegated = room.actionChain.length % 2 === 0;
    const originalAction = room.actionChain[0];
    room.pendingAction = null;
    if (isNegated) {
        room.chat = room.chat || [];
        room.chat.push({ sender: 'System', text: `ผลของการ์ด ${originalAction.cardUsed?.name} ถูกยกเลิกโดยไร้ข้อกังขา!`, time: new Date().toLocaleTimeString('th-TH') });
        (0, combatLogic_1.resumeAfterAttack)(room);
        room._broadcastFn && room._broadcastFn();
    }
    else {
        executeOriginalAction(room, originalAction);
    }
    room.actionChain = [];
}
function executeOriginalAction(room, action) {
    const { type, sourceId, targetId, targetZone, cardUsed, targets, victimId } = action;
    const player = room.players[sourceId];
    const targetPlayer = targetId ? room.players[targetId] : null;
    if (type === 'STEAL') {
        if (!targetPlayer?.isAlive) {
            (0, combatLogic_1.resumeAfterAttack)(room);
            room._broadcastFn && room._broadcastFn();
            return;
        }
        let stolenCard = null;
        if (targetZone === 'HAND' && targetPlayer.hand?.length > 0)
            stolenCard = targetPlayer.hand.splice(Math.floor(Math.random() * targetPlayer.hand.length), 1)[0];
        else if (targetZone === 'WEAPON' && targetPlayer.equipment?.weapon) {
            stolenCard = targetPlayer.equipment.weapon;
            targetPlayer.equipment.weapon = null;
        }
        else if (targetZone === 'DEF_HORSE' && targetPlayer.equipment?.defensiveHorse) {
            stolenCard = targetPlayer.equipment.defensiveHorse;
            targetPlayer.equipment.defensiveHorse = null;
        }
        else if (targetZone === 'OFF_HORSE' && targetPlayer.equipment?.offensiveHorse) {
            stolenCard = targetPlayer.equipment.offensiveHorse;
            targetPlayer.equipment.offensiveHorse = null;
        }
        else if (targetZone === 'ARMOR' && targetPlayer.equipment?.armor) {
            stolenCard = targetPlayer.equipment.armor;
            targetPlayer.equipment.armor = null;
        }
        if (!stolenCard && targetPlayer.hand?.length > 0)
            stolenCard = targetPlayer.hand.splice(Math.floor(Math.random() * targetPlayer.hand.length), 1)[0];
        if (stolenCard) {
            player.hand.push(stolenCard);
            if (stolenCard.name === 'SILVER_LION_HELMET')
                targetPlayer.hp = Math.min(targetPlayer.maxHp, targetPlayer.hp + 1);
        }
        (0, combatLogic_1.resumeAfterAttack)(room);
        room._broadcastFn && room._broadcastFn();
    }
    else if (type === 'SABOTAGE') {
        if (!targetPlayer?.isAlive) {
            (0, combatLogic_1.resumeAfterAttack)(room);
            room._broadcastFn && room._broadcastFn();
            return;
        }
        let discardedCard = null;
        if (targetZone === 'HAND' && targetPlayer.hand?.length > 0)
            discardedCard = targetPlayer.hand.splice(Math.floor(Math.random() * targetPlayer.hand.length), 1)[0];
        else if (targetZone === 'WEAPON' && targetPlayer.equipment?.weapon) {
            discardedCard = targetPlayer.equipment.weapon;
            targetPlayer.equipment.weapon = null;
        }
        else if (targetZone === 'DEF_HORSE' && targetPlayer.equipment?.defensiveHorse) {
            discardedCard = targetPlayer.equipment.defensiveHorse;
            targetPlayer.equipment.defensiveHorse = null;
        }
        else if (targetZone === 'OFF_HORSE' && targetPlayer.equipment?.offensiveHorse) {
            discardedCard = targetPlayer.equipment.offensiveHorse;
            targetPlayer.equipment.offensiveHorse = null;
        }
        else if (targetZone === 'ARMOR' && targetPlayer.equipment?.armor) {
            discardedCard = targetPlayer.equipment.armor;
            targetPlayer.equipment.armor = null;
        }
        if (!discardedCard && targetPlayer.hand?.length > 0)
            discardedCard = targetPlayer.hand.splice(Math.floor(Math.random() * targetPlayer.hand.length), 1)[0];
        if (discardedCard) {
            room.discardPile.push(discardedCard);
            if (discardedCard.name === 'SILVER_LION_HELMET')
                targetPlayer.hp = Math.min(targetPlayer.maxHp, targetPlayer.hp + 1);
        }
        (0, combatLogic_1.resumeAfterAttack)(room);
        room._broadcastFn && room._broadcastFn();
    }
    else if (type === 'EX_NIHILO') {
        (0, phaseLogic_1.drawCards)(room, 2).forEach((c) => player.hand.push(c));
        (0, combatLogic_1.resumeAfterAttack)(room);
        room._broadcastFn && room._broadcastFn();
    }
    else if (type === 'DUEL') {
        if (!targetPlayer?.isAlive || ((0, phaseLogic_1.hasCharacter)(targetPlayer, 'ZHUGE_LIANG') && targetPlayer.hand.length === 0)) {
            (0, combatLogic_1.resumeAfterAttack)(room);
            room._broadcastFn && room._broadcastFn();
            return;
        }
        const isSourceLuBu = (0, phaseLogic_1.hasCharacter)(player, 'LV_BU') || (0, phaseLogic_1.hasCharacter)(player, 'LU_BU');
        const slashNeeded = isSourceLuBu ? 2 : 1;
        room.pendingAction = {
            type: 'WAITING_FOR_SLASH_DUEL', sourcePlayerId: sourceId, targetPlayerId: targetId,
            currentPlayerToSlash: targetId, cardUsedId: cardUsed?.id, damage: 1, slashNeeded, timeoutAt: Date.now() + 15000
        };
        room._broadcastFn && room._broadcastFn();
        if (targetPlayer.isBot)
            setTimeout(() => { if (room.pendingAction)
                (0, botAI_1.handleBotDuelSlash)(room); }, 1200);
        else
            setTimeout(() => {
                if (room.pendingAction?.type === 'WAITING_FOR_SLASH_DUEL' && room.pendingAction.currentPlayerToSlash === targetId) {
                    room.pendingAction = null;
                    (0, combatLogic_1.dealDamage)(room, targetId, 1, (0, combatLogic_1.getCardById)(room, cardUsed?.id), sourceId);
                    if (!room.pendingAction)
                        (0, combatLogic_1.resumeAfterAttack)(room);
                    room._broadcastFn && room._broadcastFn();
                }
            }, 15000);
    }
    else if (type === 'FIRE_ATTACK') {
        if (!targetPlayer?.isAlive || targetPlayer.hand.length === 0) {
            (0, combatLogic_1.resumeAfterAttack)(room);
            room._broadcastFn && room._broadcastFn();
            return;
        }
        room.pendingAction = { type: 'WAITING_FOR_FIRE_REVEAL', sourcePlayerId: sourceId, targetPlayerId: targetId, cardUsedId: cardUsed?.id, timeoutAt: Date.now() + 15000 };
        room._broadcastFn && room._broadcastFn();
        if (targetPlayer.isBot) {
            setTimeout(() => {
                if (room.pendingAction?.type === 'WAITING_FOR_FIRE_REVEAL') {
                    const rCard = targetPlayer.hand[Math.floor(Math.random() * targetPlayer.hand.length)];
                    room.pendingAction = { type: 'WAITING_FOR_FIRE_MATCH', sourcePlayerId: sourceId, targetPlayerId: targetId, requiredSuit: rCard.suit, revealedCard: rCard, timeoutAt: Date.now() + 15000 };
                    room._broadcastFn && room._broadcastFn();
                    if (player.isBot) {
                        setTimeout(() => {
                            if (room.pendingAction?.type === 'WAITING_FOR_FIRE_MATCH') {
                                const matchIdx = player.hand.findIndex((c) => c.suit === rCard.suit);
                                if (matchIdx !== -1) {
                                    room.discardPile.push(player.hand.splice(matchIdx, 1)[0]);
                                    (0, combatLogic_1.dealDamage)(room, targetId, 1, cardUsed, sourceId, 'FIRE');
                                }
                                else
                                    room.pendingAction = null;
                                if (!room.pendingAction)
                                    (0, combatLogic_1.resumeAfterAttack)(room);
                                room._broadcastFn && room._broadcastFn();
                            }
                        }, 1000);
                    }
                }
            }, 1200);
        }
    }
    else if (type === 'DELAYED') {
        if (targetPlayer?.isAlive) {
            targetPlayer.delayedKitZone = targetPlayer.delayedKitZone || [];
            targetPlayer.delayedKitZone.push(cardUsed);
        }
        (0, combatLogic_1.resumeAfterAttack)(room);
        room._broadcastFn && room._broadcastFn();
    }
    else if (type === 'PEACH_GARDEN') {
        Object.values(room.players).forEach((p) => { if (p.isAlive && p.hp < p.maxHp)
            p.hp += 1; });
        (0, combatLogic_1.resumeAfterAttack)(room);
        room._broadcastFn && room._broadcastFn();
    }
    else if (type === 'AOE') {
        room.pendingAction = {
            type: 'WAITING_FOR_AOE', aoeType: cardUsed.name, sourcePlayerId: sourceId,
            targets, currentTargetIndex: 0, cardUsedId: cardUsed.id, timeoutAt: Date.now() + 15000
        };
        room._broadcastFn && room._broadcastFn();
        if (room.players[targets[0]]?.isBot)
            setTimeout(() => (0, botAI_1.handleBotAOE)(room), 1200);
        else
            setTimeout(() => {
                if (room.pendingAction?.type === 'WAITING_FOR_AOE' && room.pendingAction.currentTargetIndex === 0) {
                    (0, combatLogic_1.dealDamage)(room, targets[0], 1, (0, combatLogic_1.getCardById)(room, cardUsed.id), sourceId);
                    if (room.pendingAction?.type === 'WAITING_FOR_AOE')
                        (0, botAI_1.handleBotAOE)(room);
                    else
                        room._broadcastFn && room._broadcastFn();
                }
            }, 15000);
    }
    else if (type === 'BUMPER_HARVEST') {
        const alivePlayers = Object.values(room.players).filter((p) => p.isAlive).map((p) => p.id);
        room.bumperHarvestCards = (0, phaseLogic_1.drawCards)(room, alivePlayers.length);
        room.pendingAction = {
            type: 'WAITING_FOR_BUMPER_PICK', sourcePlayerId: sourceId, currentPickerId: sourceId,
            cardUsedId: cardUsed.id, timeoutAt: Date.now() + 15000
        };
        room._broadcastFn && room._broadcastFn();
        if (player.isBot)
            setTimeout(() => (0, botAI_1.handleBotBumperPick)(room), 1200);
    }
    else if (type === 'BORROWED_SWORD') {
        room.pendingAction = {
            type: 'WAITING_FOR_BORROW_SLASH', sourcePlayerId: sourceId, targetPlayerId: targetId,
            victimId, cardUsedId: cardUsed.id, timeoutAt: Date.now() + 15000
        };
        room._broadcastFn && room._broadcastFn();
        if (room.players[targetId]?.isBot)
            setTimeout(() => (0, botAI_1.handleBotBorrowSlash)(room), 1200);
    }
    else if (type === 'IRON_CHAIN') {
        if (targetPlayer?.isAlive) {
            targetPlayer.isChained = !targetPlayer.isChained;
            room.chat = room.chat || [];
            room.chat.push({ sender: 'System', text: `${targetPlayer.isChained ? '🔗' : '🔓'} ${targetPlayer.name} ${targetPlayer.isChained ? 'ถูกล่ามโซ่เหล็ก!' : 'หลุดจากโซ่เหล็ก!'}`, time: new Date().toLocaleTimeString('th-TH') });
        }
        if (victimId && room.players[victimId]?.isAlive) {
            const vp = room.players[victimId];
            vp.isChained = !vp.isChained;
            room.chat.push({ sender: 'System', text: `${vp.isChained ? '🔗' : '🔓'} ${vp.name} ${vp.isChained ? 'ถูกล่ามโซ่เหล็ก!' : 'หลุดจากโซ่เหล็ก!'}`, time: new Date().toLocaleTimeString('th-TH') });
        }
        (0, combatLogic_1.resumeAfterAttack)(room);
        room._broadcastFn && room._broadcastFn();
    }
}
// ─── Main use_card handler ────────────────────────────────────────────────────
function handleUseCard(room, socket, data) {
    const { cardId, targetPlayerId, targetZone, secondaryTargetId, playAs } = data;
    const playerId = _getPlayerIdBySocket(room, socket?.id) || data.playerId;
    const player = room.players[playerId];
    if (!player)
        return _err(socket, 'ไม่พบผู้เล่น');
    const currentTurnPlayerId = room.turnOrder[room.currentTurnIndex];
    if (playerId !== currentTurnPlayerId || room.currentPhase !== 'PLAY')
        return _err(socket, 'ไม่ใช่เทิร์นของคุณ หรือไม่ใช่ช่วงร่ายการ์ด');
    if (room.pendingAction)
        return _err(socket, 'กรุณารอการประมวลผลก่อนหน้า');
    let cardIndex = player.hand.findIndex((c) => c.id === cardId);
    let cardUsed = cardIndex !== -1 ? player.hand[cardIndex] : null;
    let isEquipUsed = false;
    let equipSlotUsed = null;
    if (!cardUsed && player.equipment) {
        const slots = ['weapon', 'armor', 'offensiveHorse', 'defensiveHorse', 'treasure'];
        for (const slot of slots) {
            if (player.equipment[slot]?.id === cardId) {
                cardUsed = player.equipment[slot];
                isEquipUsed = true;
                equipSlotUsed = slot;
                break;
            }
        }
    }
    if (!cardUsed)
        return _err(socket, 'ไม่พบการ์ดใบนี้อยู่บนมือหรืออุปกรณ์ของคุณ');
    if (player.slashedThisTurn && cardUsed.type === 'EQUIPMENT' && !isEquipUsed)
        return _err(socket, 'คุณใช้ SLASH ไปแล้วในเทิร์นนี้ ไม่สามารถใช้การ์ดอุปกรณ์เพิ่มได้');
    let effectiveCardName = cardUsed.name;
    if (playAs === 'SLASH' || isEquipUsed) {
        const isGuanYuSlash = (0, phaseLogic_1.hasCharacter)(player, 'GUAN_YU') && (cardUsed.suit === 'HEART' || cardUsed.suit === 'DIAMOND');
        const isZhaoYunSlash = (0, phaseLogic_1.hasCharacter)(player, 'ZHAO_YUN') && cardUsed.name === 'DODGE' && !isEquipUsed;
        if (isGuanYuSlash || isZhaoYunSlash)
            effectiveCardName = 'SLASH';
        else if (isEquipUsed)
            return _err(socket, 'การ์ดอุปกรณ์ไม่สามารถแปลงเป็น SLASH ได้ (ต้องเป็นการ์ดสีแดงของกวนอู)');
        else
            return _err(socket, 'การ์ดไม่สามารถแปลงเป็น SLASH ได้');
    }
    // ── SLASH / THUNDER_ATTACK ──
    if (effectiveCardName === 'SLASH' || cardUsed.name === 'THUNDER_ATTACK') {
        if (!targetPlayerId)
            return _err(socket, 'กรุณาระบุเป้าหมายในการโจมตี');
        const target = room.players[targetPlayerId];
        if (!target?.isAlive)
            return _err(socket, 'เป้าหมายไม่พร้อมรับการโจมตี');
        const hasZhuge = player.equipment?.weapon?.name === 'ZHUGE_CROSSBOW';
        const isZhangFei = (0, phaseLogic_1.hasCharacter)(player, 'ZHANG_FEI');
        if (room.attacksPlayedInTurn >= 1 && !hasZhuge && !isZhangFei)
            return _err(socket, 'คุณใช้สิทธิ์ SLASH ครบแล้วในเทิร์นนี้');
        const weaponRange = player.equipment?.weapon?.range || 1;
        const dist = (0, phaseLogic_1.calculateDistance)(room, playerId, targetPlayerId);
        if (dist > weaponRange)
            return _err(socket, `ระยะไม่ถึง! เป้าหมายอยู่ห่าง ${dist} แต่ระยะโจมตีคือ ${weaponRange}`);
        if ((0, phaseLogic_1.hasCharacter)(target, 'ZHUGE_LIANG') && target.hand.length === 0)
            return _err(socket, 'ขงเบ้งเปิดใช้สกิล เมืองว่างเปล่า ไม่สามารถตกเป็นเป้าหมายของการโจมตีได้!');
        const damage = player.wineActive ? 2 : 1;
        player.wineActive = false;
        if (isEquipUsed && equipSlotUsed) {
            player.equipment[equipSlotUsed] = null;
            room.discardPile.push(cardUsed);
            if (cardUsed.name === 'SILVER_LION_HELMET')
                player.hp = Math.min(player.maxHp, player.hp + 1);
        }
        else {
            player.hand.splice(cardIndex, 1);
        }
        room.attacksPlayedInTurn += 1;
        player.slashedThisTurn = true;
        let slashDamageType = 'NORMAL';
        if (cardUsed.name === 'THUNDER_ATTACK')
            slashDamageType = 'THUNDER';
        else if (player.equipment?.weapon?.name === 'FEATHERED_FAN')
            slashDamageType = 'FIRE';
        const dodgeNeeded = (0, phaseLogic_1.hasCharacter)(player, 'LV_BU') ? 2 : 1;
        room.pendingAction = {
            type: 'WAITING_FOR_DODGE', sourcePlayerId: playerId, targetPlayerId,
            cardUsedId: cardId, damage, dodgeNeeded, damageType: slashDamageType, timeoutAt: Date.now() + 15000
        };
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name, targetId: targetPlayerId });
        room._broadcastFn && room._broadcastFn();
        if (target.isBot)
            setTimeout(() => (0, botAI_1.handleBotDodge)(room, targetPlayerId, damage), 1200);
        else
            setTimeout(() => {
                if (room.pendingAction?.cardUsedId === cardId) {
                    const pending = room.pendingAction;
                    const cu = (0, combatLogic_1.getCardById)(room, pending.cardUsedId);
                    room.pendingAction = null;
                    (0, combatLogic_1.dealDamage)(room, targetPlayerId, damage, cu, playerId, slashDamageType);
                    if (!room.pendingAction)
                        (0, combatLogic_1.resumeAfterAttack)(room);
                    room._broadcastFn && room._broadcastFn();
                }
            }, 15000);
    }
    // ── PEACH ──
    else if (cardUsed.name === 'PEACH') {
        const tid = targetPlayerId || playerId;
        const tp = room.players[tid];
        if (!tp?.isAlive || tp.hp >= tp.maxHp)
            return _err(socket, 'ไม่สามารถใช้ PEACH ได้');
        player.hand.splice(cardIndex, 1);
        room.discardPile.push(cardUsed);
        tp.hp += 1;
        room._emitAll && room._emitAll('card_played', { playerId, cardName: 'PEACH', targetId: tid });
        room._broadcastFn && room._broadcastFn();
    }
    // ── WINE ──
    else if (cardUsed.name === 'WINE') {
        player.hand.splice(cardIndex, 1);
        room.discardPile.push(cardUsed);
        player.wineActive = true;
        room._emitAll && room._emitAll('card_played', { playerId, cardName: 'WINE' });
        room._broadcastFn && room._broadcastFn();
    }
    // ── STEAL ──
    else if (cardUsed.name === 'STEAL') {
        if (!targetPlayerId)
            return _err(socket, 'กรุณาระบุเป้าหมายที่จะขโมย');
        const tp = room.players[targetPlayerId];
        if (!tp?.isAlive)
            return _err(socket, 'เป้าหมายไม่มีผล');
        if ((0, phaseLogic_1.calculateDistance)(room, playerId, targetPlayerId) > 1)
            return _err(socket, 'เป้าหมายอยู่ไกลเกินระยะค่ายกล STEAL');
        const tz = targetZone || 'HAND';
        const sc = player.hand.splice(cardIndex, 1)[0];
        room.discardPile.push(sc);
        room._emitAll && room._emitAll('card_played', { playerId, cardName: 'STEAL', targetId: targetPlayerId });
        startNegateWindow(room, { type: 'STEAL', sourceId: playerId, targetId: targetPlayerId, targetZone: tz, cardUsed: sc });
    }
    // ── SABOTAGE ──
    else if (cardUsed.name === 'SABOTAGE') {
        if (!targetPlayerId)
            return _err(socket, 'กรุณาระบุเป้าหมายที่จะทำลาย');
        const tp = room.players[targetPlayerId];
        if (!tp?.isAlive)
            return _err(socket, 'เป้าหมายไม่มีผล');
        const tz = targetZone || 'HAND';
        const sc = player.hand.splice(cardIndex, 1)[0];
        room.discardPile.push(sc);
        room._emitAll && room._emitAll('card_played', { playerId, cardName: 'SABOTAGE', targetId: targetPlayerId });
        startNegateWindow(room, { type: 'SABOTAGE', sourceId: playerId, targetId: targetPlayerId, targetZone: tz, cardUsed: sc });
    }
    // ── WEAPONS ──
    else if (['ZHUGE_CROSSBOW', 'BLUE_STEEL_SWORD', 'SIX_SWORDS_WU', 'KIRIN_BOW', 'FEATHERED_FAN', 'SERPENT_SPEAR', 'FROST_SWORD', 'TWO_BLADED_TRIDENT', 'ROCK_CLEAVING_AXE', 'GREEN_DRAGON_BLADE', 'SKY_PIERCING_HALBERD', 'YIN_YANG_SWORDS'].includes(cardUsed.name)) {
        const WEAPON_RANGE = { 'ZHUGE_CROSSBOW': 1, 'BLUE_STEEL_SWORD': 2, 'SIX_SWORDS_WU': 2, 'KIRIN_BOW': 5, 'FEATHERED_FAN': 4, 'SERPENT_SPEAR': 3, 'FROST_SWORD': 2, 'TWO_BLADED_TRIDENT': 3, 'ROCK_CLEAVING_AXE': 3, 'GREEN_DRAGON_BLADE': 3, 'SKY_PIERCING_HALBERD': 4, 'YIN_YANG_SWORDS': 2 };
        const equipCard = player.hand.splice(cardIndex, 1)[0];
        equipCard.range = WEAPON_RANGE[cardUsed.name] || 1;
        if (player.equipment.weapon)
            room.discardPile.push(player.equipment.weapon);
        player.equipment.weapon = equipCard;
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name });
        room._broadcastFn && room._broadcastFn();
    }
    // ── ARMOR ──
    else if (['NIO_SHIELD', 'EIGHT_TRIGRAMS_FORMATION', 'SILVER_LION_HELMET', 'RATTAN_ARMOR'].includes(cardUsed.name)) {
        const equipCard = player.hand.splice(cardIndex, 1)[0];
        if (player.equipment.armor) {
            room.discardPile.push(player.equipment.armor);
            if (player.equipment.armor.name === 'SILVER_LION_HELMET')
                player.hp = Math.min(player.maxHp, player.hp + 1);
        }
        player.equipment.armor = equipCard;
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name });
        room._broadcastFn && room._broadcastFn();
    }
    // ── WOODEN_CART ──
    else if (cardUsed.name === 'WOODEN_CART') {
        const equipCard = player.hand.splice(cardIndex, 1)[0];
        if (player.equipment.treasure)
            room.discardPile.push(player.equipment.treasure);
        player.equipment.treasure = equipCard;
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name });
        room._broadcastFn && room._broadcastFn();
    }
    // ── DEFENSIVE HORSE ──
    else if (['LIGHTNING_HOOF', 'SHADOWRUNNER'].includes(cardUsed.name)) {
        const equipCard = player.hand.splice(cardIndex, 1)[0];
        if (player.equipment.defensiveHorse)
            room.discardPile.push(player.equipment.defensiveHorse);
        player.equipment.defensiveHorse = equipCard;
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name });
        room._broadcastFn && room._broadcastFn();
    }
    // ── OFFENSIVE HORSE ──
    else if (['RED_HARE', 'FERGANA_STEED'].includes(cardUsed.name)) {
        const equipCard = player.hand.splice(cardIndex, 1)[0];
        if (player.equipment.offensiveHorse)
            room.discardPile.push(player.equipment.offensiveHorse);
        player.equipment.offensiveHorse = equipCard;
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name });
        room._broadcastFn && room._broadcastFn();
    }
    // ── EX_NIHILO ──
    else if (cardUsed.name === 'EX_NIHILO') {
        const c = player.hand.splice(cardIndex, 1)[0];
        room.discardPile.push(c);
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name });
        startNegateWindow(room, { type: 'EX_NIHILO', sourceId: playerId, cardUsed: c });
    }
    // ── DUEL ──
    else if (cardUsed.name === 'DUEL') {
        if (!targetPlayerId)
            return _err(socket, 'กรุณาระบุเป้าหมายในการ DUEL');
        const tp = room.players[targetPlayerId];
        if (!tp?.isAlive)
            return _err(socket, 'เป้าหมายไม่มีผล');
        if ((0, phaseLogic_1.hasCharacter)(tp, 'ZHUGE_LIANG') && tp.hand.length === 0)
            return _err(socket, 'ขงเบ้งเปิดใช้สกิล เมืองว่างเปล่า ไม่สามารถเป็นเป้าหมาย DUEL ได้');
        const dc = player.hand.splice(cardIndex, 1)[0];
        room.discardPile.push(dc);
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name, targetId: targetPlayerId });
        startNegateWindow(room, { type: 'DUEL', sourceId: playerId, targetId: targetPlayerId, cardUsed: dc });
    }
    // ── FIRE_ATTACK ──
    else if (cardUsed.name === 'FIRE_ATTACK') {
        if (!targetPlayerId)
            return _err(socket, 'กรุณาระบุเป้าหมายสำหรับการโจมตีด้วยไฟ');
        const tp = room.players[targetPlayerId];
        if (!tp?.isAlive)
            return _err(socket, 'เป้าหมายไม่มีผล');
        if (tp.hand.length === 0)
            return _err(socket, 'เป้าหมายไม่มีการ์ดบนมือ');
        const fc = player.hand.splice(cardIndex, 1)[0];
        room.discardPile.push(fc);
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name, targetId: targetPlayerId });
        startNegateWindow(room, { type: 'FIRE_ATTACK', sourceId: playerId, targetId: targetPlayerId, cardUsed: fc });
    }
    // ── IRON_CHAIN ──
    else if (cardUsed.name === 'IRON_CHAIN') {
        if (!targetPlayerId) {
            const ic = player.hand.splice(cardIndex, 1)[0];
            room.discardPile.push(ic);
            (0, phaseLogic_1.drawCards)(room, 1).forEach((c) => player.hand.push(c));
            room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name });
            room._broadcastFn && room._broadcastFn();
            return;
        }
        const tp = room.players[targetPlayerId];
        if (!tp?.isAlive)
            return _err(socket, 'เป้าหมายไม่มีผล');
        const ic = player.hand.splice(cardIndex, 1)[0];
        room.discardPile.push(ic);
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name, targetId: targetPlayerId });
        startNegateWindow(room, { type: 'IRON_CHAIN', sourceId: playerId, targetId: targetPlayerId, victimId: secondaryTargetId, cardUsed: ic });
    }
    // ── DELAYED CARDS ──
    else if (cardUsed.type === 'DELAYED') {
        let tid = targetPlayerId;
        if (cardUsed.name === 'LIGHTNING')
            tid = playerId;
        else if ((cardUsed.name === 'ACEDIA' || cardUsed.name === 'STARVATION') && tid === playerId)
            return _err(socket, `ไม่สามารถใช้ ${cardUsed.name} ใส่ตัวเองได้`);
        if (!tid)
            return _err(socket, 'กรุณาเลือกเป้าหมาย');
        const tp = room.players[tid];
        if (!tp?.isAlive)
            return _err(socket, 'เป้าหมายไม่ถูกต้อง');
        if (tp.delayedKitZone?.some((c) => c.name === cardUsed.name))
            return _err(socket, `เป้าหมายมี ${cardUsed.name} อยู่แล้ว`);
        const dc = player.hand.splice(cardIndex, 1)[0];
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name, targetId: tid });
        startNegateWindow(room, { type: 'DELAYED', sourceId: playerId, targetId: tid, cardUsed: dc });
    }
    // ── PEACH_GARDEN ──
    else if (cardUsed.name === 'PEACH_GARDEN') {
        const pc = player.hand.splice(cardIndex, 1)[0];
        room.discardPile.push(pc);
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name });
        startNegateWindow(room, { type: 'PEACH_GARDEN', sourceId: playerId, cardUsed: pc });
    }
    // ── BUMPER_HARVEST ──
    else if (cardUsed.name === 'BUMPER_HARVEST') {
        const bc = player.hand.splice(cardIndex, 1)[0];
        room.discardPile.push(bc);
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name });
        startNegateWindow(room, { type: 'BUMPER_HARVEST', sourceId: playerId, cardUsed: bc });
    }
    // ── BORROWED_SWORD ──
    else if (cardUsed.name === 'BORROWED_SWORD') {
        if (!targetPlayerId || !secondaryTargetId)
            return _err(socket, 'กรุณาระบุเป้าหมายทั้งสองคนสำหรับการยืมดาบ');
        if (targetPlayerId === secondaryTargetId)
            return _err(socket, 'ผู้ถูกยืมดาบและเป้าหมายที่สองต้องไม่เป็นคนเดียวกัน');
        const tB = room.players[targetPlayerId];
        const tC = room.players[secondaryTargetId];
        if (!tB?.isAlive || !tC?.isAlive)
            return _err(socket, 'เป้าหมายไม่มีผล');
        if (!tB.equipment?.weapon)
            return _err(socket, 'ผู้ถูกยืมดาบไม่มีอาวุธ');
        const WEAPON_RANGE = { 'ZHUGE_CROSSBOW': 1, 'BLUE_STEEL_SWORD': 2, 'SIX_SWORDS_WU': 2, 'KIRIN_BOW': 5, 'FEATHERED_FAN': 4, 'SERPENT_SPEAR': 3, 'FROST_SWORD': 2, 'TWO_BLADED_TRIDENT': 3, 'ROCK_CLEAVING_AXE': 3, 'GREEN_DRAGON_BLADE': 3, 'SKY_PIERCING_HALBERD': 4, 'YIN_YANG_SWORDS': 2 };
        const weaponCard = tB.equipment.weapon;
        const weaponRange = weaponCard.range || WEAPON_RANGE[weaponCard.name] || 1;
        const dist = (0, phaseLogic_1.calculateDistance)(room, targetPlayerId, secondaryTargetId);
        if (dist > weaponRange)
            return _err(socket, `เป้าหมายที่สองอยู่นอกระยะอาวุธของผู้ถูกยืมดาบ (${dist} > ${weaponRange})`);
        const bc = player.hand.splice(cardIndex, 1)[0];
        room.discardPile.push(bc);
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name, targetId: targetPlayerId });
        startNegateWindow(room, { type: 'BORROWED_SWORD', sourceId: playerId, targetId: targetPlayerId, victimId: secondaryTargetId, cardUsed: bc });
    }
    // ── AOE ──
    else if (['BARBARIAN_INVASION', 'ARROW_BARRAGE'].includes(cardUsed.name)) {
        const ac = player.hand.splice(cardIndex, 1)[0];
        room.discardPile.push(ac);
        const myIdx = room.turnOrder.indexOf(playerId);
        const targets = [];
        for (let i = 1; i < room.turnOrder.length; i++) {
            const pid = room.turnOrder[(myIdx + i) % room.turnOrder.length];
            if (room.players[pid]?.isAlive)
                targets.push(pid);
        }
        if (targets.length === 0) {
            room._broadcastFn && room._broadcastFn();
            return;
        }
        room._emitAll && room._emitAll('card_played', { playerId, cardName: cardUsed.name });
        startNegateWindow(room, { type: 'AOE', sourceId: playerId, targets, cardUsed: ac });
    }
    // ── NEGATE ──
    else if (cardUsed.name === 'NEGATE') {
        if (room.pendingAction?.type === 'WAITING_FOR_NEGATE') {
            player.hand.splice(cardIndex, 1);
            room.discardPile.push(cardUsed);
            room._emitAll && room._emitAll('card_played', { playerId, cardName: 'NEGATE' });
            room.actionChain = room.actionChain || [];
            room.actionChain.push({ type: 'NEGATE', sourceId: playerId, cardUsed });
            room.negatePassedPlayers = [];
            room._broadcastFn && room._broadcastFn();
            const chainLen = room.actionChain.length;
            setTimeout(() => {
                if (room.pendingAction?.type === 'WAITING_FOR_NEGATE' && room.actionChain.length === chainLen)
                    resolveActionChain(room);
            }, 5000);
            return;
        }
        else {
            return _err(socket, 'สามารถใช้ ไร้ข้อกังขา (NEGATE) ได้เฉพาะขณะที่มีการร่ายการ์ดเวทมนตร์หรือค่ายกล');
        }
    }
}
// ─── resolve_pending handler ──────────────────────────────────────────────────
function handleResolvePending(room, socket, data) {
    const playerId = _getPlayerIdBySocket(room, socket?.id) || data.playerId;
    const pending = room.pendingAction;
    if (!pending)
        return;
    let expectedTargetId = pending.targetPlayerId;
    if (pending.type === 'WAITING_FOR_AOE')
        expectedTargetId = pending.targets[pending.currentTargetIndex];
    if (playerId !== expectedTargetId)
        return;
    const targetPlayer = room.players[playerId];
    const response = data.response || data.action;
    const cardId = data.cardId || data.payload?.cardId;
    const damage = pending.damage || 1;
    const allHeroesData = (0, phaseLogic_1.getAllHeroes)();
    if (response === 'EIGHT_TRIGRAMS') {
        if (!targetPlayer.equipment?.armor || targetPlayer.equipment.armor.name !== 'EIGHT_TRIGRAMS_FORMATION')
            return _err(socket, 'คุณไม่ได้สวมใส่เกราะประยุทธ์แปดทิศ');
        if (pending.type === 'WAITING_FOR_SLASH_DUEL' || (pending.type === 'WAITING_FOR_AOE' && pending.aoeType === 'BARBARIAN_INVASION')) {
            return _err(socket, 'เกราะประยุทธ์แปดทิศใช้แทนการหลบหลีก (DODGE) เท่านั้น ไม่สามารถใช้แทน SLASH ในการดวลหรือคนเถื่อนบุกได้');
        }
        if (pending.eightTrigramsUsed)
            return _err(socket, 'คุณใช้เกราะนี้ไปแล้ว');
        const judgeCard = (0, phaseLogic_1.drawCards)(room, 1)[0];
        room.discardPile.push(judgeCard);
        const isRed = judgeCard.suit === 'HEART' || judgeCard.suit === 'DIAMOND';
        room._emitAll && room._emitAll('judgement_result', { title: 'เกราะประยุทธ์แปดทิศ', card: judgeCard, isSuccess: isRed, targetPlayerId: targetPlayer.id, targetPlayerName: targetPlayer.name });
        if (isRed) {
            pending.eightTrigramsUsed = false;
            if (pending.type === 'WAITING_FOR_AOE' && pending.aoeType === 'ARROW_BARRAGE') {
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
                        setTimeout(() => (0, botAI_1.handleBotAOE)(room), 1200);
                }
                return;
            }
            pending.dodgeNeeded = (pending.dodgeNeeded || 1) - 1;
            if (pending.dodgeNeeded <= 0) {
                room.pendingAction = null;
                room._broadcastFn && room._broadcastFn();
                (0, combatLogic_1.resumeAfterAttack)(room);
                return;
            }
        }
        else {
            pending.eightTrigramsUsed = false;
        }
        pending.timeoutAt = Date.now() + 15000;
        room._broadcastFn && room._broadcastFn();
        return;
    }
    if (response === 'DODGE' || response === 'USE_CARD') {
        if (!cardId)
            return _err(socket, 'กรุณาระบุการ์ดป้องกัน');
        const cardIdx = targetPlayer.hand.findIndex((c) => c.id === cardId);
        if (cardIdx === -1)
            return _err(socket, 'การ์ดไม่อยู่บนมือ');
        const card = targetPlayer.hand[cardIdx];
        let isValid = false;
        if (pending.type === 'DIAO_CHAN_SEDUCTION') {
            isValid = card.name === 'SLASH';
            if (!isValid && (0, phaseLogic_1.hasCharacter)(targetPlayer, 'ZHAO_YUN'))
                isValid = card.name === 'DODGE' || data.playAs === 'SLASH';
        }
        else if (pending.type === 'WAITING_FOR_SLASH_DUEL') {
            isValid = card.name === 'SLASH';
            if (!isValid && (0, phaseLogic_1.hasCharacter)(targetPlayer, 'GUAN_YU'))
                isValid = card.suit === 'HEART' || card.suit === 'DIAMOND';
            else if (!isValid && (0, phaseLogic_1.hasCharacter)(targetPlayer, 'ZHAO_YUN'))
                isValid = card.name === 'DODGE' || data.playAs === 'SLASH';
        }
        else if (pending.type === 'WAITING_FOR_AOE') {
            if (pending.aoeType === 'BARBARIAN_INVASION') {
                isValid = card.name === 'SLASH' || card.name === 'NEGATE';
                if (!isValid && (0, phaseLogic_1.hasCharacter)(targetPlayer, 'GUAN_YU'))
                    isValid = card.suit === 'HEART' || card.suit === 'DIAMOND';
                if (!isValid && (0, phaseLogic_1.hasCharacter)(targetPlayer, 'ZHAO_YUN'))
                    isValid = card.name === 'DODGE' || data.playAs === 'SLASH';
            }
            else if (pending.aoeType === 'ARROW_BARRAGE') {
                isValid = card.name === 'DODGE' || card.name === 'NEGATE';
                if (!isValid && ((0, phaseLogic_1.hasCharacter)(targetPlayer, 'ZHEN_JI') || (0, phaseLogic_1.hasCharacter)(targetPlayer, 'LADY_ZHEN')))
                    isValid = card.suit === 'SPADE' || card.suit === 'CLUB';
                if (!isValid && (0, phaseLogic_1.hasCharacter)(targetPlayer, 'ZHAO_YUN'))
                    isValid = card.name === 'SLASH' || data.playAs === 'DODGE';
            }
        }
        else if (pending.type === 'ZHOU_YU_DISCORD') {
            const color = (card.suit === 'HEART' || card.suit === 'DIAMOND') ? 'RED' : 'BLACK';
            isValid = color === pending.requiredColor;
        }
        else {
            isValid = card.name === 'DODGE';
            if (!isValid && ((0, phaseLogic_1.hasCharacter)(targetPlayer, 'ZHEN_JI') || (0, phaseLogic_1.hasCharacter)(targetPlayer, 'LADY_ZHEN')))
                isValid = card.suit === 'SPADE' || card.suit === 'CLUB';
            else if (!isValid && (0, phaseLogic_1.hasCharacter)(targetPlayer, 'ZHAO_YUN'))
                isValid = card.name === 'SLASH' || data.playAs === 'DODGE';
        }
        if (!isValid)
            return _err(socket, 'การ์ดไม่ถูกต้อง');
        targetPlayer.hand.splice(cardIdx, 1);
        room.discardPile.push(card);
        if (pending.type === 'WAITING_FOR_SLASH_DUEL') {
            pending.eightTrigramsUsed = false;
            pending.slashNeeded = (pending.slashNeeded || 1) - 1;
            if (pending.slashNeeded <= 0) {
                const nextSlashPlayerId = pending.currentPlayerToSlash === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId;
                const nextOpponent = room.players[pending.currentPlayerToSlash];
                const isNextOpponentLuBu = (0, phaseLogic_1.hasCharacter)(nextOpponent, 'LV_BU') || (0, phaseLogic_1.hasCharacter)(nextOpponent, 'LU_BU');
                pending.currentPlayerToSlash = nextSlashPlayerId;
                pending.slashNeeded = isNextOpponentLuBu ? 2 : 1;
                pending.timeoutAt = Date.now() + 15000;
                room._broadcastFn && room._broadcastFn();
                if (room.players[pending.currentPlayerToSlash]?.isBot)
                    setTimeout(() => (0, botAI_1.handleBotDuelSlash)(room), 1200);
            }
            else {
                pending.timeoutAt = Date.now() + 15000;
                room._broadcastFn && room._broadcastFn();
                if (room.players[pending.currentPlayerToSlash]?.isBot)
                    setTimeout(() => (0, botAI_1.handleBotDuelSlash)(room), 600);
            }
            return;
        }
        if (pending.type === 'WAITING_FOR_AOE') {
            pending.eightTrigramsUsed = false;
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
                    setTimeout(() => (0, botAI_1.handleBotAOE)(room), 1200);
                else
                    setTimeout(() => {
                        if (room.pendingAction?.type === 'WAITING_FOR_AOE' && room.pendingAction.currentTargetIndex === pending.currentTargetIndex) {
                            const tId = pending.targets[pending.currentTargetIndex];
                            (0, combatLogic_1.dealDamage)(room, tId, 1, (0, combatLogic_1.getCardById)(room, pending.cardUsedId), pending.sourcePlayerId);
                            if (room.pendingAction?.type === 'WAITING_FOR_AOE')
                                (0, botAI_1.handleBotAOE)(room);
                            else
                                room._broadcastFn && room._broadcastFn();
                        }
                    }, 15000);
            }
            return;
        }
        if (pending.type === 'DIAO_CHAN_SEDUCTION' || pending.type === 'ZHOU_YU_DISCORD') {
            room.pendingAction = null;
            room._broadcastFn && room._broadcastFn();
            (0, combatLogic_1.resumeAfterAttack)(room);
        }
        else {
            pending.dodgeNeeded = (pending.dodgeNeeded || 1) - 1;
            if (pending.dodgeNeeded <= 0) {
                // Check after-dodge weapon hooks
                const attacker = pending.sourcePlayerId ? room.players[pending.sourcePlayerId] : null;
                if (attacker?.equipment?.weapon) {
                    const wName = attacker.equipment.weapon.name;
                    if (wName === 'GREEN_DRAGON_BLADE' && attacker.hand.length > 0) {
                        room.pendingAction = { type: 'WAITING_FOR_GREEN_DRAGON', sourcePlayerId: attacker.id, targetPlayerId: pending.targetPlayerId, timeoutAt: Date.now() + 15000 };
                        room._broadcastFn && room._broadcastFn();
                        return;
                    }
                    const equipCount = Object.values(attacker.equipment).filter((v) => v).length;
                    if (wName === 'ROCK_CLEAVING_AXE' && (attacker.hand.length + equipCount) >= 3) {
                        room.pendingAction = { type: 'WAITING_FOR_AXE_DISCARD', sourcePlayerId: attacker.id, targetPlayerId: pending.targetPlayerId, originalDamage: pending.damage, damageType: pending.damageType || 'NORMAL', cardUsedId: pending.cardUsedId, timeoutAt: Date.now() + 15000 };
                        room._broadcastFn && room._broadcastFn();
                        return;
                    }
                    if (wName === 'TWO_BLADED_TRIDENT' && attacker.hand.length >= 1) {
                        room.pendingAction = { type: 'WAITING_FOR_TRIDENT_DISCARD', sourcePlayerId: attacker.id, targetPlayerId: pending.targetPlayerId, originalDamage: pending.damage, damageType: pending.damageType || 'NORMAL', cardUsedId: pending.cardUsedId, timeoutAt: Date.now() + 15000 };
                        room._broadcastFn && room._broadcastFn();
                        return;
                    }
                    if (wName === 'YIN_YANG_SWORDS') {
                        const attackerHero = allHeroesData.find((h) => (h.title || h.name).toUpperCase().replace(/[^A-Z0-9]/g, '_') === attacker.character);
                        const targetHero = allHeroesData.find((h) => (h.title || h.name).toUpperCase().replace(/[^A-Z0-9]/g, '_') === targetPlayer.character);
                        const aGen = attackerHero?.gender || 'MALE';
                        const tGen = targetHero?.gender || 'MALE';
                        if (aGen !== tGen) {
                            if (targetPlayer.hand.length === 0) {
                                (0, phaseLogic_1.drawCards)(room, 1).forEach((c) => attacker.hand.push(c));
                            }
                            else {
                                room.pendingAction = { type: 'WAITING_FOR_YINYANG_CHOICE', sourcePlayerId: attacker.id, targetPlayerId: targetPlayer.id, timeoutAt: Date.now() + 15000 };
                                room._broadcastFn && room._broadcastFn();
                                if (targetPlayer.isBot) {
                                    setTimeout(() => {
                                        if (room.pendingAction?.type === 'WAITING_FOR_YINYANG_CHOICE') {
                                            if (Math.random() > 0.5) {
                                                const rIdx = Math.floor(Math.random() * targetPlayer.hand.length);
                                                room.discardPile.push(targetPlayer.hand.splice(rIdx, 1)[0]);
                                            }
                                            else {
                                                (0, phaseLogic_1.drawCards)(room, 1).forEach((c) => room.players[room.pendingAction.sourcePlayerId].hand.push(c));
                                            }
                                            room.pendingAction = null;
                                            (0, combatLogic_1.resumeAfterAttack)(room);
                                            room._broadcastFn && room._broadcastFn();
                                        }
                                    }, 1200);
                                }
                                return;
                            }
                        }
                    }
                }
                room.pendingAction = null;
                room._broadcastFn && room._broadcastFn();
                (0, combatLogic_1.resumeAfterAttack)(room);
            }
            else {
                room._broadcastFn && room._broadcastFn();
                if (targetPlayer.isBot)
                    setTimeout(() => (0, botAI_1.handleBotDodge)(room, playerId, damage), 600);
            }
        }
    }
    if (response === 'TAKE_DAMAGE' || response === 'PASS') {
        if (pending.type === 'WAITING_FOR_SLASH_DUEL') {
            const damagedId = pending.currentPlayerToSlash;
            const atkId = damagedId === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId;
            const cu = (0, combatLogic_1.getCardById)(room, pending.cardUsedId);
            room.pendingAction = null;
            (0, combatLogic_1.dealDamage)(room, damagedId, 1, cu, atkId);
            if (!room.pendingAction)
                (0, combatLogic_1.resumeAfterAttack)(room);
        }
        else if (pending.type === 'WAITING_FOR_AOE') {
            const atkId = pending.sourcePlayerId;
            const cu = (0, combatLogic_1.getCardById)(room, pending.cardUsedId);
            (0, combatLogic_1.dealDamage)(room, playerId, 1, cu, atkId);
            if (room.pendingAction?.type === 'DYING')
                return;
            pending.currentTargetIndex++;
            if (pending.currentTargetIndex >= pending.targets.length) {
                room.pendingAction = null;
                (0, combatLogic_1.resumeAfterAttack)(room);
            }
            else {
                pending.timeoutAt = Date.now() + 15000;
                room.pendingAction = pending;
                if (room.players[pending.targets[pending.currentTargetIndex]]?.isBot)
                    (0, botAI_1.handleBotAOE)(room);
            }
        }
        else {
            const atkId = pending?.sourcePlayerId || undefined;
            const cu = pending ? (0, combatLogic_1.getCardById)(room, pending.cardUsedId) : null;
            const dmg = pending?.damage || 1;
            const dt = pending?.damageType || 'NORMAL';
            // FROST_SWORD on-hit
            const attacker = atkId ? room.players[atkId] : null;
            if (attacker?.equipment?.weapon && attacker.equipment.weapon.name === 'FROST_SWORD') {
                const totalCards = (targetPlayer.hand?.length || 0) + Object.values(targetPlayer.equipment || {}).filter((v) => v).length;
                if (totalCards > 0) {
                    room.pendingAction = { type: 'WAITING_FOR_FROST_DISCARD', sourcePlayerId: atkId, targetPlayerId: playerId, originalDamage: dmg, damageType: dt, cardUsedId: pending?.cardUsedId ? String(pending.cardUsedId) : undefined, timeoutAt: Date.now() + 15000 };
                    room._broadcastFn && room._broadcastFn();
                    return;
                }
            }
            room.pendingAction = null;
            (0, combatLogic_1.dealDamage)(room, playerId, dmg, cu, atkId, dt);
            if (!room.pendingAction)
                (0, combatLogic_1.resumeAfterAttack)(room);
        }
    }
    room._broadcastFn && room._broadcastFn();
    const currentId = room.turnOrder[room.currentTurnIndex];
    if (room.players[currentId]?.isBot && room.status === 'PLAYING') {
        const { runBotTurn } = require('./botAI');
        setTimeout(() => runBotTurn(room, currentId), 1000);
    }
}
// ─── helpers ──────────────────────────────────────────────────────────────────
function _getPlayerIdBySocket(room, socketId) {
    if (!socketId)
        return null;
    return Object.keys(room.players).find((pId) => room.players[pId].socketId === socketId) || null;
}
function _err(socket, message) {
    if (socket?.emit)
        socket.emit('game_error', { message });
    else if (socket)
        socket.send('game_error', { message }); // Colyseus client
}
//# sourceMappingURL=cardLogic.js.map