'use strict';
/**
 * game/combatLogic.ts
 * dealDamage, checkGameOver, dying phase, helper functions
 */

import { hasCharacter, drawCards, endPlayerTurn, checkDiscardRequirement } from './phaseLogic';
import type { GameRoom, Player, Card, DamageType } from './types';

// ─── Game Over Check ──────────────────────────────────────────────────────────
function checkGameOver(room: GameRoom): boolean {
  const lord = Object.values(room.players).find((p: Player) => p.role === 'LORD');
  if (!lord) return false;

  const rebels    = Object.values(room.players).filter((p: Player) => p.role === 'REBEL');
  const renegades = Object.values(room.players).filter((p: Player) => p.role === 'RENEGADE');
  const aliveRebels    = rebels.filter((p: Player) => p.isAlive).length;
  const aliveRenegades = renegades.filter((p: Player) => p.isAlive).length;

  if (!lord.isAlive) {
    room.status = 'ENDED' as any;
    const totalAlive = Object.values(room.players).filter((p: Player) => p.isAlive).length;
    if (totalAlive === 1 && aliveRenegades === 1) {
      room.winnerRole = 'RENEGADE';
      room.winnerText = 'คนทรยศ (Renegade) เป็นผู้เหลือรอดคนสุดท้ายและเอาชนะการศึก!';
    } else {
      room.winnerRole = 'REBEL';
      room.winnerText = 'ฝ่ายกบฏ (Rebels) สังหารเจ้าเมืองสำเร็จและชนะการศึก!';
    }
    return true;
  }

  if (aliveRebels === 0 && aliveRenegades === 0) {
    room.status = 'ENDED' as any;
    room.winnerRole = 'LORD';
    room.winnerText = 'ฝ่ายเจ้าเมืองและผู้ภักดี (Lord & Loyalists) ปราบปรามกบฏสำเร็จและชนะการศึก!';
    return true;
  }
  return false;
}

// ─── Damage Log ───────────────────────────────────────────────────────────────
function logDamage(targetName: string, damage: number, hp: number, maxHp: number, attackerName?: string, cardName?: string): void {
  let msg = `💥 ${targetName} เสียพลังชีวิต ${damage} หน่วย`;
  if (attackerName) msg += ` จาก ${attackerName}`;
  if (cardName) msg += ` (${cardName})`;
  msg += ` (พลังชีวิต: ${hp}/${maxHp})`;
  console.log(msg);
}

// ─── Deal Damage ──────────────────────────────────────────────────────────────
function dealDamage(room: GameRoom, targetPlayerId: string, damage: number, cardUsed: Card | null, attackerId: string | null, damageType: DamageType = 'NORMAL'): void {
  const targetPlayer = room.players[targetPlayerId];
  if (!targetPlayer || !targetPlayer.isAlive) return;

  let finalDamage = damage;
  const attacker = attackerId && room.players[attackerId] ? room.players[attackerId] : null;
  const attackerHasBlueSteel = attacker?.equipment?.weapon?.name === 'BLUE_STEEL_SWORD';

  // Armor processing
  if (!attackerHasBlueSteel && targetPlayer.equipment?.armor) {
    const armorName = (targetPlayer.equipment.armor as Card).name;
    if (armorName === 'SILVER_LION_HELMET' && finalDamage > 1) {
      finalDamage = 1;
    }
    if (armorName === 'NIO_SHIELD' && cardUsed?.name === 'SLASH' &&
        (cardUsed.suit === 'SPADE' || cardUsed.suit === 'CLUB')) {
      return; // blocked
    }
    if (armorName === 'RATTAN_ARMOR') {
      if (damageType === 'FIRE') {
        finalDamage += 1;
      } else if (damageType === 'NORMAL' && (!cardUsed || ['SLASH', 'ARROW_BARRAGE', 'BARBARIAN_INVASION'].includes(cardUsed.name))) {
        return; // nullified
      }
    }
  }

  targetPlayer.hp -= finalDamage;
  logDamage(targetPlayer.name, finalDamage, targetPlayer.hp, targetPlayer.maxHp,
            attacker?.name, cardUsed?.name);

  // Emit damage_log to all
  room._emitAll && room._emitAll('damage_log', {
    targetId: targetPlayerId,
    attackerId,
    damage: finalDamage,
    cardName: cardUsed?.name || null,
    hp: targetPlayer.hp,
    maxHp: targetPlayer.maxHp
  });

  // Chain reaction for elemental
  if (targetPlayer.isChained && (damageType === 'FIRE' || damageType === 'THUNDER')) {
    targetPlayer.isChained = false;
    room.turnOrder.forEach((pid: string) => {
      if (pid !== targetPlayerId && room.players[pid]?.isAlive && room.players[pid].isChained) {
        room.players[pid].isChained = false;
        dealDamage(room, pid, finalDamage, cardUsed, attackerId, damageType);
      }
    });
  }

  // Cao Cao: Emperor's Domain
  if (hasCharacter(targetPlayer, 'CAO_CAO') && cardUsed && !['PEACH', 'WINE'].includes(cardUsed.name)) {
    targetPlayer.hand.push(cardUsed);
    const discardIdx = room.discardPile.findIndex((c: Card) => c.id === cardUsed.id);
    if (discardIdx !== -1) room.discardPile.splice(discardIdx, 1);
    room._emitAll && room._emitAll('card_played', { playerId: targetPlayerId, cardName: "สกิล Emperor's Domain", targetId: attackerId });
  }

  // Sima Yi: Feedback
  if (hasCharacter(targetPlayer, 'SIMA_YI') && attackerId && attacker?.hand?.length! > 0) {
    const randIdx = Math.floor(Math.random() * attacker!.hand.length);
    const stolen = attacker!.hand.splice(randIdx, 1)[0];
    targetPlayer.hand.push(stolen);
    room._emitAll && room._emitAll('card_played', { playerId: targetPlayerId, cardName: 'สกิล Feedback', targetId: attackerId });
  }

  // KIRIN_BOW: destroy target's horse on hit
  if (attacker?.equipment?.weapon?.name === 'KIRIN_BOW') {
    let destroyedHorse: Card | string | null = null;
    if (targetPlayer.equipment?.offensiveHorse) {
      destroyedHorse = targetPlayer.equipment.offensiveHorse;
      targetPlayer.equipment.offensiveHorse = null;
    } else if (targetPlayer.equipment?.defensiveHorse) {
      destroyedHorse = targetPlayer.equipment.defensiveHorse;
      targetPlayer.equipment.defensiveHorse = null;
    }
    if (destroyedHorse) room.discardPile.push(destroyedHorse as Card);
  }

  if (targetPlayer.hp <= 0) {
    startDyingPhase(room, targetPlayerId, attackerId);
  } else {
    room._broadcastFn && room._broadcastFn();
  }
}

// ─── Dying Phase ──────────────────────────────────────────────────────────────
function startDyingPhase(room: GameRoom, dyingPlayerId: string, attackerId: string | null = null): void {
  const dyingPlayer = room.players[dyingPlayerId];
  const needed = 1 - dyingPlayer.hp;
  room.pendingAction = {
    type: 'DYING',
    targetPlayerId: dyingPlayerId,
    attackerId,
    peachNeeded: needed,
    currentAskerIdx: room.turnOrder.indexOf(dyingPlayerId),
    timeoutAt: Date.now() + 15000
  };
  console.log(`${dyingPlayer.name} enters dying state. Peach needed: ${needed}`);
  room._broadcastFn && room._broadcastFn();
  checkDyingAskerBot(room);
}

function checkDyingAskerBot(room: GameRoom): void {
  if (!room.pendingAction || room.pendingAction.type !== 'DYING') return;
  const pending = room.pendingAction;
  const askerId = room.turnOrder[pending.currentAskerIdx];
  const asker = room.players[askerId];

  if (asker?.isAlive && asker.isBot) {
    setTimeout(() => {
      if (!room.pendingAction || room.pendingAction.type !== 'DYING') return;
      const dyingPlayer = room.players[pending.targetPlayerId!];
      let shouldSave = (askerId === pending.targetPlayerId);
      if (!shouldSave && (asker.role === 'LORD' || asker.role === 'LOYALIST') && dyingPlayer?.role === 'LORD') {
        shouldSave = true;
      }

      let peachIdx = asker.hand.findIndex((c: Card) => c.name === 'PEACH');
      if (askerId === pending.targetPlayerId && peachIdx === -1) {
        peachIdx = asker.hand.findIndex((c: Card) => c.name === 'WINE');
      }

      if (shouldSave && peachIdx !== -1) {
        const card = asker.hand.splice(peachIdx, 1)[0];
        room.discardPile.push(card);
        dyingPlayer.hp += 1;
        pending.peachNeeded -= 1;

        if (pending.peachNeeded <= 0) {
          room.pendingAction = null;
          room._broadcastFn && room._broadcastFn();
          resumeAfterAttack(room);
        } else {
          checkDyingAskerBot(room);
        }
      } else {
        advanceDyingAsker(room);
      }
    }, 1000);
  } else if (asker?.isAlive && !asker.isBot) {
    // Human timeout
    setTimeout(() => {
      if (room.pendingAction?.type === 'DYING' && room.pendingAction.currentAskerIdx === pending.currentAskerIdx) {
        advanceDyingAsker(room);
      }
    }, 15000);
  }
}

function advanceDyingAsker(room: GameRoom): void {
  if (!room.pendingAction || room.pendingAction.type !== 'DYING') return;
  const pending = room.pendingAction;
  const startingIdx = room.turnOrder.indexOf(pending.targetPlayerId!);

  do {
    pending.currentAskerIdx = (pending.currentAskerIdx + 1) % room.turnOrder.length;
  } while (
    pending.currentAskerIdx !== startingIdx &&
    room.players[room.turnOrder[pending.currentAskerIdx]] &&
    !room.players[room.turnOrder[pending.currentAskerIdx]].isAlive
  );

  if (pending.currentAskerIdx === startingIdx) {
    // No one saved them — player dies
    const dyingPlayer = room.players[pending.targetPlayerId!];
    dyingPlayer.isAlive = false;
    dyingPlayer.hp = 0;

    // Discard all cards
    if (dyingPlayer.hand) { room.discardPile.push(...dyingPlayer.hand); dyingPlayer.hand = []; }
    if (dyingPlayer.delayedKitZone) { room.discardPile.push(...dyingPlayer.delayedKitZone); dyingPlayer.delayedKitZone = []; }
    if (dyingPlayer.equipment) {
      (['weapon', 'armor', 'defensiveHorse', 'offensiveHorse', 'treasure'] as const).forEach(slot => {
        if (dyingPlayer.equipment[slot]) { room.discardPile.push(dyingPlayer.equipment[slot] as Card); dyingPlayer.equipment[slot] = null; }
      });
    }

    // Rewards & Punishments
    if (pending.attackerId && room.players[pending.attackerId]) {
      const killer = room.players[pending.attackerId];
      if (dyingPlayer.role === 'REBEL') {
        drawCards(room, 3).forEach((c: Card) => killer.hand.push(c));
        console.log(`${killer.name} drew 3 cards for killing a REBEL.`);
      } else if (killer.role === 'LORD' && dyingPlayer.role === 'LOYALIST') {
        room.discardPile.push(...killer.hand);
        killer.hand = [];
        (['weapon', 'armor', 'defensiveHorse', 'offensiveHorse', 'treasure'] as const).forEach(slot => {
          if (killer.equipment[slot]) { room.discardPile.push(killer.equipment[slot] as Card); killer.equipment[slot] = null; }
        });
        console.log(`Lord ${killer.name} killed a LOYALIST and lost all cards.`);
      }
    }

    room.pendingAction = null;
    console.log(`${dyingPlayer.name} has died`);

    const isGameOver = checkGameOver(room);
    room._broadcastFn && room._broadcastFn();
    if (!isGameOver) {
      if (room.turnOrder[room.currentTurnIndex] === pending.targetPlayerId) {
        endPlayerTurn(room);
      } else {
        resumeAfterAttack(room);
      }
    }
  } else {
    const nextAskerId = room.turnOrder[pending.currentAskerIdx];
    const nextAsker = room.players[nextAskerId];
    if (!nextAsker || !nextAsker.isAlive) {
      advanceDyingAsker(room);
    } else {
      room._broadcastFn && room._broadcastFn();
      checkDyingAskerBot(room);
    }
  }
}

function resumeAfterAttack(room: GameRoom): void {
  if (room.status !== 'PLAYING') return;
  const attackerId = room.turnOrder[room.currentTurnIndex];
  const attacker = room.players[attackerId];
  if (attacker?.isBot) {
    setTimeout(() => {
      const { runBotTurn } = require('./botAI');
      runBotTurn(room, attackerId);
    }, 1000);
  }
}

function getCardById(room: GameRoom, cardId: string | null | undefined): Card | null {
  if (!cardId) return null;
  for (const p of Object.values(room.players)) {
    const c = p.hand?.find((x: Card) => x.id === cardId);
    if (c) return c;
  }
  return room.discardPile.find((x: Card) => x.id === cardId) || null;
}

export {
  checkGameOver, dealDamage, startDyingPhase,
  checkDyingAskerBot, advanceDyingAsker, resumeAfterAttack, getCardById,
};
