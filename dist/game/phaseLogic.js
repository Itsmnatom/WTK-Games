'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHeroes = void 0;
exports.initDeck = initDeck;
exports.drawCards = drawCards;
exports.assignRoles = assignRoles;
exports.setupCharacterHp = setupCharacterHp;
exports.startDraftPhase = startDraftPhase;
exports.startPlayPhase = startPlayPhase;
exports.startPlayerTurn = startPlayerTurn;
exports.executeDrawPhase = executeDrawPhase;
exports.checkDiscardRequirement = checkDiscardRequirement;
exports.endPlayerTurn = endPlayerTurn;
exports.calculateDistance = calculateDistance;
exports.hasCharacter = hasCharacter;
exports.getSanitizedRoomState = getSanitizedRoomState;
/**
 * game/phaseLogic.ts
 * Deck management, turn phases, draw/play/discard phase controllers
 */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let allHeroes = [];
try {
    let heroesPath = path_1.default.join(process.cwd(), 'public', 'heroes.json');
    if (!fs_1.default.existsSync(heroesPath)) {
        heroesPath = path_1.default.join(__dirname, '..', 'public', 'heroes.json');
    }
    const data = fs_1.default.readFileSync(heroesPath, 'utf8');
    allHeroes = JSON.parse(data);
}
catch (e) {
    console.log('[phaseLogic] Could not load heroes.json:', e.message);
    allHeroes = [];
}
// ─── Utility helpers ──────────────────────────────────────────────────────────
function hasCharacter(player, charName) {
    if (!player || !player.character)
        return false;
    let charStr = '';
    if (typeof player.character === 'string') {
        charStr = player.character;
    }
    else if (typeof player.character === 'object') {
        charStr = player.character.id || player.character.name || player.character.title || '';
    }
    else {
        charStr = String(player.character);
    }
    if (!charStr)
        return false;
    return charStr.toUpperCase().includes(charName.toUpperCase());
}
// ─── Deck Logic ───────────────────────────────────────────────────────────────
function initDeck() {
    const suits = ['SPADE', 'HEART', 'DIAMOND', 'CLUB'];
    const deck = [];
    let idCounter = 1;
    const push = (name, suit, rank, type, count = 1, extra = {}) => {
        for (let i = 0; i < count; i++) {
            deck.push({ id: `c_${idCounter++}`, name, suit, rank: rank || Math.floor(Math.random() * 13) + 1, type, ...extra });
        }
    };
    // BASIC cards
    for (let i = 0; i < 20; i++) {
        const suit = i < 5 ? 'SPADE' : i < 10 ? 'CLUB' : i < 15 ? 'HEART' : 'DIAMOND';
        push('SLASH', suit, 0, 'BASIC');
    }
    push('SLASH', 'SPADE', 0, 'BASIC'); // extra
    for (let i = 0; i < 10; i++)
        push('DODGE', i < 5 ? 'HEART' : 'DIAMOND', 0, 'BASIC');
    for (let i = 0; i < 12; i++)
        push('PEACH', i < 6 ? 'HEART' : 'DIAMOND', 0, 'BASIC');
    for (let i = 0; i < 10; i++)
        push('WINE', suits[i % 4], 0, 'BASIC');
    for (let i = 0; i < 8; i++)
        push('THUNDER_ATTACK', i < 4 ? 'SPADE' : 'CLUB', 0, 'BASIC');
    // KIT cards
    for (let i = 0; i < 10; i++)
        push('STEAL', i % 2 === 0 ? 'SPADE' : 'CLUB', 0, 'KIT');
    for (let i = 0; i < 12; i++)
        push('SABOTAGE', i % 2 === 0 ? 'SPADE' : 'CLUB', 0, 'KIT');
    for (let i = 0; i < 10; i++)
        push('EX_NIHILO', 'HEART', 0, 'KIT');
    for (let i = 0; i < 10; i++)
        push('DUEL', i % 2 === 0 ? 'SPADE' : 'CLUB', 0, 'KIT');
    for (let i = 0; i < 10; i++)
        push('BARBARIAN_INVASION', 'SPADE', 0, 'KIT');
    for (let i = 0; i < 10; i++)
        push('ARROW_BARRAGE', 'HEART', 0, 'KIT');
    for (let i = 0; i < 10; i++)
        push('PEACH_GARDEN', 'HEART', 1, 'KIT');
    for (let i = 0; i < 6; i++)
        push('IRON_CHAIN', i % 2 === 0 ? 'SPADE' : 'CLUB', 0, 'KIT');
    for (let i = 0; i < 5; i++)
        push('FIRE_ATTACK', 'HEART', 0, 'KIT');
    for (let i = 0; i < 7; i++)
        push('NEGATE', i % 2 === 0 ? 'SPADE' : 'CLUB', 0, 'KIT');
    for (let i = 0; i < 3; i++)
        push('BUMPER_HARVEST', 'HEART', 0, 'KIT');
    for (let i = 0; i < 2; i++)
        push('BORROWED_SWORD', 'CLUB', 0, 'KIT');
    // DELAYED cards
    push('LIGHTNING', 'SPADE', 1, 'DELAYED');
    push('LIGHTNING', 'HEART', 12, 'DELAYED');
    push('LIGHTNING', 'CLUB', 10, 'DELAYED');
    push('LIGHTNING', 'DIAMOND', 11, 'DELAYED');
    for (let i = 0; i < 10; i++)
        push('ACEDIA', 'SPADE', 6, 'DELAYED');
    for (let i = 0; i < 10; i++)
        push('STARVATION', 'CLUB', 10, 'DELAYED');
    // EQUIPMENT — Weapons
    for (let i = 0; i < 5; i++) {
        push('ZHUGE_CROSSBOW', 'DIAMOND', 1, 'EQUIPMENT', 1, { range: 1 });
        push('ZHUGE_CROSSBOW', 'SPADE', 1, 'EQUIPMENT', 1, { range: 1 });
    }
    for (let i = 0; i < 5; i++)
        push('BLUE_STEEL_SWORD', 'SPADE', 6, 'EQUIPMENT', 1, { range: 2 });
    for (let i = 0; i < 3; i++)
        push('SIX_SWORDS_WU', 'SPADE', 7, 'EQUIPMENT', 1, { range: 2 });
    for (let i = 0; i < 3; i++)
        push('KIRIN_BOW', 'HEART', 5, 'EQUIPMENT', 1, { range: 5 });
    for (let i = 0; i < 3; i++)
        push('FEATHERED_FAN', 'DIAMOND', 8, 'EQUIPMENT', 1, { range: 4 });
    for (let i = 0; i < 3; i++)
        push('SERPENT_SPEAR', 'SPADE', 3, 'EQUIPMENT', 1, { range: 3 });
    for (let i = 0; i < 3; i++)
        push('FROST_SWORD', 'SPADE', 2, 'EQUIPMENT', 1, { range: 2 });
    for (let i = 0; i < 3; i++)
        push('TWO_BLADED_TRIDENT', 'CLUB', 3, 'EQUIPMENT', 1, { range: 3 });
    for (let i = 0; i < 3; i++)
        push('ROCK_CLEAVING_AXE', 'DIAMOND', 4, 'EQUIPMENT', 1, { range: 3 });
    for (let i = 0; i < 3; i++)
        push('GREEN_DRAGON_BLADE', 'HEART', 5, 'EQUIPMENT', 1, { range: 3 });
    for (let i = 0; i < 3; i++)
        push('SKY_PIERCING_HALBERD', 'SPADE', 4, 'EQUIPMENT', 1, { range: 4 });
    for (let i = 0; i < 3; i++)
        push('YIN_YANG_SWORDS', 'SPADE', 2, 'EQUIPMENT', 1, { range: 2 });
    // EQUIPMENT — Armor
    for (let i = 0; i < 5; i++)
        push('NIO_SHIELD', 'SPADE', 8, 'EQUIPMENT');
    for (let i = 0; i < 5; i++)
        push('EIGHT_TRIGRAMS_FORMATION', 'CLUB', 4, 'EQUIPMENT');
    for (let i = 0; i < 5; i++)
        push('SILVER_LION_HELMET', 'DIAMOND', 11, 'EQUIPMENT');
    for (let i = 0; i < 5; i++)
        push('RATTAN_ARMOR', 'CLUB', 2, 'EQUIPMENT');
    // EQUIPMENT — Horses
    for (let i = 0; i < 7; i++)
        push('LIGHTNING_HOOF', 'HEART', 13, 'EQUIPMENT');
    for (let i = 0; i < 7; i++)
        push('RED_HARE', 'HEART', 5, 'EQUIPMENT');
    for (let i = 0; i < 5; i++)
        push('FERGANA_STEED', 'CLUB', 4, 'EQUIPMENT');
    for (let i = 0; i < 5; i++)
        push('SHADOWRUNNER', 'DIAMOND', 3, 'EQUIPMENT');
    // EQUIPMENT — Treasure
    for (let i = 0; i < 2; i++)
        push('WOODEN_CART', 'DIAMOND', 0, 'EQUIPMENT');
    return deck.sort(() => 0.5 - Math.random());
}
function drawCards(room, count) {
    const cards = [];
    for (let i = 0; i < count; i++) {
        if (room.deck.length === 0) {
            if (room.discardPile.length === 0)
                break;
            room.deck = [...room.discardPile].sort(() => 0.5 - Math.random());
            room.discardPile = [];
        }
        cards.push(room.deck.pop());
    }
    return cards;
}
// ─── Role Assignment ──────────────────────────────────────────────────────────
function assignRoles(room) {
    const count = room.turnOrder.length;
    const roleSets = {
        2: ['LORD', 'REBEL'],
        3: ['LORD', 'REBEL', 'RENEGADE'],
        4: ['LORD', 'LOYALIST', 'REBEL', 'RENEGADE'],
        5: ['LORD', 'LOYALIST', 'REBEL', 'REBEL', 'RENEGADE'],
        6: ['LORD', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'],
        7: ['LORD', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'],
        8: ['LORD', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'],
        9: ['LORD', 'LOYALIST', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'],
    };
    let roles = (roleSets[count] || roleSets[9]).slice();
    if (count >= 10)
        roles = ['LORD', 'LOYALIST', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE', 'RENEGADE'];
    // Fisher-Yates shuffle
    for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
    }
    const lordIndex = roles.indexOf('LORD');
    room.turnOrder.forEach((pid, idx) => { room.players[pid].role = roles[idx]; });
    // LORD goes first
    if (lordIndex > 0) {
        room.turnOrder = [...room.turnOrder.slice(lordIndex), ...room.turnOrder.slice(0, lordIndex)];
    }
}
// ─── Character HP Setup ───────────────────────────────────────────────────────
function setupCharacterHp(player, playerCount = 4) {
    const charId = typeof player.character === 'string' ? player.character : (player.character?.id || player.character?.name || '');
    const n = (charId || '').toUpperCase();
    const isLow = n.includes('ZHEN_JI') || n.includes('LADY_ZHEN') || n.includes('DIAO_CHAN') ||
        n.includes('ZHUGE_LIANG') || n.includes('XIAO_QIAO') || n.includes('DA_QIAO') ||
        n.includes('CAI_WENJI');
    let baseHp = isLow ? 3 : 4;
    if (player.role === 'LORD' && playerCount >= 6) {
        player.maxHp = baseHp + 1;
        player.hp = baseHp + 1;
    }
    else {
        player.maxHp = baseHp;
        player.hp = baseHp;
    }
}
// ─── Draft Phase ──────────────────────────────────────────────────────────────
function startDraftPhase(room) {
    room.status = 'DRAFTING';
    Object.values(room.players).forEach((player) => {
        let choices = [];
        if (player.role === 'LORD') {
            const lords = allHeroes.filter((h) => ['Cao Cao', 'Liu Bei', 'Sun Quan'].includes(h.title || h.name));
            const rest = allHeroes.filter((h) => !['Cao Cao', 'Liu Bei', 'Sun Quan'].includes(h.title || h.name)).sort(() => 0.5 - Math.random());
            choices = [...lords, ...rest.slice(0, 2)];
        }
        else {
            choices = [...allHeroes].sort(() => 0.5 - Math.random()).slice(0, 3);
        }
        player.characterChoices = choices.map((h) => ({
            id: (h.title || h.name).toUpperCase().replace(/[^A-Z0-9]/g, '_'),
            name: h.title || h.name,
            sub: h.sub || '',
            pic: h.pic || '',
            kingdom: h.kingdom
        }));
        if (player.isBot) {
            player.character = player.characterChoices[0].id;
            setupCharacterHp(player, room.turnOrder.length);
        }
    });
}
// ─── Play Phase Start ─────────────────────────────────────────────────────────
function startPlayPhase(room) {
    room.status = 'PLAYING';
    room.deck = initDeck();
    room.discardPile = [];
    Object.values(room.players).forEach((player) => {
        player.hand = drawCards(room, 4);
    });
    room.currentTurnIndex = 0;
    startPlayerTurn(room);
}
// ─── Distance Calculation ─────────────────────────────────────────────────────
function calculateDistance(room, fromId, toId) {
    const order = room.turnOrder.filter((pid) => room.players[pid] && room.players[pid].isAlive);
    const idxFrom = order.indexOf(fromId);
    const idxTo = order.indexOf(toId);
    if (idxFrom === -1 || idxTo === -1)
        return 999;
    const directDiff = Math.abs(idxFrom - idxTo);
    const circularDiff = order.length - directDiff;
    let base = Math.min(directDiff, circularDiff);
    const attacker = room.players[fromId];
    const defender = room.players[toId];
    if (attacker?.equipment?.offensiveHorse)
        base -= 1;
    if (defender?.equipment?.defensiveHorse)
        base += 1;
    return Math.max(1, base);
}
// ─── Turn Flow ────────────────────────────────────────────────────────────────
function startPlayerTurn(room) {
    if (room.status === 'ENDED')
        return;
    const aliveCount = Object.values(room.players).filter((p) => p.isAlive).length;
    if (aliveCount === 0) {
        room.status = 'ENDED';
        return;
    }
    const playerId = room.turnOrder[room.currentTurnIndex];
    const player = room.players[playerId];
    if (!player || !player.isAlive) {
        room.currentTurnIndex = (room.currentTurnIndex + 1) % room.turnOrder.length;
        setTimeout(() => startPlayerTurn(room), 0);
        return;
    }
    // Reset per-turn flags
    player.slashedThisTurn = false;
    player.skillResignationUsed = false;
    player.cardsGivenThisTurn = 0;
    player.liuBeiHealedThisTurn = false;
    player.skillDiaoChanUsed = false;
    player.skillZhouYuUsed = false;
    room.attacksPlayedInTurn = 0;
    let skipPlayPhase = false;
    let skipDrawPhase = false;
    // ── JUDGEMENT PHASE ──
    if (player.delayedKitZone && player.delayedKitZone.length > 0) {
        room.currentPhase = 'JUDGEMENT';
        room._broadcastFn && room._broadcastFn();
        while (player.delayedKitZone.length > 0) {
            const card = player.delayedKitZone.pop();
            const judgeCard = drawCards(room, 1)[0];
            if (!judgeCard)
                break;
            room.discardPile.push(judgeCard);
            room.discardPile.push(card);
            let isSuccess = false;
            let titleName = card.name;
            if (card.name === 'LIGHTNING') {
                isSuccess = !(judgeCard.suit === 'SPADE' && judgeCard.rank >= 2 && judgeCard.rank <= 9);
                titleName = 'อัสนีบาต (สายฟ้า)';
            }
            else if (card.name === 'ACEDIA') {
                isSuccess = judgeCard.suit === 'HEART';
                titleName = 'สุขไม่คิดกลับ';
            }
            else if (card.name === 'STARVATION') {
                isSuccess = judgeCard.suit === 'CLUB';
                titleName = 'เสบียงขาด';
            }
            room._emitAll && room._emitAll('judgement_result', {
                title: titleName, card: judgeCard, isSuccess,
                targetPlayerId: player.id, targetPlayerName: player.name
            });
            if (card.name === 'LIGHTNING') {
                if (!isSuccess) {
                    // Strike: 3 THUNDER damage
                    const { dealDamage } = require('./combatLogic');
                    dealDamage(room, playerId, 3, card, null, 'THUNDER');
                    if (room.pendingAction?.type === 'DYING')
                        return;
                }
                else {
                    // Pass to next alive player
                    const myIdx = room.turnOrder.indexOf(playerId);
                    let nextId = room.turnOrder[(myIdx + 1) % room.turnOrder.length];
                    let tries = 0;
                    while (!room.players[nextId]?.isAlive && tries < room.turnOrder.length) {
                        nextId = room.turnOrder[(room.turnOrder.indexOf(nextId) + 1) % room.turnOrder.length];
                        tries++;
                    }
                    if (room.players[nextId]?.isAlive) {
                        room.players[nextId].delayedKitZone = room.players[nextId].delayedKitZone || [];
                        room.players[nextId].delayedKitZone.push(card);
                        room.discardPile.pop();
                    }
                }
            }
            else if (card.name === 'ACEDIA') {
                if (!isSuccess)
                    skipPlayPhase = true;
            }
            else if (card.name === 'STARVATION') {
                if (!isSuccess)
                    skipDrawPhase = true;
            }
        }
    }
    // Zhen Ji / Lady Zhen skill: Luo River
    if (hasCharacter(player, 'ZHEN_JI') || hasCharacter(player, 'LADY_ZHEN')) {
        if (player.isBot) {
            let isBlack = true;
            while (isBlack) {
                const drawn = drawCards(room, 1);
                if (!drawn.length)
                    break;
                const c = drawn[0];
                if (c.suit === 'SPADE' || c.suit === 'CLUB') {
                    player.hand.push(c);
                }
                else {
                    room.discardPile.push(c);
                    isBlack = false;
                }
            }
            executeDrawPhase(room, player, skipDrawPhase, skipPlayPhase);
        }
        else {
            room.currentPhase = 'PREPARATION';
            room.pendingAction = { type: 'LUO_RIVER', targetPlayerId: playerId, skipDrawPhase, skipPlayPhase };
            room._broadcastFn && room._broadcastFn();
        }
    }
    else {
        executeDrawPhase(room, player, skipDrawPhase, skipPlayPhase);
    }
}
function executeDrawPhase(room, player, skipDrawPhase = false, skipPlayPhase = false) {
    if (!skipDrawPhase) {
        room.currentPhase = 'DRAW';
        const drawCount = hasCharacter(player, 'ZHOU_YU') ? 3 : 2;
        player.hand.push(...drawCards(room, drawCount));
    }
    if (!skipPlayPhase) {
        room.currentPhase = 'PLAY';
        room.attacksPlayedInTurn = 0;
        player.wineActive = false;
        room._broadcastFn && room._broadcastFn();
        if (player.isBot) {
            setTimeout(() => {
                const { runBotTurn } = require('./botAI');
                runBotTurn(room, player.id);
            }, 1500);
        }
    }
    else {
        // Affected by ACEDIA (สุขไม่คิดกลับ): Skip turn completely without forcing card discard
        endPlayerTurn(room);
    }
}
function checkDiscardRequirement(room) {
    const playerId = room.turnOrder[room.currentTurnIndex];
    const player = room.players[playerId];
    if (!player) {
        endPlayerTurn(room);
        return;
    }
    let maxHand = player.hp;
    if (player.equipment?.treasure?.name === 'WOODEN_CART')
        maxHand += 1;
    if (player.hand.length <= maxHand) {
        endPlayerTurn(room);
    }
    else {
        room._broadcastFn && room._broadcastFn();
        if (player.isBot) {
            setTimeout(() => {
                const numToDiscard = player.hand.length - maxHand;
                const discarded = player.hand.splice(0, numToDiscard);
                room.discardPile.push(...discarded);
                endPlayerTurn(room);
            }, 1000);
        }
    }
}
function endPlayerTurn(room) {
    const playerId = room.turnOrder[room.currentTurnIndex];
    const player = room.players[playerId];
    if (player)
        player.wineActive = false;
    room.currentTurnIndex = (room.currentTurnIndex + 1) % room.turnOrder.length;
    startPlayerTurn(room);
}
// ─── Sanitized State for client ───────────────────────────────────────────────
function getSanitizedRoomState(room, targetPlayerId) {
    const maskedPlayers = {};
    Object.keys(room.players).forEach((pId) => {
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
            delayedKitZone: p.delayedKitZone || [],
            isAlive: p.isAlive,
            wineActive: p.wineActive,
            isBot: p.isBot,
            handCount: p.hand ? p.hand.length : 0,
            hand: pId === targetPlayerId ? p.hand : null,
            slashedThisTurn: p.slashedThisTurn || false,
            skillResignationUsed: p.skillResignationUsed || false,
            skillDiaoChanUsed: p.skillDiaoChanUsed || false,
            skillZhouYuUsed: p.skillZhouYuUsed || false,
            isHost: (room.hostSocketId === p.socketId || p.id === 'p1'),
            isDisconnected: p.isDisconnected || false,
            isChained: p.isChained || false,
        };
    });
    return {
        roomId: room.roomId,
        status: room.status,
        mode: room.mode,
        currentTurnPlayerId: room.turnOrder[room.currentTurnIndex] || null,
        currentPhase: room.currentPhase,
        pendingAction: room.pendingAction,
        players: maskedPlayers,
        turnOrder: room.turnOrder,
        winnerRole: room.winnerRole || null,
        winnerText: room.winnerText || null,
        bumperHarvestCards: room.bumperHarvestCards || [],
        chat: room.chat || [],
        isBotPassive: room.isBotPassive || false,
    };
}
const getAllHeroes = () => allHeroes;
exports.getAllHeroes = getAllHeroes;
//# sourceMappingURL=phaseLogic.js.map