'use strict';
/**
 * game/botAI.ts
 * Bot AI brain — runBotTurn + all bot response handlers
 */

import { hasCharacter, calculateDistance, drawCards, checkDiscardRequirement } from './phaseLogic';
import { dealDamage, resumeAfterAttack } from './combatLogic';
import type { GameRoom, Player, Card } from './types';
import { RULES } from '../shared/catalog';
import { deadline, schedule } from './runtime';
import { emitCardPlay, emitHeroSkill } from './presentationEvents';
import { scheduleResponse, resolvePendingAction, handleResolvePending, handleUseCard, attackDistance } from './cardLogic';

// ─── Bot wants to attack helper ───────────────────────────────────────────────
function botWantsToAttack(bot: Player, target: Player, room: GameRoom): boolean {
  if (bot.id === target.id || !target.isAlive) return false;
  if (bot.role === 'LORD' || bot.role === 'LOYALIST') return target.role === 'REBEL' || target.role === 'RENEGADE';
  if (bot.role === 'REBEL') return target.role === 'LORD' || target.role === 'LOYALIST';
  if (bot.role === 'RENEGADE') {
    const rebelsAlive = Object.values(room.players).some((p: Player) => p.isAlive && p.role === 'REBEL');
    if (rebelsAlive) return target.role === 'REBEL';
    const loyalistsAlive = Object.values(room.players).some((p: Player) => p.isAlive && p.role === 'LOYALIST');
    if (loyalistsAlive) return target.role === 'LOYALIST';
    return target.role === 'LORD';
  }
  return false;
}

// ─── Main Bot Turn ────────────────────────────────────────────────────────────
function runBotTurn(room: GameRoom, botId: string): void {
  const bot = room.players[botId];
  if (!bot?.isBot || !bot.isAlive || room.status !== 'PLAYING' || room.pendingAction || room.currentPhase !== 'PLAY' || room.turnOrder[room.currentTurnIndex] !== botId) return;

  const isTestRoom = room.roomId === 'ROOM_TEST' || room.roomId.startsWith('ROOM_TEST');
  if (room.isBotPassive || (isTestRoom && room.isBotPassive !== false)) {
    console.log(`🤖 Bot Passive Mode: ${bot.name} stays passive.`);
    return;
  }
  if (room._botHeroAction?.(bot)) return;

  let actionTaken = false;

  // 0. Huang Gai Ku Rou if HP >= 3
  if (!actionTaken && hasCharacter(bot, 'HUANG_GAI') && bot.hp >= 3) {
    bot.hp -= 1;
    drawCards(room, 2).forEach((c: Card) => bot.hand.push(c));
    emitHeroSkill(room, botId, 'KUROU');
    room._broadcastFn && room._broadcastFn();
    actionTaken = true;
  }

  // 1. Heal with PEACH if damaged
  if (!actionTaken && bot.hp < bot.maxHp) {
    const peachIdx = bot.hand.findIndex((c: Card) => c.name === 'PEACH');
    if (peachIdx !== -1) {
      const card = bot.hand.splice(peachIdx, 1)[0];
      room.discardPile.push(card);
      bot.hp += 1;
      emitCardPlay(room, botId, card, { cardName: 'PEACH', targetId: botId });
      actionTaken = true;
    }
  }

  // 2. EX_NIHILO draw 2
  if (!actionTaken) {
    const idx = bot.hand.findIndex((c: Card) => c.name === 'EX_NIHILO');
    if (idx !== -1) {
      handleUseCard(room, null, { playerId: botId, cardId: bot.hand[idx].id });
      return;
    }
  }

  // 3. Equip Weapon
  if (!actionTaken) {
    const WEAPONS = ['ZHUGE_CROSSBOW','BLUE_STEEL_SWORD','SIX_SWORDS_WU','KIRIN_BOW','FEATHERED_FAN','SERPENT_SPEAR','FROST_SWORD','TWO_BLADED_TRIDENT','ROCK_CLEAVING_AXE','GREEN_DRAGON_BLADE','SKY_PIERCING_HALBERD','YIN_YANG_SWORDS'];
    const WEAPON_RANGE: Record<string, number> = { 'ZHUGE_CROSSBOW':1,'BLUE_STEEL_SWORD':2,'SIX_SWORDS_WU':2,'KIRIN_BOW':5,'FEATHERED_FAN':4,'SERPENT_SPEAR':3,'FROST_SWORD':2,'TWO_BLADED_TRIDENT':3,'ROCK_CLEAVING_AXE':3,'GREEN_DRAGON_BLADE':3,'SKY_PIERCING_HALBERD':4,'YIN_YANG_SWORDS':2 };
    const wIdx = bot.hand.findIndex((c: Card) => WEAPONS.includes(c.name));
    if (wIdx !== -1) {
      const w = bot.hand[wIdx];
      if (!bot.equipment.weapon || (bot.equipment.weapon as Card).name !== w.name) {
        bot.hand.splice(wIdx, 1);
        if (bot.equipment.weapon) room.discardPile.push(bot.equipment.weapon as Card);
        w.range = WEAPON_RANGE[w.name] || 1;
        bot.equipment.weapon = w;
        emitCardPlay(room, botId, w);
        actionTaken = true;
      }
    }
  }

  // 3b. Equip Horse
  if (!actionTaken) {
    const hIdx = bot.hand.findIndex((c: Card) => ['RED_HARE','LIGHTNING_HOOF','FERGANA_STEED','SHADOWRUNNER'].includes(c.name));
    if (hIdx !== -1) {
      const h = bot.hand[hIdx];
      const isOff = h.name === 'RED_HARE' || h.name === 'FERGANA_STEED';
      if (isOff && !bot.equipment.offensiveHorse) {
        bot.hand.splice(hIdx, 1); bot.equipment.offensiveHorse = h; actionTaken = true;
        emitCardPlay(room, botId, h);
      } else if (!isOff && !bot.equipment.defensiveHorse) {
        bot.hand.splice(hIdx, 1); bot.equipment.defensiveHorse = h; actionTaken = true;
        emitCardPlay(room, botId, h);
      }
    }
  }

  // 3c. Equip Armor
  if (!actionTaken) {
    const aIdx = bot.hand.findIndex((c: Card) => ['NIO_SHIELD','EIGHT_TRIGRAMS_FORMATION','SILVER_LION_HELMET','RATTAN_ARMOR'].includes(c.name));
    if (aIdx !== -1) {
      const arm = bot.hand[aIdx];
      if (!bot.equipment.armor || (bot.equipment.armor as Card).name !== arm.name) {
        bot.hand.splice(aIdx, 1);
        if (bot.equipment.armor) {
          room.discardPile.push(bot.equipment.armor as Card);
          if ((bot.equipment.armor as Card).name === 'SILVER_LION_HELMET') bot.hp = Math.min(bot.maxHp, bot.hp + 1);
        }
        bot.equipment.armor = arm;
        emitCardPlay(room, botId, arm);
        actionTaken = true;
      }
    }
  }

  // Tactical cards use exactly the same target/cost/negation path as players.
  if (!actionTaken) {
    const aoe = bot.hand.find(c => ['BARBARIAN_INVASION', 'ARROW_BARRAGE'].includes(c.name));
    if (aoe && room.turnOrder.some(id => id !== botId && room.players[id]?.isAlive)) {
      handleUseCard(room, null, { playerId: botId, cardId: aoe.id });
      return;
    }
    for (const name of ['ACEDIA', 'STARVATION', 'SABOTAGE', 'STEAL', 'DUEL']) {
      const card = bot.hand.find(c => c.name === name);
      if (!card) continue;
      for (const pid of room.turnOrder) {
        const target = room.players[pid];
        if (!target || !botWantsToAttack(bot, target, room)) continue;
        if (['ACEDIA', 'STARVATION'].includes(name) && target.delayedKitZone?.some(c => c.name === name)) continue;
        if (name === 'STEAL' && calculateDistance(room, botId, pid) > 1) continue;
        if (name === 'DUEL' && hasCharacter(target, 'ZHUGE_LIANG') && !target.hand.length) continue;
        const targetZone = target.hand.length ? 'HAND' : target.equipment.weapon ? 'WEAPON' : target.equipment.armor ? 'ARMOR' : target.equipment.defensiveHorse ? 'DEF_HORSE' : target.equipment.offensiveHorse ? 'OFF_HORSE' : target.equipment.treasure ? 'TREASURE' : target.delayedKitZone?.length ? 'DELAYED' : null;
        if (['STEAL', 'SABOTAGE'].includes(name) && !targetZone) continue;
        handleUseCard(room, null, { playerId: botId, cardId: card.id, targetPlayerId: pid, targetZone });
        if (room.pendingAction) return;
      }
    }
  }

  // 5. Wine buff before SLASH
  if (!actionTaken) {
    const hasWine = bot.hand.some((c: Card) => c.name === 'WINE');
    const hasSlash = responseCards(bot, true).length > 0;
    if (hasWine && hasSlash && !bot.wineActive) {
      const weaponRange = (bot.equipment?.weapon as Card)?.range || 1;
      const enemyInRange = room.turnOrder.some((pid: string) => {
        const t = room.players[pid];
        return botWantsToAttack(bot, t, room) && calculateDistance(room, botId, pid) <= weaponRange;
      });
      if (enemyInRange) {
        const wIdx = bot.hand.findIndex((c: Card) => c.name === 'WINE');
        const wCard = bot.hand.splice(wIdx, 1)[0];
        room.discardPile.push(wCard);
        bot.wineActive = true;
        emitCardPlay(room, botId, wCard);
        actionTaken = true;
      }
    }
  }

  // 6. SLASH / THUNDER_ATTACK
  if (!actionTaken) {
    const slashCard = bot.hand.find((c: Card) => c.name === 'SLASH' || c.name === 'THUNDER_ATTACK') || responseCards(bot, true)[0];
    if (slashCard) {
      const equipSlot = Object.keys(bot.equipment).find(slot => (bot.equipment[slot] as Card)?.id === slashCard.id);
      const weaponRange = equipSlot === 'weapon' ? 1 : (bot.equipment?.weapon as Card)?.range || 1;
      const hasZhuge = equipSlot !== 'weapon' && (bot.equipment?.weapon as Card)?.name === 'ZHUGE_CROSSBOW';
      const isZhangFei = hasCharacter(bot, 'ZHANG_FEI');
      const maxTargets = !equipSlot && bot.hand.length === 1 && (bot.equipment.weapon as Card)?.name === 'SKY_PIERCING_HALBERD' ? 3 : 1;
      const targets = room.turnOrder.filter(pid => {
        const target = room.players[pid];
        return target && botWantsToAttack(bot, target, room) && attackDistance(room, botId, pid, equipSlot) <= weaponRange && !(hasCharacter(target, 'ZHUGE_LIANG') && !target.hand.length);
      }).slice(0, maxTargets);
      if (targets.length && (room.attacksPlayedInTurn === 0 || hasZhuge || isZhangFei)) {
        handleUseCard(room, null, { playerId: botId, cardId: slashCard.id, targetPlayerId: targets[0], targetPlayerIds: targets, playAs: ['SLASH', 'THUNDER_ATTACK'].includes(slashCard.name) ? undefined : 'SLASH' });
        return;
      }
    }
  }

  if (actionTaken) {
    schedule(room, () => runBotTurn(room, botId), 1200);
  } else {
    room.currentPhase = 'DISCARD' as any;
    checkDiscardRequirement(room);
  }
}

// ─── Bot Response Handlers ────────────────────────────────────────────────────
function responseCards(bot: Player, slash: boolean): Card[] {
  const cards = bot.hand.filter(c => slash
    ? c.name === 'SLASH' || c.name === 'THUNDER_ATTACK' || (hasCharacter(bot, 'ZHAO_YUN') && c.name === 'DODGE') || (hasCharacter(bot, 'GUAN_YU') && (c.suit === 'HEART' || c.suit === 'DIAMOND'))
    : c.name === 'DODGE' || (hasCharacter(bot, 'ZHAO_YUN') && c.name === 'SLASH') || (hasCharacter(bot, 'ZHEN_JI') && (c.suit === 'SPADE' || c.suit === 'CLUB')));
  if (slash && hasCharacter(bot, 'GUAN_YU')) for (const value of Object.values(bot.equipment)) {
    const card = value as Card | null;
    if (card?.id && (card.suit === 'HEART' || card.suit === 'DIAMOND')) cards.push(card);
  }
  return cards;
}

function handleBotDodge(room: GameRoom, botId: string, _damage: number): void {
  const pending = room.pendingAction;
  const bot = room.players[botId];
  if (!bot?.isBot || !bot.isAlive || pending?.type !== 'WAITING_FOR_DODGE' || pending.targetPlayerId !== botId) return;
  if (pending.timeoutAt && pending.timeoutAt <= Date.now()) { resolvePendingAction(room, pending); return; }
  if ((bot.equipment?.armor as Card)?.name === 'EIGHT_TRIGRAMS_FORMATION' && !pending.eightTrigramsUsed && (room.players[pending.sourcePlayerId!]?.equipment.weapon as Card)?.name !== 'BLUE_STEEL_SWORD') {
    handleResolvePending(room, null, { playerId: botId, response: 'EIGHT_TRIGRAMS' });
    return;
  }
  const card = responseCards(bot, false)[0];
  if (!card && room._botLordResponse?.(bot, 'DODGE')) return;
  handleResolvePending(room, null, { playerId: botId, response: card ? 'USE_CARD' : 'PASS', cardId: card?.id });
}

function handleBotDuelSlash(room: GameRoom): void {
  const pending = room.pendingAction;
  if (pending?.type !== 'WAITING_FOR_SLASH_DUEL') return;
  const bot = room.players[pending.currentPlayerToSlash];
  if (!bot?.isBot || !bot.isAlive) return;
  if (pending.timeoutAt && pending.timeoutAt <= Date.now()) { resolvePendingAction(room, pending); return; }
  const cards = responseCards(bot, true);
  const card = cards.length >= (pending.slashNeeded || 1) ? cards[0] : null;
  if (!card && room._botLordResponse?.(bot, 'SLASH')) return;
  handleResolvePending(room, null, { playerId: bot.id, response: card ? 'USE_CARD' : 'PASS', cardId: card?.id });
}

function handleBotAOE(room: GameRoom): void {
  const pending = room.pendingAction;
  if (pending?.type !== 'WAITING_FOR_AOE') return;
  const bot = room.players[pending.targets[pending.currentTargetIndex]];
  if (!bot?.isAlive) {
    handleResolvePending(room, null, { playerId: pending.targets[pending.currentTargetIndex], response: 'PASS' });
    return;
  }
  // This handler must never consume a human's defense after another target passes.
  if (!bot.isBot) return;
  if (pending.timeoutAt && pending.timeoutAt <= Date.now()) { resolvePendingAction(room, pending); return; }
  const slash = pending.aoeType === 'BARBARIAN_INVASION';
  if (!slash && (bot.equipment?.armor as Card)?.name === 'EIGHT_TRIGRAMS_FORMATION' && !pending.eightTrigramsUsed) {
    handleResolvePending(room, null, { playerId: bot.id, response: 'EIGHT_TRIGRAMS' });
    return;
  }
  const card = responseCards(bot, slash)[0];
  if (!card && room._botLordResponse?.(bot, slash ? 'SLASH' : 'DODGE')) return;
  handleResolvePending(room, null, { playerId: bot.id, response: card ? 'USE_CARD' : 'PASS', cardId: card?.id });
}

function handleBotSeduction(room: GameRoom, botId: string): void {
  const bot = room.players[botId];
  if (!bot?.isBot || !bot.isAlive || room.pendingAction?.type !== 'DIAO_CHAN_SEDUCTION' || room.pendingAction.targetPlayerId !== botId) return;
  const slashIdx = bot.hand.findIndex((c: Card) => c.name === 'SLASH');
  if (slashIdx !== -1) {
    const card = bot.hand.splice(slashIdx, 1)[0];
    delete card.effectName;
    room.discardPile.push(card);
    room.pendingAction = null;
    room._broadcastFn && room._broadcastFn();
    resumeAfterAttack(room);
  } else {
    const atkId = room.pendingAction?.sourcePlayerId || null;
    room.pendingAction = null;
    dealDamage(room, botId, 1, null, atkId!);
    if (!room.pendingAction) resumeAfterAttack(room);
  }
}

function handleBotZhouYu(room: GameRoom, botId: string, requiredColor: string): void {
  const bot = room.players[botId];
  if (!bot?.isBot || !bot.isAlive || room.pendingAction?.type !== 'ZHOU_YU_DISCORD' || room.pendingAction.targetPlayerId !== botId) return;
  const matchingIdx = bot.hand.findIndex((c: Card) => {
    const color = (c.suit === 'HEART' || c.suit === 'DIAMOND') ? 'RED' : 'BLACK';
    return color === requiredColor;
  });
  if (matchingIdx !== -1) {
    const card = bot.hand.splice(matchingIdx, 1)[0];
    room.discardPile.push(card);
    room.pendingAction = null;
    room._broadcastFn && room._broadcastFn();
    resumeAfterAttack(room);
  } else {
    const atkId = room.pendingAction?.sourcePlayerId || null;
    room.pendingAction = null;
    dealDamage(room, botId, 1, null, atkId!);
    if (!room.pendingAction) resumeAfterAttack(room);
  }
}

function handleBotBumperPick(room: GameRoom): void {
  if (!room.pendingAction || room.pendingAction.type !== 'WAITING_FOR_BUMPER_PICK') return;
  const pickerId = room.pendingAction.currentPickerId;
  const picker = room.players[pickerId];
  if (!picker?.isBot || !room.bumperHarvestCards?.length) return;

  const rIdx = Math.floor(Math.random() * room.bumperHarvestCards.length);
  const picked = room.bumperHarvestCards.splice(rIdx, 1)[0];
  picker.hand.push(picked);

  room.chat = room.chat || [];
  room.chat.push({ sender: 'System', text: `${picker.name} เลือก ${picked.name}(${picked.suit}) จากเสบียงอุดมสมบูรณ์`, time: new Date().toLocaleTimeString('th-TH') });

  if (room.bumperHarvestCards.length > 0) {
    const myIdx = room.turnOrder.indexOf(pickerId);
    let nextPickerId: string | null = null;
    for (let i = 1; i < room.turnOrder.length; i++) {
      const tid = room.turnOrder[(myIdx + i) % room.turnOrder.length];
      if (room.players[tid]?.isAlive) { nextPickerId = tid; break; }
    }
    if (nextPickerId) {
      room.pendingAction.currentPickerId = nextPickerId;
      room.pendingAction.timeoutAt = deadline(room);
      scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
      room._broadcastFn && room._broadcastFn();
      if (room.players[nextPickerId]?.isBot) scheduleResponse(room, () => handleBotBumperPick(room), 1200);
    } else {
      room.discardPile.push(...room.bumperHarvestCards);
      room.bumperHarvestCards = [];
      room.pendingAction = null;
      resumeAfterAttack(room);
      room._broadcastFn && room._broadcastFn();
    }
  } else {
    room.bumperHarvestCards = [];
    room.pendingAction = null;
    resumeAfterAttack(room);
    room._broadcastFn && room._broadcastFn();
  }
}

function handleBotBorrowSlash(room: GameRoom): void {
  const pending = room.pendingAction;
  if (!pending || pending.type !== 'WAITING_FOR_BORROW_SLASH') return;
  const botId = pending.targetPlayerId!;
  const bot = room.players[botId];
  if (!bot?.isBot || !bot.isAlive) return;
  if (pending.timeoutAt && pending.timeoutAt <= Date.now()) { resolvePendingAction(room, pending); return; }

  const slashIdx = bot.hand.findIndex((c: Card) => c.name === 'SLASH' || c.name === 'THUNDER_ATTACK' || (hasCharacter(bot, 'ZHAO_YUN') && c.name === 'DODGE') || (hasCharacter(bot, 'GUAN_YU') && (c.suit === 'HEART' || c.suit === 'DIAMOND')));
  if (slashIdx !== -1) {
    const card = bot.hand.splice(slashIdx, 1)[0];
    card.effectName = card.name === 'THUNDER_ATTACK' ? 'THUNDER_ATTACK' : 'SLASH';
    room.discardPile.push(card);
    emitCardPlay(room, botId, card, { cardName: card.effectName, kind: 'RESPONSE', targetId: pending.victimId });
    const damage = bot.wineActive ? 2 : 1;
    bot.wineActive = false;
    const dodgeNeeded = (hasCharacter(bot, 'LV_BU') || hasCharacter(bot, 'LU_BU')) ? 2 : 1;
    room.pendingAction = {
      type: 'WAITING_FOR_DODGE', sourcePlayerId: botId, targetPlayerId: pending.victimId,
      damage, cardUsedId: card.id, originalAttackerId: pending.sourcePlayerId,
      dodgeNeeded, damageType: card.name === 'THUNDER_ATTACK' ? 'THUNDER' : (bot.equipment?.weapon as Card)?.name === 'FEATHERED_FAN' ? 'FIRE' : 'NORMAL',
      timeoutAt: deadline(room)
    };
    room._broadcastFn && room._broadcastFn();
    scheduleResponse(room, () => resolvePendingAction(room), RULES.reactionMs);
    const playerC = room.players[pending.victimId!];
    if (playerC?.isBot) scheduleResponse(room, () => handleBotDodge(room, pending.victimId!, damage), 1200);
  } else {
    if (room._botLordResponse?.(bot, 'SLASH')) return;
    const playerA = room.players[pending.sourcePlayerId!];
    if (bot.equipment?.weapon && playerA) {
      const w = bot.equipment.weapon as Card;
      playerA.hand.push(w);
      bot.equipment.weapon = null;
      if (w.name === 'SILVER_LION_HELMET') bot.hp = Math.min(bot.maxHp, bot.hp + 1);
    }
    room.pendingAction = null;
    resumeAfterAttack(room);
    room._broadcastFn && room._broadcastFn();
  }
}

export {
  runBotTurn, botWantsToAttack,
  handleBotDodge, handleBotDuelSlash, handleBotAOE,
  handleBotSeduction, handleBotZhouYu,
  handleBotBumperPick, handleBotBorrowSlash,
};
