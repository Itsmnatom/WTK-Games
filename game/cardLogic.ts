'use strict';
/**
 * game/cardLogic.ts
 * All use_card / socket event handlers for card plays
 * Provides: handleUseCard, startNegateWindow, resolveActionChain, executeOriginalAction
 * Plus all weapon-skill / character-skill resolve handlers
 */

import { hasCharacter, calculateDistance, drawCards, checkDiscardRequirement, endPlayerTurn, getAllHeroes } from './phaseLogic';
import { dealDamage, resumeAfterAttack, getCardById, startDyingPhase } from './combatLogic';
import { handleBotDodge, handleBotDuelSlash, handleBotAOE, handleBotSeduction, handleBotZhouYu, handleBotBumperPick, handleBotBorrowSlash } from './botAI';
import type { GameRoom, Player, Card, ActionData, SocketLike, PendingAction } from './types';
import { CARD_BY_ID, RULES } from '../shared/catalog';
import { deadline, schedule } from './runtime';
import { claimJudgment } from './expandedHeroes';
import { emitCardPlay, nextPlayId } from './presentationEvents';

// Mutable actions move between responders. Capture both identity and stage so an
// earlier callback cannot spend cards or resolve damage for a newer prompt.
function scheduleResponse(room: GameRoom, callback: () => void, delay: number): void {
  const pending = room.pendingAction;
  if (!pending) return;
  const stage = pendingStage(pending);
  const chainLength = room.actionChain?.length;
  schedule(room, () => {
    if (room.pendingAction === pending && pendingStage(pending) === stage && room.actionChain?.length === chainLength) callback();
  }, delay);
}

function pendingStage(pending: PendingAction): string {
  return JSON.stringify([pending.type, pending.timeoutAt, pending.targetPlayerId,
    pending.currentPlayerToSlash, pending.currentTargetIndex, pending.currentPickerId,
    pending.slashNeeded, pending.dodgeNeeded]);
}

function attackDistance(room: GameRoom, sourceId: string, targetId: string, costSlot?: string | null): number {
  if (!costSlot) return calculateDistance(room, sourceId, targetId);
  const source = room.players[sourceId];
  const withoutCost: GameRoom = { ...room, players: { ...room.players,
    [sourceId]: { ...source, equipment: { ...source.equipment, [costSlot]: null } } } };
  return calculateDistance(withoutCost, sourceId, targetId);
}

const TARGET_SLOTS: Record<string, string> = { WEAPON: 'weapon', ARMOR: 'armor', DEF_HORSE: 'defensiveHorse', OFF_HORSE: 'offensiveHorse', TREASURE: 'treasure' };
function takeTargetCard(target: Player, zone = 'HAND', cardId?: string): Card | null {
  if (zone === 'HAND') return target.hand.length ? target.hand.splice(Math.floor(Math.random() * target.hand.length), 1)[0] : null;
  if (zone === 'DELAYED') {
    const index = cardId ? target.delayedKitZone.findIndex(c => c.id === cardId) : 0;
    return index >= 0 && target.delayedKitZone[index] ? target.delayedKitZone.splice(index, 1)[0] : null;
  }
  const slot = TARGET_SLOTS[zone];
  const card = slot ? target.equipment[slot] as Card | null : null;
  if (!card || cardId && card.id !== cardId) return null;
  target.equipment[slot] = null;
  if (slot === 'armor' && card.name === 'SILVER_LION_HELMET') target.hp = Math.min(target.maxHp, target.hp + 1);
  return card;
}

function validTargetSelection(target: Player, zone: string, cardId?: string): boolean {
  if (zone === 'HAND') return !cardId; // Opponent hand identities are private.
  if (zone === 'DELAYED') return !cardId || target.delayedKitZone.some(c => c.id === cardId);
  const slot = TARGET_SLOTS[zone];
  return !!slot && (!cardId || (target.equipment[slot] as Card)?.id === cardId);
}

function discardDetachedCard(room: GameRoom, card?: Card | null): void {
  if (!card || room.discardPile.some(c => c.id === card.id) || room.deck.some(c => c.id === card.id)) return;
  const owned = Object.values(room.players).some(p => p.hand.some(c => c.id === card.id) || p.delayedKitZone?.some(c => c.id === card.id) || Object.values(p.equipment || {}).some(c => typeof c === 'object' && c?.id === card.id));
  if (!owned) room.discardPile.push(card);
}

function startAttackSequence(room: GameRoom, sourceId: string, targets: string[], card: Card, damage: number, dodgeNeeded: number, damageType: string): void {
  const previousContinuation = room._actionContinuation;
  const playId = nextPlayId(room), targetIds = [...targets];
  const next = () => {
    let targetId = targets.shift();
    while (targetId && !room.players[targetId]?.isAlive) targetId = targets.shift();
    if (!targetId || !room.players[sourceId]?.isAlive || room.status !== 'PLAYING') {
      if (room.status === 'PLAYING') { room._actionContinuation = previousContinuation; resumeAfterAttack(room); }
      return;
    }
    let continued = false;
    room._actionContinuation = targets.length ? () => { if (!continued) { continued = true; next(); } } : previousContinuation;
    room.pendingAction = { type: 'WAITING_FOR_DODGE', sourcePlayerId: sourceId, targetPlayerId: targetId,
      cardUsedId: card.id, damage, dodgeNeeded, damageType, timeoutAt: deadline(room) };
    emitCardPlay(room, sourceId, card, { cardName: card.effectName || card.name, targetId, targetIds, playId });
    room._broadcastFn?.();
    if (room.players[targetId].isBot) scheduleResponse(room, () => handleBotDodge(room, targetId!, damage), 1200);
    scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
  };
  next();
}

/** The room watchdog calls this for an expired action; no human card is spent. */
function resolvePendingAction(room: GameRoom, expected: PendingAction | null = room.pendingAction): boolean {
  const pending = room.pendingAction;
  if (!pending || pending !== expected || !pending.timeoutAt || pending.timeoutAt > Date.now()) return false;
  if (pending.type === 'WAITING_FOR_NEGATE') {
    resolveActionChain(room);
  } else if (['WAITING_FOR_DODGE', 'WAITING_FOR_SLASH_DUEL', 'WAITING_FOR_AOE', 'DIAO_CHAN_SEDUCTION', 'ZHOU_YU_DISCORD'].includes(pending.type)) {
    const responder = pending.type === 'WAITING_FOR_SLASH_DUEL' ? pending.currentPlayerToSlash
      : pending.type === 'WAITING_FOR_AOE' ? pending.targets[pending.currentTargetIndex] : pending.targetPlayerId;
    handleResolvePending(room, null, { playerId: responder, response: 'PASS' });
  } else if (pending.type === 'WAITING_FOR_BORROW_SLASH') {
    const lender = room.players[pending.targetPlayerId!];
    const caster = room.players[pending.sourcePlayerId!];
    if (lender?.equipment.weapon && caster?.isAlive) {
      caster.hand.push(lender.equipment.weapon);
      lender.equipment.weapon = null;
    }
    finishPendingAction(room);
  } else if (pending.type === 'WAITING_FOR_FIRE_REVEAL') {
    const revealed = room.players[pending.targetPlayerId!]?.hand[0];
    if (!revealed) finishPendingAction(room);
    else beginFireMatch(room, pending, revealed);
  } else if (pending.type === 'WAITING_FOR_BUMPER_PICK') {
    const picker = room.players[pending.currentPickerId];
    const card = room.bumperHarvestCards.shift();
    if (picker?.isAlive && card) picker.hand.push(card);
    else if (card) room.discardPile.push(card);
    if (!room.bumperHarvestCards.length) finishPendingAction(room);
    else {
      const index = room.turnOrder.indexOf(pending.currentPickerId);
      const next = Array.from({ length: room.turnOrder.length - 1 }, (_, offset) => room.turnOrder[(index + offset + 1) % room.turnOrder.length]).find(id => room.players[id]?.isAlive);
      if (!next) { room.discardPile.push(...room.bumperHarvestCards.splice(0)); finishPendingAction(room); }
      else {
        pending.currentPickerId = next;
        pending.timeoutAt = deadline(room);
        scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
        if (room.players[next].isBot) scheduleResponse(room, () => handleBotBumperPick(room), 1200);
      }
    }
  } else if (pending.type === 'WAITING_FOR_YINYANG_CHOICE') {
    const attacker = room.players[pending.sourcePlayerId!];
    if (attacker?.isAlive) attacker.hand.push(...drawCards(room, 1));
    finishPendingAction(room);
  } else if (pending.type === 'WAITING_FOR_FROST_DISCARD') {
    room.pendingAction = null;
    dealDamage(room, pending.targetPlayerId!, pending.originalDamage || 1, getCardById(room, pending.cardUsedId), pending.sourcePlayerId!, pending.damageType || 'NORMAL', pending.attack);
    if (!room.pendingAction) resumeAfterAttack(room);
  } else if (['WAITING_FOR_FIRE_MATCH', 'WAITING_FOR_GREEN_DRAGON', 'WAITING_FOR_AXE_DISCARD', 'WAITING_FOR_TRIDENT_DISCARD'].includes(pending.type)) {
    finishPendingAction(room);
  } else return false;
  room._broadcastFn?.();
  return true;
}

function finishPendingAction(room: GameRoom): void {
  room.pendingAction = null;
  resumeAfterAttack(room);
}

function beginFireMatch(room: GameRoom, pending: PendingAction, revealedCard: Card): void {
  room.pendingAction = { type: 'WAITING_FOR_FIRE_MATCH', sourcePlayerId: pending.sourcePlayerId,
    targetPlayerId: pending.targetPlayerId, cardUsedId: pending.cardUsedId,
    requiredSuit: revealedCard.suit, revealedCard, timeoutAt: deadline(room) };
  scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
  const source = room.players[pending.sourcePlayerId!];
  if (source?.isBot) scheduleResponse(room, () => {
    const matchIdx = source.hand.findIndex(c => c.suit === revealedCard.suit);
    const cardUsed = getCardById(room, pending.cardUsedId);
    room.pendingAction = null;
    if (matchIdx !== -1) {
      room.discardPile.push(source.hand.splice(matchIdx, 1)[0]);
      dealDamage(room, pending.targetPlayerId!, 1, cardUsed, pending.sourcePlayerId!, 'FIRE');
    }
    if (!room.pendingAction) resumeAfterAttack(room);
    room._broadcastFn?.();
  }, 1000);
  room._broadcastFn?.();
}

function continueAOE(room: GameRoom, pending: PendingAction): void {
  while (pending.currentTargetIndex < pending.targets.length && !room.players[pending.targets[pending.currentTargetIndex]]?.isAlive) pending.currentTargetIndex++;
  if (pending.currentTargetIndex >= pending.targets.length) finishPendingAction(room);
  else {
    pending.eightTrigramsUsed = false;
    pending.timeoutAt = deadline(room);
    room.pendingAction = pending;
    scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
    if (room.players[pending.targets[pending.currentTargetIndex]]?.isBot) scheduleResponse(room, () => handleBotAOE(room), 1200);
  }
  room._broadcastFn?.();
}

// ─── Negate Window ────────────────────────────────────────────────────────────
function startNegateWindow(room: GameRoom, actionData: ActionData): void {
  room.actionChain = [actionData];
  // The caster cannot negate their own initial spell. A counter-negate starts a
  // fresh eligible window, which the room command handler resets separately.
  room.negatePassedPlayers = [actionData.sourceId];
  room.pendingAction = {
    type: 'WAITING_FOR_NEGATE',
    sourcePlayerId: actionData.sourceId,
    targetPlayerId: actionData.targetId,
    cardUsedId: actionData.cardUsed?.id || null,
    timeoutAt: deadline(room)
  };
  room._broadcastFn && room._broadcastFn();

  // Bots auto-pass
  Object.values(room.players).forEach((p: Player) => {
    if (p.isBot && p.isAlive && p.id !== actionData.sourceId) {
      scheduleResponse(room, () => {
        if (room.pendingAction?.type === 'WAITING_FOR_NEGATE' && p.isAlive) {
          if (!room.negatePassedPlayers.includes(p.id)) room.negatePassedPlayers.push(p.id);
          const aliveCount = Object.values(room.players).filter((pl: Player) => pl.isAlive).length;
          if (room.negatePassedPlayers.filter(id => room.players[id]?.isAlive).length >= aliveCount) resolveActionChain(room);
        }
      }, 1500 + Math.random() * 1000);
    }
  });

  const chainLen = room.actionChain.length;
  scheduleResponse(room, () => {
    if (room.pendingAction?.type === 'WAITING_FOR_NEGATE' && room.actionChain.length === chainLen) {
      resolveActionChain(room);
    }
  }, RULES.reactionMs);
}

function resolveActionChain(room: GameRoom): void {
  if (!room.actionChain || room.actionChain.length === 0) return;
  const isNegated = room.actionChain.length % 2 === 0;
  const originalAction = room.actionChain[0];
  room.pendingAction = null;
  room.actionChain = [];

  if (isNegated) {
    if (originalAction.type === 'DELAYED') discardDetachedCard(room, originalAction.cardUsed);
    room.chat = room.chat || [];
    room.chat.push({ sender: 'System', text: `ผลของการ์ด ${originalAction.cardUsed?.name} ถูกยกเลิกโดยไร้ข้อกังขา!`, time: new Date().toLocaleTimeString('th-TH') });
    resumeAfterAttack(room);
    room._broadcastFn && room._broadcastFn();
  } else {
    executeOriginalAction(room, originalAction);
  }
}

function executeOriginalAction(room: GameRoom, action: ActionData): void {
  const { type, sourceId, targetId, targetZone, targetCardId, cardUsed, targets, victimId } = action;
  const player = room.players[sourceId];
  const targetPlayer = targetId ? room.players[targetId] : null;

  if (type === 'STEAL') {
    if (!targetPlayer?.isAlive) { resumeAfterAttack(room); room._broadcastFn && room._broadcastFn(); return; }
    const stolenCard = takeTargetCard(targetPlayer, targetZone, targetCardId);
    if (stolenCard && player?.isAlive) player.hand.push(stolenCard);
    else if (stolenCard) room.discardPile.push(stolenCard);
    resumeAfterAttack(room); room._broadcastFn && room._broadcastFn();
  }
  else if (type === 'SABOTAGE') {
    if (!targetPlayer?.isAlive) { resumeAfterAttack(room); room._broadcastFn && room._broadcastFn(); return; }
    const discardedCard = takeTargetCard(targetPlayer, targetZone, targetCardId);
    if (discardedCard) room.discardPile.push(discardedCard);
    resumeAfterAttack(room); room._broadcastFn && room._broadcastFn();
  }
  else if (type === 'EX_NIHILO') {
    drawCards(room, 2).forEach((c: Card) => player.hand.push(c));
    resumeAfterAttack(room); room._broadcastFn && room._broadcastFn();
  }
  else if (type === 'DUEL') {
    if (!targetPlayer?.isAlive || (hasCharacter(targetPlayer, 'ZHUGE_LIANG') && targetPlayer.hand.length === 0)) {
      resumeAfterAttack(room); room._broadcastFn && room._broadcastFn(); return;
    }
    const isSourceLuBu = hasCharacter(player, 'LV_BU') || hasCharacter(player, 'LU_BU');
    const slashNeeded = isSourceLuBu ? 2 : 1;
    room.pendingAction = {
      type: 'WAITING_FOR_SLASH_DUEL', sourcePlayerId: sourceId, targetPlayerId: targetId,
      currentPlayerToSlash: targetId, cardUsedId: cardUsed?.id, damage: 1, slashNeeded, timeoutAt: deadline(room)
    };
    room._broadcastFn && room._broadcastFn();
    if (targetPlayer.isBot) scheduleResponse(room, () => handleBotDuelSlash(room), 1200);
    scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
  }
  else if (type === 'FIRE_ATTACK') {
    if (!targetPlayer?.isAlive || targetPlayer.hand.length === 0) {
      resumeAfterAttack(room); room._broadcastFn && room._broadcastFn(); return;
    }
    room.pendingAction = { type: 'WAITING_FOR_FIRE_REVEAL', sourcePlayerId: sourceId, targetPlayerId: targetId, cardUsedId: cardUsed?.id, timeoutAt: deadline(room) };
    room._broadcastFn && room._broadcastFn();
    scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
    if (targetPlayer.isBot) scheduleResponse(room, () => {
      const revealedCard = targetPlayer.hand[0];
      if (!revealedCard) { finishPendingAction(room); room._broadcastFn?.(); }
      else beginFireMatch(room, room.pendingAction!, revealedCard);
    }, 1200);
  }
  else if (type === 'DELAYED') {
    if (targetPlayer?.isAlive) {
      targetPlayer.delayedKitZone = targetPlayer.delayedKitZone || [];
      targetPlayer.delayedKitZone.push(cardUsed!);
    } else discardDetachedCard(room, cardUsed);
    resumeAfterAttack(room); room._broadcastFn && room._broadcastFn();
  }
  else if (type === 'PEACH_GARDEN') {
    Object.values(room.players).forEach((p: Player) => { if (p.isAlive && p.hp < p.maxHp) p.hp += 1; });
    resumeAfterAttack(room); room._broadcastFn && room._broadcastFn();
  }
  else if (type === 'AOE') {
    room.pendingAction = {
      type: 'WAITING_FOR_AOE', aoeType: cardUsed!.name, sourcePlayerId: sourceId,
      targets, currentTargetIndex: 0, cardUsedId: cardUsed!.id, timeoutAt: deadline(room)
    };
    room._broadcastFn && room._broadcastFn();
    continueAOE(room, room.pendingAction);
  }
  else if (type === 'BUMPER_HARVEST') {
    const alivePlayers = Object.values(room.players).filter((p: Player) => p.isAlive).map((p: Player) => p.id);
    room.bumperHarvestCards = drawCards(room, alivePlayers.length);
    room.pendingAction = {
      type: 'WAITING_FOR_BUMPER_PICK', sourcePlayerId: sourceId, currentPickerId: sourceId,
      cardUsedId: cardUsed!.id, timeoutAt: deadline(room)
    };
    room._broadcastFn && room._broadcastFn();
    if (player.isBot) scheduleResponse(room, () => handleBotBumperPick(room), 1200);
  }
  else if (type === 'BORROWED_SWORD') {
    room.pendingAction = {
      type: 'WAITING_FOR_BORROW_SLASH', sourcePlayerId: sourceId, targetPlayerId: targetId,
      victimId, cardUsedId: cardUsed!.id, timeoutAt: deadline(room)
    };
    room._broadcastFn && room._broadcastFn();
    if (room.players[targetId!]?.isBot) scheduleResponse(room, () => handleBotBorrowSlash(room), 1200);
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
    resumeAfterAttack(room); room._broadcastFn && room._broadcastFn();
  }
}

// ─── Main use_card handler ────────────────────────────────────────────────────
function handleUseCard(room: GameRoom, socket: SocketLike | null, data: any): void {
  const { cardId, targetPlayerId, targetZone, targetCardId, secondaryTargetId, playAs } = data;
  const playerId = _getPlayerIdBySocket(room, socket?.id) || data.playerId;
  const player = room.players[playerId];
  if (!player) return _err(socket, 'ไม่พบผู้เล่น');

  const currentTurnPlayerId = room.turnOrder[room.currentTurnIndex];
  if (playerId !== currentTurnPlayerId || room.currentPhase !== 'PLAY') return _err(socket, 'ไม่ใช่เทิร์นของคุณ หรือไม่ใช่ช่วงร่ายการ์ด');
  if (room.pendingAction) return _err(socket, 'กรุณารอการประมวลผลก่อนหน้า');

  let cardIndex = player.hand.findIndex((c: Card) => c.id === cardId);
  let cardUsed: Card | null = cardIndex !== -1 ? player.hand[cardIndex] : null;
  let isEquipUsed = false;
  let equipSlotUsed: string | null = null;

  if (!cardUsed && player.equipment) {
    const slots = ['weapon', 'armor', 'offensiveHorse', 'defensiveHorse', 'treasure'] as const;
    for (const slot of slots) {
      if ((player.equipment[slot] as Card)?.id === cardId) {
        cardUsed = player.equipment[slot] as Card;
        isEquipUsed = true;
        equipSlotUsed = slot;
        break;
      }
    }
  }

  if (!cardUsed) return _err(socket, 'ไม่พบการ์ดใบนี้อยู่บนมือหรืออุปกรณ์ของคุณ');
  // A physical card can be acquired and used again with a different effect.
  delete cardUsed.effectName;

  if (!playAs && player.slashedThisTurn && cardUsed.type === 'EQUIPMENT' && !isEquipUsed) return _err(socket, 'คุณใช้ SLASH ไปแล้วในเทิร์นนี้ ไม่สามารถใช้การ์ดอุปกรณ์เพิ่มได้');

  let effectiveCardName = cardUsed.name;
  if (playAs === 'SLASH' || isEquipUsed && !['SABOTAGE','ACEDIA'].includes(playAs)) {
    const isGuanYuSlash = hasCharacter(player, 'GUAN_YU') && (cardUsed.suit === 'HEART' || cardUsed.suit === 'DIAMOND');
    const isZhaoYunSlash = hasCharacter(player, 'ZHAO_YUN') && cardUsed.name === 'DODGE' && !isEquipUsed;
    if (isGuanYuSlash || isZhaoYunSlash) effectiveCardName = 'SLASH';
    else if (isEquipUsed) return _err(socket, 'การ์ดอุปกรณ์ไม่สามารถแปลงเป็น SLASH ได้ (ต้องเป็นการ์ดสีแดงของกวนอู)');
    else return _err(socket, 'การ์ดไม่สามารถแปลงเป็น SLASH ได้');
  }

  // ── SLASH / THUNDER_ATTACK ──
  if (playAs === 'SABOTAGE' || playAs === 'ACEDIA') {
    const allowed = playAs === 'SABOTAGE' ? hasCharacter(player,'GAN_NING') && ['SPADE','CLUB'].includes(cardUsed.suit) : hasCharacter(player,'DA_QIAO') && cardUsed.suit==='DIAMOND';
    if(!allowed)return _err(socket,'ไพ่ใบนี้แปลงเป็นกลยุทธ์ที่เลือกไม่ได้');
    effectiveCardName=playAs;
  } else if(playAs && playAs!=='SLASH')return _err(socket,'ไพ่ใบนี้แปลงเป็นกลยุทธ์ที่เลือกไม่ได้');
  const effectiveKind = CARD_BY_ID[effectiveCardName]?.kind || cardUsed.type;
  const takePlayedCard = ():Card => {
    if(isEquipUsed && equipSlotUsed){player.equipment[equipSlotUsed]=null;if(cardUsed!.name==='SILVER_LION_HELMET')player.hp=Math.min(player.maxHp,player.hp+1);return cardUsed!;}
    return player.hand.splice(cardIndex,1)[0];
  };
  if(effectiveCardName!==cardUsed.name)cardUsed.effectName=effectiveCardName;

  if (effectiveCardName === 'SLASH' || effectiveCardName === 'THUNDER_ATTACK') {
    const attackTargets: string[] = Array.isArray(data.targetPlayerIds) ? data.targetPlayerIds : targetPlayerId ? [targetPlayerId] : [];
    const canSplit = !isEquipUsed && player.hand.length === 1 && (player.equipment.weapon as Card)?.name === 'SKY_PIERCING_HALBERD';
    if (!attackTargets.length || attackTargets.length > (canSplit ? 3 : 1) || new Set(attackTargets).size !== attackTargets.length) return _err(socket, 'จำนวนเป้าหมายโจมตีไม่ถูกต้อง');
    const hasZhuge = equipSlotUsed !== 'weapon' && (player.equipment?.weapon as Card)?.name === 'ZHUGE_CROSSBOW';
    const isZhangFei = hasCharacter(player, 'ZHANG_FEI');
    if (room.attacksPlayedInTurn >= 1 + (player.extraAttacks || 0) && !hasZhuge && !isZhangFei) return _err(socket, 'คุณใช้สิทธิ์ SLASH ครบแล้วในเทิร์นนี้');
    const weaponRange = equipSlotUsed === 'weapon' ? 1 : (player.equipment?.weapon as Card)?.range || 1;
    for (const targetId of attackTargets) {
      const target = room.players[targetId];
      if (typeof targetId !== 'string' || targetId === playerId || !target?.isAlive) return _err(socket, 'เป้าหมายโจมตีไม่ถูกต้อง');
      if (attackDistance(room, playerId, targetId, equipSlotUsed) > weaponRange) return _err(socket, 'เป้าหมายอยู่ไกลเกินระยะโจมตี');
      if (hasCharacter(target, 'ZHUGE_LIANG') && target.hand.length === 0) return _err(socket, 'เมืองว่างเปล่าป้องกันการโจมตีเป้าหมายนี้');
    }

    const damage = player.wineActive ? 2 : 1;
    player.wineActive = false;
    cardUsed.effectName = effectiveCardName;

    if (isEquipUsed && equipSlotUsed) {
      player.equipment[equipSlotUsed as keyof typeof player.equipment] = null;
      room.discardPile.push(cardUsed);
      if (cardUsed.name === 'SILVER_LION_HELMET') player.hp = Math.min(player.maxHp, player.hp + 1);
    } else {
      takePlayedCard();
      room.discardPile.push(cardUsed);
    }

    room.attacksPlayedInTurn += 1;
    player.slashedThisTurn = true;

    let slashDamageType = 'NORMAL';
    if (effectiveCardName === 'THUNDER_ATTACK') slashDamageType = 'THUNDER';
    else if ((player.equipment?.weapon as Card)?.name === 'FEATHERED_FAN') slashDamageType = 'FIRE';

    const dodgeNeeded = (hasCharacter(player, 'LV_BU') || hasCharacter(player, 'LU_BU')) ? 2 : 1;
    startAttackSequence(room, playerId, [...attackTargets], cardUsed, damage, dodgeNeeded, slashDamageType);
  }
  // ── PEACH ──
  else if (effectiveCardName === 'PEACH') {
    const tid = targetPlayerId || playerId;
    const tp = room.players[tid];
    if (!tp?.isAlive || tp.hp >= tp.maxHp) return _err(socket, 'ไม่สามารถใช้ PEACH ได้');
    takePlayedCard();
    room.discardPile.push(cardUsed);
    tp.hp += 1;
    emitCardPlay(room, playerId, cardUsed, { cardName: 'PEACH', targetId: tid });
    room._broadcastFn && room._broadcastFn();
  }
  // ── WINE ──
  else if (effectiveCardName === 'WINE') {
    takePlayedCard();
    room.discardPile.push(cardUsed);
    player.wineActive = true;
    emitCardPlay(room, playerId, cardUsed, { cardName: 'WINE' });
    room._broadcastFn && room._broadcastFn();
  }
  // ── STEAL ──
  else if (effectiveCardName === 'STEAL') {
    if (!targetPlayerId) return _err(socket, 'กรุณาระบุเป้าหมายที่จะขโมย');
    const tp = room.players[targetPlayerId];
    if (!tp?.isAlive) return _err(socket, 'เป้าหมายไม่มีผล');
    if (!hasCharacter(player,'HUANG_YUEYING') && calculateDistance(room, playerId, targetPlayerId) > 1) return _err(socket, 'เป้าหมายอยู่ไกลเกินระยะค่ายกล STEAL');
    const tz = targetZone || 'HAND';
    if (!validTargetSelection(tp, tz, targetCardId)) return _err(socket, 'การ์ดเป้าหมายในโซนที่เลือกไม่ถูกต้อง');
    const sc = takePlayedCard();
    room.discardPile.push(sc);
    emitCardPlay(room, playerId, cardUsed, { cardName: 'STEAL', targetId: targetPlayerId });
    startNegateWindow(room, { type: 'STEAL', sourceId: playerId, targetId: targetPlayerId, targetZone: tz, targetCardId, cardUsed: sc });
  }
  // ── SABOTAGE ──
  else if (effectiveCardName === 'SABOTAGE') {
    if (!targetPlayerId) return _err(socket, 'กรุณาระบุเป้าหมายที่จะทำลาย');
    const tp = room.players[targetPlayerId];
    if (!tp?.isAlive) return _err(socket, 'เป้าหมายไม่มีผล');
    const tz = targetZone || 'HAND';
    if (!validTargetSelection(tp, tz, targetCardId)) return _err(socket, 'การ์ดเป้าหมายในโซนที่เลือกไม่ถูกต้อง');
    const sc = takePlayedCard();
    room.discardPile.push(sc);
    emitCardPlay(room, playerId, cardUsed, { cardName: 'SABOTAGE', targetId: targetPlayerId });
    startNegateWindow(room, { type: 'SABOTAGE', sourceId: playerId, targetId: targetPlayerId, targetZone: tz, targetCardId, cardUsed: sc });
  }
  // ── WEAPONS ──
  else if (['ZHUGE_CROSSBOW','BLUE_STEEL_SWORD','SIX_SWORDS_WU','KIRIN_BOW','FEATHERED_FAN','SERPENT_SPEAR','FROST_SWORD','TWO_BLADED_TRIDENT','ROCK_CLEAVING_AXE','GREEN_DRAGON_BLADE','SKY_PIERCING_HALBERD','YIN_YANG_SWORDS'].includes(effectiveCardName)) {
    const WEAPON_RANGE: Record<string, number> = { 'ZHUGE_CROSSBOW':1,'BLUE_STEEL_SWORD':2,'SIX_SWORDS_WU':2,'KIRIN_BOW':5,'FEATHERED_FAN':4,'SERPENT_SPEAR':3,'FROST_SWORD':2,'TWO_BLADED_TRIDENT':3,'ROCK_CLEAVING_AXE':3,'GREEN_DRAGON_BLADE':3,'SKY_PIERCING_HALBERD':4,'YIN_YANG_SWORDS':2 };
    const equipCard = takePlayedCard();
    equipCard.range = WEAPON_RANGE[effectiveCardName] || 1;
    if (player.equipment.weapon) room.discardPile.push(player.equipment.weapon as Card);
    player.equipment.weapon = equipCard;
    emitCardPlay(room, playerId, cardUsed);
    room._broadcastFn && room._broadcastFn();
  }
  // ── ARMOR ──
  else if (['NIO_SHIELD','EIGHT_TRIGRAMS_FORMATION','SILVER_LION_HELMET','RATTAN_ARMOR'].includes(effectiveCardName)) {
    const equipCard = takePlayedCard();
    if (player.equipment.armor) {
      room.discardPile.push(player.equipment.armor as Card);
      if ((player.equipment.armor as Card).name === 'SILVER_LION_HELMET') player.hp = Math.min(player.maxHp, player.hp + 1);
    }
    player.equipment.armor = equipCard;
    emitCardPlay(room, playerId, cardUsed);
    room._broadcastFn && room._broadcastFn();
  }
  // ── WOODEN_CART ──
  else if (effectiveCardName === 'WOODEN_CART') {
    const equipCard = takePlayedCard();
    if (player.equipment.treasure) room.discardPile.push(player.equipment.treasure as Card);
    player.equipment.treasure = equipCard;
    emitCardPlay(room, playerId, cardUsed);
    room._broadcastFn && room._broadcastFn();
  }
  // ── DEFENSIVE HORSE ──
  else if (['LIGHTNING_HOOF','SHADOWRUNNER'].includes(effectiveCardName)) {
    const equipCard = takePlayedCard();
    if (player.equipment.defensiveHorse) room.discardPile.push(player.equipment.defensiveHorse as Card);
    player.equipment.defensiveHorse = equipCard;
    emitCardPlay(room, playerId, cardUsed);
    room._broadcastFn && room._broadcastFn();
  }
  // ── OFFENSIVE HORSE ──
  else if (['RED_HARE','FERGANA_STEED'].includes(effectiveCardName)) {
    const equipCard = takePlayedCard();
    if (player.equipment.offensiveHorse) room.discardPile.push(player.equipment.offensiveHorse as Card);
    player.equipment.offensiveHorse = equipCard;
    emitCardPlay(room, playerId, cardUsed);
    room._broadcastFn && room._broadcastFn();
  }
  // ── EX_NIHILO ──
  else if (effectiveCardName === 'EX_NIHILO') {
    const c = takePlayedCard();
    room.discardPile.push(c);
    emitCardPlay(room, playerId, cardUsed);
    startNegateWindow(room, { type: 'EX_NIHILO', sourceId: playerId, cardUsed: c });
  }
  // ── DUEL ──
  else if (effectiveCardName === 'DUEL') {
    if (!targetPlayerId) return _err(socket, 'กรุณาระบุเป้าหมายในการ DUEL');
    const tp = room.players[targetPlayerId];
    if (!tp?.isAlive) return _err(socket, 'เป้าหมายไม่มีผล');
    if (hasCharacter(tp, 'ZHUGE_LIANG') && tp.hand.length === 0) return _err(socket, 'ขงเบ้งเปิดใช้สกิล เมืองว่างเปล่า ไม่สามารถเป็นเป้าหมาย DUEL ได้');
    const dc = takePlayedCard();
    room.discardPile.push(dc);
    emitCardPlay(room, playerId, cardUsed, { targetId: targetPlayerId });
    startNegateWindow(room, { type: 'DUEL', sourceId: playerId, targetId: targetPlayerId, cardUsed: dc });
  }
  // ── FIRE_ATTACK ──
  else if (effectiveCardName === 'FIRE_ATTACK') {
    if (!targetPlayerId) return _err(socket, 'กรุณาระบุเป้าหมายสำหรับการโจมตีด้วยไฟ');
    const tp = room.players[targetPlayerId];
    if (!tp?.isAlive) return _err(socket, 'เป้าหมายไม่มีผล');
    if (tp.hand.length === 0) return _err(socket, 'เป้าหมายไม่มีการ์ดบนมือ');
    const fc = takePlayedCard();
    room.discardPile.push(fc);
    emitCardPlay(room, playerId, cardUsed, { targetId: targetPlayerId });
    startNegateWindow(room, { type: 'FIRE_ATTACK', sourceId: playerId, targetId: targetPlayerId, cardUsed: fc });
  }
  // ── IRON_CHAIN ──
  else if (effectiveCardName === 'IRON_CHAIN') {
    if (!targetPlayerId) {
      const ic = takePlayedCard();
      room.discardPile.push(ic);
      drawCards(room, 1).forEach((c: Card) => player.hand.push(c));
      emitCardPlay(room, playerId, cardUsed);
      room._broadcastFn && room._broadcastFn();
      return;
    }
    const tp = room.players[targetPlayerId];
    if (!tp?.isAlive) return _err(socket, 'เป้าหมายไม่มีผล');
    const ic = takePlayedCard();
    room.discardPile.push(ic);
    emitCardPlay(room, playerId, cardUsed, { targetId: targetPlayerId, targetIds: [targetPlayerId, secondaryTargetId].filter(id => room.players[id]?.isAlive) });
    startNegateWindow(room, { type: 'IRON_CHAIN', sourceId: playerId, targetId: targetPlayerId, victimId: secondaryTargetId, cardUsed: ic });
  }
  // ── DELAYED CARDS ──
  else if (effectiveKind === 'DELAYED') {
    let tid = targetPlayerId;
    if (effectiveCardName === 'LIGHTNING') tid = playerId;
    else if ((effectiveCardName === 'ACEDIA' || effectiveCardName === 'STARVATION') && tid === playerId) return _err(socket, `ไม่สามารถใช้ ${effectiveCardName} ใส่ตัวเองได้`);
    if (!tid) return _err(socket, 'กรุณาเลือกเป้าหมาย');
    const tp = room.players[tid];
    if (!tp?.isAlive) return _err(socket, 'เป้าหมายไม่ถูกต้อง');
    if (tp.delayedKitZone?.some((c: Card) => (c.effectName || c.name) === effectiveCardName)) return _err(socket, `เป้าหมายมี ${effectiveCardName} อยู่แล้ว`);
    const dc = takePlayedCard();
    emitCardPlay(room, playerId, cardUsed, { targetId: tid });
    startNegateWindow(room, { type: 'DELAYED', sourceId: playerId, targetId: tid, cardUsed: dc });
  }
  // ── PEACH_GARDEN ──
  else if (effectiveCardName === 'PEACH_GARDEN') {
    const pc = takePlayedCard();
    room.discardPile.push(pc);
    emitCardPlay(room, playerId, cardUsed, { targetIds: room.turnOrder.filter(id => room.players[id]?.isAlive && room.players[id].hp < room.players[id].maxHp) });
    startNegateWindow(room, { type: 'PEACH_GARDEN', sourceId: playerId, cardUsed: pc });
  }
  // ── BUMPER_HARVEST ──
  else if (effectiveCardName === 'BUMPER_HARVEST') {
    const bc = takePlayedCard();
    room.discardPile.push(bc);
    emitCardPlay(room, playerId, cardUsed, { targetIds: room.turnOrder.filter(id => room.players[id]?.isAlive) });
    startNegateWindow(room, { type: 'BUMPER_HARVEST', sourceId: playerId, cardUsed: bc });
  }
  // ── BORROWED_SWORD ──
  else if (effectiveCardName === 'BORROWED_SWORD') {
    if (!targetPlayerId || !secondaryTargetId) return _err(socket, 'กรุณาระบุเป้าหมายทั้งสองคนสำหรับการยืมดาบ');
    if (targetPlayerId === secondaryTargetId) return _err(socket, 'ผู้ถูกยืมดาบและเป้าหมายที่สองต้องไม่เป็นคนเดียวกัน');
    const tB = room.players[targetPlayerId];
    const tC = room.players[secondaryTargetId];
    if (!tB?.isAlive || !tC?.isAlive) return _err(socket, 'เป้าหมายไม่มีผล');
    if (!tB.equipment?.weapon) return _err(socket, 'ผู้ถูกยืมดาบไม่มีอาวุธ');
    const WEAPON_RANGE: Record<string, number> = { 'ZHUGE_CROSSBOW':1,'BLUE_STEEL_SWORD':2,'SIX_SWORDS_WU':2,'KIRIN_BOW':5,'FEATHERED_FAN':4,'SERPENT_SPEAR':3,'FROST_SWORD':2,'TWO_BLADED_TRIDENT':3,'ROCK_CLEAVING_AXE':3,'GREEN_DRAGON_BLADE':3,'SKY_PIERCING_HALBERD':4,'YIN_YANG_SWORDS':2 };
    const weaponCard = tB.equipment.weapon as Card;
    const weaponRange = weaponCard.range || WEAPON_RANGE[weaponCard.name] || 1;
    const dist = calculateDistance(room, targetPlayerId, secondaryTargetId);
    if (dist > weaponRange) return _err(socket, `เป้าหมายที่สองอยู่นอกระยะอาวุธของผู้ถูกยืมดาบ (${dist} > ${weaponRange})`);
    const bc = takePlayedCard();
    room.discardPile.push(bc);
    emitCardPlay(room, playerId, cardUsed, { targetId: targetPlayerId, targetIds: [targetPlayerId, secondaryTargetId] });
    startNegateWindow(room, { type: 'BORROWED_SWORD', sourceId: playerId, targetId: targetPlayerId, victimId: secondaryTargetId, cardUsed: bc });
  }
  // ── AOE ──
  else if (['BARBARIAN_INVASION','ARROW_BARRAGE'].includes(effectiveCardName)) {
    const ac = takePlayedCard();
    room.discardPile.push(ac);
    const myIdx = room.turnOrder.indexOf(playerId);
    const targets: string[] = [];
    for (let i = 1; i < room.turnOrder.length; i++) {
      const pid = room.turnOrder[(myIdx + i) % room.turnOrder.length];
      if (room.players[pid]?.isAlive) targets.push(pid);
    }
    if (targets.length === 0) { room._broadcastFn && room._broadcastFn(); return; }
    emitCardPlay(room, playerId, cardUsed, { targetIds: targets });
    startNegateWindow(room, { type: 'AOE', sourceId: playerId, targets, cardUsed: ac });
  }
  // ── NEGATE ──
  else if (effectiveCardName === 'NEGATE') {
    if ((room.pendingAction as any)?.type === 'WAITING_FOR_NEGATE') {
      takePlayedCard();
      room.discardPile.push(cardUsed);
      emitCardPlay(room, playerId, cardUsed, { cardName: 'NEGATE', kind: 'RESPONSE', targetId: room.actionChain?.[room.actionChain.length - 1]?.sourceId });
      room.actionChain = room.actionChain || [];
      room.actionChain.push({ type: 'NEGATE', sourceId: playerId, cardUsed });
      room.negatePassedPlayers = [];
      room._broadcastFn && room._broadcastFn();
      const chainLen = room.actionChain.length;
      scheduleResponse(room, () => {
        if (room.pendingAction?.type === 'WAITING_FOR_NEGATE' && room.actionChain.length === chainLen) resolveActionChain(room);
      }, RULES.reactionMs);
      return;
    } else {
      return _err(socket, 'สามารถใช้ ไร้ข้อกังขา (NEGATE) ได้เฉพาะขณะที่มีการร่ายการ์ดเวทมนตร์หรือค่ายกล');
    }
  }
}

// ─── resolve_pending handler ──────────────────────────────────────────────────
function handleResolvePending(room: GameRoom, socket: SocketLike | null, data: any): void {
  const playerId = _getPlayerIdBySocket(room, socket?.id) || data.playerId;
  const pending = room.pendingAction;
  if (!pending) return;
  if (!['WAITING_FOR_DODGE', 'WAITING_FOR_SLASH_DUEL', 'WAITING_FOR_AOE', 'DIAO_CHAN_SEDUCTION', 'ZHOU_YU_DISCORD'].includes(pending.type)) return;
  if (pending.timeoutAt && pending.timeoutAt <= Date.now() && !['PASS', 'TAKE_DAMAGE'].includes(data.response || data.action)) {
    resolvePendingAction(room, pending);
    return;
  }

  let expectedTargetId = pending.targetPlayerId;
  if (pending.type === 'WAITING_FOR_SLASH_DUEL') expectedTargetId = pending.currentPlayerToSlash;
  if (pending.type === 'WAITING_FOR_AOE') expectedTargetId = pending.targets[pending.currentTargetIndex];
  if (playerId !== expectedTargetId) return;

  if (pending.type === 'WAITING_FOR_SLASH_DUEL' &&
      (!room.players[pending.sourcePlayerId!]?.isAlive || !room.players[pending.targetPlayerId!]?.isAlive)) {
    finishPendingAction(room);
    room._broadcastFn?.();
    return;
  }

  const targetPlayer = room.players[playerId];
  if (!targetPlayer?.isAlive) {
    if (pending.type === 'WAITING_FOR_AOE') { pending.currentTargetIndex++; continueAOE(room, pending); }
    return;
  }
  const response = data.response || data.action;
  const cardId = data.cardId || data.payload?.cardId;
  const damage = pending.damage || 1;
  const allHeroesData = getAllHeroes();

  if (response === 'EIGHT_TRIGRAMS') {
    if (pending.type === 'WAITING_FOR_DODGE' && (room.players[pending.sourcePlayerId!]?.equipment.weapon as Card)?.name === 'BLUE_STEEL_SWORD') return _err(socket, 'ดาบเหล็กดำทำให้เกราะไม่มีผลในการโจมตีครั้งนี้');
    if (!targetPlayer.equipment?.armor || (targetPlayer.equipment.armor as Card).name !== 'EIGHT_TRIGRAMS_FORMATION') return _err(socket, 'คุณไม่ได้สวมใส่เกราะประยุทธ์แปดทิศ');
    if (pending.type === 'WAITING_FOR_SLASH_DUEL' || (pending.type === 'WAITING_FOR_AOE' && pending.aoeType === 'BARBARIAN_INVASION')) {
      return _err(socket, 'เกราะประยุทธ์แปดทิศใช้แทนการหลบหลีก (DODGE) เท่านั้น ไม่สามารถใช้แทน SLASH ในการดวลหรือคนเถื่อนบุกได้');
    }
    if (pending.eightTrigramsUsed) return _err(socket, 'คุณใช้เกราะนี้ไปแล้ว');
    if (pending.type !== 'WAITING_FOR_DODGE' && !(pending.type === 'WAITING_FOR_AOE' && pending.aoeType === 'ARROW_BARRAGE')) return;
    const judgeCard = drawCards(room, 1)[0];
    if (!judgeCard) return;
    pending.eightTrigramsUsed = true;
    const resolveJudgment = (finalJudge: Card) => {
      if (room.pendingAction !== pending) return;
      room.discardPile.push(finalJudge);
      const isRed = finalJudge.suit === 'HEART' || finalJudge.suit === 'DIAMOND';
      room._emitAll?.('judgement_result', { title: 'Eight Trigrams', card: finalJudge, isSuccess: isRed, targetPlayerId: targetPlayer.id, targetPlayerName: targetPlayer.name });
      claimJudgment(room,targetPlayer,finalJudge,()=>{
      if (isRed && pending.type === 'WAITING_FOR_AOE') {
        pending.currentTargetIndex++;
        continueAOE(room, pending);
        return;
      }
      if (isRed) {
        pending.eightTrigramsUsed = false;
        pending.dodgeNeeded = (pending.dodgeNeeded || 1) - 1;
        if (pending.dodgeNeeded <= 0) { finishPendingAction(room); room._broadcastFn?.(); return; }
      }
      pending.timeoutAt = deadline(room);
      scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
      if (targetPlayer.isBot) scheduleResponse(room, () => pending.type === 'WAITING_FOR_AOE' ? handleBotAOE(room) : handleBotDodge(room, targetPlayer.id, damage), 600);
      room._broadcastFn?.();
      });
    };
    if (room._judgeCard) room._judgeCard(targetPlayer, judgeCard, { name: 'EIGHT_TRIGRAMS_FORMATION' }, resolveJudgment);
    else resolveJudgment(judgeCard);
    return;
  }

  if (response === 'DODGE' || response === 'USE_CARD') {
    if (!cardId) return _err(socket, 'กรุณาระบุการ์ดป้องกัน');
    const cardIdx = targetPlayer.hand.findIndex((c: Card) => c.id === cardId);
    const needsSlash = pending.type === 'WAITING_FOR_SLASH_DUEL' || (pending.type === 'WAITING_FOR_AOE' && pending.aoeType === 'BARBARIAN_INVASION');
    const equipSlot = needsSlash && hasCharacter(targetPlayer, 'GUAN_YU')
      ? Object.keys(targetPlayer.equipment).find(slot => {
        const equipped = targetPlayer.equipment[slot] as Card | null;
        return !!equipped && equipped.id === cardId && (equipped.suit === 'HEART' || equipped.suit === 'DIAMOND');
      }) : undefined;
    const card = cardIdx !== -1 ? targetPlayer.hand[cardIdx] : equipSlot ? targetPlayer.equipment[equipSlot] as Card : null;
    if (!card) return _err(socket, 'การ์ดไม่อยู่บนมือ');
    let isValid = false;

    if (pending.type === 'DIAO_CHAN_SEDUCTION') {
      isValid = card.name === 'SLASH' || card.name === 'THUNDER_ATTACK';
      if (!isValid && hasCharacter(targetPlayer, 'ZHAO_YUN')) isValid = card.name === 'DODGE';
    } else if (pending.type === 'WAITING_FOR_SLASH_DUEL') {
      isValid = card.name === 'SLASH' || card.name === 'THUNDER_ATTACK';
      if (!isValid && hasCharacter(targetPlayer, 'GUAN_YU')) isValid = card.suit === 'HEART' || card.suit === 'DIAMOND';
      else if (!isValid && hasCharacter(targetPlayer, 'ZHAO_YUN')) isValid = card.name === 'DODGE';
    } else if (pending.type === 'WAITING_FOR_AOE') {
      if (pending.aoeType === 'BARBARIAN_INVASION') {
        isValid = card.name === 'SLASH' || card.name === 'THUNDER_ATTACK' || card.name === 'NEGATE';
        if (!isValid && hasCharacter(targetPlayer, 'GUAN_YU')) isValid = card.suit === 'HEART' || card.suit === 'DIAMOND';
        if (!isValid && hasCharacter(targetPlayer, 'ZHAO_YUN')) isValid = card.name === 'DODGE';
      } else if (pending.aoeType === 'ARROW_BARRAGE') {
        isValid = card.name === 'DODGE' || card.name === 'NEGATE';
        if (!isValid && (hasCharacter(targetPlayer, 'ZHEN_JI') || hasCharacter(targetPlayer, 'LADY_ZHEN'))) isValid = card.suit === 'SPADE' || card.suit === 'CLUB';
        if (!isValid && hasCharacter(targetPlayer, 'ZHAO_YUN')) isValid = card.name === 'SLASH';
      }
    } else if (pending.type === 'ZHOU_YU_DISCORD') {
      const color = (card.suit === 'HEART' || card.suit === 'DIAMOND') ? 'RED' : 'BLACK';
      isValid = color === pending.requiredColor;
    } else {
      isValid = card.name === 'DODGE';
      if (!isValid && (hasCharacter(targetPlayer, 'ZHEN_JI') || hasCharacter(targetPlayer, 'LADY_ZHEN'))) isValid = card.suit === 'SPADE' || card.suit === 'CLUB';
      else if (!isValid && hasCharacter(targetPlayer, 'ZHAO_YUN')) isValid = card.name === 'SLASH';
    }
    if (!isValid) return _err(socket, 'การ์ดไม่ถูกต้อง');
    delete card.effectName;

    if (cardIdx !== -1) targetPlayer.hand.splice(cardIdx, 1);
    else if (equipSlot) {
      targetPlayer.equipment[equipSlot] = null;
      if (card.name === 'SILVER_LION_HELMET') targetPlayer.hp = Math.min(targetPlayer.maxHp, targetPlayer.hp + 1);
    }
    room.discardPile.push(card);

    const effectiveResponse = needsSlash ? (card.name === 'THUNDER_ATTACK' ? 'THUNDER_ATTACK' : 'SLASH')
      : pending.type === 'ZHOU_YU_DISCORD' ? card.name : card.name === 'NEGATE' ? 'NEGATE' : 'DODGE';
    const responseTarget = pending.type === 'WAITING_FOR_SLASH_DUEL'
      ? playerId === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId : pending.sourcePlayerId;
    emitCardPlay(room, playerId, card, { cardName: effectiveResponse, kind: 'RESPONSE', targetId: responseTarget });

    if (pending.type === 'WAITING_FOR_SLASH_DUEL') {
      pending.eightTrigramsUsed = false;
      pending.slashNeeded = (pending.slashNeeded || 1) - 1;
      if (pending.slashNeeded <= 0) {
        const nextSlashPlayerId = pending.currentPlayerToSlash === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId;
        const nextOpponent = room.players[pending.currentPlayerToSlash];
        const isNextOpponentLuBu = hasCharacter(nextOpponent, 'LV_BU') || hasCharacter(nextOpponent, 'LU_BU');
        pending.currentPlayerToSlash = nextSlashPlayerId;
        pending.slashNeeded = isNextOpponentLuBu ? 2 : 1;
        pending.timeoutAt = deadline(room);
        scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
        room._broadcastFn && room._broadcastFn();
        if (room.players[pending.currentPlayerToSlash]?.isBot) scheduleResponse(room, () => handleBotDuelSlash(room), 1200);
      } else {
        pending.timeoutAt = deadline(room);
        scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
        room._broadcastFn && room._broadcastFn();
        if (room.players[pending.currentPlayerToSlash]?.isBot) scheduleResponse(room, () => handleBotDuelSlash(room), 600);
      }
      return;
    }
    if (pending.type === 'WAITING_FOR_AOE') {
      pending.currentTargetIndex++;
      continueAOE(room, pending);
      return;
    }
    if (pending.type === 'DIAO_CHAN_SEDUCTION' || pending.type === 'ZHOU_YU_DISCORD') {
      room.pendingAction = null; room._broadcastFn && room._broadcastFn(); resumeAfterAttack(room);
    } else {
      pending.dodgeNeeded = (pending.dodgeNeeded || 1) - 1;
      if (pending.dodgeNeeded <= 0) {
        // Check after-dodge weapon hooks
        const attacker = pending.sourcePlayerId ? room.players[pending.sourcePlayerId] : null;
        if (attacker?.equipment?.weapon) {
          const wName = (attacker.equipment.weapon as Card).name;
          if (wName === 'GREEN_DRAGON_BLADE' && attacker.hand.length > 0) {
            room.pendingAction = { type: 'WAITING_FOR_GREEN_DRAGON', sourcePlayerId: attacker.id, targetPlayerId: pending.targetPlayerId, timeoutAt: deadline(room) };
            room._broadcastFn && room._broadcastFn(); return;
          }
          const equipCount = Object.values(attacker.equipment).filter((v: any) => v).length;
          if (wName === 'ROCK_CLEAVING_AXE' && (attacker.hand.length + equipCount) >= 3) {
            room.pendingAction = { type: 'WAITING_FOR_AXE_DISCARD', sourcePlayerId: attacker.id, targetPlayerId: pending.targetPlayerId, originalDamage: pending.damage, damageType: pending.damageType || 'NORMAL', cardUsedId: pending.cardUsedId, attack: pending.attack, timeoutAt: deadline(room) };
            room._broadcastFn && room._broadcastFn(); return;
          }
          if (wName === 'TWO_BLADED_TRIDENT' && attacker.hand.length >= 1) {
            room.pendingAction = { type: 'WAITING_FOR_TRIDENT_DISCARD', sourcePlayerId: attacker.id, targetPlayerId: pending.targetPlayerId, originalDamage: pending.damage, damageType: pending.damageType || 'NORMAL', cardUsedId: pending.cardUsedId, attack: pending.attack, timeoutAt: deadline(room) };
            room._broadcastFn && room._broadcastFn(); return;
          }
          if (wName === 'YIN_YANG_SWORDS') {
            const attackerHero = allHeroesData.find((h: any) => (h.title||h.name).toUpperCase().replace(/[^A-Z0-9]/g,'_') === attacker.character);
            const targetHero = allHeroesData.find((h: any) => (h.title||h.name).toUpperCase().replace(/[^A-Z0-9]/g,'_') === targetPlayer.character);
            const aGen = attackerHero?.gender || 'MALE';
            const tGen = targetHero?.gender || 'MALE';
            if (aGen !== tGen) {
              if (targetPlayer.hand.length === 0) { drawCards(room, 1).forEach((c: Card) => attacker.hand.push(c)); }
              else {
                room.pendingAction = { type: 'WAITING_FOR_YINYANG_CHOICE', sourcePlayerId: attacker.id, targetPlayerId: targetPlayer.id, timeoutAt: deadline(room) };
                room._broadcastFn && room._broadcastFn();
                if (targetPlayer.isBot) {
                  scheduleResponse(room, () => {
                    if (room.pendingAction?.type === 'WAITING_FOR_YINYANG_CHOICE') {
                      if (Math.random() > 0.5) { const rIdx = Math.floor(Math.random() * targetPlayer.hand.length); room.discardPile.push(targetPlayer.hand.splice(rIdx, 1)[0]); }
                      else { drawCards(room, 1).forEach((c: Card) => room.players[room.pendingAction!.sourcePlayerId!].hand.push(c)); }
                      room.pendingAction = null; resumeAfterAttack(room); room._broadcastFn && room._broadcastFn();
                    }
                  }, 1200);
                }
                return;
              }
            }
          }
        }
        room.pendingAction = null; room._broadcastFn && room._broadcastFn(); resumeAfterAttack(room);
      } else {
        pending.timeoutAt = deadline(room);
        scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
        room._broadcastFn && room._broadcastFn();
        if (targetPlayer.isBot) scheduleResponse(room, () => handleBotDodge(room, playerId, damage), 600);
      }
    }
  }

  if (response === 'TAKE_DAMAGE' || response === 'PASS') {
    if (pending.type === 'WAITING_FOR_SLASH_DUEL') {
      const damagedId = pending.currentPlayerToSlash;
      const atkId = damagedId === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId;
      const cu = getCardById(room, pending.cardUsedId);
      room.pendingAction = null;
      dealDamage(room, damagedId, 1, cu, atkId!);
      if (!room.pendingAction) resumeAfterAttack(room);
    } else if (pending.type === 'WAITING_FOR_AOE') {
      const cu = getCardById(room, pending.cardUsedId);
      pending.currentTargetIndex++;
      room.pendingAction = null;
      // Damage can suspend for dying/rescue or optional hero skills. Resume the
      // already-advanced AOE only after those windows have completed.
      let continued = false;
      room._actionContinuation = () => {
        if (continued || room.status !== 'PLAYING') return;
        continued = true;
        continueAOE(room, pending);
      };
      dealDamage(room, playerId, 1, cu, pending.sourcePlayerId!);
      if (!room.pendingAction) resumeAfterAttack(room);
      return;
    } else {
      const atkId = pending?.sourcePlayerId || undefined;
      const cu = pending ? getCardById(room, pending.cardUsedId) : null;
      const dmg = pending?.damage || 1;
      const dt = pending?.damageType || 'NORMAL';

      // FROST_SWORD on-hit
      const attacker = atkId ? room.players[atkId] : null;
      if (attacker?.equipment?.weapon && (attacker.equipment.weapon as Card).name === 'FROST_SWORD') {
        const totalCards = (targetPlayer.hand?.length || 0) + Object.values(targetPlayer.equipment||{}).filter((v: any) => v).length;
        if (totalCards > 0) {
          room.pendingAction = { type: 'WAITING_FOR_FROST_DISCARD', sourcePlayerId: atkId, targetPlayerId: playerId, originalDamage: dmg, damageType: dt, cardUsedId: pending?.cardUsedId ? String(pending.cardUsedId) : undefined, attack: pending.attack, timeoutAt: deadline(room) };
          room._broadcastFn && room._broadcastFn();
          return;
        }
      }
      room.pendingAction = null;
      dealDamage(room, playerId, dmg, cu, atkId!, dt as any, pending.attack);
      if (!room.pendingAction) resumeAfterAttack(room);
    }
  }

  room._broadcastFn && room._broadcastFn();
  const currentId = room.turnOrder[room.currentTurnIndex];
  if (room.players[currentId]?.isBot && room.status === 'PLAYING') {
    const { runBotTurn } = require('./botAI');
    schedule(room, () => runBotTurn(room, currentId), 1000);
  }
}

// ─── helpers ──────────────────────────────────────────────────────────────────
function _getPlayerIdBySocket(room: GameRoom, socketId: string | undefined): string | null {
  if (!socketId) return null;
  return Object.keys(room.players).find((pId: string) => room.players[pId].socketId === socketId) || null;
}

function _err(socket: SocketLike | null, message: string): void {
  if (socket?.emit) socket.emit('game_error', { message });
  else if (socket) socket.send!('game_error', { message }); // Colyseus client
}

export {
  startNegateWindow, resolveActionChain, executeOriginalAction,
  handleUseCard, handleResolvePending, resolvePendingAction, scheduleResponse, attackDistance,
};
