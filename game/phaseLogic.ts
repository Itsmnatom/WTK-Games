'use strict';
/**
 * game/phaseLogic.ts
 * Deck management, turn phases, draw/play/discard phase controllers
 */

import { CARDS, HEROES, HERO_BY_ID, canonicalHero, RULES, shuffle, seededRandom } from '../shared/catalog';
import { schedule } from './runtime';
import { emitHeroSkill } from './presentationEvents';
import { claimJudgment } from './expandedHeroes';
import { experimental, beginStrategies, balanceSummary } from './experimental';
import type { Card, Suit, GameRoom, Player, HeroChoice, PendingAction } from './types';

const allHeroes: HeroChoice[] = HEROES.map(hero => ({
  ...hero,
  name: hero.english,
  title: hero.id,
  sub: hero.name,
  kingdom: hero.faction,
  skills: hero.skills.split(' | '),
}));

// ─── Utility helpers ──────────────────────────────────────────────────────────
function hasCharacter(player: Player | null | undefined, charName: string): boolean {
  if (!player || !player.character) return false;
  const character = canonicalHero(player.character);
  const requested = canonicalHero(charName);
  return !!character && !!requested && character === requested;
}

// ─── Deck Logic ───────────────────────────────────────────────────────────────
function initDeck(seed?: number): Card[] {
  const random = seed === undefined ? Math.random : seededRandom(seed);
  const suits: Suit[] = ['SPADE', 'HEART', 'DIAMOND', 'CLUB'];
  const deck: Card[] = [];
  let idCounter = 1;

  for (const definition of CARDS) {
    for (let i = 0; i < definition.count; i++) {
      // Preserve meaningful colors for defense, healing and elemental attacks.
      let suit = suits[i % suits.length];
      if (definition.id === 'DODGE' || definition.id === 'PEACH') suit = i % 2 ? 'DIAMOND' : 'HEART';
      if (definition.id === 'THUNDER_ATTACK') suit = i % 2 ? 'CLUB' : 'SPADE';
      const card: Card = {
        id: `c_${idCounter++}`,
        name: definition.id,
        suit,
        rank: Math.floor(random() * 13) + 1,
        type: definition.kind,
      };
      if (definition.range !== undefined) card.range = definition.range;
      deck.push(card);
    }
  }
  return shuffle(deck, random);
}

function drawCards(room: GameRoom, count: number): Card[] {
  const cards: Card[] = [];
  for (let i = 0; i < count; i++) {
    if (room.deck.length === 0) {
      if (room.discardPile.length === 0) break;
      room.deck = shuffle(room.discardPile);
      room.discardPile = [];
    }
    const drawn=room.deck.pop()!;delete drawn.effectName;cards.push(drawn);
  }
  return cards;
}

// ─── Role Assignment ──────────────────────────────────────────────────────────
function assignRoles(room: GameRoom): void {
  const count = room.turnOrder.length;
  const roleSets: Record<number, string[]> = {
    2:  ['LORD', 'REBEL'],
    3:  ['LORD', 'REBEL', 'RENEGADE'],
    4:  ['LORD', 'LOYALIST', 'REBEL', 'RENEGADE'],
    5:  ['LORD', 'LOYALIST', 'REBEL', 'REBEL', 'RENEGADE'],
    6:  ['LORD', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'],
    7:  ['LORD', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'],
    8:  ['LORD', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'],
    9:  ['LORD', 'LOYALIST', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'],
  };
  let roles = (roleSets[count] || roleSets[9]).slice();
  if (count >= 10) roles = ['LORD', 'LOYALIST', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE', 'RENEGADE'];

  // Fisher-Yates shuffle
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  const lordIndex = roles.indexOf('LORD');
  room.turnOrder.forEach((pid: string, idx: number) => { (room.players[pid] as any).role = roles[idx]; });

  // LORD goes first
  if (lordIndex > 0) {
    room.turnOrder = [...room.turnOrder.slice(lordIndex), ...room.turnOrder.slice(0, lordIndex)];
  }
}

// ─── Character HP Setup ───────────────────────────────────────────────────────
function setupCharacterHp(player: Player, playerCount: number = 4): void {
  const baseHp = HERO_BY_ID[canonicalHero(player.character)]?.hp ?? 4;
  player.maxHp = baseHp + (player.role === 'LORD' && playerCount >= 6 ? 1 : 0);
  player.hp = player.maxHp;
}

// ─── Draft Phase ──────────────────────────────────────────────────────────────
function startDraftPhase(room: GameRoom): void {
  room.status = 'DRAFTING' as any;
  room.draftDeadline = Date.now() + RULES.draftMs;
  Object.values(room.players).forEach((player: Player) => {
    const availableHeroes = experimental(room) ? allHeroes : allHeroes.slice(0,13);
    let choices: HeroChoice[];
    if (player.role === 'LORD') {
      const lordIds = ['CAO_CAO', 'LIU_BEI', 'SUN_QUAN'];
      const lords = availableHeroes.filter(hero => lordIds.includes(hero.id));
      const rest = shuffle(availableHeroes.filter(hero => !lordIds.includes(hero.id)));
      choices = [...lords, ...rest.slice(0, 2)];
    } else {
      choices = shuffle(availableHeroes).slice(0, 3);
    }
    player.characterChoices = choices.map(hero => ({ ...hero, pic: '/art/heroes-atlas.png' }));
    if (player.isBot && player.characterChoices.length) {
      player.character = player.characterChoices[0].id;
      setupCharacterHp(player, room.turnOrder.length);
    }
  });
}

// ─── Play Phase Start ─────────────────────────────────────────────────────────
function startPlayPhase(room: GameRoom): void {
  if (beginStrategies(room)) return;
  room.status = 'PLAYING' as any;
  room.playStartedAt=Date.now();
  room.draftDeadline = null;
  room.deck = initDeck(room.deckSeed);
  room.discardPile = [];
  Object.values(room.players).forEach((player: Player) => {
    player.hand = drawCards(room, 4);
  });
  room.currentTurnIndex = 0;
  startPlayerTurn(room);
}

// ─── Distance Calculation ─────────────────────────────────────────────────────
function calculateDistance(room: GameRoom, fromId: string, toId: string): number {
  const order = room.turnOrder.filter((pid: string) => room.players[pid] && room.players[pid].isAlive);
  const idxFrom = order.indexOf(fromId);
  const idxTo = order.indexOf(toId);
  if (idxFrom === -1 || idxTo === -1) return 999;
  const directDiff = Math.abs(idxFrom - idxTo);
  const circularDiff = order.length - directDiff;
  let base = Math.min(directDiff, circularDiff);
  const attacker = room.players[fromId];
  const defender = room.players[toId];
  if (attacker?.equipment?.offensiveHorse) base -= 1;
  if (defender?.equipment?.defensiveHorse) base += 1;
  return Math.max(1, base);
}

// ─── Turn Flow ────────────────────────────────────────────────────────────────
function startPlayerTurn(room: GameRoom): void {
  if (room.status === 'ENDED') return;
  const aliveCount = Object.values(room.players).filter((p: Player) => p.isAlive).length;
  if (aliveCount === 0) { room.status = 'ENDED' as any; return; }

  const playerId = room.turnOrder[room.currentTurnIndex];
  const player = room.players[playerId];

  if (!player || !player.isAlive) {
    room.currentTurnIndex = (room.currentTurnIndex + 1) % room.turnOrder.length;
    schedule(room, () => startPlayerTurn(room), 0);
    return;
  }

  // Reset per-turn flags
  player.slashedThisTurn = false;
  player.skillResignationUsed = false;
  player.cardsGivenThisTurn = 0;
  player.liuBeiHealedThisTurn = false;
  player.skillDiaoChanUsed = false;
  player.skillZhouYuUsed = false;
  player._botRendeUsed = false;
  player._botJijiangUsed = false;
  player.extraAttacks = 0;
  player.skillQingnangUsed = false;
  if(experimental(room))room.turnNumber=(room.turnNumber||0)+1;
  room.attacksPlayedInTurn = 0;

  const turnGeneration = (room._turnGeneration || 0) + 1;
  room._turnGeneration = turnGeneration;
  room._turnContinuation = null;
  const turnIsCurrent = () => room.status === 'PLAYING' && room._turnGeneration === turnGeneration &&
    room.turnOrder[room.currentTurnIndex] === playerId && player.isAlive;
  const once = <T extends any[]>(callback: (...args: T) => void): ((...args: T) => void) => {
    let completed = false;
    return (...args: T) => {
      if (completed || !turnIsCurrent()) return;
      completed = true;
      callback(...args);
    };
  };

  let skipPlayPhase = false;
  let skipDrawPhase = false;

  const judgeNext = (): void => {
    if (!turnIsCurrent()) return;
    if (!player.delayedKitZone?.length) {
      executeDrawPhase(room, player, skipDrawPhase, skipPlayPhase);
      return;
    }
    room.currentPhase = 'JUDGEMENT' as any;
    room._broadcastFn?.();
    const card = player.delayedKitZone.pop()!;
    const drawnJudge = drawCards(room, 1)[0];
    if (!drawnJudge) {
      room.discardPile.push(card);
      judgeNext();
      return;
    }

    const resolveJudge = once((judgeCard: Card): void => {
      room.discardPile.push(judgeCard, card);
      let isSuccess = false;
      let titleName = (card.effectName || card.name);
      if ((card.effectName || card.name) === 'LIGHTNING') {
        isSuccess = !(judgeCard.suit === 'SPADE' && judgeCard.rank >= 2 && judgeCard.rank <= 9);
        titleName = 'อัสนีบาต (สายฟ้า)';
      } else if ((card.effectName || card.name) === 'ACEDIA') {
        isSuccess = judgeCard.suit === 'HEART';
        titleName = 'สุขไม่คิดกลับ';
      } else if ((card.effectName || card.name) === 'STARVATION') {
        isSuccess = judgeCard.suit === 'CLUB';
        titleName = 'เสบียงขาด';
      }
      room._emitAll?.('judgement_result', {
        title: titleName, card: judgeCard, isSuccess,
        targetPlayerId: player.id, targetPlayerName: player.name,
      });

      claimJudgment(room,player,judgeCard,()=>{
      if(!turnIsCurrent())return;
      if ((card.effectName || card.name) === 'LIGHTNING') {
        if (!isSuccess) {
          const continueAfterDamage = once(judgeNext);
          room._turnContinuation = continueAfterDamage;
          const { dealDamage } = require('./combatLogic');
          dealDamage(room, playerId, 3, card, null, 'THUNDER');
          if (room.pendingAction || !turnIsCurrent()) return;
          room._turnContinuation = null;
          continueAfterDamage();
          return;
        }
        const myIdx = room.turnOrder.indexOf(playerId);
        for (let offset = 1; offset < room.turnOrder.length; offset++) {
          const next = room.players[room.turnOrder[(myIdx + offset) % room.turnOrder.length]];
          if (!next?.isAlive) continue;
          next.delayedKitZone = next.delayedKitZone || [];
          next.delayedKitZone.push(card);
          const discardedIndex = room.discardPile.indexOf(card);
          if (discardedIndex !== -1) room.discardPile.splice(discardedIndex, 1);
          break;
        }
      } else if ((card.effectName || card.name) === 'ACEDIA' && !isSuccess) {
        skipPlayPhase = true;
      } else if ((card.effectName || card.name) === 'STARVATION' && !isSuccess) {
        skipDrawPhase = true;
      }
      judgeNext();
      });
    });
    if (room._judgeCard) room._judgeCard(player, drawnJudge, {...card,name:card.effectName||card.name}, resolveJudge);
    else resolveJudge(drawnJudge);
  };

  const beginLuoshen = once((): void => {
    if (!hasCharacter(player, 'ZHEN_JI')) {
      judgeNext();
      return;
    }
    room.currentPhase = 'PREPARATION' as any;
    if (player.isBot) {
      emitHeroSkill(room, player.id, 'LUOSHEN');
      const drawLuoshen = (): void => {
        if (!turnIsCurrent()) return;
        const drawnJudge = drawCards(room, 1)[0];
        if (!drawnJudge) { judgeNext(); return; }
        const resolveLuoshen = once((finalJudge: Card): void => {
          room._emitAll?.('judgement_result', { title: 'Luoshen', card: finalJudge, isSuccess: finalJudge.suit === 'SPADE' || finalJudge.suit === 'CLUB', targetPlayerId: player.id, targetPlayerName: player.name });
          if (finalJudge.suit === 'SPADE' || finalJudge.suit === 'CLUB') {
            player.hand.push(finalJudge);
            drawLuoshen();
          } else {
            room.discardPile.push(finalJudge);
            judgeNext();
          }
        });
        if (room._judgeCard) room._judgeCard(player, drawnJudge, { name: 'LUO_RIVER' }, resolveLuoshen);
        else resolveLuoshen(drawnJudge);
      };
      drawLuoshen();
      return;
    }
    room.pendingAction = {
      type: 'LUO_RIVER', targetPlayerId: playerId,
      timeoutAt: Date.now() + RULES.reactionMs,
      resume: once(judgeNext),
    };
    room._broadcastFn?.();
  });

  room.currentPhase = 'PREPARATION' as any;
  if (room._prepareTurn) room._prepareTurn(player, beginLuoshen);
  else beginLuoshen();
}

function executeDrawPhase(room: GameRoom, player: Player, skipDrawPhase: boolean = false, skipPlayPhase: boolean = false): void {
  if (room._drawWithHeroes && !skipDrawPhase) {
    room.currentPhase='DRAW';
    room._drawWithHeroes(player, () => executeDrawPhase(room,player,true,skipPlayPhase));
    return;
  }
  if (!skipDrawPhase) {
    room.currentPhase = 'DRAW' as any;
    const drawCount = hasCharacter(player, 'ZHOU_YU') ? 3 : 2;
    player.hand.push(...drawCards(room, drawCount));
    if (hasCharacter(player, 'ZHOU_YU')) emitHeroSkill(room, player.id, 'YINGZI');
  }

  if (!skipPlayPhase) {
    room.currentPhase = 'PLAY' as any;
    room.attacksPlayedInTurn = 0;
    player.wineActive = false;
    room._broadcastFn && room._broadcastFn();
    if (player.isBot) {
      schedule(room, () => {
        const { runBotTurn } = require('./botAI');
        runBotTurn(room, player.id);
      }, 1500);
    }
  } else {
    // Affected by ACEDIA (สุขไม่คิดกลับ): Skip turn completely without forcing card discard
    endPlayerTurn(room);
  }
}

function checkDiscardRequirement(room: GameRoom): void {
  const playerId = room.turnOrder[room.currentTurnIndex];
  const player = room.players[playerId];
  if (!player) { endPlayerTurn(room); return; }

  let maxHand = player.hp;
  if (player.equipment?.treasure?.name === 'WOODEN_CART') maxHand += 1;

  if (player.hand.length <= maxHand) {
    endPlayerTurn(room);
  } else {
    room._broadcastFn && room._broadcastFn();
    if (player.isBot) {
      schedule(room, () => {
        const numToDiscard = player.hand.length - maxHand;
        const discarded = player.hand.splice(0, numToDiscard);
        room.discardPile.push(...discarded);
        endPlayerTurn(room);
      }, 1000);
    }
  }
}

function endPlayerTurn(room: GameRoom): void {
  room._turnContinuation = null;
  room._turnGeneration = (room._turnGeneration || 0) + 1;
  const playerId = room.turnOrder[room.currentTurnIndex];
  const player = room.players[playerId];
  if(player?.isAlive && hasCharacter(player,'DIAO_CHAN') && ['PLAY','DISCARD'].includes(room.currentPhase)) { player.hand.push(...drawCards(room,1)); emitHeroSkill(room, player.id, 'BIYUE'); }
  if (player) player.wineActive = false;
  room.currentTurnIndex = (room.currentTurnIndex + 1) % room.turnOrder.length;
  startPlayerTurn(room);
}

// ─── Sanitized State for client ───────────────────────────────────────────────
function publicCard(card: Card): Card {
  const result: Card = { id: card.id, name: card.name, suit: card.suit, rank: card.rank, type: card.type };
  if (card.range !== undefined) result.range = card.range;
  return result;
}

function sanitizedPendingAction(pending: PendingAction | null, targetPlayerId: string): any {
  if (!pending) return null;
  // An explicit allowlist prevents suspended continuations and private state from leaking.
  const publicFields = [
    'type', 'sourcePlayerId', 'targetPlayerId', 'timeoutAt', 'promptId', 'requestId',
    'damage', 'damageType', 'originalDamage', 'originalAttackerId', 'dodgeNeeded', 'slashNeeded',
    'currentPlayerToSlash', 'currentTargetIndex', 'aoeType', 'eightTrigramsUsed',
    'currentPickerId', 'victimId', 'peachNeeded', 'currentAskerIdx', 'attackerId',
    'requiredSuit', 'requiredColor', 'skill', 'skillName', 'requestType', 'requiredCard',
    'judgeTargetId', 'reason', 'originalTargetId',
  ];
  const result: Record<string, any> = {};
  for (const key of publicFields) {
    const value = pending[key];
    if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) result[key] = value;
  }
  if (Array.isArray(pending.targets)) result.targets = pending.targets.filter((id: any) => typeof id === 'string');
  for (const key of ['revealedCard', 'judgeCard', 'judgmentCard']) {
    if (pending[key]) result[key] = publicCard(pending[key]);
  }
  const isFanjian = pending.type === 'FANJIAN';
  if (!isFanjian || pending.sourcePlayerId === targetPlayerId) {
    if (typeof pending.cardUsedId === 'string' || pending.cardUsedId === null) result.cardUsedId = pending.cardUsedId;
  }
  const owner = pending.targetPlayerId || pending.sourcePlayerId;
  if (['GUANXING','GUO_JIA_DISTRIBUTE'].includes(pending.type) && owner === targetPlayerId) {
    for (const key of ['cards', 'topCards', 'bottomCards']) {
      if (Array.isArray(pending[key])) result[key] = pending[key].map(publicCard);
    }
  }
  if (isFanjian && pending.sourcePlayerId === targetPlayerId) {
    for (const key of ['heldCard', 'card']) {
      if (pending[key]) result[key] = publicCard(pending[key]);
    }
  }
  if (pending.type === 'DAMAGE_SKILL' && pending.card) result.card = publicCard(pending.card);
  return result;
}

function getSanitizedRoomState(room: GameRoom, targetPlayerId: string): any {
  const maskedPlayers: Record<string, any> = {};
  Object.keys(room.players).forEach((pId: string) => {
    const p = room.players[pId];
    maskedPlayers[pId] = {
      id: p.id,
      name: p.name,
      role: (p.role === 'LORD' || p.id === targetPlayerId || !p.isAlive || room.status === 'ENDED') ? p.role : 'UNKNOWN',
      character: p.character,
      characterChoices: pId === targetPlayerId ? p.characterChoices : null,
      hp: p.hp,
      maxHp: p.maxHp,
      equipment: p.equipment || { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
      delayedKitZone: (p.delayedKitZone || []).map(c=>({...publicCard(c),name:c.effectName||c.name})),
      isAlive: p.isAlive,
      wineActive: p.wineActive,
      isBot: p.isBot,
      handCount: p.hand ? p.hand.length : 0,
      hand: pId === targetPlayerId ? p.hand : null,
      slashedThisTurn: p.slashedThisTurn || false,
      skillResignationUsed: p.skillResignationUsed || false,
      skillDiaoChanUsed: p.skillDiaoChanUsed || false,
      skillZhouYuUsed: p.skillZhouYuUsed || false,
      isHost: room.hostSocketId === p.socketId,
      isDisconnected: p.isDisconnected || false,
      isChained: p.isChained || false,
      strategy: room.strategiesRevealed ? p.strategy : null,
      strategyUsed: !!p.strategyUsed,
      strategyChoice: pId===targetPlayerId ? p.strategyChoice : null,
      strategyReady: !!p.strategyChoice,
      extraAttacks: p.extraAttacks || 0,
      skillQingnangUsed: !!p.skillQingnangUsed,
    };
  });
  return {
    roomId: room.roomId,
    status: room.status,
    mode: room.mode,
    ruleset: room.ruleset || 'STANDARD',
    experimentSummary: balanceSummary(room),
    strategyDeadline: room.strategyDeadline || null,
    strategiesRevealed: !!room.strategiesRevealed,
    turnNumber: room.turnNumber || 0,
    spectatorChat: !room.players[targetPlayerId]?.isAlive ? room.spectatorChat || [] : [],
    currentTurnPlayerId: room.turnOrder[room.currentTurnIndex] || null,
    currentPhase: room.currentPhase,
    pendingAction: sanitizedPendingAction(room.pendingAction, targetPlayerId),
    actionChain: (room.actionChain || []).map(action => ({
      type: action.type,
      sourceId: action.sourceId,
      targetId: action.targetId,
      cardUsed: action.cardUsed ? publicCard(action.cardUsed) : null,
    })),
    negatePassedPlayers: [...(room.negatePassedPlayers || [])],
    deckCount: room.deck?.length || 0,
    discardCount: room.discardPile?.length || 0,
    draftDeadline: room.draftDeadline || null,
    rulesVersion: experimental(room) ? 'experimental-1' : RULES.version,
    players: maskedPlayers,
    turnOrder: room.turnOrder,
    winnerRole: room.winnerRole || null,
    winnerText: room.winnerText || null,
    bumperHarvestCards: room.bumperHarvestCards || [],
    chat: room.chat || [],
    isBotPassive: room.isBotPassive || false,
  };
}

export {
  initDeck, drawCards, assignRoles, setupCharacterHp,
  startDraftPhase, startPlayPhase, startPlayerTurn,
  executeDrawPhase, checkDiscardRequirement, endPlayerTurn,
  calculateDistance, hasCharacter, getSanitizedRoomState,
};
export const getAllHeroes = (): any[] => allHeroes;
