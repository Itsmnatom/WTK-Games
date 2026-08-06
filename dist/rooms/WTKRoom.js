'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WTKRoom = void 0;
/**
 * rooms/WTKRoom.ts
 * Colyseus 0.15 Room class — replaces socket.io handlers in server.js
 */
const colyseus_1 = require("colyseus");
const WTKSchema_1 = require("./schema/WTKSchema");
const phaseLogic_1 = require("../game/phaseLogic");
const combatLogic_1 = require("../game/combatLogic");
const botAI_1 = require("../game/botAI");
const cardLogic_1 = require("../game/cardLogic");
const database_1 = require("../db/database");
const plugin_manager_1 = __importDefault(require("../plugins/plugin_manager"));
// ─── Bot name pool ────────────────────────────────────────────────────────────
const BOT_NAMES = [
    'Zhuge Liang (Bot)', 'Guan Yu (Bot)', 'Cao Cao (Bot)', 'Diao Chan (Bot)',
    'Liu Bei (Bot)', 'Zhang Fei (Bot)', 'Sima Yi (Bot)', 'Zhao Yun (Bot)',
    'Sun Quan (Bot)', 'Zhou Yu (Bot)'
];
// ─── Admin secret ─────────────────────────────────────────────────────────────
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'admin123';
class WTKRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this._reconnectTokens = {};
        this._adminSockets = new Set();
    }
    // ─── onCreate ──────────────────────────────────────────────────────────────
    onCreate(options) {
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
            isBotPassive: false,
            chat: [],
            bumperHarvestCards: [],
            actionChain: [],
            negatePassedPlayers: [],
            winnerRole: null,
            winnerText: null,
        };
        // Attach broadcast helpers to gameState so game logic modules can call them
        this.gameState._broadcastFn = () => this._broadcastAll();
        this.gameState._emitAll = (event, data) => this.broadcast(event, data);
        // Colyseus Schema state (used for delta encoding)
        this.setState(new WTKSchema_1.WTKState());
        this.state.roomId = this.roomId;
        this.state.status = 'LOBBY';
        this.state.mode = options.mode || 'ONLINE';
        this.maxClients = 10;
        console.log(`[WTKRoom] Room ${this.roomId} created (mode: ${this.gameState.mode})`);
        if (plugin_manager_1.default.onRoomCreate)
            plugin_manager_1.default.onRoomCreate(this.roomId);
        // Register all onMessage handlers
        this._registerHandlers();
        // Test sandbox: auto-fill with 3 bots
        if (this.roomId === 'ROOM_TEST' || this.roomId.startsWith('ROOM_TEST')) {
            this.gameState.mode = 'BOT';
            this.gameState.isBotPassive = true; // default passive in test mode
        }
    }
    // ─── onJoin ───────────────────────────────────────────────────────────────
    async onJoin(client, options) {
        const gs = this.gameState;
        const { playerName, roomAction, reconnectPlayerId, mode } = options || {};
        const action = options?._action || roomAction || 'join';
        // ── RECONNECT PATH ──
        if (roomAction === 'reconnect' && reconnectPlayerId) {
            const player = gs.players[reconnectPlayerId];
            if (player && player.isDisconnected) {
                player.socketId = client.sessionId;
                player.isDisconnected = false;
                this._reconnectTokens[reconnectPlayerId] = client.auth;
                if ((player.name || '').toLowerCase() === 'admin') {
                    this._adminSockets.add(client.sessionId);
                    client.send('admin_auth_status', { isAdmin: true, message: '🔓 ยืนยันสิทธิ์ Admin สำเร็จ! (ชื่อ Admin)' });
                }
                console.log(`[WTKRoom] ${player.name} reconnected (client: ${client.sessionId})`);
                client.send('reconnect_success', { roomId: this.roomId, playerId: reconnectPlayerId });
                this._broadcastAll();
                return;
            }
        }
        // ── JOIN PLAYING ROOM ──
        if (gs.status !== 'LOBBY') {
            const existingId = Object.keys(gs.players).find(pid => {
                return gs.players[pid].name === (playerName || '') && gs.players[pid].isDisconnected;
            });
            if (existingId) {
                const player = gs.players[existingId];
                player.socketId = client.sessionId;
                player.isDisconnected = false;
                if ((player.name || '').toLowerCase() === 'admin') {
                    this._adminSockets.add(client.sessionId);
                    client.send('admin_auth_status', { isAdmin: true, message: '🔓 ยืนยันสิทธิ์ Admin สำเร็จ! (ชื่อ Admin)' });
                }
                client.send('reconnect_success', { roomId: this.roomId, playerId: existingId });
                this._broadcastAll();
                return;
            }
            client.send('game_error', { message: 'เกมก้าวสู่การเล่นไปแล้ว' });
            return;
        }
        if (gs.turnOrder.length >= 10) {
            client.send('game_error', { message: 'ห้องนี้เต็มแล้ว (สูงสุด 10 คน)' });
            return;
        }
        const isHost = gs.turnOrder.length === 0;
        const playerId = 'p' + (gs.turnOrder.length + 1);
        if (isHost && mode)
            gs.mode = mode;
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
        }
        else {
            client.send('room_joined', { roomId: this.roomId, playerId });
        }
        console.log(`[WTKRoom] ${gs.players[playerId].name} (${playerId}) ${isHost ? 'CREATED' : 'joined'} ${this.roomId}`);
        if ((this.roomId === 'ROOM_TEST' || this.roomId.startsWith('ROOM_TEST')) && isHost) {
            for (let i = 0; i < 3; i++) {
                const bId = 'p' + (gs.turnOrder.length + 1);
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
            (0, phaseLogic_1.assignRoles)(gs);
            (0, phaseLogic_1.startDraftPhase)(gs);
        }
        this._broadcastAll();
    }
    // ─── onLeave ──────────────────────────────────────────────────────────────
    async onLeave(client, consented) {
        const gs = this.gameState;
        const playerId = this._getPlayerIdByClient(client);
        if (!playerId)
            return;
        const player = gs.players[playerId];
        if (!player)
            return;
        if (gs.status !== 'LOBBY' && player.isAlive) {
            console.log(`[WTKRoom] ${player.name} disconnected. Allowing 45s reconnect...`);
            player.isDisconnected = true;
            this._broadcastAll();
            try {
                const reconnection = await this.allowReconnection(client, 45);
                player.socketId = reconnection.sessionId;
                player.isDisconnected = false;
                reconnection.send('reconnect_success', { roomId: this.roomId, playerId });
                this._broadcastAll();
                console.log(`[WTKRoom] ${player.name} reconnected successfully.`);
            }
            catch (e) {
                console.log(`[WTKRoom] ${player.name} failed to reconnect. Removing from game.`);
                player.hp = 0;
                player.isAlive = false;
                player.isDisconnected = false;
                if (player.hand) {
                    gs.discardPile.push(...player.hand);
                    player.hand = [];
                }
                if (player.delayedKitZone) {
                    gs.discardPile.push(...player.delayedKitZone);
                    player.delayedKitZone = [];
                }
                if (player.equipment) {
                    ['weapon', 'armor', 'defensiveHorse', 'offensiveHorse'].forEach(slot => {
                        if (player.equipment[slot]) {
                            gs.discardPile.push(player.equipment[slot]);
                            player.equipment[slot] = null;
                        }
                    });
                }
                const isGameOver = (0, combatLogic_1.checkGameOver)(gs);
                if (!isGameOver) {
                    if (gs.turnOrder[gs.currentTurnIndex] === playerId) {
                        gs.currentPhase = 'DISCARD';
                        (0, phaseLogic_1.checkDiscardRequirement)(gs);
                    }
                    else {
                        this._broadcastAll();
                    }
                }
                else {
                    this._broadcastAll();
                }
            }
        }
        else if (gs.status === 'LOBBY') {
            delete gs.players[playerId];
            gs.turnOrder = gs.turnOrder.filter(id => id !== playerId);
            console.log(`[WTKRoom] ${player.name} left lobby.`);
            this._broadcastAll();
        }
    }
    // ─── onDispose ────────────────────────────────────────────────────────────
    async onDispose() {
        const gs = this.gameState;
        console.log(`[WTKRoom] Room ${this.roomId} disposed.`);
        if (gs.status === 'ENDED') {
            try {
                const players = Object.values(gs.players);
                await (0, database_1.saveMatchHistory)({
                    roomId: gs.roomId,
                    winnerRole: gs.winnerRole || 'UNKNOWN',
                    playerCount: players.length,
                    durationSeconds: 0
                });
                for (const p of players) {
                    if (!p.isBot) {
                        await (0, database_1.recordPlayerStats)({
                            name: p.name,
                            isWin: p.role === gs.winnerRole,
                        });
                    }
                }
            }
            catch (err) {
                console.error('[WTKRoom] DB save error:', err);
            }
        }
        if (plugin_manager_1.default.onRoomDispose)
            plugin_manager_1.default.onRoomDispose(this.roomId);
    }
    // ─── Message Handlers ─────────────────────────────────────────────────────
    _registerHandlers() {
        const gs = this.gameState;
        this.onMessage('add_bot', (client) => {
            if (gs.status !== 'LOBBY')
                return;
            if (gs.turnOrder.length >= 10) {
                return client.send('game_error', { message: 'ผู้เล่นและบอทเต็มห้องแล้ว (สูงสุด 10 คน)' });
            }
            const bId = 'p' + (gs.turnOrder.length + 1);
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
        this.onMessage('remove_bot', () => {
            if (gs.status !== 'LOBBY')
                return;
            const botPlayers = Object.values(gs.players).filter(p => p.isBot);
            if (botPlayers.length === 0)
                return;
            const lastBot = botPlayers[botPlayers.length - 1];
            delete gs.players[lastBot.id];
            gs.turnOrder = gs.turnOrder.filter(id => id !== lastBot.id);
            console.log(`[WTKRoom] Removed bot ${lastBot.name} (${lastBot.id}) from ${this.roomId}`);
            this._broadcastAll();
        });
        this.onMessage('start_game', (client, data) => {
            if (gs.status !== 'LOBBY')
                return;
            const { botCount } = data || {};
            if (gs.mode !== 'BOT' && gs.turnOrder.length < 2) {
                return client.send('game_error', { message: 'ต้องมีผู้เล่นในห้องอย่างน้อย 2 คนจึงจะเริ่มเกมได้' });
            }
            if (gs.mode === 'BOT') {
                const targetCount = botCount || 4;
                let botIdx = 0;
                while (gs.turnOrder.length < targetCount) {
                    const bId = 'p' + (gs.turnOrder.length + 1);
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
            (0, phaseLogic_1.assignRoles)(gs);
            (0, phaseLogic_1.startDraftPhase)(gs);
            this._broadcastAll();
        });
        this.onMessage('choose_character', (client, data) => {
            if (gs.status !== 'DRAFTING')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (!playerId)
                return;
            const player = gs.players[playerId];
            const rawChar = data.characterId;
            const charId = typeof rawChar === 'object' ? (rawChar.id || rawChar.name || '') : rawChar;
            player.character = charId;
            (0, phaseLogic_1.setupCharacterHp)(player, gs.turnOrder.length);
            const allChosen = Object.values(gs.players).every(p => p.character !== '');
            if (allChosen)
                (0, phaseLogic_1.startPlayPhase)(gs);
            else
                this._broadcastAll();
        });
        this.onMessage('use_card', (client, data) => {
            if (gs.status !== 'PLAYING')
                return;
            const socketLike = this._makeSocketLike(client);
            (0, cardLogic_1.handleUseCard)(gs, socketLike, { ...data, roomId: this.roomId });
        });
        this.onMessage('resolve_pending', (client, data) => {
            if (gs.status !== 'PLAYING')
                return;
            const socketLike = this._makeSocketLike(client);
            (0, cardLogic_1.handleResolvePending)(gs, socketLike, { ...data, roomId: this.roomId });
        });
        this.onMessage('end_turn', (client) => {
            if (gs.status !== 'PLAYING')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (gs.turnOrder[gs.currentTurnIndex] !== playerId)
                return;
            gs.currentPhase = 'DISCARD';
            (0, phaseLogic_1.checkDiscardRequirement)(gs);
        });
        this.onMessage('discard_cards', (client, data) => {
            if (gs.currentPhase !== 'DISCARD')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (gs.turnOrder[gs.currentTurnIndex] !== playerId)
                return;
            const player = gs.players[playerId];
            const { cardIds } = data;
            const hasAll = cardIds.every(cid => player.hand.some(c => c.id === cid));
            if (!hasAll)
                return client.send('game_error', { message: 'ไม่พบการ์ดที่ระบุในกองมือ' });
            const requiredDiscard = player.hand.length - player.hp;
            if (cardIds.length !== requiredDiscard)
                return client.send('game_error', { message: `กรุณาทิ้งการ์ดทั้งหมด ${requiredDiscard} ใบ` });
            cardIds.forEach(cid => {
                const idx = player.hand.findIndex(c => c.id === cid);
                gs.discardPile.push(player.hand.splice(idx, 1)[0]);
            });
            (0, phaseLogic_1.endPlayerTurn)(gs);
        });
        this.onMessage('use_peach_dying', (client, data) => {
            if (!gs.pendingAction || gs.pendingAction.type !== 'DYING')
                return;
            const pending = gs.pendingAction;
            const askerId = gs.turnOrder[pending.currentAskerIdx];
            const playerId = this._getPlayerIdByClient(client);
            if (playerId !== askerId)
                return;
            const asker = gs.players[askerId];
            const dyingPlayer = gs.players[pending.targetPlayerId];
            if (data.usePeach) {
                let peachIdx = asker.hand.findIndex(c => c.name === 'PEACH');
                if (askerId === pending.targetPlayerId && peachIdx === -1)
                    peachIdx = asker.hand.findIndex(c => c.name === 'WINE');
                if (peachIdx === -1)
                    return client.send('game_error', { message: 'คุณไม่มีการ์ด PEACH หรือ WINE สำหรับฟื้นชีวิต' });
                const card = asker.hand.splice(peachIdx, 1)[0];
                gs.discardPile.push(card);
                dyingPlayer.hp += 1;
                pending.peachNeeded -= 1;
                if (pending.peachNeeded <= 0) {
                    gs.pendingAction = null;
                    this._broadcastAll();
                    (0, combatLogic_1.resumeAfterAttack)(gs);
                }
                else
                    this._broadcastAll();
            }
            else {
                (0, combatLogic_1.advanceDyingAsker)(gs);
            }
        });
        this.onMessage('play_negate', (client, data) => {
            if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_NEGATE')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (!playerId)
                return;
            const player = gs.players[playerId];
            const cardIdx = player.hand.findIndex(c => c.id === data.cardId && c.name === 'NEGATE');
            if (cardIdx === -1)
                return client.send('game_error', { message: 'ไม่มีการ์ด NEGATE ใบนี้' });
            const cardUsed = player.hand.splice(cardIdx, 1)[0];
            gs.discardPile.push(cardUsed);
            this.broadcast('card_played', { playerId, cardName: 'NEGATE' });
            gs.actionChain.push({ type: 'NEGATE', sourceId: playerId, cardUsed });
            gs.negatePassedPlayers = [];
            gs.pendingAction.timeoutAt = Date.now() + 5000;
            this._broadcastAll();
            const chainLen = gs.actionChain.length;
            setTimeout(() => {
                if (gs.pendingAction?.type === 'WAITING_FOR_NEGATE' && gs.actionChain.length === chainLen)
                    (0, cardLogic_1.resolveActionChain)(gs);
            }, 5000);
        });
        this.onMessage('pass_negate', (client) => {
            if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_NEGATE')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (!playerId)
                return;
            if (!gs.negatePassedPlayers.includes(playerId))
                gs.negatePassedPlayers.push(playerId);
            const aliveCount = Object.values(gs.players).filter(p => p.isAlive).length;
            if (gs.negatePassedPlayers.length >= aliveCount)
                (0, cardLogic_1.resolveActionChain)(gs);
        });
        this.onMessage('pick_bumper_card', (client, data) => {
            if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_BUMPER_PICK')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (gs.pendingAction.currentPickerId !== playerId)
                return client.send('game_error', { message: 'ยังไม่ถึงตาคุณเลือกการ์ด' });
            const cardIdx = gs.bumperHarvestCards.findIndex(c => c.id === data.cardId);
            if (cardIdx === -1)
                return client.send('game_error', { message: 'ไม่มีการ์ดใบนี้ให้เลือก' });
            const picked = gs.bumperHarvestCards.splice(cardIdx, 1)[0];
            gs.players[playerId].hand.push(picked);
            gs.chat.push({ sender: 'System', text: `${gs.players[playerId].name} เลือก ${picked.name}(${picked.suit}) จากเสบียงอุดมสมบูรณ์`, time: new Date().toLocaleTimeString('th-TH') });
            if (gs.bumperHarvestCards.length > 0) {
                const myIdx = gs.turnOrder.indexOf(playerId);
                let nextPickerId = null;
                for (let i = 1; i < gs.turnOrder.length; i++) {
                    const tid = gs.turnOrder[(myIdx + i) % gs.turnOrder.length];
                    if (gs.players[tid]?.isAlive) {
                        nextPickerId = tid;
                        break;
                    }
                }
                if (nextPickerId) {
                    gs.pendingAction.currentPickerId = nextPickerId;
                    gs.pendingAction.timeoutAt = Date.now() + 15000;
                    this._broadcastAll();
                    if (gs.players[nextPickerId]?.isBot)
                        setTimeout(() => (0, botAI_1.handleBotBumperPick)(gs), 1200);
                }
                else {
                    gs.discardPile.push(...gs.bumperHarvestCards);
                    gs.bumperHarvestCards = [];
                    gs.pendingAction = null;
                    (0, combatLogic_1.resumeAfterAttack)(gs);
                    this._broadcastAll();
                }
            }
            else {
                gs.bumperHarvestCards = [];
                gs.pendingAction = null;
                (0, combatLogic_1.resumeAfterAttack)(gs);
                this._broadcastAll();
            }
        });
        this.onMessage('trigger_luo_river', (client) => {
            if (!gs.pendingAction || gs.pendingAction.type !== 'LUO_RIVER')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (playerId !== gs.pendingAction.targetPlayerId)
                return;
            const pending = gs.pendingAction;
            const player = gs.players[playerId];
            const drawn = (0, phaseLogic_1.drawCards)(gs, 1);
            if (drawn.length > 0) {
                const card = drawn[0];
                if (card.suit === 'SPADE' || card.suit === 'CLUB') {
                    player.hand.push(card);
                    this._broadcastAll();
                }
                else {
                    gs.discardPile.push(card);
                    gs.pendingAction = null;
                    (0, phaseLogic_1.executeDrawPhase)(gs, player, pending.skipDrawPhase, pending.skipPlayPhase);
                }
            }
        });
        this.onMessage('skip_luo_river', (client) => {
            if (!gs.pendingAction || gs.pendingAction.type !== 'LUO_RIVER')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (playerId !== gs.pendingAction.targetPlayerId)
                return;
            const pending = gs.pendingAction;
            const player = gs.players[playerId];
            gs.pendingAction = null;
            (0, phaseLogic_1.executeDrawPhase)(gs, player, pending.skipDrawPhase, pending.skipPlayPhase);
        });
        this.onMessage('resolve_borrowed_sword', (client, data) => {
            if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_BORROW_SLASH')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (playerId !== gs.pendingAction.targetPlayerId)
                return;
            const playerB = gs.players[playerId];
            const playerA = gs.players[gs.pendingAction.sourcePlayerId];
            if (data.cardId) {
                const cardIdx = playerB.hand.findIndex(c => c.id === data.cardId);
                if (cardIdx !== -1) {
                    const slashCard = playerB.hand[cardIdx];
                    const isSlash = slashCard.name === 'SLASH' || slashCard.name === 'THUNDER_ATTACK' ||
                        ((0, phaseLogic_1.hasCharacter)(playerB, 'ZHAO_YUN') && slashCard.name === 'DODGE') ||
                        ((0, phaseLogic_1.hasCharacter)(playerB, 'GUAN_YU') && (slashCard.suit === 'HEART' || slashCard.suit === 'DIAMOND'));
                    if (!isSlash)
                        return client.send('game_error', { message: 'การ์ดที่เลือกใช้แทน SLASH ไม่ถูกต้อง' });
                    playerB.hand.splice(cardIdx, 1);
                    gs.discardPile.push(slashCard);
                    const damage = playerB.wineActive ? 2 : 1;
                    playerB.wineActive = false;
                    gs.pendingAction = {
                        type: 'WAITING_FOR_DODGE', sourcePlayerId: playerId, targetPlayerId: gs.pendingAction.victimId,
                        damage, cardUsedId: slashCard.id, originalAttackerId: gs.pendingAction.sourcePlayerId,
                        timeoutAt: Date.now() + 15000, dodgeNeeded: (0, phaseLogic_1.hasCharacter)(playerB, 'LV_BU') ? 2 : 1,
                        damageType: playerB.equipment?.weapon?.name === 'FEATHERED_FAN' ? 'FIRE' : 'NORMAL'
                    };
                    this._broadcastAll();
                    const playerC = gs.players[gs.pendingAction.targetPlayerId];
                    if (playerC?.isBot)
                        setTimeout(() => (0, botAI_1.handleBotDodge)(gs, gs.pendingAction.targetPlayerId, damage), 1200);
                    return;
                }
            }
            if (playerB.equipment?.weapon) {
                playerA.hand.push(playerB.equipment.weapon);
                playerB.equipment.weapon = null;
            }
            gs.pendingAction = null;
            (0, combatLogic_1.resumeAfterAttack)(gs);
            this._broadcastAll();
        });
        this.onMessage('resolve_fire_reveal', (client, data) => {
            if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_FIRE_REVEAL')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (playerId !== gs.pendingAction.targetPlayerId)
                return;
            const target = gs.players[playerId];
            const revealedCard = target.hand.find(c => c.id === data.cardId);
            if (!revealedCard)
                return client.send('game_error', { message: 'ไม่พบการ์ดที่เลือก' });
            gs.chat.push({ sender: 'System', text: `${target.name} เปิดเผยการ์ด ${revealedCard.name} (${revealedCard.suit})`, time: new Date().toLocaleTimeString('th-TH') });
            gs.pendingAction = { type: 'WAITING_FOR_FIRE_MATCH', sourcePlayerId: gs.pendingAction.sourcePlayerId, targetPlayerId: playerId, requiredSuit: revealedCard.suit, revealedCard, timeoutAt: Date.now() + 15000 };
            this._broadcastAll();
        });
        this.onMessage('resolve_fire_match', (client, data) => {
            if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_FIRE_MATCH')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (playerId !== gs.pendingAction.sourcePlayerId)
                return;
            const attacker = gs.players[playerId];
            if (data.cancel) {
                gs.pendingAction = null;
                (0, combatLogic_1.resumeAfterAttack)(gs);
                this._broadcastAll();
                return;
            }
            const matchIdx = attacker.hand.findIndex(c => c.id === data.cardId);
            if (matchIdx === -1)
                return client.send('game_error', { message: 'ไม่พบการ์ดที่เลือก' });
            const matched = attacker.hand[matchIdx];
            if (matched.suit !== gs.pendingAction.requiredSuit)
                return client.send('game_error', { message: `ต้องทิ้งการ์ดดอก ${gs.pendingAction.requiredSuit} เท่านั้น` });
            gs.discardPile.push(attacker.hand.splice(matchIdx, 1)[0]);
            const targetId = gs.pendingAction.targetPlayerId;
            gs.pendingAction = null;
            (0, combatLogic_1.dealDamage)(gs, targetId, 1, null, playerId, 'FIRE');
            if (!gs.pendingAction)
                (0, combatLogic_1.resumeAfterAttack)(gs);
            this._broadcastAll();
        });
        this.onMessage('resolve_yinyang_choice', (client, data) => {
            if (!gs.pendingAction || gs.pendingAction.type !== 'WAITING_FOR_YINYANG_CHOICE')
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (playerId !== gs.pendingAction.targetPlayerId)
                return;
            const target = gs.players[playerId];
            const attacker = gs.players[gs.pendingAction.sourcePlayerId];
            if (data.action === 'DISCARD') {
                const idx = target.hand.findIndex(c => c.id === data.cardId);
                if (idx !== -1)
                    gs.discardPile.push(target.hand.splice(idx, 1)[0]);
            }
            else if (data.action === 'DRAW') {
                (0, phaseLogic_1.drawCards)(gs, 1).forEach(c => attacker.hand.push(c));
            }
            gs.pendingAction = null;
            (0, combatLogic_1.resumeAfterAttack)(gs);
            this._broadcastAll();
        });
        this.onMessage('resolve_weapon_skill', (client, data) => {
            if (!gs.pendingAction)
                return;
            const playerId = this._getPlayerIdByClient(client);
            if (playerId !== gs.pendingAction.sourcePlayerId)
                return;
            const pending = gs.pendingAction;
            const attacker = gs.players[playerId];
            const target = gs.players[pending.targetPlayerId];
            if (!data.accept) {
                if (pending.type === 'WAITING_FOR_FROST_DISCARD') {
                    gs.pendingAction = null;
                    (0, combatLogic_1.dealDamage)(gs, target.id, pending.originalDamage, (0, combatLogic_1.getCardById)(gs, pending.cardUsedId), attacker.id, pending.damageType);
                    if (!gs.pendingAction)
                        (0, combatLogic_1.resumeAfterAttack)(gs);
                }
                else if (['WAITING_FOR_GREEN_DRAGON', 'WAITING_FOR_AXE_DISCARD', 'WAITING_FOR_TRIDENT_DISCARD'].includes(pending.type)) {
                    gs.pendingAction = null;
                    (0, combatLogic_1.resumeAfterAttack)(gs);
                }
                this._broadcastAll();
                return;
            }
            if (pending.type === 'WAITING_FOR_GREEN_DRAGON') {
                const slashIdx = attacker.hand.findIndex(c => c.id === data.cardId && (c.name === 'SLASH' || c.name === 'THUNDER_ATTACK'));
                if (slashIdx !== -1) {
                    const slashCard = attacker.hand.splice(slashIdx, 1)[0];
                    gs.discardPile.push(slashCard);
                    const dmg = attacker.wineActive ? 2 : 1;
                    attacker.wineActive = false;
                    gs.pendingAction = { type: 'WAITING_FOR_DODGE', sourcePlayerId: playerId, targetPlayerId: target.id, cardUsedId: slashCard.id, damage: dmg, dodgeNeeded: 1, damageType: 'NORMAL', timeoutAt: Date.now() + 15000 };
                    this._broadcastAll();
                    if (target.isBot)
                        setTimeout(() => (0, botAI_1.handleBotDodge)(gs, target.id, dmg), 1200);
                }
                else {
                    gs.pendingAction = null;
                    (0, combatLogic_1.resumeAfterAttack)(gs);
                    this._broadcastAll();
                }
            }
            else if (pending.type === 'WAITING_FOR_AXE_DISCARD' || pending.type === 'WAITING_FOR_TRIDENT_DISCARD') {
                const discard2 = pending.type === 'WAITING_FOR_AXE_DISCARD';
                const cardIds = data.cardIds || [];
                const needed = discard2 ? 2 : 1;
                if (cardIds.length < needed)
                    return client.send('game_error', { message: `กรุณาเลือกการ์ดทิ้ง ${needed} ใบ` });
                cardIds.forEach((cid) => {
                    const idx = attacker.hand.findIndex(c => c.id === cid);
                    if (idx !== -1)
                        gs.discardPile.push(attacker.hand.splice(idx, 1)[0]);
                    else {
                        const slots = ['weapon', 'armor', 'offensiveHorse', 'defensiveHorse', 'treasure'];
                        for (const slot of slots) {
                            if (attacker.equipment[slot]?.id === cid) {
                                gs.discardPile.push(attacker.equipment[slot]);
                                attacker.equipment[slot] = null;
                                break;
                            }
                        }
                    }
                });
                gs.pendingAction = null;
                (0, combatLogic_1.dealDamage)(gs, target.id, pending.originalDamage, (0, combatLogic_1.getCardById)(gs, pending.cardUsedId), attacker.id, pending.damageType);
                if (!gs.pendingAction)
                    (0, combatLogic_1.resumeAfterAttack)(gs);
                this._broadcastAll();
            }
            else if (pending.type === 'WAITING_FOR_FROST_DISCARD') {
                const cardIds = data.cardIds || [];
                if (cardIds.length < 2)
                    return client.send('game_error', { message: 'กรุณาเลือกการ์ดทิ้ง 2 ใบ' });
                cardIds.slice(0, 2).forEach((cid) => {
                    const idx = target.hand.findIndex(c => c.id === cid);
                    if (idx !== -1)
                        gs.discardPile.push(target.hand.splice(idx, 1)[0]);
                    else {
                        const slots = ['weapon', 'armor', 'offensiveHorse', 'defensiveHorse', 'treasure'];
                        for (const slot of slots) {
                            if (target.equipment[slot]?.id === cid) {
                                gs.discardPile.push(target.equipment[slot]);
                                target.equipment[slot] = null;
                                break;
                            }
                        }
                    }
                });
                gs.pendingAction = null;
                (0, combatLogic_1.resumeAfterAttack)(gs);
                this._broadcastAll();
            }
        });
        this.onMessage('use_serpent_spear', (client, data) => {
            if (gs.pendingAction)
                return client.send('game_error', { message: 'กรุณารอการประมวลผลก่อนหน้า' });
            const playerId = this._getPlayerIdByClient(client);
            if (gs.turnOrder[gs.currentTurnIndex] !== playerId || gs.currentPhase !== 'PLAY')
                return client.send('game_error', { message: 'ไม่ใช่เทิร์นของคุณ หรือไม่ใช่ช่วงร่ายการ์ด' });
            const player = gs.players[playerId];
            if (!player?.equipment?.weapon || player.equipment.weapon.name !== 'SERPENT_SPEAR')
                return client.send('game_error', { message: 'คุณต้องสวม SERPENT_SPEAR ก่อนใช้ความสามารถนี้' });
            const { cardIds, targetPlayerId } = data;
            if (!cardIds || cardIds.length !== 2)
                return client.send('game_error', { message: 'กรุณาเลือกการ์ด 2 ใบเพื่อทิ้งแทน SLASH' });
            if (!cardIds.every((cid) => player.hand.some(c => c.id === cid)))
                return client.send('game_error', { message: 'ไม่พบการ์ดที่ระบุบนมือ' });
            const hasZhuge = player.equipment.weapon.name === 'ZHUGE_CROSSBOW';
            const isZhangFei = (0, phaseLogic_1.hasCharacter)(player, 'ZHANG_FEI');
            if (gs.attacksPlayedInTurn >= 1 && !hasZhuge && !isZhangFei)
                return client.send('game_error', { message: 'คุณใช้สิทธิ์โจมตีครบแล้วในเทิร์นนี้' });
            const target = gs.players[targetPlayerId];
            if (!target?.isAlive)
                return client.send('game_error', { message: 'เป้าหมายไม่พร้อมรับการโจมตี' });
            const weaponRange = player.equipment.weapon.range || 3;
            const dist = (0, phaseLogic_1.calculateDistance)(gs, playerId, targetPlayerId);
            if (dist > weaponRange)
                return client.send('game_error', { message: `ระยะไม่ถึง! เป้าหมายอยู่ห่าง ${dist} แต่ระยะโจมตีคือ ${weaponRange}` });
            if ((0, phaseLogic_1.hasCharacter)(target, 'ZHUGE_LIANG') && target.hand.length === 0)
                return client.send('game_error', { message: 'ขงเบ้งเปิดใช้สกิล เมืองว่างเปล่า ไม่สามารถตกเป็นเป้าหมายได้!' });
            cardIds.forEach((cid) => { const idx = player.hand.findIndex(c => c.id === cid); if (idx !== -1)
                gs.discardPile.push(player.hand.splice(idx, 1)[0]); });
            const damage = player.wineActive ? 2 : 1;
            player.wineActive = false;
            gs.attacksPlayedInTurn += 1;
            player.slashedThisTurn = true;
            gs.pendingAction = { type: 'WAITING_FOR_DODGE', sourcePlayerId: playerId, targetPlayerId, cardUsedId: `serpent_${Date.now()}`, damage, dodgeNeeded: (0, phaseLogic_1.hasCharacter)(player, 'LV_BU') ? 2 : 1, damageType: 'NORMAL', timeoutAt: Date.now() + 15000 };
            this.broadcast('card_played', { playerId: playerId, cardName: 'SERPENT_SPEAR', targetId: targetPlayerId });
            this._broadcastAll();
            if (target.isBot)
                setTimeout(() => (0, botAI_1.handleBotDodge)(gs, targetPlayerId, damage), 1200);
            else
                setTimeout(() => {
                    if (gs.pendingAction?.type === 'WAITING_FOR_DODGE' && gs.pendingAction.sourcePlayerId === playerId) {
                        gs.pendingAction = null;
                        (0, combatLogic_1.dealDamage)(gs, targetPlayerId, damage, null, playerId, 'NORMAL');
                        if (!gs.pendingAction)
                            (0, combatLogic_1.resumeAfterAttack)(gs);
                        this._broadcastAll();
                    }
                }, 15000);
        });
        // Character Skills
        this.onMessage('use_sun_quan_skill', (client, data) => {
            const playerId = this._getPlayerIdByClient(client);
            if (!playerId)
                return;
            const player = gs.players[playerId];
            if (!(0, phaseLogic_1.hasCharacter)(player, 'SUN_QUAN') || player.skillResignationUsed || gs.currentPhase !== 'PLAY')
                return;
            let count = 0;
            (data.cardIds || []).forEach((cid) => {
                const idx = player.hand.findIndex(c => c.id === cid);
                if (idx !== -1) {
                    gs.discardPile.push(player.hand.splice(idx, 1)[0]);
                    count++;
                }
            });
            if (count > 0) {
                (0, phaseLogic_1.drawCards)(gs, count).forEach(c => player.hand.push(c));
                player.skillResignationUsed = true;
                this._broadcastAll();
            }
        });
        this.onMessage('use_liu_bei_skill', (client, data) => {
            const playerId = this._getPlayerIdByClient(client);
            if (!playerId)
                return;
            const player = gs.players[playerId];
            if (!(0, phaseLogic_1.hasCharacter)(player, 'LIU_BEI') || gs.currentPhase !== 'PLAY' || player.liuBeiHealedThisTurn)
                return;
            const { targetPlayerId, cardId } = data;
            const target = gs.players[targetPlayerId];
            if (!target?.isAlive)
                return;
            const cardIdx = player.hand.findIndex(c => c.id === cardId);
            if (cardIdx === -1)
                return;
            const card = player.hand.splice(cardIdx, 1)[0];
            target.hand.push(card);
            if (target.hp < target.maxHp) {
                player.hp = Math.min(player.maxHp, player.hp + 1);
                player.liuBeiHealedThisTurn = true;
            }
            this._broadcastAll();
        });
        this.onMessage('use_diao_chan_skill', (client, data) => {
            const playerId = this._getPlayerIdByClient(client);
            if (!playerId)
                return;
            const player = gs.players[playerId];
            if (!(0, phaseLogic_1.hasCharacter)(player, 'DIAO_CHAN') || gs.turnOrder[gs.currentTurnIndex] !== playerId || gs.currentPhase !== 'PLAY' || player.skillDiaoChanUsed)
                return;
            const { targetPlayerId, cardId } = data;
            const target = gs.players[targetPlayerId];
            if (!target?.isAlive || targetPlayerId === playerId)
                return;
            const cardIdx = player.hand.findIndex(c => c.id === cardId);
            if (cardIdx === -1)
                return client.send('game_error', { message: 'ไม่พบการ์ดที่จะทิ้งบนมือ' });
            gs.discardPile.push(player.hand.splice(cardIdx, 1)[0]);
            player.skillDiaoChanUsed = true;
            this.broadcast('card_played', { playerId, cardName: 'สกิล Seduction', targetId: targetPlayerId });
            gs.pendingAction = { type: 'DIAO_CHAN_SEDUCTION', sourcePlayerId: playerId, targetPlayerId, cardUsedId: cardId, damage: 1, timeoutAt: Date.now() + 15000 };
            this._broadcastAll();
            if (target.isBot)
                setTimeout(() => (0, botAI_1.handleBotSeduction)(gs, targetPlayerId), 1200);
            else
                setTimeout(() => {
                    if (gs.pendingAction?.type === 'DIAO_CHAN_SEDUCTION' && gs.pendingAction.cardUsedId === cardId) {
                        gs.pendingAction = null;
                        (0, combatLogic_1.dealDamage)(gs, targetPlayerId, 1, null, playerId);
                        if (!gs.pendingAction)
                            (0, combatLogic_1.resumeAfterAttack)(gs);
                        this._broadcastAll();
                    }
                }, 15000);
        });
        this.onMessage('use_zhou_yu_skill', (client, data) => {
            const playerId = this._getPlayerIdByClient(client);
            if (!playerId)
                return;
            const player = gs.players[playerId];
            if (!(0, phaseLogic_1.hasCharacter)(player, 'ZHOU_YU') || gs.turnOrder[gs.currentTurnIndex] !== playerId || gs.currentPhase !== 'PLAY' || player.skillZhouYuUsed)
                return;
            const { targetPlayerId, cardId } = data;
            const target = gs.players[targetPlayerId];
            if (!target?.isAlive || targetPlayerId === playerId)
                return;
            const cardIdx = player.hand.findIndex(c => c.id === cardId);
            if (cardIdx === -1)
                return client.send('game_error', { message: 'ไม่พบการ์ดที่จะทิ้งบนมือ' });
            const discarded = player.hand.splice(cardIdx, 1)[0];
            gs.discardPile.push(discarded);
            const suitColor = (discarded.suit === 'HEART' || discarded.suit === 'DIAMOND') ? 'RED' : 'BLACK';
            player.skillZhouYuUsed = true;
            gs.pendingAction = { type: 'ZHOU_YU_DISCORD', sourcePlayerId: playerId, targetPlayerId, cardUsedId: cardId, requiredColor: suitColor, damage: 1, timeoutAt: Date.now() + 15000 };
            this._broadcastAll();
            if (target.isBot)
                setTimeout(() => (0, botAI_1.handleBotZhouYu)(gs, targetPlayerId, suitColor), 1200);
            else
                setTimeout(() => {
                    if (gs.pendingAction?.type === 'ZHOU_YU_DISCORD' && gs.pendingAction.cardUsedId === cardId) {
                        gs.pendingAction = null;
                        (0, combatLogic_1.dealDamage)(gs, targetPlayerId, 1, null, playerId);
                        if (!gs.pendingAction)
                            (0, combatLogic_1.resumeAfterAttack)(gs);
                        this._broadcastAll();
                    }
                }, 15000);
        });
        // Admin Tools
        this.onMessage('admin_authenticate', (client, data) => {
            const { secretKey } = data;
            const playerId = this._getPlayerIdByClient(client);
            const playerName = (playerId && gs.players[playerId]?.name) || '';
            const isAdminByName = playerName.toLowerCase() === 'admin';
            if (secretKey === ADMIN_SECRET_KEY || this.roomId === 'ROOM_TEST' || isAdminByName) {
                this._adminSockets.add(client.sessionId);
                client.send('admin_auth_status', { isAdmin: true, message: '🔓 ยืนยันสิทธิ์ Admin สำเร็จ!' });
            }
            else {
                client.send('admin_auth_status', { isAdmin: false, message: '🔒 รหัสผ่าน Admin ไม่ถูกต้อง!' });
            }
        });
        this.onMessage('admin_spawn_card', (client, data) => {
            if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST')
                return client.send('game_error', { message: '⚠️ ปฏิเสธสิทธิ์: ต้องใช้สิทธิ์ Admin ในการเสกการ์ด' });
            const playerId = this._getPlayerIdByClient(client);
            if (!playerId)
                return;
            const player = gs.players[playerId];
            const { cardName } = data;
            let cardType = 'BASIC';
            const WEAPON_RANGE = { 'ZHUGE_CROSSBOW': 1, 'BLUE_STEEL_SWORD': 2, 'SIX_SWORDS_WU': 2, 'FROST_SWORD': 2, 'YIN_YANG_SWORDS': 2, 'SERPENT_SPEAR': 3, 'TWO_BLADED_TRIDENT': 3, 'ROCK_CLEAVING_AXE': 3, 'GREEN_DRAGON_BLADE': 3, 'FEATHERED_FAN': 4, 'SKY_PIERCING_HALBERD': 4, 'KIRIN_BOW': 5 };
            const ALL_EQUIPMENT = [...Object.keys(WEAPON_RANGE), 'NIO_SHIELD', 'EIGHT_TRIGRAMS_FORMATION', 'SILVER_LION_HELMET', 'RATTAN_ARMOR', 'RED_HARE', 'SHADOWRUNNER', 'LIGHTNING_HOOF', 'FERGANA_STEED', 'WOODEN_CART'];
            if (['ACEDIA', 'STARVATION', 'LIGHTNING'].includes(cardName))
                cardType = 'DELAYED';
            else if (ALL_EQUIPMENT.includes(cardName))
                cardType = 'EQUIPMENT';
            else if (['STEAL', 'SABOTAGE', 'DUEL', 'FIRE_ATTACK', 'IRON_CHAIN', 'EX_NIHILO', 'BARBARIAN_INVASION', 'ARROW_BARRAGE', 'PEACH_GARDEN', 'BUMPER_HARVEST', 'BORROWED_SWORD', 'NEGATE'].includes(cardName))
                cardType = 'KIT';
            const extra = {};
            if (WEAPON_RANGE[cardName])
                extra.range = WEAPON_RANGE[cardName];
            player.hand.push({ id: `admin_c_${Date.now()}`, name: cardName, suit: 'HEART', rank: 7, type: cardType, ...extra });
            gs.chat.push({ sender: 'Admin', text: `🛠️ เสกการ์ด [${cardName}] ขึ้นมือสำเร็จ!`, time: new Date().toLocaleTimeString('th-TH') });
            this._broadcastAll();
        });
        this.onMessage('admin_change_hero', (client, data) => {
            if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST')
                return client.send('game_error', { message: '⚠️ ปฏิเสธสิทธิ์' });
            const playerId = this._getPlayerIdByClient(client);
            if (!playerId)
                return;
            const player = gs.players[playerId];
            const allHeroes = (0, phaseLogic_1.getAllHeroes)();
            const rawChar = data.character || data.characterId;
            const charId = typeof rawChar === 'object' ? (rawChar.id || rawChar.name || '') : String(rawChar || '');
            player.character = charId;
            const heroInfo = allHeroes.find((h) => h.id === charId || h.name === charId);
            if (heroInfo) {
                player.maxHp = heroInfo.hp || 4;
                player.hp = Math.min(player.hp, player.maxHp);
            }
            gs.chat.push({ sender: 'Admin', text: `🧙 เปลี่ยนขุนพลเป็น [${charId}] สำเร็จ!`, time: new Date().toLocaleTimeString('th-TH') });
            this._broadcastAll();
        });
        this.onMessage('admin_set_hp', (client, data) => {
            if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST')
                return client.send('game_error', { message: '⚠️ ปฏิเสธสิทธิ์' });
            const playerId = this._getPlayerIdByClient(client);
            if (!playerId)
                return;
            const player = gs.players[playerId];
            player.hp = Math.max(0, Math.min(data.hp, player.maxHp || 5));
            if (player.hp > 0)
                player.isAlive = true;
            gs.chat.push({ sender: 'Admin', text: `❤️ ปรับพลังชีวิตเป็น [${player.hp}/${player.maxHp}]`, time: new Date().toLocaleTimeString('th-TH') });
            this._broadcastAll();
        });
        this.onMessage('admin_spawn_bot', (client) => {
            if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST')
                return client.send('game_error', { message: '⚠️ ปฏิเสธสิทธิ์' });
            const botId = `bot_${Date.now().toString().slice(-4)}`;
            const allHeroes = (0, phaseLogic_1.getAllHeroes)();
            const randHero = allHeroes[Math.floor(Math.random() * allHeroes.length)] || { id: 'GUAN_YU', hp: 4 };
            gs.players[botId] = {
                id: botId, name: `บอททดสอบ_${botId.slice(-3)}`, socketId: '', role: 'REBEL',
                character: randHero.id, hp: randHero.hp || 4, maxHp: randHero.hp || 4,
                hand: (0, phaseLogic_1.drawCards)(gs, 4), equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
                delayedKitZone: [], isAlive: true, wineActive: false, isBot: true, isDisconnected: false, isChained: false,
                isHost: false, slashedThisTurn: false, skillResignationUsed: false, skillDiaoChanUsed: false, skillZhouYuUsed: false
            };
            if (!gs.turnOrder.includes(botId))
                gs.turnOrder.push(botId);
            gs.chat.push({ sender: 'Admin', text: `🤖 เพิ่มบอททดสอบ [${gs.players[botId].name}] สำเร็จ!`, time: new Date().toLocaleTimeString('th-TH') });
            this._broadcastAll();
        });
        this.onMessage('admin_remove_bot', (client, data) => {
            if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST')
                return client.send('game_error', { message: '⚠️ ปฏิเสธสิทธิ์' });
            let targetBotId = data.botId;
            if (!targetBotId) {
                const bots = Object.values(gs.players).filter(p => p.isBot);
                if (bots.length > 0)
                    targetBotId = bots[bots.length - 1].id;
            }
            if (!targetBotId || !gs.players[targetBotId])
                return client.send('game_error', { message: 'ไม่พบบอทที่ต้องการลบ' });
            const botName = gs.players[targetBotId].name;
            delete gs.players[targetBotId];
            gs.turnOrder = gs.turnOrder.filter(id => id !== targetBotId);
            if (gs.currentTurnIndex >= gs.turnOrder.length)
                gs.currentTurnIndex = 0;
            gs.chat.push({ sender: 'Admin', text: `🗑️ ลบบอท [${botName}] ออกจากห้องสำเร็จ!`, time: new Date().toLocaleTimeString('th-TH') });
            this._broadcastAll();
        });
        this.onMessage('admin_toggle_bot_ai', (client, data) => {
            if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST')
                return;
            gs.isBotPassive = data.isPassive;
            gs.chat.push({ sender: 'Admin', text: `🤖 โหมดบอท: ${data.isPassive ? '⏸️ อยู่เฉยๆ (Passive)' : '▶️ เล่นอัตโนมัติ (Auto AI)'}`, time: new Date().toLocaleTimeString('th-TH') });
            this._broadcastAll();
        });
        this.onMessage('admin_bot_pass_turn', (client) => {
            if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST')
                return;
            const currentId = gs.turnOrder[gs.currentTurnIndex];
            const currentP = gs.players[currentId];
            if (currentP?.isBot) {
                gs.chat.push({ sender: 'Admin', text: `⏩ สั่งให้บอท [${currentP.name}] ผ่านเทิร์น`, time: new Date().toLocaleTimeString('th-TH') });
                (0, phaseLogic_1.endPlayerTurn)(gs);
            }
        });
        this.onMessage('admin_bot_slash', (client, data) => {
            if (!this._adminSockets.has(client.sessionId) && this.roomId !== 'ROOM_TEST')
                return;
            const bot = gs.players[data.botId] || Object.values(gs.players).find(p => p.isBot);
            const target = gs.players[data.targetId] || gs.players['p1'];
            if (!bot || !target)
                return;
            gs.chat.push({ sender: 'Admin', text: `⚔️ สั่งให้บอท [${bot.name}] ฟัน [${target.name}] ด้วย SLASH`, time: new Date().toLocaleTimeString('th-TH') });
            (0, combatLogic_1.dealDamage)(gs, target.id, 1, { id: `admin_slash_${Date.now()}`, name: 'SLASH', suit: 'SPADE', rank: 8, type: 'BASIC' }, bot.id, 'NORMAL');
        });
    }
    // ─── Helpers ───────────────────────────────────────────────────────────────
    _getPlayerIdByClient(client) {
        const gs = this.gameState;
        return Object.keys(gs.players).find(pid => gs.players[pid].socketId === client.sessionId) || null;
    }
    _makeSocketLike(client) {
        const playerId = this._getPlayerIdByClient(client);
        return {
            id: client.sessionId,
            emit: (event, data) => client.send(event, data),
            send: (event, data) => client.send(event, data),
            _playerId: playerId,
        };
    }
    // ─── Broadcast all clients with sanitized state ────────────────────────────
    _broadcastAll() {
        const gs = this.gameState;
        this.state.status = gs.status;
        this.state.currentPhase = gs.currentPhase;
        this.state.currentTurnPlayerId = gs.turnOrder[gs.currentTurnIndex] || '';
        this.state.winnerRole = gs.winnerRole || '';
        this.state.winnerText = gs.winnerText || '';
        this.state.mode = gs.mode;
        this.state.isBotPassive = gs.isBotPassive;
        this.clients.forEach((client) => {
            const playerId = this._getPlayerIdByClient(client);
            const sanitized = (0, phaseLogic_1.getSanitizedRoomState)(gs, playerId);
            client.send('room_state_update', sanitized);
        });
    }
}
exports.WTKRoom = WTKRoom;
//# sourceMappingURL=WTKRoom.js.map