'use strict';
/**
 * rooms/WTKRoom.ts
 * Colyseus 0.15 Room class — replaces socket.io handlers in server.js
 */

import { Room, Client } from 'colyseus';
import { RULES, canonicalHero, CARD_BY_ID, HERO_BY_ID } from '../shared/catalog';
import { attachRoomLifecycle } from '../game/roomLifecycle';
import { validateCommand } from '../game/commandPolicy';
import { schedule, deadline } from '../game/runtime';
import { emitCardPlay, emitHeroSkill, withPresentationIdentity } from '../game/presentationEvents';
import { resolveHeroResponse, startFanjian, startLijian, useKurou, startLordSkill, judgeWithHeroes, removeOwnedCard, canRespond } from '../game/heroLogic';
import { rescueDying, killPlayer } from '../game/combatLogic';
import { WTKState } from './schema/WTKSchema';
import {
  assignRoles, startDraftPhase, startPlayPhase,
  setupCharacterHp, getSanitizedRoomState, endPlayerTurn,
  checkDiscardRequirement, executeDrawPhase, drawCards, calculateDistance, hasCharacter, getAllHeroes
} from '../game/phaseLogic';
import {
  dealDamage, resumeAfterAttack, getCardById,
  startDyingPhase, advanceDyingAsker, checkGameOver
} from '../game/combatLogic';
import {
  runBotTurn, handleBotDodge, handleBotDuelSlash, handleBotAOE,
  handleBotSeduction, handleBotZhouYu, handleBotBumperPick, handleBotBorrowSlash
} from '../game/botAI';
import {
  startNegateWindow, resolveActionChain, handleUseCard, handleResolvePending
} from '../game/cardLogic';
import { recordPlayerStats, saveMatchHistory } from '../db/database';
import pluginManager from '../plugins/plugin_manager';
import type { GameRoom, Player, Card, SocketLike, AttackDescriptor } from '../game/types';

// ─── Bot name pool ────────────────────────────────────────────────────────────
const BOT_NAMES = [
  'Zhuge Liang (Bot)', 'Guan Yu (Bot)', 'Cao Cao (Bot)', 'Diao Chan (Bot)',
  'Liu Bei (Bot)', 'Zhang Fei (Bot)', 'Sima Yi (Bot)', 'Zhao Yun (Bot)',
  'Sun Quan (Bot)', 'Zhou Yu (Bot)'
];

// ─── Admin secret ─────────────────────────────────────────────────────────────
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'admin123';

export class WTKRoom extends Room<WTKState> {
  gameState!: GameRoom;
  private _reconnectTokens: Record<string, any> = {};
  private _adminSockets: Set<string> = new Set();

  // ─── onCreate ──────────────────────────────────────────────────────────────
  onCreate(options: any): void {
    // Initialize plain game state (used for game logic)
    this.gameState = {
      roomId: this.roomId,
      status: 'LOBBY',
      mode: options.mode || 'ONLINE',
      hostSocketId: null,
      turnOrder: [],
      currentTurnIndex: 0,
      currentPhase: 'START',
      deck: [],
      discardPile: [],
      players: {},
      pendingAction: null,
      attacksPlayedInTurn: 0,
      isBotPassive: !!options.sandbox,
      chat: [],
      bumperHarvestCards: [],
      actionChain: [],
      negatePassedPlayers: [],
      winnerRole: null,
      winnerText: null,
    };

    // Attach broadcast helpers to gameState so game logic modules can call them
    this.gameState._broadcastFn = () => this._broadcastAll();
    this.gameState._emitAll = (event: string, data: any) => this.broadcast(event,
      ['card_played','damage_log','judgement_result'].includes(event) ? withPresentationIdentity(this.gameState, data) : data);

    // Colyseus Schema state (used for delta encoding)
    this.setState(new WTKState());
    this.state.roomId = this.roomId;
    this.state.status = 'LOBBY';
    this.state.mode = options.mode || 'ONLINE';

    this.maxClients = 10;

    console.log(`[WTKRoom] Room ${this.roomId} created (mode: ${this.gameState.mode})`);
    if (pluginManager.onRoomCreate) pluginManager.onRoomCreate(this.roomId);

    // Register all onMessage handlers
    attachRoomLifecycle(this.gameState, this.clock, () => this._broadcastAll());
    this._registerHandlers();

    // Test sandbox: auto-fill with 3 bots
    if (this.roomId === 'ROOM_TEST' || this.roomId.startsWith('ROOM_TEST')) {
      this.gameState.mode = 'BOT';
      this.gameState.isBotPassive = true; // default passive in test mode
    }
  }

  // ─── onJoin ───────────────────────────────────────────────────────────────
  async onJoin(client: Client, options: any): Promise<void> {
    const gs = this.gameState;
    const { playerName, roomAction, reconnectPlayerId, mode } = options || {};
    const action = options?._action || roomAction || 'join';

    if (gs.status !== 'LOBBY') throw new Error('เกมเริ่มแล้ว กรุณา reconnect ด้วย token เดิม');
    if (gs.turnOrder.length >= 10) {
      throw new Error('ห้องนี้เต็มแล้ว (สูงสุด 10 คน)');
    }

    const isHost = !gs.hostSocketId || gs.turnOrder.length === 0;
    const playerId = 'p' + ((gs._nextPlayerNumber = (gs._nextPlayerNumber || 0) + 1));

    if (isHost && mode) gs.mode = mode;

    gs.players[playerId] = {
      id: playerId,
      name: playerName || (isHost ? 'Host' : 'Player ' + (gs.turnOrder.length + 1)),
      socketId: client.sessionId,
      role: 'UNKNOWN',
      character: '',
      characterChoices: [],
      maxHp: 4, hp: 4,
      hand: [],
      equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
      delayedKitZone: [],
      isAlive: true,
      wineActive: false,
      isBot: false,
      isDisconnected: false,
      isChained: false,
      isHost,
      slashedThisTurn: false,
      skillResignationUsed: false,
      skillDiaoChanUsed: false,
      skillZhouYuUsed: false,
    };
    gs.turnOrder.push(playerId);

    if (isHost) {
      gs.hostSocketId = client.sessionId;
    }

    const joinedName = gs.players[playerId].name || '';
    if (joinedName.toLowerCase() === 'admin') {
      this._adminSockets.add(client.sessionId);
      console.log(`[WTKRoom] Player '${joinedName}' granted Admin access in ${this.roomId}`);
      client.send('admin_auth_status', { isAdmin: true, message: '🔓 ยืนยันสิทธิ์ Admin สำเร็จ! (ชื่อ Admin)' });
    }

    if (isHost || action === 'create') {
      client.send('room_created', { roomId: this.roomId, playerId });
    } else {
      client.send('room_joined', { roomId: this.roomId, playerId });
    }
    console.log(`[WTKRoom] ${gs.players[playerId].name} (${playerId}) ${isHost ? 'CREATED' : 'joined'} ${this.roomId}`);

    if ((this.roomId === 'ROOM_TEST' || this.roomId.startsWith('ROOM_TEST')) && isHost) {
      for (let i = 0; i < 3; i++) {
        const bId = 'p' + ((gs._nextPlayerNumber = (gs._nextPlayerNumber || 0) + 1));
        gs.players[bId] = {
          id: bId, name: BOT_NAMES[i], socketId: '',
          role: 'UNKNOWN', character: '', characterChoices: [],
          maxHp: 4, hp: 4, hand: [],
          equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
          delayedKitZone: [], isAlive: true, wineActive: false, isBot: true, isDisconnected: false, isChained: false,
          isHost: false, slashedThisTurn: false, skillResignationUsed: false, skillDiaoChanUsed: false, skillZhouYuUsed: false
        };
        gs.turnOrder.push(bId);
      }
      assignRoles(gs);
      startDraftPhase(gs);
    }

    this._broadcastAll();
  }

  // ─── onLeave ──────────────────────────────────────────────────────────────
  async onLeave(client: Client, consented?: boolean): Promise<void> {
    const gs = this.gameState;
    const roomHasEnded = (): boolean => gs.status === 'ENDED' || !!gs._disposed;
    // Finished matches must acknowledge departure without reopening gameplay.
    if (roomHasEnded()) return;
    const playerId = this._getPlayerIdByClient(client);

    if (!playerId) return;
    const player = gs.players[playerId];
    if (!player) return;

    if (gs.status !== 'LOBBY' && player.isAlive) {
      console.log(`[WTKRoom] ${player.name} disconnected. Allowing 45s reconnect...`);
      player.isDisconnected = true;
      this._broadcastAll();

      try {
        const reconnection = await this.allowReconnection(client, RULES.reconnectSeconds);
        player.socketId = reconnection.sessionId;
        player.isDisconnected = false;
        reconnection.send('reconnect_success', { roomId: this.roomId, playerId });
        this._broadcastAll();
        console.log(`[WTKRoom] ${player.name} reconnected successfully.`);
      } catch (e) {
        // The match may finish while the existing reconnect grace is pending.
        if (roomHasEnded()) return;
        console.log(`[WTKRoom] ${player.name} failed to reconnect. Removing from game.`);
        player.isDisconnected = false;
        killPlayer(gs, playerId);
        this._broadcastAll();
      }
    } else if (gs.status === 'LOBBY') {
      delete gs.players[playerId];
      gs.turnOrder = gs.turnOrder.filter(id => id !== playerId);
      if(gs.hostSocketId === client.sessionId){const next=Object.values(gs.players).find(p=>!p.isBot);gs.hostSocketId=next?.socketId || null;}
      console.log(`[WTKRoom] ${player.name} left lobby.`);
      this._broadcastAll();
    }
  }

  // ─── onDispose ────────────────────────────────────────────────────────────
  async onDispose(): Promise<void> {
    const gs = this.gameState;
    gs._disposed = true;
    this.clock.clear();
    console.log(`[WTKRoom] Room ${this.roomId} disposed.`);

    if (gs.status === 'ENDED') {
      try {
        const players = Object.values(gs.players);
        await saveMatchHistory({
          roomId: gs.roomId,
          winnerRole: gs.winnerRole || 'UNKNOWN',
          playerCount: players.length,
          durationSeconds: Math.round((Date.now() - (gs.startedAt || Date.now()))/1000)
        });
        for (const p of players) {
          if (!p.isBot) {
            await recordPlayerStats({
              name: p.name,
              isWin: p.role === gs.winnerRole || gs.winnerRole === 'LORD' && p.role === 'LOYALIST',
            });
          }
        }
      } catch (err) {
        console.error('[WTKRoom] DB save error:', err);
      }
    }
    if (pluginManager.onRoomDispose) pluginManager.onRoomDispose(this.roomId);
  }

  // ─── Message Handlers ─────────────────────────────────────────────────────
  private _registerHandlers(): void {
    const gs = this.gameState;
    const on = (name:string,handler:(client:Client,data:any)=>void) => {
      gs._commandHandlers ||= {};
      gs._commandHandlers[name]=handler;
      this.onMessage(name,(client:Client,input:any) => {
      const error=validateCommand(gs,client.sessionId,name,input);
      if(error){client.send('game_error',{message:error});return;}
      try{handler(client,input || {});}catch(error){console.error('[command]',name,error);client.send('game_error',{message:'คำสั่งไม่สำเร็จ กรุณาตรวจตัวเลือกแล้วลองใหม่'});}
      });
    };
    gs._borrowedProxyResponse=(id:string,cardId:string|null)=>gs._commandHandlers.resolve_borrowed_sword({_playerId:id,sessionId:gs.players[id].socketId,send:()=>{}},{cardId});

    on('add_bot', (client) => {
      if (gs.status !== 'LOBBY') return;
      if (gs.turnOrder.length >= 10) {
        return client.send('game_error', { message: 'ผู้เล่นและบอทเต็มห้องแล้ว (สูงสุด 10 คน)' });
      }
      const bId = 'p' + ((gs._nextPlayerNumber = (gs._nextPlayerNumber || 0) + 1));
      const botName = BOT_NAMES[(gs.turnOrder.length - 1) % BOT_NAMES.length] || `Bot ${gs.turnOrder.length}`;
      gs.players[bId] = {
        id: bId, name: botName, socketId: '',
        role: 'UNKNOWN', character: '', characterChoices: [],
        maxHp: 4, hp: 4, hand: [],
        equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
        delayedKitZone: [], isAlive: true, wineActive: false, isBot: true, isDisconnected: false, isChained: false,
        isHost: false, slashedThisTurn: false, skillResignationUsed: false, skillDiaoChanUsed: false, skillZhouYuUsed: false
      };
      gs.turnOrder.push(bId);
      console.log(`[WTKRoom] Added bot ${botName} (${bId}) to ${this.roomId}`);
      this._broadcastAll();
    });

    on('remove_bot', () => {
      if (gs.status !== 'LOBBY') return;
      const botPlayers = Object.values(gs.players).filter(p => p.isBot);
      if (botPlayers.length === 0) return;
      const lastBot = botPlayers[botPlayers.length - 1];
      delete gs.players[lastBot.id];
      gs.turnOrder = gs.turnOrder.filter(id => id !== lastBot.id);
      console.log(`[WTKRoom] Removed bot ${lastBot.name} (${lastBot.id}) from ${this.roomId}`);
      this._broadcastAll();
    });

    on('start_game', (client, data) => {
      if (gs.status !== 'LOBBY') return;
      const { botCount } = data || {};
      if (gs.mode !== 'BOT' && gs.turnOrder.length < RULES.minPlayers) {
        return client.send('game_error', { message: 'ต้องมีผู้เล่นในห้องอย่างน้อย 4 คนจึงจะเริ่มเกมได้' });
      }
      if (gs.mode === 'BOT') {
        const targetCount = Math.max(RULES.minPlayers, Math.min(RULES.maxPlayers, Number(data?.totalPlayers || (botCount ? Number(botCount)+1 : RULES.defaultPlayers))));
        let botIdx = 0;
        while (gs.turnOrder.length < targetCount) {
          const bId = 'p' + ((gs._nextPlayerNumber = (gs._nextPlayerNumber || 0) + 1));
          gs.players[bId] = {
            id: bId, name: BOT_NAMES[botIdx++] || 'Bot ' + gs.turnOrder.length,
            socketId: '', role: 'UNKNOWN', character: '', characterChoices: [],
            maxHp: 4, hp: 4, hand: [],
            equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
            delayedKitZone: [], isAlive: true, wineActive: false, isBot: true, isDisconnected: false, isChained: false,
            isHost: false, slashedThisTurn: false, skillResignationUsed: false, skillDiaoChanUsed: false, skillZhouYuUsed: false
          };
          gs.turnOrder.push(bId);
        }
      }
      this.lock();
      gs.startedAt=Date.now();
      assignRoles(gs);
      startDraftPhase(gs);
      this._broadcastAll();
    });

    on('choose_character', (client, data) => {
      if (gs.status !== 'DRAFTING') return;
      const playerId = this._getPlayerIdByClient(client);
      if (!playerId) return;
      const player = gs.players[playerId];
      const rawChar = data.characterId;
      const charId = typeof rawChar === 'object' ? (rawChar.id || rawChar.name || '') : rawChar;
      if(player.character || !player.characterChoices?.some(h=>canonicalHero(h.id)===canonicalHero(charId))) return client.send('game_error',{message:'เลือกขุนพลจากชุดที่เสนอให้เท่านั้น'});
      player.character = canonicalHero(charId);
      setupCharacterHp(player, gs.turnOrder.length);
      const allChosen = Object.values(gs.players).filter(p=>p.isAlive).every(p => p.character !== '');
      if (allChosen) startPlayPhase(gs);
      else this._broadcastAll();
    });

    on('use_card', (client, data) => {
      if (gs.status !== 'PLAYING') return;
      const socketLike = this._makeSocketLike(client);
      handleUseCard(gs, socketLike, { ...data, roomId: this.roomId });
    });

    on('resolve_pending', (client, data) => {
      if (gs.status !== 'PLAYING') return;
      const socketLike = this._makeSocketLike(client);
      handleResolvePending(gs, socketLike, { ...data, roomId: this.roomId });
    });

    on('end_turn', (client) => {
      if (gs.status !== 'PLAYING') return;
      const playerId = this._getPlayerIdByClient(client);
      if (gs.turnOrder[gs.currentTurnIndex] !== playerId) return;
      gs.currentPhase = 'DISCARD' as any;
      checkDiscardRequirement(gs);
    });

    on('discard_cards', (client, data) => {
      if (gs.currentPhase !== ('DISCARD' as any)) return;
      const playerId = this._getPlayerIdByClient(client);
      if (gs.turnOrder[gs.currentTurnIndex] !== playerId) return;
      const player = gs.players[playerId];
      const { cardIds } = data;
      const hasAll = (cardIds as string[]).every(cid => player.hand.some(c => c.id === cid));
      if (!hasAll) return client.send('game_error', { message: 'ไม่พบการ์ดที่ระบุในกองมือ' });
      const requiredDiscard = Math.max(0, player.hand.length - player.hp - (player.equipment.treasure?.name==='WOODEN_CART'?1:0));
      if (cardIds.length !== requiredDiscard) return client.send('game_error', { message: `กรุณาทิ้งการ์ดทั้งหมด ${requiredDiscard} ใบ` });
      (cardIds as string[]).forEach(cid => {
        const idx = player.hand.findIndex(c => c.id === cid);
        gs.discardPile.push(player.hand.splice(idx, 1)[0]);
      });
      endPlayerTurn(gs);
    });

    on('use_peach_dying', (client, data) => {
      const id=this._getPlayerIdByClient(client);if(!id)return;
      if(data.usePeach){if(!rescueDying(gs,id,data.cardId))client.send('game_error',{message:'เลือกสวนท้อ หรือสุราเพื่อช่วยตนเอง'});}
      else if(gs.pendingAction?.type==='DYING' && gs.turnOrder[gs.pendingAction.currentAskerIdx]===id)advanceDyingAsker(gs);
    });

    on('play_negate', (client, data) => {
      if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_NEGATE') return;
      const playerId = this._getPlayerIdByClient(client);
      if (!playerId) return;
      const player = gs.players[playerId];
      if(!player.isAlive || gs.actionChain.length===1 && gs.actionChain[0]?.sourceId===playerId)return;
      const cardIdx = player.hand.findIndex(c => c.id === data.cardId && c.name === 'NEGATE');
      if (cardIdx === -1) return client.send('game_error', { message: 'ไม่มีการ์ด NEGATE ใบนี้' });
      const cardUsed = player.hand.splice(cardIdx, 1)[0];
      gs.discardPile.push(cardUsed);
      emitCardPlay(gs, playerId, cardUsed, { cardName: 'NEGATE', kind: 'RESPONSE', targetId: gs.actionChain[gs.actionChain.length - 1]?.sourceId });
      gs.actionChain.push({ type: 'NEGATE', sourceId: playerId, cardUsed });
      gs.negatePassedPlayers = [];
      gs.pendingAction.timeoutAt = deadline(gs);
      this._broadcastAll();
      const chainLen = gs.actionChain.length,pending=gs.pendingAction,expectedDeadline=gs.pendingAction.timeoutAt;
      schedule(gs, () => {
        if (gs.pendingAction === pending && gs.pendingAction?.timeoutAt===expectedDeadline && gs.actionChain.length === chainLen) resolveActionChain(gs);
      }, RULES.reactionMs);
    });

    on('pass_negate', (client) => {
      if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_NEGATE') return;
      const playerId = this._getPlayerIdByClient(client);
      if (!playerId) return;
      if (!gs.negatePassedPlayers.includes(playerId)) gs.negatePassedPlayers.push(playerId);
      const aliveCount = Object.values(gs.players).filter(p => p.isAlive).length;
      gs.negatePassedPlayers = gs.negatePassedPlayers.filter(id=>gs.players[id]?.isAlive);
      if (gs.negatePassedPlayers.length >= aliveCount) resolveActionChain(gs);
    });

    on('pick_bumper_card', (client, data) => {
      if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_BUMPER_PICK') return;
      const playerId = this._getPlayerIdByClient(client);
      if (gs.pendingAction.currentPickerId !== playerId) return client.send('game_error', { message: 'ยังไม่ถึงตาคุณเลือกการ์ด' });
      const cardIdx = gs.bumperHarvestCards.findIndex(c => c.id === data.cardId);
      if (cardIdx === -1) return client.send('game_error', { message: 'ไม่มีการ์ดใบนี้ให้เลือก' });
      const picked = gs.bumperHarvestCards.splice(cardIdx, 1)[0];
      gs.players[playerId!].hand.push(picked);
      gs.chat.push({ sender: 'System', text: `${gs.players[playerId!].name} เลือก ${picked.name}(${picked.suit}) จากเสบียงอุดมสมบูรณ์`, time: new Date().toLocaleTimeString('th-TH') });
      if (gs.bumperHarvestCards.length > 0) {
        const myIdx = gs.turnOrder.indexOf(playerId!);
        let nextPickerId: string | null = null;
        for (let i = 1; i < gs.turnOrder.length; i++) {
          const tid = gs.turnOrder[(myIdx + i) % gs.turnOrder.length];
          if (gs.players[tid]?.isAlive) { nextPickerId = tid; break; }
        }
        if (nextPickerId) {
          gs.pendingAction.currentPickerId = nextPickerId;
          gs.pendingAction.timeoutAt = deadline(gs);
          this._broadcastAll();
          if (gs.players[nextPickerId]?.isBot) schedule(gs, () => handleBotBumperPick(gs), 1200);
        } else {
          gs.discardPile.push(...gs.bumperHarvestCards); gs.bumperHarvestCards = [];
          gs.pendingAction = null; resumeAfterAttack(gs); this._broadcastAll();
        }
      } else {
        gs.bumperHarvestCards = []; gs.pendingAction = null; resumeAfterAttack(gs); this._broadcastAll();
      }
    });

    on('trigger_luo_river', (client, data) => {
      const pending=gs.pendingAction,id=this._getPlayerIdByClient(client);if(pending?.type!=='LUO_RIVER'||pending.targetPlayerId!==id)return;
      const player=gs.players[id!],drawn=drawCards(gs,1)[0];if(!drawn){gs.pendingAction=null;pending.resume?.();return;}
      if(!pending.presentationAnnounced){pending.presentationAnnounced=true;emitHeroSkill(gs, id!, 'LUOSHEN');}
      judgeWithHeroes(gs,player,drawn,{name:'LUO_RIVER'} as Card,final=>{
        gs._emitAll?.('judgement_result',{title:'Luoshen',card:final,isSuccess:final.suit==='SPADE'||final.suit==='CLUB',targetPlayerId:id!,targetPlayerName:player.name});
        if(final.suit==='SPADE'||final.suit==='CLUB'){player.hand.push(final);pending.timeoutAt=deadline(gs);gs.pendingAction=pending;this._broadcastAll();}
        else{gs.discardPile.push(final);gs.pendingAction=null;pending.resume?.();}
      });
    });

    on('skip_luo_river', (client, data) => {
      const pending=gs.pendingAction,id=this._getPlayerIdByClient(client);if(pending?.type!=='LUO_RIVER'||pending.targetPlayerId!==id)return;gs.pendingAction=null;pending.resume?.();
    });

    on('resolve_borrowed_sword', (client, data) => {
      const pending=gs.pendingAction,id=this._getPlayerIdByClient(client);if(pending?.type!=='WAITING_FOR_BORROW_SLASH'||pending.targetPlayerId!==id)return;
      const bearer=gs.players[id!],caster=gs.players[pending.sourcePlayerId!],victim=gs.players[pending.victimId];
      if(data.cardId){
        const found=bearer.hand.find(c=>c.id===data.cardId)||(canonicalHero(bearer.character)==='GUAN_YU'?Object.values(bearer.equipment).find(c=>(c as Card)?.id===data.cardId) as Card:undefined);
        if(!found||!canRespond(bearer,found,'SLASH'))return client.send('game_error',{message:'เลือกการ์ดที่ใช้เป็นโจมตีได้'});
        if(!victim?.isAlive)return;
        const used=removeOwnedCard(gs,bearer,found.id,canonicalHero(bearer.character)==='GUAN_YU')!;used.effectName=used.name==='THUNDER_ATTACK'?'THUNDER_ATTACK':'SLASH';gs.discardPile.push(used);
        emitCardPlay(gs, id!, used, { cardName: used.effectName, kind: 'RESPONSE', targetId: victim.id });
        const damage=bearer.wineActive?2:1;bearer.wineActive=false;
        gs.pendingAction={type:'WAITING_FOR_DODGE',sourcePlayerId:id!,targetPlayerId:victim.id,damage,cardUsedId:used.id,originalAttackerId:pending.sourcePlayerId,timeoutAt:deadline(gs),dodgeNeeded:canonicalHero(bearer.character)==='LV_BU'?2:1,damageType:used.name==='THUNDER_ATTACK'?'THUNDER':bearer.equipment.weapon?.name==='FEATHERED_FAN'?'FIRE':'NORMAL'};
        const defense=gs.pendingAction;if(victim.isBot)schedule(gs,()=>{if(gs.pendingAction===defense)handleBotDodge(gs,victim.id,damage);},700);this._broadcastAll();return;
      }
      if(bearer.equipment.weapon){caster.hand.push(bearer.equipment.weapon);bearer.equipment.weapon=null;}
      gs.pendingAction=null;resumeAfterAttack(gs);this._broadcastAll();
    });

    on('resolve_fire_reveal', (client, data) => {
      if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_FIRE_REVEAL') return;
      const playerId = this._getPlayerIdByClient(client);
      if (playerId !== gs.pendingAction.targetPlayerId) return;
      const target = gs.players[playerId!];
      const revealedCard = target.hand.find(c => c.id === data.cardId);
      if (!revealedCard) return client.send('game_error', { message: 'ไม่พบการ์ดที่เลือก' });
      gs.chat.push({ sender: 'System', text: `${target.name} เปิดเผยการ์ด ${revealedCard.name} (${revealedCard.suit})`, time: new Date().toLocaleTimeString('th-TH') });
      gs.pendingAction = { type: 'WAITING_FOR_FIRE_MATCH', sourcePlayerId: gs.pendingAction.sourcePlayerId, targetPlayerId: playerId, requiredSuit: revealedCard.suit, revealedCard, timeoutAt: deadline(gs) };
      this._broadcastAll();
    });

    on('resolve_fire_match', (client, data) => {
      if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_FIRE_MATCH') return;
      const playerId = this._getPlayerIdByClient(client);
      if (playerId !== gs.pendingAction.sourcePlayerId) return;
      const attacker = gs.players[playerId!];
      if (data.cancel) { gs.pendingAction = null; resumeAfterAttack(gs); this._broadcastAll(); return; }
      const matchIdx = attacker.hand.findIndex(c => c.id === data.cardId);
      if (matchIdx === -1) return client.send('game_error', { message: 'ไม่พบการ์ดที่เลือก' });
      const matched = attacker.hand[matchIdx];
      if (matched.suit !== gs.pendingAction.requiredSuit) return client.send('game_error', { message: `ต้องทิ้งการ์ดดอก ${gs.pendingAction.requiredSuit} เท่านั้น` });
      gs.discardPile.push(attacker.hand.splice(matchIdx, 1)[0]);
      const targetId = gs.pendingAction.targetPlayerId!;
      gs.pendingAction = null;
      dealDamage(gs, targetId, 1, null, playerId!, 'FIRE');
      if (!gs.pendingAction) resumeAfterAttack(gs);
      this._broadcastAll();
    });

    on('resolve_yinyang_choice', (client, data) => {
      if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_YINYANG_CHOICE') return;
      const playerId = this._getPlayerIdByClient(client);
      if (playerId !== gs.pendingAction.targetPlayerId) return;
      const target = gs.players[playerId!];
      const attacker = gs.players[gs.pendingAction.sourcePlayerId!];
      if (data.action === 'DISCARD') {
        const idx = target.hand.findIndex(c => c.id === data.cardId);
        if (idx !== -1) gs.discardPile.push(target.hand.splice(idx, 1)[0]);
      } else if (data.action === 'DRAW') {
        drawCards(gs, 1).forEach(c => attacker.hand.push(c));
      }
      gs.pendingAction = null; resumeAfterAttack(gs); this._broadcastAll();
    });

    on('resolve_weapon_skill', (client, data) => {
      const pending=gs.pendingAction,id=this._getPlayerIdByClient(client);if(!pending||pending.sourcePlayerId!==id)return;
      if(!['WAITING_FOR_GREEN_DRAGON','WAITING_FOR_AXE_DISCARD','WAITING_FOR_TRIDENT_DISCARD','WAITING_FOR_FROST_DISCARD'].includes(pending.type))return;
      const attacker=gs.players[id!],target=gs.players[pending.targetPlayerId!];if(!target?.isAlive)return;
      if(!data.accept){gs.pendingAction=null;if(pending.type==='WAITING_FOR_FROST_DISCARD')dealDamage(gs,target.id,pending.originalDamage,getCardById(gs,pending.cardUsedId),id,pending.damageType,pending.attack);if(!gs.pendingAction)resumeAfterAttack(gs);this._broadcastAll();return;}
      if(pending.type==='WAITING_FOR_GREEN_DRAGON'){
        const card=attacker.hand.find(c=>c.id===data.cardId)||Object.values(attacker.equipment).find(c=>(c as Card)?.id===data.cardId) as Card;
        if(!card||!canRespond(attacker,card,'SLASH'))return client.send('game_error',{message:'เลือกการ์ดที่ใช้เป็นโจมตีได้'});
        const used=removeOwnedCard(gs,attacker,card.id)!;used.effectName='SLASH';gs.discardPile.push(used);
        emitCardPlay(gs, id!, used, { cardName: used.name==='THUNDER_ATTACK'?'THUNDER_ATTACK':'SLASH', kind:'RESPONSE', targetId:target.id });
        const damage=attacker.wineActive?2:1;attacker.wineActive=false;
        gs.pendingAction={type:'WAITING_FOR_DODGE',sourcePlayerId:id!,targetPlayerId:target.id,cardUsedId:used.id,damage,dodgeNeeded:canonicalHero(attacker.character)==='LV_BU'?2:1,damageType:used.name==='THUNDER_ATTACK'?'THUNDER':'NORMAL',timeoutAt:deadline(gs)};
        if(target.isBot)schedule(gs,()=>handleBotDodge(gs,target.id,damage),700);this._broadcastAll();return;
      }
      const frost=pending.type==='WAITING_FOR_FROST_DISCARD',owner=frost?target:attacker,ids:string[]=data.cardIds||[],need=pending.type==='WAITING_FOR_TRIDENT_DISCARD'?1:2;
      const available=owner.hand.length+Object.values(owner.equipment).filter(Boolean).length;
      const actualNeed=frost?Math.min(2,available):need;
      if(frost&&actualNeed===0){gs.pendingAction=null;dealDamage(gs,target.id,pending.originalDamage,getCardById(gs,pending.cardUsedId),id,pending.damageType,pending.attack);if(!gs.pendingAction)resumeAfterAttack(gs);this._broadcastAll();return;}
      const randomCount=ids.filter(cid=>cid.startsWith('hand_')).length;
      if(ids.length!==actualNeed || randomCount>owner.hand.length || ids.some(cid=>cid.startsWith('hand_')?!frost:!owner.hand.some(c=>c.id===cid)&&!Object.values(owner.equipment).some(c=>(c as Card)?.id===cid)))return client.send('game_error',{message:'เลือกการ์ดจริงตามจำนวนที่ต้องทิ้ง'});
      for(const cid of ids){const card=cid.startsWith('hand_')?owner.hand.splice(Math.floor(Math.random()*owner.hand.length),1)[0]:removeOwnedCard(gs,owner,cid);if(card)gs.discardPile.push(card);}
      gs.pendingAction=null;if(!frost)dealDamage(gs,target.id,pending.originalDamage,getCardById(gs,pending.cardUsedId),id,pending.damageType,pending.attack);if(!gs.pendingAction)resumeAfterAttack(gs);this._broadcastAll();
    });

    on('use_serpent_spear', (client, data) => {
      if (gs.pendingAction) return client.send('game_error', { message: 'กรุณารอการประมวลผลก่อนหน้า' });
      const playerId = this._getPlayerIdByClient(client);
      if (gs.turnOrder[gs.currentTurnIndex] !== playerId || gs.currentPhase !== 'PLAY') return client.send('game_error', { message: 'ไม่ใช่เทิร์นของคุณ หรือไม่ใช่ช่วงร่ายการ์ด' });
      const player = gs.players[playerId!];
      if (!player?.equipment?.weapon || (player.equipment.weapon as any).name !== 'SERPENT_SPEAR') return client.send('game_error', { message: 'คุณต้องสวม SERPENT_SPEAR ก่อนใช้ความสามารถนี้' });
      const { cardIds, targetPlayerId } = data;
      if (!cardIds || cardIds.length !== 2) return client.send('game_error', { message: 'กรุณาเลือกการ์ด 2 ใบเพื่อทิ้งแทน SLASH' });
      if (!cardIds.every((cid: string) => player.hand.some(c => c.id === cid))) return client.send('game_error', { message: 'ไม่พบการ์ดที่ระบุบนมือ' });
      const hasZhuge = (player.equipment.weapon as any).name === 'ZHUGE_CROSSBOW';
      const isZhangFei = hasCharacter(player, 'ZHANG_FEI');
      if (gs.attacksPlayedInTurn >= 1 && !hasZhuge && !isZhangFei) return client.send('game_error', { message: 'คุณใช้สิทธิ์โจมตีครบแล้วในเทิร์นนี้' });
      const target = gs.players[targetPlayerId];
      if (!target?.isAlive) return client.send('game_error', { message: 'เป้าหมายไม่พร้อมรับการโจมตี' });
      const weaponRange = (player.equipment.weapon as any).range || 3;
      const dist = calculateDistance(gs, playerId!, targetPlayerId);
      if (dist > weaponRange) return client.send('game_error', { message: `ระยะไม่ถึง! เป้าหมายอยู่ห่าง ${dist} แต่ระยะโจมตีคือ ${weaponRange}` });
      if (hasCharacter(target, 'ZHUGE_LIANG') && target.hand.length === 0) return client.send('game_error', { message: 'ขงเบ้งเปิดใช้สกิล เมืองว่างเปล่า ไม่สามารถตกเป็นเป้าหมายได้!' });
      const materials: Card[] = cardIds.map((cid: string) => player.hand.find(c => c.id === cid)!);
      cardIds.forEach((cid: string) => { const idx = player.hand.findIndex(c => c.id === cid); if (idx !== -1) gs.discardPile.push(player.hand.splice(idx, 1)[0]); });
      const colors = materials.map(card => ['HEART','DIAMOND'].includes(card.suit) ? 'RED' : 'BLACK');
      const attack: AttackDescriptor = { name: 'SLASH', color: colors[0] === colors[1] ? colors[0] : 'COLORLESS', materialCardIds: materials.map(card => card.id) };
      const damage = player.wineActive ? 2 : 1;
      player.wineActive = false;
      gs.attacksPlayedInTurn += 1; player.slashedThisTurn = true;
      gs.pendingAction = { type: 'WAITING_FOR_DODGE', sourcePlayerId: playerId!, targetPlayerId, cardUsedId: null, attack, damage, dodgeNeeded: hasCharacter(player, 'LV_BU') ? 2 : 1, damageType: 'NORMAL', timeoutAt: deadline(gs) };
      emitCardPlay(gs, playerId!, null, { cardName: 'SLASH', targetId: targetPlayerId });
      this._broadcastAll();
      if (target.isBot) schedule(gs, () => handleBotDodge(gs, targetPlayerId, damage), 1200);

    });

    // Character Skills
    on('use_sun_quan_skill', (client, data) => {
      const playerId = this._getPlayerIdByClient(client);
      if (!playerId) return;
      const player = gs.players[playerId];
      if (!hasCharacter(player, 'SUN_QUAN') || player.skillResignationUsed || gs.currentPhase !== 'PLAY') return;
      let count = 0;
      (data.cardIds || []).forEach((cid: string) => {
        const idx = player.hand.findIndex(c => c.id === cid);
        if (idx !== -1) {
          gs.discardPile.push(player.hand.splice(idx, 1)[0]);
          count++;
        } else if (player.equipment) {
          const slots = ['weapon', 'armor', 'offensiveHorse', 'defensiveHorse', 'treasure'] as const;
          for (const slot of slots) {
            if ((player.equipment[slot] as Card)?.id === cid) {
              const eq = player.equipment[slot] as Card;
              gs.discardPile.push(eq);
              player.equipment[slot] = null;
              count++;
              if (eq.name === 'SILVER_LION_HELMET') player.hp = Math.min(player.maxHp, player.hp + 1);
              break;
            }
          }
        }
      });
      if (count > 0) {
        drawCards(gs, count).forEach(c => player.hand.push(c));
        player.skillResignationUsed = true;
        emitHeroSkill(gs, playerId, 'ZHIHENG');
        this._broadcastAll();
      }
    });

    on('use_liu_bei_skill', (client, data) => {
      const playerId = this._getPlayerIdByClient(client);
      if (!playerId) return;
      const player = gs.players[playerId];
      if (!hasCharacter(player, 'LIU_BEI') || gs.currentPhase !== 'PLAY') return;
      const { targetPlayerId, cardId, cardIds } = data;
      const target = gs.players[targetPlayerId];
      if (!target?.isAlive || targetPlayerId === playerId) return;

      const toGiveIds: string[] = cardIds || (cardId ? [cardId] : []);
      if (toGiveIds.length === 0) return;

      let givenCount = 0;
      toGiveIds.forEach((cid: string) => {
        const idx = player.hand.findIndex(c => c.id === cid);
        if (idx !== -1) {
          const card = player.hand.splice(idx, 1)[0];
          target.hand.push(card);
          givenCount++;
        }
      });

      if (givenCount > 0) {
        player.cardsGivenThisTurn = (player.cardsGivenThisTurn || 0) + givenCount;
        if (player.cardsGivenThisTurn >= 2 && !player.liuBeiHealedThisTurn) {
          player.hp = Math.min(player.maxHp, player.hp + 1);
          player.liuBeiHealedThisTurn = true;
        }
        emitHeroSkill(gs, playerId, 'RENDE', [targetPlayerId]);
        this._broadcastAll();
      }
    });

    on('use_huang_gai_skill', (client, data) => {
      const id=this._getPlayerIdByClient(client);if(id)useKurou(gs,gs.players[id]);
    });

    on('use_diao_chan_skill', (client, data) => {
      const id=this._getPlayerIdByClient(client);if(id && !startLijian(gs,gs.players[id],data))client.send('game_error',{message:'เลือกการ์ดหนึ่งใบและขุนพลชายอื่นสองคน'});
    });

    on('use_zhou_yu_skill', (client, data) => {
      const id=this._getPlayerIdByClient(client);if(id && !startFanjian(gs,gs.players[id],data))client.send('game_error',{message:'เลือกการ์ดหนึ่งใบและเป้าหมายที่ยังมีชีวิต'});
    });

    on('hero_response',(client,data)=>{const id=this._getPlayerIdByClient(client);if(id)resolveHeroResponse(gs,id,data);});
    on('use_lord_skill',(client,data)=>{const id=this._getPlayerIdByClient(client);if(id && !startLordSkill(gs,gs.players[id],data))client.send('game_error',{message:'ยังใช้สกิลเจ้าเมืองในจังหวะนี้ไม่ได้'});});
    on('request_state',(client)=>{const id=this._getPlayerIdByClient(client);if(id){client.send('room_joined',{roomId:this.roomId,playerId:id});this._broadcastAll();if(this._adminSockets.has(client.sessionId))client.send('admin_auth_status',{isAdmin:true});}});

    // Admin Tools
    on('admin_authenticate', (client, data) => {
      const { secretKey } = data;
      const playerId = this._getPlayerIdByClient(client);
      const playerName = (playerId && gs.players[playerId]?.name) || '';
      const isAdminByName = playerName.toLowerCase() === 'admin';
      if (secretKey === ADMIN_SECRET_KEY || this.roomId === 'ROOM_TEST' || isAdminByName) {
        this._adminSockets.add(client.sessionId);
        client.send('admin_auth_status', { isAdmin: true, message: '🔓 ยืนยันสิทธิ์ Admin สำเร็จ!' });
      } else {
        client.send('admin_auth_status', { isAdmin: false, message: '🔒 รหัสผ่าน Admin ไม่ถูกต้อง!' });
      }
    });

    on('admin_spawn_card', (client, data) => {
      if(!this._adminSockets.has(client.sessionId))return;
      const player=gs.players[data.targetPlayerId || this._getPlayerIdByClient(client)!],def=CARD_BY_ID[data.cardName];if(!player||!def)return;
      const suit=['SPADE','HEART','CLUB','DIAMOND'].includes(data.suit)?data.suit:'HEART';
      player.hand.push({id:`admin_${Date.now()}_${gs._adminSerial=(gs._adminSerial||0)+1}`,name:def.id,type:def.kind,suit,rank:Math.max(1,Math.min(13,Number(data.rank)||7)),...(def.range?{range:def.range}:{})});this._broadcastAll();
    });

    on('admin_change_hero', (client, data) => {
      if(!this._adminSockets.has(client.sessionId))return;
      const player=gs.players[data.targetPlayerId || this._getPlayerIdByClient(client)!],id=canonicalHero(data.characterId || data.character);
      if(!player || !HERO_BY_ID[id])return client.send('game_error',{message:'ไม่พบขุนพลใน catalog'});
      player.character=id;setupCharacterHp(player,gs.turnOrder.length);this._broadcastAll();
    });

    on('admin_set_hp', (client, data) => {
      if(!this._adminSockets.has(client.sessionId))return;
      const player=gs.players[data.targetPlayerId || this._getPlayerIdByClient(client)!];if(!player||!Number.isFinite(data.hp))return;
      player.hp=Math.max(0,Math.min(player.maxHp,data.hp));if(player.hp<=0)startDyingPhase(gs,player.id);else player.isAlive=true;this._broadcastAll();
    });

    on('admin_spawn_bot', (client) => {
      if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST') return client.send('game_error', { message: '⚠️ ปฏิเสธสิทธิ์' });
      const botId = `bot_${Date.now().toString().slice(-4)}`;
      const allHeroes = getAllHeroes();
      const randHero = allHeroes[Math.floor(Math.random() * allHeroes.length)] || { id: 'GUAN_YU', hp: 4 };
      gs.players[botId] = {
        id: botId, name: `บอททดสอบ_${botId.slice(-3)}`, socketId: '', role: 'REBEL',
        character: randHero.id, hp: randHero.hp || 4, maxHp: randHero.hp || 4,
        hand: drawCards(gs, 4), equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
        delayedKitZone: [], isAlive: true, wineActive: false, isBot: true, isDisconnected: false, isChained: false,
        isHost: false, slashedThisTurn: false, skillResignationUsed: false, skillDiaoChanUsed: false, skillZhouYuUsed: false
      };
      if (!gs.turnOrder.includes(botId)) gs.turnOrder.push(botId);
      gs.chat.push({ sender: 'Admin', text: `🤖 เพิ่มบอททดสอบ [${gs.players[botId].name}] สำเร็จ!`, time: new Date().toLocaleTimeString('th-TH') });
      this._broadcastAll();
    });

    on('admin_remove_bot', (client, data) => {
      if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST') return client.send('game_error', { message: '⚠️ ปฏิเสธสิทธิ์' });
      let targetBotId = data.botId;
      if (!targetBotId) { const bots = Object.values(gs.players).filter(p => p.isBot); if (bots.length > 0) targetBotId = bots[bots.length - 1].id; }
      if (!targetBotId || !gs.players[targetBotId]) return client.send('game_error', { message: 'ไม่พบบอทที่ต้องการลบ' });
      const botName = gs.players[targetBotId].name;
      delete gs.players[targetBotId];
      gs.turnOrder = gs.turnOrder.filter(id => id !== targetBotId);
      if (gs.currentTurnIndex >= gs.turnOrder.length) gs.currentTurnIndex = 0;
      gs.chat.push({ sender: 'Admin', text: `🗑️ ลบบอท [${botName}] ออกจากห้องสำเร็จ!`, time: new Date().toLocaleTimeString('th-TH') });
      this._broadcastAll();
    });

    on('admin_toggle_bot_ai', (client, data) => {
      if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST') return;
      gs.isBotPassive = data.isPassive;
      gs.chat.push({ sender: 'Admin', text: `🤖 โหมดบอท: ${data.isPassive ? '⏸️ อยู่เฉยๆ (Passive)' : '▶️ เล่นอัตโนมัติ (Auto AI)'}`, time: new Date().toLocaleTimeString('th-TH') });
      this._broadcastAll();
    });

    on('admin_bot_pass_turn', (client) => {
      if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST') return;
      const currentId = gs.turnOrder[gs.currentTurnIndex];
      const currentP = gs.players[currentId];
      if (currentP?.isBot) { gs.chat.push({ sender: 'Admin', text: `⏩ สั่งให้บอท [${currentP.name}] ผ่านเทิร์น`, time: new Date().toLocaleTimeString('th-TH') }); endPlayerTurn(gs); }
    });

    on('admin_bot_slash', (client, data) => {
      if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST') return;
      const bot = gs.players[data.botId] || Object.values(gs.players).find(p => p.isBot);
      const target = gs.players[data.targetId] || gs.players['p1'];
      if (!bot || !target) return;
      gs.chat.push({ sender: 'Admin', text: `⚔️ สั่งให้บอท [${bot.name}] ฟัน [${target.name}] ด้วย SLASH`, time: new Date().toLocaleTimeString('th-TH') });
      dealDamage(gs, target.id, 1, { id: `admin_slash_${Date.now()}`, name: 'SLASH', suit: 'SPADE', rank: 8, type: 'BASIC' }, bot.id, 'NORMAL');
    });
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────
  private _getPlayerIdByClient(client: Client): string | null {
    const gs = this.gameState;
    if((client as any)._playerId && gs.players[(client as any)._playerId])return (client as any)._playerId;
    return Object.keys(gs.players).find(pid => gs.players[pid].socketId === client.sessionId) || null;
  }

  private _makeSocketLike(client: Client): SocketLike {
    const playerId = this._getPlayerIdByClient(client);
    return {
      id: client.sessionId,
      emit: (event: string, data: any) => client.send(event, data),
      send: (event: string, data: any) => client.send(event, data),
      _playerId: playerId,
    };
  }

  // ─── Broadcast all clients with sanitized state ────────────────────────────
  private _broadcastAll(): void {
    const gs = this.gameState;
    if(gs.chat.length>300)gs.chat.splice(0,gs.chat.length-300);
    this.state.status = gs.status;
    this.state.currentPhase = gs.currentPhase;
    this.state.currentTurnPlayerId = gs.turnOrder[gs.currentTurnIndex] || '';
    this.state.winnerRole = gs.winnerRole || '';
    this.state.winnerText = gs.winnerText || '';
    this.state.mode = gs.mode;
    this.state.isBotPassive = gs.isBotPassive;

    this.clients.forEach((client: Client) => {
      const playerId = this._getPlayerIdByClient(client);
      const sanitized = getSanitizedRoomState(gs, playerId!);
      client.send('room_state_update', sanitized);
    });
  }
}
