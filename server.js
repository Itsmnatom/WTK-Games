const fs = require('fs');
const express = require('express');
let SERVER_CARD_DB = {};
try {
    const dbData = JSON.parse(fs.readFileSync('public/cards_db.json', 'utf8'));
    dbData.forEach(c => {
        let englishName = c.card_name.toUpperCase().replace(/\s+/g, '_');
        if (englishName === "ATTACK") englishName = "SLASH";
        if (englishName === "OVERINDULGENCE") englishName = "INDULGENCE";
        if (englishName === "SOMETHING_OUT_OF_NOTHING") englishName = "EX_NIHILO";
        if (englishName === "ALLIANCE" || englishName === "IRON_CHAINS") englishName = "IRON_CHAIN";
        if (englishName === "BARBARIAN_INVASION") englishName = "BARBARIAN_INVASION";
        if (englishName === "RAINING_ARROWS") englishName = "ARROW_BARRAGE";
        if (englishName === "OATH_OF_THE_PEACH_GARDEN") englishName = "PEACH_GARDEN";
        SERVER_CARD_DB[englishName] = c;
    });
} catch(e) { console.error("Could not load cards_db.json on server", e); }

const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/lobby');
});

app.get('/lobby', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'lobby.html'));
});

app.get('/room', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'room.html'));
});

app.get('/app/:roomId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'room.html'));
});

app.get('/room/:roomId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'room.html'));
});

// ==========================================
// 1. DATABASE & CONFIG
// ==========================================
const gameRooms = {};
let allHeroes = [];

try {
  const data = fs.readFileSync(path.join(__dirname, 'public', 'heroes.json'), 'utf8');
  allHeroes = JSON.parse(data);
} catch (e) {
  console.log("Error loading heroes database, using defaults:", e);
  allHeroes = [
    { name: "Cao Cao", title: "Cao Cao", kingdom: 1, sub: "The Martial Emperor of Wei" },
    { name: "Liu Bei", title: "Liu Bei", kingdom: 2, sub: "Noble Hero Amidst the Chaos" },
    { name: "Sun Quan", title: "Sun Quan", kingdom: 3, sub: "The Young Ruler" },
    { name: "Zhen Ji", title: "Lady Zhen (Zhen Ji)", kingdom: 1, sub: "Ill-Fated Beauty" },
    { name: "Zhang Fei", title: "Zhang Fei", kingdom: 2, sub: "Unstoppable Force" },
    { name: "Zhao Yun", title: "Zhao Yun", kingdom: 2, sub: "Young General" },
    { name: "Lv Bu", title: "Lv Bu", kingdom: 4, sub: "Embodiment of Force" },
    { name: "Diao Chan", title: "Diao Chan", kingdom: 4, sub: "Otherworld Dancer" }
  ];
}

// ==========================================
// 2. HELPER UTILITIES
// ==========================================
function getPlayerIdBySocket(room, socketId) {
  return Object.keys(room.players).find(pId => room.players[pId].socketId === socketId);
}

function hasCharacter(player, charName) {
  if (!player || !player.character) return false;
  return player.character.toUpperCase().includes(charName.toUpperCase());
}

function calculateDistance(room, fromId, toId) {
  const order = room.turnOrder.filter(pid => room.players[pid].isAlive);
  const idxFrom = order.indexOf(fromId);
  const idxTo = order.indexOf(toId);
  
  if (idxFrom === -1 || idxTo === -1) return 999;
  
  const directDiff = Math.abs(idxFrom - idxTo);
  const circularDiff = order.length - directDiff;
  let baseDistance = Math.min(directDiff, circularDiff);
  
  const attacker = room.players[fromId];
  const defender = room.players[toId];
  
  if (attacker.equipment && attacker.equipment.offensiveHorse) baseDistance -= 1;
  if (defender.equipment && defender.equipment.defensiveHorse) baseDistance += 1;
  
  return Math.max(1, baseDistance);
}

function getSanitizedRoomState(room, targetPlayerId) {
  const maskedPlayers = {};
  
  Object.keys(room.players).forEach(pId => {
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
      isHost: (room.hostId === p.socketId || p.id === 'p1')
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
    winnerText: room.winnerText || null
  };
}

function notifyCardPlayed(room, playerId, cardName, targetId) {
  io.to(room.roomId).emit('card_played', { playerId, cardName, targetId });
}

function broadcastRoomState(room) {
  Object.keys(room.players).forEach(pId => {
    const p = room.players[pId];
    if (p.socketId) {
      io.to(p.socketId).emit('room_state_update', getSanitizedRoomState(room, pId));
    }
  });
}

function getCardLocalName(cardName) {
  const dict = {
    'SLASH': 'โจมตี', 'DODGE': 'หลบหลีก', 'PEACH': 'ลูกท้อ', 'WINE': 'สุรา',
    'STEAL': 'ขโมย', 'SABOTAGE': 'ทำลาย', 'EX_NIHILO': 'สร้างจากความว่างเปล่า',
    'DUEL': 'ดวล', 'BARBARIAN_INVASION': 'คนเถื่อนบุก', 'ARROW_BARRAGE': 'ธนูหมื่นดอก',
    'PEACH_GARDEN': 'สวนท้อ', 'LIGHTNING': 'อัสนีบาต', 'INDULGENCE': 'สุขสำราญ',
    'STARVATION': 'เสบียงขาด', 'ZHUGE_CROSSBOW': 'หน้าไม้จูกัด', 'BLUE_STEEL_SWORD': 'ง้าวฟ้าสะท้าน'
  };
  return dict[cardName] || cardName;
}

function logCardPlay(playerName, cardName, targetName = null) {
  const cNameLocal = getCardLocalName(cardName);
  let msg = `🃏 ${playerName} ใช้ ${cNameLocal} (${cardName})`;
  if (targetName) msg += ` ใส่ ${targetName}`;
  console.log(msg);
}

function logDamage(targetName, damage, hp, maxHp, attackerName = null, cardName = null) {
  let msg = `💥 ${targetName} เสียพลังชีวิต ${damage} หน่วย`;
  if (attackerName) msg += ` จาก ${attackerName}`;
  if (cardName) msg += ` (${cardName})`;
  msg += ` (พลังชีวิต: ${hp}/${maxHp})`;
  console.log(msg);
}

function logHeal(targetName, amount, hp, maxHp) {
  console.log(`💖 ${targetName} ฟื้นฟูพลังชีวิต ${amount} หน่วย (พลังชีวิต: ${hp}/${maxHp})`);
}

function logDeath(playerName, role) {
  const roles = { 'LORD': 'จอมทัพ', 'LOYALIST': 'ภักดี', 'REBEL': 'กบฏ', 'SPY': 'ไส้ศึก' };
  console.log(`☠️ ${playerName} (บทบาท: ${roles[role] || role}) เสียชีวิตแล้ว!`);
}

function checkGameOver(room) {
  const lord = Object.values(room.players).find(p => p.role === 'LORD');
  if (!lord) return false;
  
  const rebels = Object.values(room.players).filter(p => p.role === 'REBEL');
  const renegades = Object.values(room.players).filter(p => p.role === 'RENEGADE');
  
  const aliveRebelsCount = rebels.filter(p => p.isAlive).length;
  const aliveRenegadesCount = renegades.filter(p => p.isAlive).length;
  
  // 1. If Lord is dead
  if (!lord.isAlive) {
    room.status = 'ENDED';
    
    const totalAlive = Object.values(room.players).filter(p => p.isAlive).length;
    if (totalAlive === 1 && aliveRenegadesCount === 1) {
      room.winnerRole = 'RENEGADE';
      room.winnerText = 'คนทรยศ (Renegade) เป็นผู้เหลือรอดคนสุดท้ายและเอาชนะการศึก!';
    } else {
      room.winnerRole = 'REBEL';
      room.winnerText = 'ฝ่ายกบฏ (Rebels) สังหารเจ้าเมืองสำเร็จและชนะการศึก!';
    }
    return true;
  }
  
  // 2. If all Rebels and Renegades are dead
  if (aliveRebelsCount === 0 && aliveRenegadesCount === 0) {
    room.status = 'ENDED';
    room.winnerRole = 'LORD';
    room.winnerText = 'ฝ่ายเจ้าเมืองและผู้ภักดี (Lord & Loyalists) ปราบปรามกบฏสำเร็จและชนะการศึก!';
    return true;
  }
  
  return false;
}

// ==========================================
// 3. DECK LOGIC
// ==========================================
function initDeck() {
  const suits = ['SPADE', 'HEART', 'DIAMOND', 'CLUB'];
  const deck = [];
  let idCounter = 1;
  
  // Slashes (20 cards)
  for (let i = 0; i < 20; i++) {
    const suit = i < 10 ? (i < 5 ? 'SPADE' : 'CLUB') : (i < 15 ? 'HEART' : 'DIAMOND');
    deck.push({ id: `c_${idCounter++}`, name: 'SLASH', suit, rank: Math.floor(Math.random() * 13) + 1, type: 'BASIC' });
  }
  // Dodges (10 cards)
  for (let i = 0; i < 10; i++) {
    const suit = i < 5 ? 'HEART' : 'DIAMOND';
    deck.push({ id: `c_${idCounter++}`, name: 'DODGE', suit, rank: Math.floor(Math.random() * 13) + 1, type: 'BASIC' });
  }
  // Peaches (12 cards)
  for (let i = 0; i < 12; i++) {
    const suit = i < 6 ? 'HEART' : 'DIAMOND';
    deck.push({ id: `c_${idCounter++}`, name: 'PEACH', suit, rank: Math.floor(Math.random() * 13) + 1, type: 'BASIC' });
  }
  // Wine (10 cards)
  for (let i = 0; i < 10; i++) {
    const suit = suits[i % 4];
    deck.push({ id: `c_${idCounter++}`, name: 'WINE', suit, rank: Math.floor(Math.random() * 13) + 1, type: 'BASIC' });
  }
  // Steals (10 cards)
  for (let i = 0; i < 10; i++) {
    const suit = i % 2 === 0 ? 'SPADE' : 'CLUB';
    deck.push({ id: `c_${idCounter++}`, name: 'STEAL', suit, rank: Math.floor(Math.random() * 13) + 1, type: 'KIT' });
  }
  // Sabotage (Dismantle) (12 cards)
  for (let i = 0; i < 12; i++) {
    const suit = i % 2 === 0 ? 'SPADE' : 'CLUB';
    deck.push({ id: `c_${idCounter++}`, name: 'SABOTAGE', suit, rank: Math.floor(Math.random() * 13) + 1, type: 'KIT' });
  }
  // Ex Nihilo (Something from Nothing) (10 cards)
  for (let i = 0; i < 10; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'EX_NIHILO', suit: 'HEART', rank: Math.floor(Math.random() * 13) + 1, type: 'KIT' });
  }
  // Duel (10 cards)
  for (let i = 0; i < 10; i++) {
    const suit = i % 2 === 0 ? 'SPADE' : 'CLUB';
    deck.push({ id: `c_${idCounter++}`, name: 'DUEL', suit, rank: Math.floor(Math.random() * 13) + 1, type: 'KIT' });
  }
  // Zhuge Crossbow (5 cards)
  for (let i = 0; i < 5; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'ZHUGE_CROSSBOW', suit: 'DIAMOND', rank: 1, type: 'EQUIPMENT' });
    deck.push({ id: `c_${idCounter++}`, name: 'ZHUGE_CROSSBOW', suit: 'SPADE', rank: 1, type: 'EQUIPMENT' });
  }
  // Blue Steel Sword (5 cards)
  for (let i = 0; i < 5; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'BLUE_STEEL_SWORD', suit: 'SPADE', rank: 6, type: 'EQUIPMENT' });
  }
  // Lightning Hoof (+1 defensive mount) (7 cards)
  for (let i = 0; i < 7; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'LIGHTNING_HOOF', suit: 'HEART', rank: 13, type: 'EQUIPMENT' });
  }
  // Red Hare (-1 offensive mount) (7 cards)
  for (let i = 0; i < 7; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'RED_HARE', suit: 'HEART', rank: 5, type: 'EQUIPMENT' });
  }
  // Nio Shield (5 cards)
  for (let i = 0; i < 5; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'NIO_SHIELD', suit: 'SPADE', rank: 8, type: 'EQUIPMENT' });
  }
  // Eight Trigrams Formation (5 cards)
  for (let i = 0; i < 5; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'EIGHT_TRIGRAMS_FORMATION', suit: 'CLUB', rank: 4, type: 'EQUIPMENT' });
  }
  // Silver Lion Helmet (5 cards )
  for (let i = 0; i < 5; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'SILVER_LION_HELMET', suit: 'DIAMOND', rank: 11, type: 'EQUIPMENT' });
  }
  // Rattan Armor (5 cards)
  for (let i = 0; i < 5; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'RATTAN_ARMOR', suit: 'CLUB', rank: 2, type: 'EQUIPMENT' });
  }
  // Barbarian Invasion (Savage Assault) (10 cards)
  for (let i = 0; i < 10; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'BARBARIAN_INVASION', suit: 'SPADE', rank: Math.floor(Math.random() * 13) + 1, type: 'KIT' });
  }
  // Arrow Barrage (Archery Attack) (10 cards)
  for (let i = 0; i < 10; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'ARROW_BARRAGE', suit: 'HEART', rank: Math.floor(Math.random() * 13) + 1, type: 'KIT' });
  }
  // Peach Garden (10 cards)
  for (let i = 0; i < 10; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'PEACH_GARDEN', suit: 'HEART', rank: 1, type: 'KIT' });
  }

  // Lightning (4 cards)
  deck.push({ id: `c_${idCounter++}`, name: 'LIGHTNING', suit: 'SPADE', rank: 1, type: 'DELAYED' });
  deck.push({ id: `c_${idCounter++}`, name: 'LIGHTNING', suit: 'HEART', rank: 12, type: 'DELAYED' });
  deck.push({ id: `c_${idCounter++}`, name: 'LIGHTNING', suit: 'CLUB', rank: 10, type: 'DELAYED' });
  deck.push({ id: `c_${idCounter++}`, name: 'LIGHTNING', suit: 'DIAMOND', rank: 11, type: 'DELAYED' });
  // Indulgence (10 cards)
  for (let i = 0; i < 10; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'INDULGENCE', suit: 'SPADE', rank: 6, type: 'DELAYED' });
  }
  // Starvation (10 cards)
  for (let i = 0; i < 10; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'STARVATION', suit: 'CLUB', rank: 10, type: 'DELAYED' });
  }

  // ==========================================
  // NEW CARDS (Phase 1 - Simple)
  // ==========================================
  // Thunder Attack (8 cards) - BASIC card, causes THUNDER damage
  for (let i = 0; i < 8; i++) {
    const suit = i < 4 ? 'SPADE' : 'CLUB';
    deck.push({ id: `c_${idCounter++}`, name: 'THUNDER_ATTACK', suit, rank: Math.floor(Math.random() * 13) + 1, type: 'BASIC' });
  }
  // Six Swords of Wu (3 cards) - Weapon range 2
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'SIX_SWORDS_WU', suit: 'SPADE', rank: 7, type: 'EQUIPMENT' });
  }
  // Fergana Steed (5 cards) - offensive horse -1
  for (let i = 0; i < 5; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'FERGANA_STEED', suit: 'CLUB', rank: 4, type: 'EQUIPMENT' });
  }
  // Shadowrunner (5 cards) - defensive horse +1
  for (let i = 0; i < 5; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'SHADOWRUNNER', suit: 'DIAMOND', rank: 3, type: 'EQUIPMENT' });
  }
  // Kirin Bow (3 cards) - Weapon range 5, destroys target's horse on hit
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'KIRIN_BOW', suit: 'HEART', rank: 5, type: 'EQUIPMENT' });
  }
  // Feathered Fan (3 cards) - Weapon range 4, SLASH becomes FIRE damage
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'FEATHERED_FAN', suit: 'DIAMOND', rank: 8, type: 'EQUIPMENT' });
  }
  // Serpent Spear (3 cards) - Weapon range 3, discard 2 cards instead of SLASH
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'SERPENT_SPEAR', suit: 'SPADE', rank: 3, type: 'EQUIPMENT' });
  }

  // ==========================================
  // NEW CARDS (Phase 2 - Group 1 Weapons)
  // ==========================================
  // Frost Sword (3 cards) - Weapon range 2, on hit discard 2 cards instead of damage
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'FROST_SWORD', suit: 'SPADE', rank: 2, type: 'EQUIPMENT' });
  }
  // Two-bladed Trident (3 cards) - Weapon range 3, on dodge discard 1 to force hit
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'TWO_BLADED_TRIDENT', suit: 'CLUB', rank: 3, type: 'EQUIPMENT' });
  }
  // Rock Cleaving Axe (3 cards) - Weapon range 3, on dodge discard 2 to force hit
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'ROCK_CLEAVING_AXE', suit: 'DIAMOND', rank: 4, type: 'EQUIPMENT' });
  }
  // Green Dragon Blade (3 cards) - Weapon range 3, on dodge play another SLASH
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'GREEN_DRAGON_BLADE', suit: 'HEART', rank: 5, type: 'EQUIPMENT' });
  }
  // Sky Piercing Halberd (3 cards) - Weapon range 4, last hand card SLASH targets up to 3
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'SKY_PIERCING_HALBERD', suit: 'SPADE', rank: 4, type: 'EQUIPMENT' });
  }

  // ==========================================
  // NEW CARDS (Phase 2 - Group 2 Fire Attack)
  // ==========================================
  // Fire Attack (5 cards) - Kit card, target reveals 1, attacker discards 1 matching suit to deal 1 FIRE damage
  for (let i = 0; i < 5; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'FIRE_ATTACK', suit: 'HEART', rank: Math.floor(Math.random() * 13) + 1, type: 'KIT' });
  }

  // ==========================================
  // NEW CARDS (Phase 2 - Group 3 Yin-Yang Swords)
  // ==========================================
  // Yin-Yang Swords (3 cards) - Weapon range 2, on dodge, if diff gender, target discards or attacker draws
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'YIN_YANG_SWORDS', suit: 'SPADE', rank: 2, type: 'EQUIPMENT' });
  }

  // ==========================================
  // NEW CARDS (Phase 2 - Group 4 Negation)
  // ==========================================
  // Negate (7 cards) - Cancel the effect of a kit or delayed card
  for (let i = 0; i < 7; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'NEGATE', suit: i % 2 === 0 ? 'SPADE' : 'CLUB', rank: Math.floor(Math.random() * 13) + 1, type: 'KIT' });
  }

  // ==========================================
  // NEW CARDS (Phase 2 - Group 5 Bumper Harvest)
  // ==========================================
  // Bumper Harvest (3 cards) - Draw N cards to center, players draft in turn order
  for (let i = 0; i < 3; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'BUMPER_HARVEST', suit: 'HEART', rank: Math.floor(Math.random() * 13) + 1, type: 'KIT' });
  }

  // ==========================================
  // NEW CARDS (Phase 2 - Group 6 Borrowed Sword)
  // ==========================================
  // Borrowed Sword (2 cards) - Target a player with a weapon, force them to SLASH another player, or steal their weapon
  for (let i = 0; i < 2; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'BORROWED_SWORD', suit: 'CLUB', rank: Math.floor(Math.random() * 13) + 1, type: 'KIT' });
  }

  // ==========================================
  // NEW CARDS (Phase 2 - Group 7 Wooden Cart / Treasure)
  // ==========================================
  // Wooden Cart (2 cards) - Treasure equipment, max hand size +1
  for (let i = 0; i < 2; i++) {
    deck.push({ id: `c_${idCounter++}`, name: 'WOODEN_CART', suit: 'DIAMOND', rank: Math.floor(Math.random() * 13) + 1, type: 'EQUIPMENT' });
  }

  return deck.sort(() => 0.5 - Math.random());
}

function drawCards(room, count) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    if (room.deck.length === 0) {
      if (room.discardPile.length === 0) {
        break;
      }
      room.deck = [...room.discardPile].sort(() => 0.5 - Math.random());
      room.discardPile = [];
    }
    cards.push(room.deck.pop());
  }
  return cards;
}

// ==========================================
// 4. GAME FLOW CONTROLLER
// ==========================================
function assignRoles(room) {
  const count = room.turnOrder.length;
  let roles = [];

  if (count === 2) {
    roles = ['LORD', 'REBEL'];
  } if (count === 3) {
    roles = ['LORD', 'REBEL', 'RENEGADE'];
  } else if (count === 4) {
    roles = ['LORD', 'LOYALIST', 'REBEL', 'RENEGADE'];
  } else if (count === 5) {
    roles = ['LORD', 'LOYALIST', 'REBEL', 'REBEL', 'RENEGADE'];
  } else if (count === 6) {
    roles = ['LORD', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'];
  } else if (count === 7) {
    roles = ['LORD', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'];
  } else if (count === 8) {
    roles = ['LORD', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'];
  } else if (count === 9) {
    roles = ['LORD', 'LOYALIST', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE'];
  } else { // >= 10
    roles = ['LORD', 'LOYALIST', 'LOYALIST', 'LOYALIST', 'REBEL', 'REBEL', 'REBEL', 'REBEL', 'RENEGADE', 'RENEGADE'];
  }
  
  // Fisher-Yates shuffle
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }
  
  const lordIndex = roles.indexOf('LORD');
  
  room.turnOrder.forEach((pid, idx) => {
    room.players[pid].role = roles[idx];
  });
  
  // Re-arrange turnOrder so Lord is at index 0
  if (lordIndex !== -1 && lordIndex !== 0) {
    room.turnOrder = [
      ...room.turnOrder.slice(lordIndex),
      ...room.turnOrder.slice(0, lordIndex)
    ];
  }
}



function resumeAfterAttack(room) {
  if (room.status !== 'PLAYING') return;
  const attackerId = room.turnOrder[room.currentTurnIndex];
  const attacker = room.players[attackerId];
  if (attacker && attacker.isBot) {
    setTimeout(() => {
      runBotTurn(room, attackerId);
    }, 1000);
  }
}

function startDyingPhase(room, dyingPlayerId, attackerId = null) {
  const dyingPlayer = room.players[dyingPlayerId];
  const needed = 1 - dyingPlayer.hp;
  
  room.pendingAction = {
    type: 'DYING',
    targetPlayerId: dyingPlayerId,
    attackerId: attackerId,
    peachNeeded: needed,
    currentAskerIdx: room.turnOrder.indexOf(dyingPlayerId),
    timeoutAt: Date.now() + 15000
  };
  
  console.log(`${dyingPlayer.name} enters dying state. Peach needed: ${needed}`);
  broadcastRoomState(room);
  
  checkDyingAskerBot(room);
}

function checkDyingAskerBot(room) {
  if (!room.pendingAction || room.pendingAction.type !== 'DYING') return;
  
  const pending = room.pendingAction;
  const askerId = room.turnOrder[pending.currentAskerIdx];
  const asker = room.players[askerId];
  
  if (asker && asker.isAlive && asker.isBot) {
    setTimeout(() => {
      let peachIdx = asker.hand.findIndex(c => c.name === 'PEACH');
      const dyingPlayer = room.players[pending.targetPlayerId];
      
      let shouldSave = (askerId === pending.targetPlayerId);
      if (!shouldSave) {
        if ((asker.role === 'LORD' || asker.role === 'LOYALIST') && dyingPlayer.role === 'LORD') {
          shouldSave = true;
        }
      }
      
      if (shouldSave && peachIdx !== -1) {
        const card = asker.hand.splice(peachIdx, 1)[0];
        room.discardPile.push(card);
        dyingPlayer.hp += 1;
        pending.peachNeeded -= 1;
        console.log(`Bot ${asker.name} played PEACH to save ${dyingPlayer.name}`);
        
        if (pending.peachNeeded <= 0) {
          room.pendingAction = null;
          console.log(`${dyingPlayer.name} is saved!`);
          broadcastRoomState(room);
          resumeAfterAttack(room);
        } else {
          checkDyingAskerBot(room);
        }
      } else {
        advanceDyingAsker(room);
      }
    }, 1000);
  } else if (asker && asker.isAlive && !asker.isBot) {
    // Human timeout
    const askerIdxSnapshot = pending.currentAskerIdx;
    setTimeout(() => {
      if (room.pendingAction && room.pendingAction.type === 'DYING' && room.pendingAction.currentAskerIdx === pending.currentAskerIdx) {
        console.log(`Human ${asker.name} timed out in DYING phase.`);
        advanceDyingAsker(room);
      }
    }, 15000);
  }
}

function advanceDyingAsker(room) {
  if (!room.pendingAction || room.pendingAction.type !== 'DYING') return;
  
  const pending = room.pendingAction;
  const startingIdx = room.turnOrder.indexOf(pending.targetPlayerId);
  
  do {
    pending.currentAskerIdx = (pending.currentAskerIdx + 1) % room.turnOrder.length;
  } while (
    pending.currentAskerIdx !== startingIdx && 
    room.players[room.turnOrder[pending.currentAskerIdx]] && 
    !room.players[room.turnOrder[pending.currentAskerIdx]].isAlive
  );
  
  if (pending.currentAskerIdx === startingIdx) {
    const dyingPlayer = room.players[pending.targetPlayerId];
    dyingPlayer.isAlive = false;
    dyingPlayer.hp = 0; // Fix negative HP display
    
    // Discard all cards from dying player
    if (dyingPlayer.hand) { room.discardPile.push(...dyingPlayer.hand); dyingPlayer.hand = []; }
    if (dyingPlayer.delayedKitZone) { room.discardPile.push(...dyingPlayer.delayedKitZone); dyingPlayer.delayedKitZone = []; }
    if (dyingPlayer.equipment) {
      if (dyingPlayer.equipment.weapon) { room.discardPile.push(dyingPlayer.equipment.weapon); dyingPlayer.equipment.weapon = null; }
      if (dyingPlayer.equipment.armor) { room.discardPile.push(dyingPlayer.equipment.armor); dyingPlayer.equipment.armor = null; }
      if (dyingPlayer.equipment.defensiveHorse) { room.discardPile.push(dyingPlayer.equipment.defensiveHorse); dyingPlayer.equipment.defensiveHorse = null; }
      if (dyingPlayer.equipment.offensiveHorse) { room.discardPile.push(dyingPlayer.equipment.offensiveHorse); dyingPlayer.equipment.offensiveHorse = null; }
    }
    
    // Rewards & Punishments
    if (pending.attackerId && room.players[pending.attackerId]) {
      const killer = room.players[pending.attackerId];
      if (dyingPlayer.role === 'REBEL') {
        // Draw 3 cards
        drawCards(room, 3).forEach(c => killer.hand.push(c));
        console.log(`${killer.name} drew 3 cards for killing a REBEL.`);
      } else if (killer.role === 'LORD' && dyingPlayer.role === 'LOYALIST') {
        // Lord kills Loyalist: discard ALL hand and equipment
        room.discardPile.push(...killer.hand);
        killer.hand = [];
        if (killer.equipment.weapon) { room.discardPile.push(killer.equipment.weapon); killer.equipment.weapon = null; }
        if (killer.equipment.armor) { room.discardPile.push(killer.equipment.armor); killer.equipment.armor = null; }
        if (killer.equipment.defensiveHorse) { room.discardPile.push(killer.equipment.defensiveHorse); killer.equipment.defensiveHorse = null; }
        if (killer.equipment.offensiveHorse) { room.discardPile.push(killer.equipment.offensiveHorse); killer.equipment.offensiveHorse = null; }
        if (killer.equipment.treasure) { room.discardPile.push(killer.equipment.treasure); killer.equipment.treasure = null; }
        console.log(`Lord ${killer.name} killed a LOYALIST and lost all cards.`);
      }
    }
    
    room.pendingAction = null;
    console.log(`${dyingPlayer.name} has died`);
    
    const isGameOver = checkGameOver(room);
    broadcastRoomState(room);
    if (!isGameOver) {
      if (room.currentTurnPlayerId === pending.targetPlayerId) {
        nextTurn(room);
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
      broadcastRoomState(room);
      checkDyingAskerBot(room);
    }
  }
}

function startDraftPhase(room) {
  room.status = 'DRAFTING';
  
  Object.values(room.players).forEach(player => {
    let choices = [];
    if (player.role === 'LORD') {
      const fixedLords = allHeroes.filter(h => ['Cao Cao', 'Liu Bei', 'Sun Quan'].includes(h.title || h.name));
      const remaining = allHeroes.filter(h => !['Cao Cao', 'Liu Bei', 'Sun Quan'].includes(h.title || h.name)).sort(() => 0.5 - Math.random());
      choices = [...fixedLords, ...remaining.slice(0, 2)];
    } else {
      choices = [...allHeroes].sort(() => 0.5 - Math.random()).slice(0, 3);
    }
    
    player.characterChoices = choices.map(h => {
      const nameUpper = (h.title || h.name).toUpperCase().replace(/[^A-Z0-9]/g, '_');
      return {
        id: nameUpper,
        name: h.title || h.name,
        sub: h.sub || '',
        pic: h.pic || '',
        kingdom: h.kingdom
      };
    });
    
    if (player.isBot) {
      player.character = player.characterChoices[0].id;
      setupCharacterHp(player, room.turnOrder.length);
    }
  });
  
  broadcastRoomState(room);
}

function setupCharacterHp(player, playerCount = 4) {
  const nameUpper = player.character.toUpperCase();
  let baseHp = 4;
  if (nameUpper.includes('ZHEN_JI') || nameUpper.includes('LADY_ZHEN') || nameUpper.includes('DIAO_CHAN') || nameUpper.includes('ZHUGE_LIANG') || nameUpper.includes('XIAO_QIAO') || nameUpper.includes('DA_QIAO') || nameUpper.includes('CAI_WENJI')) {
    baseHp = 3;
  }
  
  if (player.role === 'LORD') {
    if (playerCount >= 6) {
      player.maxHp = baseHp + 1;
      player.hp = baseHp + 1;
    } else {
      player.maxHp = baseHp;
      player.hp = baseHp;
    }
  } else {
    player.maxHp = baseHp;
    player.hp = baseHp;
  }
}

function startPlayPhase(room) {
  room.status = 'PLAYING';
  room.deck = initDeck();
  room.discardPile = [];
  
  // Deal 4 cards to everyone
  Object.values(room.players).forEach(player => {
    player.hand = drawCards(room, 4);
  });
  
  room.currentTurnIndex = 0;
  startPlayerTurn(room);
}

function startPlayerTurn(room) {
  if (room.status === 'ENDED') return;
  
  let aliveCount = Object.values(room.players).filter(p => p.isAlive).length;
  if (aliveCount === 0) {
    room.status = 'ENDED';
    return;
  }
  
  const playerId = room.turnOrder[room.currentTurnIndex];
  const player = room.players[playerId];
  
  if (!player.isAlive) {
    room.currentTurnIndex = (room.currentTurnIndex + 1) % room.turnOrder.length;
    // Use setTimeout to avoid call stack exceeded in edge cases
    setTimeout(() => startPlayerTurn(room), 0);
    return;
  }
  
  player.slashedThisTurn = false;
  player.skillResignationUsed = false;
  player.cardsGivenThisTurn = 0;
  player.liuBeiHealedThisTurn = false;
  player.skillDiaoChanUsed = false;
  player.skillZhouYuUsed = false;
  
  let skipPlayPhase = false;
  let skipDrawPhase = false;
  
  // ---------------------------------
  // JUDGEMENT PHASE
  // ---------------------------------
  if (player.delayedKitZone && player.delayedKitZone.length > 0) {
    room.currentPhase = 'JUDGEMENT';
    broadcastRoomState(room);
    
    // Resolve from right to left (LIFO usually, but simple iterate here)
    // Create a copy to iterate, but we need to pop from actual
    while (player.delayedKitZone.length > 0) {
      const card = player.delayedKitZone.pop();
      const judgeCard = drawCards(room, 1)[0];
      room.discardPile.push(judgeCard);
      room.discardPile.push(card); // the delayed card goes to discard too
      
      console.log(`Judgement for ${card.name}: drew ${judgeCard.suit} ${judgeCard.rank}`);
      
      if (card.name === 'LIGHTNING') {
        if (judgeCard.suit === 'SPADE' && judgeCard.rank >= 2 && judgeCard.rank <= 9) {
          console.log(`LIGHTNING struck ${player.name}! 3 Damage!`);
          dealDamage(room, playerId, 3, card, null, 'THUNDER');
          if (room.pendingAction && room.pendingAction.type === 'DYING') {
            return; // Dying phase takes over
          }
        } else {
          // Pass to next player
          const myIdx = room.turnOrder.indexOf(playerId);
          let nextId = room.turnOrder[(myIdx + 1) % room.turnOrder.length];
          // skip dead players
          while (!room.players[nextId].isAlive) {
            nextId = room.turnOrder[(room.turnOrder.indexOf(nextId) + 1) % room.turnOrder.length];
          }
          const nextPlayer = room.players[nextId];
          nextPlayer.delayedKitZone = nextPlayer.delayedKitZone || [];
          nextPlayer.delayedKitZone.push(card);
          room.discardPile.pop(); // remove from discard
          console.log(`LIGHTNING passed to ${nextPlayer.name}`);
        }
      } else if (card.name === 'INDULGENCE') {
        if (judgeCard.suit !== 'HEART') {
          skipPlayPhase = true;
          console.log(`${player.name} skips Play phase due to INDULGENCE`);
        }
      } else if (card.name === 'STARVATION') {
        if (judgeCard.suit !== 'CLUB') {
          skipDrawPhase = true;
          console.log(`${player.name} skips Draw phase due to STARVATION`);
        }
      }
    }
  }

  if (hasCharacter(player, 'ZHEN_JI') || hasCharacter(player, 'LADY_ZHEN')) {
    if (player.isBot) {
      console.log(`Bot Zhen Ji triggers Luo River`);
      notifyCardPlayed(room, playerId, 'สกิล Luo River', null);
      let isBlack = true;
      while (isBlack) {
        const drawn = drawCards(room, 1);
        if (drawn.length > 0) {
          const card = drawn[0];
          if (card.suit === 'SPADE' || card.suit === 'CLUB') {
            player.hand.push(card);
            console.log(`Luo River: Bot Zhen Ji draws black card: ${card.suit}`);
          } else {
            room.discardPile.push(card);
            isBlack = false;
          }
        } else {
          isBlack = false;
        }
      }
      executeDrawPhase(room, player, skipDrawPhase, skipPlayPhase);
    } else {
      room.currentPhase = 'PREPARATION';
      room.pendingAction = {
        type: 'LUO_RIVER',
        targetPlayerId: playerId,
        skipDrawPhase,
        skipPlayPhase
      };
      broadcastRoomState(room);
    }
  } else {
    executeDrawPhase(room, player, skipDrawPhase, skipPlayPhase);
  }
}

function executeDrawPhase(room, player, skipDrawPhase = false, skipPlayPhase = false) {
  if (!skipDrawPhase) {
    room.currentPhase = 'DRAW';
    const drawCount = hasCharacter(player, 'ZHOU_YU') ? 3 : 2;
    const drawn = drawCards(room, drawCount);
    player.hand.push(...drawn);
  }
  
  if (!skipPlayPhase) {
    room.currentPhase = 'PLAY';
    room.attacksPlayedInTurn = 0;
    player.wineActive = false;
    
    broadcastRoomState(room);
    
    if (player.isBot) {
      setTimeout(() => {
        runBotTurn(room, player.id);
      }, 1500);
    }
  } else {
    room.currentPhase = 'DISCARD';
    checkDiscardRequirement(room);
  }
}

function checkDiscardRequirement(room) {
  const playerId = room.turnOrder[room.currentTurnIndex];
  const player = room.players[playerId];
  
  const handCount = player.hand.length;
  const maxHand = player.hp;
  
  if (handCount <= maxHand) {
    endPlayerTurn(room);
  } else {
    broadcastRoomState(room);
    if (player.isBot) {
      setTimeout(() => {
        const numToDiscard = handCount - maxHand;
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
  player.wineActive = false;
  
  room.currentTurnIndex = (room.currentTurnIndex + 1) % room.turnOrder.length;
  startPlayerTurn(room);
}

// ==========================================
// 5. BOT AI BRAIN
// ==========================================
function botWantsToAttack(bot, target, room) {
  if (bot.id === target.id || !target.isAlive) return false;
  
  const botRole = bot.role;
  const targetRole = target.role;
  
  if (botRole === 'LORD' || botRole === 'LOYALIST') {
    return targetRole === 'REBEL' || targetRole === 'RENEGADE';
  } else if (botRole === 'REBEL') {
    return targetRole === 'LORD' || targetRole === 'LOYALIST';
  } else if (botRole === 'RENEGADE') {
    // Count alive rebels
    const rebelsAlive = Object.values(room.players).some(p => p.isAlive && p.role === 'REBEL');
    if (rebelsAlive) {
      return targetRole === 'REBEL';
    } else {
      const loyalistsAlive = Object.values(room.players).some(p => p.isAlive && p.role === 'LOYALIST');
      if (loyalistsAlive) {
        return targetRole === 'LOYALIST';
      } else {
        return targetRole === 'LORD';
      }
    }
  }
  return false;
}

function runBotTurn(room, botId) {
  const bot = room.players[botId];
  if (!bot || !bot.isAlive || room.status !== 'PLAYING') return;
  
  let actionTaken = false;
  
  // 1. Heal with PEACH if damaged
  if (bot.hp < bot.maxHp) {
    const peachIdx = bot.hand.findIndex(c => c.name === 'PEACH');
    if (peachIdx !== -1) {
      bot.hand.splice(peachIdx, 1);
      bot.hp += 1;
      notifyCardPlayed(room, botId, 'PEACH');
      logHeal(bot.name, 1, bot.hp, bot.maxHp);
      logCardPlay(bot.name, 'PEACH');
      actionTaken = true;
    }
  }

  // 2. Play EX_NIHILO
  if (!actionTaken) {
    const exIdx = bot.hand.findIndex(c => c.name === 'EX_NIHILO');
    if (exIdx !== -1) {
      const card = bot.hand.splice(exIdx, 1)[0];
      room.discardPile.push(card);
      notifyCardPlayed(room, botId, 'EX_NIHILO');
      logCardPlay(bot.name, 'EX_NIHILO');
      drawCards(room, 2).forEach(c => bot.hand.push(c));
      broadcastRoomState(room);
      actionTaken = true;
    }
  }
  
  // 3. Equip Weapon/Mounts
  if (!actionTaken) {
    const weaponIdx = bot.hand.findIndex(c => ['ZHUGE_CROSSBOW', 'BLUE_STEEL_SWORD', 'SIX_SWORDS_WU', 'KIRIN_BOW', 'FEATHERED_FAN', 'SERPENT_SPEAR'].includes(c.name));
    if (weaponIdx !== -1) {
      const w = bot.hand[weaponIdx];
      if (!bot.equipment.weapon || bot.equipment.weapon.name !== w.name) {
        bot.hand.splice(weaponIdx, 1);
        if (bot.equipment.weapon) room.discardPile.push(bot.equipment.weapon);
        const rangeMap = { 'ZHUGE_CROSSBOW': 1, 'BLUE_STEEL_SWORD': 2, 'SIX_SWORDS_WU': 2, 'KIRIN_BOW': 5, 'FEATHERED_FAN': 4, 'SERPENT_SPEAR': 3 };
        w.range = rangeMap[w.name] || 1;
        bot.equipment.weapon = w;
        notifyCardPlayed(room, botId, w.name);
        logCardPlay(bot.name, w.name);
        actionTaken = true;
      }
    }
  }
  
  if (!actionTaken) {
    const horseIdx = bot.hand.findIndex(c => ['RED_HARE', 'LIGHTNING_HOOF', 'FERGANA_STEED', 'SHADOWRUNNER'].includes(c.name));
    if (horseIdx !== -1) {
      const h = bot.hand[horseIdx];
      const isOffHorse = (h.name === 'RED_HARE' || h.name === 'FERGANA_STEED');
      if (isOffHorse && !bot.equipment.offensiveHorse) {
        bot.hand.splice(horseIdx, 1);
        bot.equipment.offensiveHorse = h;
        logCardPlay(bot.name, h.name);
        actionTaken = true;
      } else if (!isOffHorse && !bot.equipment.defensiveHorse) {
        bot.hand.splice(horseIdx, 1);
        bot.equipment.defensiveHorse = h;
        logCardPlay(bot.name, h.name);
        actionTaken = true;
      }
    }
  }

  // 4. Play SABOTAGE or STEAL or DUEL on Enemies
  if (!actionTaken) {
    const saboIdx = bot.hand.findIndex(c => c.name === 'SABOTAGE');
    if (saboIdx !== -1) {
      let targetId = null;
      for (const pid of room.turnOrder) {
        const target = room.players[pid];
        if (botWantsToAttack(bot, target, room) && (target.hand.length > 0 || target.equipment.weapon || target.equipment.defensiveHorse || target.equipment.offensiveHorse)) {
          targetId = pid; break;
        }
      }
      if (targetId) {
        const target = room.players[targetId];
        const card = bot.hand.splice(saboIdx, 1)[0];
        room.discardPile.push(card);
        
        let discardedCard = null;
        if (target.hand.length > 0) {
          const randIdx = Math.floor(Math.random() * target.hand.length);
          discardedCard = target.hand.splice(randIdx, 1)[0];
        } else if (target.equipment) {
          if (target.equipment.defensiveHorse) { discardedCard = target.equipment.defensiveHorse; target.equipment.defensiveHorse = null; }
          else if (target.equipment.weapon) { discardedCard = target.equipment.weapon; target.equipment.weapon = null; }
          else if (target.equipment.offensiveHorse) { discardedCard = target.equipment.offensiveHorse; target.equipment.offensiveHorse = null; }
        }
        if (discardedCard) room.discardPile.push(discardedCard);
        
        notifyCardPlayed(room, botId, 'SABOTAGE', target.id);
        logCardPlay(bot.name, 'SABOTAGE', target.name);
        broadcastRoomState(room);
        actionTaken = true;
      }
    }
  }

  if (!actionTaken) {
    const stealIdx = bot.hand.findIndex(c => c.name === 'STEAL');
    if (stealIdx !== -1) {
      let targetId = null;
      for (const pid of room.turnOrder) {
        const target = room.players[pid];
        const dist = calculateDistance(room, botId, pid);
        if (dist <= 1 && botWantsToAttack(bot, target, room) && (target.hand.length > 0 || target.equipment.weapon || target.equipment.defensiveHorse || target.equipment.offensiveHorse)) {
          targetId = pid; break;
        }
      }
      if (targetId) {
        const target = room.players[targetId];
        const card = bot.hand.splice(stealIdx, 1)[0];
        room.discardPile.push(card);
        
        let stolenCard = null;
        if (target.hand.length > 0) {
          const randIdx = Math.floor(Math.random() * target.hand.length);
          stolenCard = target.hand.splice(randIdx, 1)[0];
        } else if (target.equipment) {
          if (target.equipment.defensiveHorse) { stolenCard = target.equipment.defensiveHorse; target.equipment.defensiveHorse = null; }
          else if (target.equipment.weapon) { stolenCard = target.equipment.weapon; target.equipment.weapon = null; }
          else if (target.equipment.offensiveHorse) { stolenCard = target.equipment.offensiveHorse; target.equipment.offensiveHorse = null; }
        }
        if (stolenCard) bot.hand.push(stolenCard);
        if (stolenCard && stolenCard.name === 'SILVER_LION_HELMET') {
        target.hp = Math.min(target.maxHp, target.hp + 1);
        }
        
        notifyCardPlayed(room, botId, 'STEAL', target.id);
        logCardPlay(bot.name, 'STEAL', target.name);
        broadcastRoomState(room);
        actionTaken = true;
      }
    }
  }

  if (!actionTaken) {
    const duelIdx = bot.hand.findIndex(c => c.name === 'DUEL');
    if (duelIdx !== -1) {
      let targetId = null;
      for (const pid of room.turnOrder) {
        const target = room.players[pid];
        if (botWantsToAttack(bot, target, room) && !(hasCharacter(target, 'ZHUGE_LIANG') && target.hand.length === 0)) {
          targetId = pid; break;
        }
      }
      if (targetId) {
        const card = bot.hand.splice(duelIdx, 1)[0];
        room.discardPile.push(card);
        
        room.pendingAction = {
          type: 'WAITING_FOR_SLASH_DUEL',
          sourcePlayerId: botId,
          targetPlayerId: targetId,
          currentPlayerToSlash: targetId,
          cardUsedId: card.id,
          damage: 1,
          timeoutAt: Date.now() + 15000
        };
        logCardPlay(bot.name, 'DUEL', targetId);
        broadcastRoomState(room);
        actionTaken = true;
        
        if (room.players[targetId].isBot) {
          setTimeout(() => handleBotDuelSlash(room), 1200);
        }
        return;
      }
    }
  }
  
  // 5. Play Wine buff if has Slash and enemy in range
  if (!actionTaken) {
    const hasWine = bot.hand.some(c => c.name === 'WINE');
    const hasSlash = bot.hand.some(c => c.name === 'SLASH');
    if (hasWine && hasSlash && !bot.wineActive) {
      // check if enemy in range
      const weaponRange = bot.equipment.weapon ? bot.equipment.weapon.range : 1;
      let enemyInRange = false;
      for (const pid of room.turnOrder) {
        const target = room.players[pid];
        if (botWantsToAttack(bot, target, room) && calculateDistance(room, botId, pid) <= weaponRange) {
          enemyInRange = true; break;
        }
      }
      if (enemyInRange) {
        const wineIdx = bot.hand.findIndex(c => c.name === 'WINE');
        bot.hand.splice(wineIdx, 1);
        bot.wineActive = true;
        console.log(`Bot ${bot.name} used WINE`);
        actionTaken = true;
      }
    }
  }
  
  // 6. Attack targets with SLASH / THUNDER_ATTACK
  if (!actionTaken) {
    const slashIdx = bot.hand.findIndex(c => c.name === 'SLASH' || c.name === 'THUNDER_ATTACK');
    if (slashIdx !== -1) {
      const weaponRange = bot.equipment.weapon ? bot.equipment.weapon.range : 1;
      
      let targetId = null;
      for (const pid of room.turnOrder) {
        const target = room.players[pid];
        if (botWantsToAttack(bot, target, room)) {
          const dist = calculateDistance(room, botId, pid);
          if (dist <= weaponRange) {
            const hasZhuge = bot.equipment.weapon && bot.equipment.weapon.name === 'ZHUGE_CROSSBOW';
            const isZhangFei = hasCharacter(bot, 'ZHANG_FEI');
            if (room.attacksPlayedInTurn === 0 || hasZhuge || isZhangFei) {
              targetId = pid;
              break;
            }
          }
        }
      }
      
      if (targetId) {
        const attackCard = bot.hand[slashIdx];
        const isThunder = attackCard.name === 'THUNDER_ATTACK';
        const damage = bot.wineActive ? 2 : 1;
        bot.wineActive = false;
        
        bot.hand.splice(slashIdx, 1);
        room.attacksPlayedInTurn += 1;
        bot.slashedThisTurn = true;
        
        const cardUsedId = `bot_slash_${Date.now()}`;
        const timeoutMs = 15000;
        const dodgeNeeded = hasCharacter(bot, 'LV_BU') ? 2 : 1;
        
        room.pendingAction = {
          type: 'WAITING_FOR_DODGE',
          sourcePlayerId: botId,
          targetPlayerId: targetId,
          cardUsedId: cardUsedId,
          damage: damage,
          dodgeNeeded: dodgeNeeded,
          damageType: isThunder ? 'THUNDER' : 'NORMAL',
          timeoutAt: Date.now() + timeoutMs
        };
        
        console.log(`Bot ${bot.name} attacked ${targetId} with ${attackCard.name} for ${damage} HP`);
        broadcastRoomState(room);
        actionTaken = true;
        
        const defender = room.players[targetId];
        if (defender.isBot) {
          setTimeout(() => {
            handleBotDodge(room, targetId, damage);
          }, 1000);
        }
        return;
      }
    }
  }
  
  if (actionTaken) {
    setTimeout(() => {
      runBotTurn(room, botId);
    }, 1200);
  } else {
    // End play phase
    room.currentPhase = 'DISCARD';
    checkDiscardRequirement(room);
  }
}

function getCardById(room, cardId) {
  for (const p of Object.values(room.players)) {
    const c = p.hand.find(x => x.id === cardId);
    if (c) return c;
  }
  const c = room.discardPile.find(x => x.id === cardId);
  if (c) return c;
  return null;
}

function dealDamage(room, targetPlayerId, damage, cardUsed, attackerId, damageType = 'NORMAL') {
  const targetPlayer = room.players[targetPlayerId];
  if (!targetPlayer || !targetPlayer.isAlive) return;
  
  let finalDamage = damage;

  // Armor processing
  if (targetPlayer.equipment && targetPlayer.equipment.armor) {
    const armorName = targetPlayer.equipment.armor.name;
    if (armorName === 'SILVER_LION_HELMET') {
      if (finalDamage > 1) {
        console.log(`${targetPlayer.name} Silver Lion Helmet reduced damage to 1`);
        finalDamage = 1;
      }
    }
    if (armorName === 'NIO_SHIELD') {
    if (cardUsed && cardUsed.name === 'SLASH' && (cardUsed.suit === 'SPADE' || cardUsed.suit === 'CLUB')) {
    console.log(`${targetPlayer.name} Nio Shield blocked a black-suit Attack`);
    return;
      }
    }
    if (armorName === 'RATTAN_ARMOR') {
      if (damageType === 'FIRE') {
        console.log(`${targetPlayer.name} Rattan Armor increased fire damage by 1`);
        finalDamage += 1;
      } else if (damageType === 'NORMAL' && (!cardUsed || cardUsed.name === 'SLASH' || cardUsed.name === 'ARROW_BARRAGE' || cardUsed.name === 'BARBARIAN_INVASION')) {
        console.log(`${targetPlayer.name} Rattan Armor nullified normal attack damage`);
        return; // Prevent damage entirely
      }
    }
  }

  targetPlayer.hp -= finalDamage;
  const attackerName = attackerId && room.players[attackerId] ? room.players[attackerId].name : null;
  logDamage(targetPlayer.name, finalDamage, targetPlayer.hp, targetPlayer.maxHp, attackerName, cardUsed ? cardUsed.name : null);
  
  io.to(room.roomId).emit('damage_log', {
    targetId: targetPlayerId,
    attackerId: attackerId,
    damage: finalDamage,
    cardName: cardUsed ? cardUsed.name : null,
    hp: targetPlayer.hp,
    maxHp: targetPlayer.maxHp
  });
  
  // Chain reaction for elemental damage
  if (targetPlayer.isChained && (damageType === 'FIRE' || damageType === 'THUNDER')) {
    targetPlayer.isChained = false; // Breaking this chain
    // Find other chained players
    room.turnOrder.forEach(pid => {
       if (pid !== targetPlayerId && room.players[pid] && room.players[pid].isAlive && room.players[pid].isChained) {
          console.log(`Chain reaction hits ${room.players[pid].name}!`);
          room.players[pid].isChained = false;
          // Recursively deal same elemental damage
          dealDamage(room, pid, finalDamage, cardUsed, attackerId, damageType);
       }
    });
  }

  // Cao Cao skill: Emperor's Domain
  if (hasCharacter(targetPlayer, 'CAO_CAO') && cardUsed && !['PEACH', 'WINE'].includes(cardUsed.name)) {
    targetPlayer.hand.push(cardUsed);
    // Remove from discard pile
    const discardIdx = room.discardPile.findIndex(c => c.id === cardUsed.id);
    if (discardIdx !== -1) {
      room.discardPile.splice(discardIdx, 1);
    }
    console.log(`${targetPlayer.name} (Cao Cao) used Emperor's Domain: obtained the card that dealt damage.`);
    notifyCardPlayed(room, targetPlayerId, 'สกิล Emperor\'s Domain', attackerId);
  }

  // Sima Yi skill: Feedback
  if (hasCharacter(targetPlayer, 'SIMA_YI') && attackerId) {
    const attacker = room.players[attackerId];
    if (attacker && attacker.hand.length > 0) {
      const randIdx = Math.floor(Math.random() * attacker.hand.length);
      const stolen = attacker.hand.splice(randIdx, 1)[0];
      targetPlayer.hand.push(stolen);
      console.log(`${targetPlayer.name} (Sima Yi) used Feedback: stole 1 card from ${attacker.name}`);
      notifyCardPlayed(room, targetPlayerId, 'สกิล Feedback', attackerId);
    }
  }

  // KIRIN_BOW: destroy target's horse on successful hit
  if (attackerId && room.players[attackerId]) {
    const attacker = room.players[attackerId];
    if (attacker.equipment && attacker.equipment.weapon && attacker.equipment.weapon.name === 'KIRIN_BOW') {
      let destroyedHorse = null;
      if (targetPlayer.equipment && targetPlayer.equipment.offensiveHorse) {
        destroyedHorse = targetPlayer.equipment.offensiveHorse;
        targetPlayer.equipment.offensiveHorse = null;
      } else if (targetPlayer.equipment && targetPlayer.equipment.defensiveHorse) {
        destroyedHorse = targetPlayer.equipment.defensiveHorse;
        targetPlayer.equipment.defensiveHorse = null;
      }
      if (destroyedHorse) {
        room.discardPile.push(destroyedHorse);
        console.log(`${attacker.name} KIRIN_BOW: destroyed ${targetPlayer.name}'s horse (${destroyedHorse.name})`);
      }
    }
  }

  if (targetPlayer.hp <= 0) {
    startDyingPhase(room, targetPlayerId, attackerId);
  } else {
    broadcastRoomState(room);
  }
}

function handleBotDodge(room, botId, damage) {
  const bot = room.players[botId];
  if (!bot || !bot.isAlive || !room.pendingAction) return;
  
  let dodgeIdx = bot.hand.findIndex(c => c.name === 'DODGE');
  if (dodgeIdx === -1 && (hasCharacter(bot, 'ZHEN_JI') || hasCharacter(bot, 'LADY_ZHEN'))) {
    dodgeIdx = bot.hand.findIndex(c => c.suit === 'SPADE' || c.suit === 'CLUB');
  }
  
  if (dodgeIdx !== -1) {
    const card = bot.hand.splice(dodgeIdx, 1)[0];
    room.discardPile.push(card);
    
    const pending = room.pendingAction;
    pending.dodgeNeeded = (pending.dodgeNeeded || 1) - 1;
    if (pending.dodgeNeeded <= 0) {
      room.pendingAction = null;
      console.log(`Bot ${bot.name} successfully dodged the attack`);
      broadcastRoomState(room);
      resumeAfterAttack(room);
    } else {
      console.log(`Bot ${bot.name} dodged once, needs ${pending.dodgeNeeded} more`);
      broadcastRoomState(room);
      setTimeout(() => {
        handleBotDodge(room, botId, damage);
      }, 600);
    }
  } else {
    const pending = room.pendingAction;
    const attackerId = pending ? pending.sourcePlayerId : null;
    const cardUsed = pending ? getCardById(room, pending.cardUsedId) : null;
    room.pendingAction = null;
    dealDamage(room, botId, damage, cardUsed, attackerId);
    if (!room.pendingAction) {
      resumeAfterAttack(room);
    }
  }
}

function handleBotDuelSlash(room) {
  const pending = room.pendingAction;
  if (!pending || pending.type !== 'WAITING_FOR_SLASH_DUEL') return;
  
  const botId = pending.currentPlayerToSlash;
  const bot = room.players[botId];
  if (!bot || !bot.isAlive) return;

  let slashIdx = bot.hand.findIndex(c => c.name === 'SLASH');
  
  if (slashIdx !== -1) {
    const card = bot.hand.splice(slashIdx, 1)[0];
    room.discardPile.push(card);
    console.log(`Bot ${bot.name} fought back in DUEL with a SLASH`);
    
    pending.currentPlayerToSlash = pending.currentPlayerToSlash === pending.sourcePlayerId 
      ? pending.targetPlayerId 
      : pending.sourcePlayerId;
    
    pending.timeoutAt = Date.now() + 15000;
    broadcastRoomState(room);
    
    if (room.players[pending.currentPlayerToSlash].isBot) {
      setTimeout(() => handleBotDuelSlash(room), 1200);
    } else {
      setTimeout(() => {
        if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_SLASH_DUEL' && room.pendingAction.currentPlayerToSlash === pending.currentPlayerToSlash) {
          const attackerId = pending.currentPlayerToSlash === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId;
          const cardUsed = getCardById(room, pending.cardUsedId);
          room.pendingAction = null;
          dealDamage(room, pending.currentPlayerToSlash, 1, cardUsed, attackerId);
          if (!room.pendingAction) resumeAfterAttack(room);
          broadcastRoomState(room);
        }
      }, 15000);
    }
  } else {
    // Bot takes damage
    const damagedPlayerId = botId;
    const attackerId = damagedPlayerId === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId;
    const cardUsed = getCardById(room, pending.cardUsedId);
    room.pendingAction = null;
    dealDamage(room, damagedPlayerId, 1, cardUsed, attackerId);
    if (!room.pendingAction) {
      resumeAfterAttack(room);
    }
  }
}

function handleBotBorrowSlash(room) {
  const pending = room.pendingAction;
  if (!pending || pending.type !== 'WAITING_FOR_BORROW_SLASH') return;
  
  const botId = pending.targetPlayerId;
  const bot = room.players[botId];
  if (!bot || !bot.isAlive) return;

  const slashIdx = bot.hand.findIndex(c => c.name === 'SLASH');
  
  if (slashIdx !== -1) {
    const slashCard = bot.hand.splice(slashIdx, 1)[0];
    room.discardPile.push(slashCard);
    notifyCardPlayed(room, botId, 'SLASH', pending.victimId);
    
    const damage = bot.wineActive ? 2 : 1;
    bot.wineActive = false;
    
    room.pendingAction = {
      type: 'WAITING_FOR_DODGE',
      sourcePlayerId: botId,
      targetPlayerId: pending.victimId,
      damage: damage,
      cardUsedId: slashCard.id,
      originalAttackerId: pending.sourcePlayerId,
      timeoutAt: Date.now() + 15000,
      dodgeNeeded: (slashCard.name === 'SLASH' && hasCharacter(bot, 'LU_BU')) ? 2 : 1,
      attackType: (bot.equipment && bot.equipment.weapon && bot.equipment.weapon.name === 'FEATHERED_FAN') ? 'FIRE' : 'NORMAL'
    };
    broadcastRoomState(room);
    
    const victim = room.players[pending.victimId];
    if (victim && victim.isBot) {
       setTimeout(() => handleBotDodge(room), 1200);
    }
  } else {
    // Bot doesn't have SLASH, loses weapon to sourcePlayerId
    if (bot.equipment && bot.equipment.weapon) {
      const weapon = bot.equipment.weapon;
      bot.equipment.weapon = null;
      const playerA = room.players[pending.sourcePlayerId];
      if (playerA) playerA.hand.push(weapon);
      notifyCardPlayed(room, pending.sourcePlayerId, `ขโมย ${weapon.name} จาก ${bot.name}`);
    }
    room.pendingAction = null;
    resumeAfterAttack(room);
    broadcastRoomState(room);
  }
}
function handleBotBumperPick(room) {
  if (!room.pendingAction || room.pendingAction.type !== 'WAITING_FOR_BUMPER_PICK') return;
  const pickerId = room.pendingAction.currentPickerId;
  const picker = room.players[pickerId];
  if (!picker || !picker.isBot || !room.bumperHarvestCards || room.bumperHarvestCards.length === 0) return;

  const rIdx = Math.floor(Math.random() * room.bumperHarvestCards.length);
  const pickedCard = room.bumperHarvestCards.splice(rIdx, 1)[0];
  picker.hand.push(pickedCard);
  
  room.chat = room.chat || [];
  room.chat.push({ sender: 'System', text: `${picker.name} เลือก ${pickedCard.name}(${pickedCard.suit}) จากเสบียงอุดมสมบูรณ์`, time: new Date().toLocaleTimeString('th-TH') });

  if (room.bumperHarvestCards.length > 0) {
     const myIdx = room.turnOrder.indexOf(pickerId);
     let nextPickerId = null;
     for (let i = 1; i < room.turnOrder.length; i++) {
       const tId = room.turnOrder[(myIdx + i) % room.turnOrder.length];
       const t = room.players[tId];
       if (t.isAlive) {
         nextPickerId = tId;
         break;
       }
     }
     if (nextPickerId) {
       room.pendingAction.currentPickerId = nextPickerId;
       room.pendingAction.timeoutAt = Date.now() + 15000;
       broadcastRoomState(room);
       if (room.players[nextPickerId].isBot) {
          setTimeout(() => handleBotBumperPick(room), 1200);
       }
     } else {
       room.discardPile.push(...room.bumperHarvestCards);
       room.bumperHarvestCards = [];
       room.pendingAction = null;
       resumeAfterAttack(room);
       broadcastRoomState(room);
     }
  } else {
     room.bumperHarvestCards = [];
     room.pendingAction = null;
     resumeAfterAttack(room);
     broadcastRoomState(room);
  }
}


function handleBotAOE(room) {
  const pending = room.pendingAction;
  if (!pending || pending.type !== 'WAITING_FOR_AOE') return;
  
  const botId = pending.targets[pending.currentTargetIndex];
  const bot = room.players[botId];
  if (!bot || !bot.isAlive) {
    // If dead, skip
    pending.currentTargetIndex++;
    if (pending.currentTargetIndex >= pending.targets.length) {
      room.pendingAction = null;
      broadcastRoomState(room);
      resumeAfterAttack(room);
    } else {
      pending.timeoutAt = Date.now() + 15000;
      broadcastRoomState(room);
      if (room.players[pending.targets[pending.currentTargetIndex]].isBot) {
        setTimeout(() => handleBotAOE(room), 1200);
      } else {
        setTimeout(() => {
          if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE' && room.pendingAction.currentTargetIndex === pending.currentTargetIndex) {
            const tId = pending.targets[pending.currentTargetIndex];
            const cardUsed = getCardById(room, pending.cardUsedId);
            dealDamage(room, tId, 1, cardUsed, pending.sourcePlayerId);
            if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE') {
              handleBotAOE(room);
            } else {
              broadcastRoomState(room);
            }
          }
        }, 15000);
      }
    }
    return;
  }
  
  let playedIdx = -1;
  if (pending.aoeType === 'BARBARIAN_INVASION') {
    playedIdx = bot.hand.findIndex(c => c.name === 'SLASH');
  } else if (pending.aoeType === 'ARROW_BARRAGE') {
    playedIdx = bot.hand.findIndex(c => c.name === 'DODGE');
    if (playedIdx === -1 && (hasCharacter(bot, 'ZHEN_JI') || hasCharacter(bot, 'LADY_ZHEN'))) {
      playedIdx = bot.hand.findIndex(c => c.suit === 'SPADE' || c.suit === 'CLUB');
    }
  }

  if (playedIdx !== -1) {
    const card = bot.hand.splice(playedIdx, 1)[0];
    room.discardPile.push(card);
    console.log(`Bot ${bot.name} responded to ${pending.aoeType} with ${card.name}`);
    
    pending.currentTargetIndex++;
    if (pending.currentTargetIndex >= pending.targets.length) {
      room.pendingAction = null;
      broadcastRoomState(room);
      resumeAfterAttack(room);
    } else {
      pending.timeoutAt = Date.now() + 15000;
      broadcastRoomState(room);
      if (room.players[pending.targets[pending.currentTargetIndex]].isBot) {
        setTimeout(() => handleBotAOE(room), 1200);
      }
    }
  } else {
    // Take damage
    const cardUsed = getCardById(room, pending.cardUsedId);
    dealDamage(room, botId, 1, cardUsed, pending.sourcePlayerId);
    
    if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE') {
      pending.currentTargetIndex++;
      if (pending.currentTargetIndex >= pending.targets.length) {
        room.pendingAction = null;
        broadcastRoomState(room);
        resumeAfterAttack(room);
      } else {
        pending.timeoutAt = Date.now() + 15000;
        broadcastRoomState(room);
        if (room.players[pending.targets[pending.currentTargetIndex]].isBot) {
          setTimeout(() => handleBotAOE(room), 1200);
        } else {
          setTimeout(() => {
            if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE' && room.pendingAction.currentTargetIndex === pending.currentTargetIndex) {
              const tId = pending.targets[pending.currentTargetIndex];
              const cardUsed = getCardById(room, pending.cardUsedId);
              dealDamage(room, tId, 1, cardUsed, pending.sourcePlayerId);
              if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE') {
                handleBotAOE(room);
              } else {
                broadcastRoomState(room);
              }
            }
          }, 15000);
        }
      }
    }
  }
}

function handleBotSeduction(room, botId) {
  const bot = room.players[botId];
  if (!bot || !bot.isAlive || !room.pendingAction) return;
  
  const slashIdx = bot.hand.findIndex(c => c.name === 'SLASH');
  if (slashIdx !== -1) {
    const card = bot.hand.splice(slashIdx, 1)[0];
    room.discardPile.push(card);
    room.pendingAction = null;
    console.log(`Bot ${bot.name} discarded a SLASH to block Diao Chan's Seduction`);
    broadcastRoomState(room);
    resumeAfterAttack(room);
  } else {
    const pending = room.pendingAction;
    const attackerId = pending ? pending.sourcePlayerId : null;
    room.pendingAction = null;
    dealDamage(room, botId, 1, null, attackerId);
    if (!room.pendingAction) {
      resumeAfterAttack(room);
    }
  }
}

function handleBotZhouYu(room, botId, requiredColor) {
  const bot = room.players[botId];
  if (!bot || !bot.isAlive || !room.pendingAction) return;
  
  const matchingIdx = bot.hand.findIndex(c => {
    const color = (c.suit === 'HEART' || c.suit === 'DIAMOND') ? 'RED' : 'BLACK';
    return color === requiredColor;
  });
  
  if (matchingIdx !== -1) {
    const card = bot.hand.splice(matchingIdx, 1)[0];
    room.discardPile.push(card);
    room.pendingAction = null;
    console.log(`Bot ${bot.name} discarded a ${requiredColor} card to block Zhou Yu's Sow Discord`);
    broadcastRoomState(room);
    resumeAfterAttack(room);
  } else {
    const pending = room.pendingAction;
    const attackerId = pending ? pending.sourcePlayerId : null;
    room.pendingAction = null;
    dealDamage(room, botId, 1, null, attackerId);
    if (!room.pendingAction) {
      resumeAfterAttack(room);
    }
  }
}

// ==========================================
// 6. SOCKET.IO CONTROLLER
// ==========================================
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('create_room', ({ roomId, playerName, mode }) => {
    const rId = roomId || 'ROOM_' + Math.random().toString(36).substr(2, 4).toUpperCase();
    
    if (gameRooms[rId] && roomId) {
      return socket.emit('game_error', { message: "ห้องนี้ถูกสร้างไปแล้ว กรุณาเข้าร่วมแทน" });
    }

    gameRooms[rId] = {
      roomId: rId,
      status: 'LOBBY',
      mode: mode || 'ONLINE', // 'ONLINE' or 'BOT'
      hostId: socket.id,
      turnOrder: [],
      currentTurnIndex: 0,
      currentPhase: 'START',
      deck: [],
      discardPile: [],
      players: {},
      pendingAction: null,
      attacksPlayedInTurn: 0
    };
    
    const playerId = 'p1';
    gameRooms[rId].players[playerId] = {
      id: playerId,
      name: playerName || 'Host',
      socketId: socket.id,
      role: 'UNKNOWN',
      character: '',
      characterChoices: [],
      maxHp: 4,
      hp: 4,
      hand: [],
      equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
      delayedKitZone: [],
      isAlive: true,
      wineActive: false,
      isBot: false
    };
    gameRooms[rId].turnOrder.push(playerId);
    
    socket.join(rId);
    socket.emit('room_created', { roomId: rId, playerId });
    broadcastRoomState(gameRooms[rId]);
  });
  
  socket.on('join_room', ({ roomId, playerName }) => {
    const room = gameRooms[roomId];
    if (!room) return socket.emit('game_error', { message: "ไม่พบห้องนี้" });
    if (room.status !== 'LOBBY') return socket.emit('game_error', { message: "เกมก้าวสู่การเล่นไปแล้ว" });
    if (room.turnOrder.length >= 10) return socket.emit('game_error', { message: "ห้องนี้เต็มแล้ว (สูงสุด 10 คน)" });
    
    const nextIdx = room.turnOrder.length + 1;
    const playerId = 'p' + nextIdx;
    
    room.players[playerId] = {
      id: playerId,
      name: playerName || 'Player ' + nextIdx,
      socketId: socket.id,
      role: 'UNKNOWN',
      character: '',
      characterChoices: [],
      maxHp: 4,
      hp: 4,
      hand: [],
      equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
      delayedKitZone: [],
      isAlive: true,
      wineActive: false,
      isBot: false
    };
    room.turnOrder.push(playerId);
    
    socket.join(roomId);
    socket.emit('room_joined', { roomId, playerId });
    broadcastRoomState(room);
  });
  
  socket.on('start_game', ({ roomId, botCount }) => {
    const room = gameRooms[roomId];
    if (!room) return;
    
    if (room.mode !== 'BOT' && room.turnOrder.length < 2) {
      socket.emit('game_error', { message: 'ต้องมีผู้เล่นในห้องอย่างน้อย 2 คนจึงจะเริ่มเกมได้ (รอผู้เล่นอื่นเข้าร่วม)' });
      return;
    }
    
    if (room.mode === 'BOT') {
      const targetCount = botCount || 3;
      const botNames = [
        'Zhuge Liang (Bot)', 'Guan Yu (Bot)', 'Cao Cao (Bot)', 
        'Diao Chan (Bot)', 'Liu Bei (Bot)', 'Zhang Fei (Bot)', 
        'Sima Yi (Bot)', 'Zhao Yun (Bot)', 'Sun Quan (Bot)', 'Zhou Yu (Bot)'
      ];
      let botIdx = 0;
      while (room.turnOrder.length < targetCount) {
        const nextIdx = room.turnOrder.length + 1;
        const botId = 'p' + nextIdx;
        
        room.players[botId] = {
          id: botId,
          name: botNames[botIdx++] || 'Bot ' + nextIdx,
          socketId: '',
          role: 'UNKNOWN',
          character: '',
          characterChoices: [],
          maxHp: 4,
          hp: 4,
          hand: [],
          equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
          delayedKitZone: [],
          isAlive: true,
          wineActive: false,
          isBot: true
        };
        room.turnOrder.push(botId);
      }
    }
    
    assignRoles(room);
    startDraftPhase(room);
  });
  
  socket.on('choose_character', ({ roomId, characterId }) => {
    const room = gameRooms[roomId];
    if (!room) return;
    
    const playerId = getPlayerIdBySocket(room, socket.id);
    if (!playerId) return;
    
    const player = room.players[playerId];
    player.character = characterId;
    setupCharacterHp(player, room.turnOrder.length);
    
    // Check if everyone (humans) has selected
    const allChosen = Object.values(room.players).every(p => p.character !== '');
    if (allChosen) {
      startPlayPhase(room);
    } else {
      broadcastRoomState(room);
    }
  });

  // ==========================================
  // NEGATION WINDOW MECHANICS (Phase 2 - Group 4)
  // ==========================================
  function startNegateWindow(room, actionData) {
    room.actionChain = [actionData];
    room.negatePasses = 0;
    
    room.pendingAction = {
      type: 'WAITING_FOR_NEGATE',
      sourcePlayerId: actionData.sourceId,
      targetPlayerId: actionData.targetId,
      cardUsedId: actionData.cardUsed ? actionData.cardUsed.id : null,
      timeoutAt: Date.now() + 5000
    };
    
    broadcastRoomState(room);
    
    // Bots auto pass after 1-2 seconds (for simplicity, we let them always pass for now)
    Object.values(room.players).forEach(p => {
       if (p.isBot && p.isAlive) {
          setTimeout(() => {
             if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_NEGATE') {
                room.negatePasses = (room.negatePasses || 0) + 1;
                const alivePlayersCount = Object.values(room.players).filter(pl => pl.isAlive).length;
                if (room.negatePasses >= alivePlayersCount) {
                  resolveActionChain(room);
                }
             }
          }, 1500 + Math.random() * 1000);
       }
    });
    
    const actionChainLength = room.actionChain.length;
    setTimeout(() => {
      if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_NEGATE' && room.actionChain.length === actionChainLength) {
         resolveActionChain(room);
      }
    }, 5000);
  }

  function resolveActionChain(room) {
    if (!room.actionChain || room.actionChain.length === 0) return;
    const isNegated = (room.actionChain.length % 2 === 0);
    const originalAction = room.actionChain[0];
    
    room.pendingAction = null;
    
    if (isNegated) {
       room.chat = room.chat || [];
       room.chat.push({ sender: 'System', text: `ผลของการ์ด ${originalAction.cardUsed.name} ถูกยกเลิกโดยไร้ข้อกังขา!`, time: new Date().toLocaleTimeString('th-TH') });
       resumeAfterAttack(room);
       broadcastRoomState(room);
    } else {
       executeOriginalAction(room, originalAction);
    }
    room.actionChain = [];
  }

  function executeOriginalAction(room, action) {
    const { type, sourceId, targetId, targetZone, cardUsed, targets } = action;
    const player = room.players[sourceId];
    const targetPlayer = targetId ? room.players[targetId] : null;
    
    if (type === 'STEAL') {
      if (!targetPlayer || !targetPlayer.isAlive) {
        resumeAfterAttack(room); broadcastRoomState(room); return;
      }
      let stolenCard = null;
      if (targetZone === 'HAND' && targetPlayer.hand && targetPlayer.hand.length > 0) {
        stolenCard = targetPlayer.hand.splice(Math.floor(Math.random() * targetPlayer.hand.length), 1)[0];
      } else if (targetZone === 'WEAPON' && targetPlayer.equipment.weapon) {
        stolenCard = targetPlayer.equipment.weapon; targetPlayer.equipment.weapon = null;
      } else if (targetZone === 'DEF_HORSE' && targetPlayer.equipment.defensiveHorse) {
        stolenCard = targetPlayer.equipment.defensiveHorse; targetPlayer.equipment.defensiveHorse = null;
      } else if (targetZone === 'OFF_HORSE' && targetPlayer.equipment.offensiveHorse) {
        stolenCard = targetPlayer.equipment.offensiveHorse; targetPlayer.equipment.offensiveHorse = null;
      } else if (targetZone === 'ARMOR' && targetPlayer.equipment.armor) {
        stolenCard = targetPlayer.equipment.armor; targetPlayer.equipment.armor = null;
      }
      if (!stolenCard && targetPlayer.hand.length > 0) stolenCard = targetPlayer.hand.splice(Math.floor(Math.random() * targetPlayer.hand.length), 1)[0];
      
      if (stolenCard) {
        player.hand.push(stolenCard);
        if (stolenCard.name === 'SILVER_LION_HELMET') {
          targetPlayer.hp = Math.min(targetPlayer.maxHp, targetPlayer.hp + 1);
        }
      }
      resumeAfterAttack(room);
      broadcastRoomState(room);
    } 
    else if (type === 'SABOTAGE') {
      if (!targetPlayer || !targetPlayer.isAlive) {
        resumeAfterAttack(room); broadcastRoomState(room); return;
      }
      let discardedCard = null;
      if (targetZone === 'HAND' && targetPlayer.hand && targetPlayer.hand.length > 0) {
        discardedCard = targetPlayer.hand.splice(Math.floor(Math.random() * targetPlayer.hand.length), 1)[0];
      } else if (targetZone === 'WEAPON' && targetPlayer.equipment.weapon) {
        discardedCard = targetPlayer.equipment.weapon; targetPlayer.equipment.weapon = null;
      } else if (targetZone === 'DEF_HORSE' && targetPlayer.equipment.defensiveHorse) {
        discardedCard = targetPlayer.equipment.defensiveHorse; targetPlayer.equipment.defensiveHorse = null;
      } else if (targetZone === 'OFF_HORSE' && targetPlayer.equipment.offensiveHorse) {
        discardedCard = targetPlayer.equipment.offensiveHorse; targetPlayer.equipment.offensiveHorse = null;
      } else if (targetZone === 'ARMOR' && targetPlayer.equipment.armor) {
        discardedCard = targetPlayer.equipment.armor; targetPlayer.equipment.armor = null;
      }
      if (!discardedCard && targetPlayer.hand.length > 0) discardedCard = targetPlayer.hand.splice(Math.floor(Math.random() * targetPlayer.hand.length), 1)[0];
      
      if (discardedCard) {
        room.discardPile.push(discardedCard);
        if (discardedCard.name === 'SILVER_LION_HELMET') {
          targetPlayer.hp = Math.min(targetPlayer.maxHp, targetPlayer.hp + 1);
        }
      }
      resumeAfterAttack(room);
      broadcastRoomState(room);
    }
    else if (type === 'EX_NIHILO') {
      const drawn = drawCards(room, 2);
      player.hand.push(...drawn);
      resumeAfterAttack(room);
      broadcastRoomState(room);
    }
    else if (type === 'DUEL') {
      if (!targetPlayer || !targetPlayer.isAlive || (hasCharacter(targetPlayer, 'ZHUGE_LIANG') && targetPlayer.hand.length === 0)) {
        resumeAfterAttack(room); broadcastRoomState(room); return;
      }
      room.pendingAction = {
        type: 'WAITING_FOR_SLASH_DUEL',
        sourcePlayerId: sourceId,
        targetPlayerId: targetId,
        currentPlayerToSlash: targetId,
        cardUsedId: cardUsed.id,
        damage: 1,
        timeoutAt: Date.now() + 15000
      };
      broadcastRoomState(room);
      if (targetPlayer.isBot) setTimeout(() => { if(room.pendingAction) handleBotDuelSlash(room); }, 1200);
      else setTimeout(() => {
        if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_SLASH_DUEL' && room.pendingAction.currentPlayerToSlash === targetId) {
          room.pendingAction = null;
          dealDamage(room, targetId, 1, getCardById(room, cardUsed.id), sourceId);
          if (!room.pendingAction) resumeAfterAttack(room);
          broadcastRoomState(room);
        }
      }, 15000);
    }
    else if (type === 'FIRE_ATTACK') {
      if (!targetPlayer || !targetPlayer.isAlive || targetPlayer.hand.length === 0) {
        resumeAfterAttack(room); broadcastRoomState(room); return;
      }
      room.pendingAction = {
        type: 'WAITING_FOR_FIRE_REVEAL',
        sourcePlayerId: sourceId,
        targetPlayerId: targetId,
        cardUsedId: cardUsed.id,
        timeoutAt: Date.now() + 15000
      };
      broadcastRoomState(room);
      if (targetPlayer.isBot) {
        setTimeout(() => {
          if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_FIRE_REVEAL') {
             const rCard = targetPlayer.hand[Math.floor(Math.random() * targetPlayer.hand.length)];
             room.pendingAction = {
               type: 'WAITING_FOR_FIRE_MATCH', sourcePlayerId: sourceId, targetPlayerId: targetId,
               requiredSuit: rCard.suit, revealedCard: rCard, timeoutAt: Date.now() + 15000
             };
             broadcastRoomState(room);
             if (player.isBot) {
                setTimeout(() => {
                   if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_FIRE_MATCH') {
                      const matchIdx = player.hand.findIndex(c => c.suit === rCard.suit);
                      if (matchIdx !== -1) {
                         room.discardPile.push(player.hand.splice(matchIdx, 1)[0]);
                         room.pendingAction = null; dealDamage(room, targetId, 1, cardUsed, sourceId, 'FIRE');
                      } else { room.pendingAction = null; }
                      if (!room.pendingAction) resumeAfterAttack(room);
                      broadcastRoomState(room);
                   }
                }, 1000);
             }
          }
        }, 1200);
      }
    }
    else if (type === 'DELAYED') {
      targetPlayer.delayedKitZone = targetPlayer.delayedKitZone || [];
      targetPlayer.delayedKitZone.push(cardUsed);
      resumeAfterAttack(room);
      broadcastRoomState(room);
    }
    else if (type === 'PEACH_GARDEN') {
      Object.values(room.players).forEach(p => {
        if (p.isAlive && p.hp < p.maxHp) p.hp += 1;
      });
      resumeAfterAttack(room);
      broadcastRoomState(room);
    }
    else if (type === 'AOE') {
      room.pendingAction = {
        type: 'WAITING_FOR_AOE',
        aoeType: cardUsed.name,
        sourcePlayerId: sourceId,
        targets: targets,
        currentTargetIndex: 0,
        cardUsedId: cardUsed.id,
        timeoutAt: Date.now() + 15000
      };
      broadcastRoomState(room);
      if (room.players[targets[0]].isBot) setTimeout(() => handleBotAOE(room), 1200);
      else setTimeout(() => {
        if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE' && room.pendingAction.currentTargetIndex === 0) {
          dealDamage(room, targets[0], 1, getCardById(room, cardUsed.id), sourceId);
          if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE') handleBotAOE(room);
          else broadcastRoomState(room);
        }
      }, 15000);
    }
    else if (type === 'BUMPER_HARVEST') {
      const alivePlayers = Object.values(room.players).filter(p => p.isAlive).map(p => p.id);
      const drawnCards = drawCards(room, alivePlayers.length);
      room.bumperHarvestCards = drawnCards;
      
      room.pendingAction = {
        type: 'WAITING_FOR_BUMPER_PICK',
        sourcePlayerId: sourceId, // sourceId is the one who played the card, but picking starts with them
        currentPickerId: sourceId,
        cardUsedId: cardUsed.id,
        timeoutAt: Date.now() + 15000
      };
      broadcastRoomState(room);
      
      if (player.isBot) {
         setTimeout(() => handleBotBumperPick(room), 1200);
      }
    }
    else if (type === 'BORROWED_SWORD') {
      const victimId = action.victimId;
      room.pendingAction = {
        type: 'WAITING_FOR_BORROW_SLASH',
        sourcePlayerId: sourceId,
        targetPlayerId: targetId,
        victimId: victimId,
        cardUsedId: cardUsed.id,
        timeoutAt: Date.now() + 15000
      };
      broadcastRoomState(room);
      if (room.players[targetId].isBot) {
         setTimeout(() => handleBotBorrowSlash(room), 1200);
      }
    }
  }

  socket.on('play_negate', (data) => {
    const roomId = data.roomId;
    if (!roomId) return;
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction || room.pendingAction.type !== 'WAITING_FOR_NEGATE') return;

    const playerId = getPlayerIdBySocket(room, socket.id);
    const player = room.players[playerId];
    const cardIdx = player.hand.findIndex(c => c.id === data.cardId && c.name === 'NEGATE');
    if (cardIdx === -1) return socket.emit('game_error', { message: "ไม่มีการ์ด NEGATE ใบนี้" });

    const cardUsed = player.hand.splice(cardIdx, 1)[0];
    room.discardPile.push(cardUsed);
    
    notifyCardPlayed(room, playerId, 'NEGATE');
    
    // push to action chain
    room.actionChain.push({
      type: 'NEGATE',
      sourceId: playerId,
      cardUsed: cardUsed
    });
    
    room.negatePasses = 0; // reset passes
    room.pendingAction.timeoutAt = Date.now() + 5000;
    broadcastRoomState(room);
    
    const chainLength = room.actionChain.length;
    setTimeout(() => {
      if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_NEGATE' && room.actionChain.length === chainLength) {
         resolveActionChain(room);
      }
    }, 5000);
  });

  socket.on('pass_negate', (data) => {
    const roomId = data.roomId;
    if (!roomId) return;
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction || room.pendingAction.type !== 'WAITING_FOR_NEGATE') return;

    // Check if this pass makes everyone pass
    // For simplicity, we just count passes. In a real game, you track who passed.
    // Assuming everyone has to pass.
    room.negatePasses = (room.negatePasses || 0) + 1;
    
    const alivePlayersCount = Object.values(room.players).filter(p => p.isAlive).length;
    if (room.negatePasses >= alivePlayersCount) {
      resolveActionChain(room);
    }
  });

  socket.on('use_card', (data) => {
    const roomId = data.roomId;
    if (!roomId) return socket.emit('game_error', { message: "กรุณาระบุ roomId" });

    const room = gameRooms[roomId];
    if (!room) return socket.emit('game_error', { message: "ไม่พบห้องเกม" });

    const playerId = getPlayerIdBySocket(room, socket.id) || data.playerId;
    const player = room.players[playerId];
    if (!player) return socket.emit('game_error', { message: "ไม่พบผู้เล่น" });

    const currentTurnPlayerId = room.turnOrder[room.currentTurnIndex];
    if (playerId !== currentTurnPlayerId || room.currentPhase !== 'PLAY') {
      return socket.emit('game_error', { message: "ไม่ใช่เทิร์นของคุณ หรือไม่ใช่ช่วงร่ายการ์ด" });
    }
    if (room.pendingAction) {
      return socket.emit('game_error', { message: "กรุณารอการประมวลผลก่อนหน้า" });
    }

    const cardId = data.cardId || (data.payload && data.payload.cardId);
    const cardIndex = player.hand.findIndex(c => c.id === cardId);
    if (cardIndex === -1) {
      return socket.emit('game_error', { message: "ไม่พบการ์ดใบนี้อยู่บนมือของคุณ" });
    }

    const cardUsed = player.hand[cardIndex];
    const targetPlayerId = data.targetPlayerId || (data.payload && data.payload.targetPlayerId);

    // Enforce "No equipment after slash" rule
    if (player.slashedThisTurn && cardUsed.type === 'EQUIPMENT') {
      return socket.emit('game_error', { message: "คุณใช้ SLASH ไปแล้วในเทิร์นนี้ ไม่สามารถใช้การ์ดอุปกรณ์เพิ่มได้" });
    }

    let effectiveCardName = cardUsed.name;
    if (data.playAs === 'SLASH') {
      const isGuanYuSlash = hasCharacter(player, 'GUAN_YU') && (cardUsed.suit === 'HEART' || cardUsed.suit === 'DIAMOND');
      const isZhaoYunSlash = hasCharacter(player, 'ZHAO_YUN') && cardUsed.name === 'DODGE';
      if (isGuanYuSlash || isZhaoYunSlash) {
        effectiveCardName = 'SLASH';
      } else {
        return socket.emit('game_error', { message: "การ์ดไม่สามารถแปลงเป็น SLASH ได้" });
      }
    }

    if (effectiveCardName === 'SLASH' || cardUsed.name === 'THUNDER_ATTACK') {
      if (!targetPlayerId) return socket.emit('game_error', { message: "กรุณาระบุเป้าหมายในการโจมตี" });
      const targetPlayer = room.players[targetPlayerId];
      if (!targetPlayer || !targetPlayer.isAlive) {
        return socket.emit('game_error', { message: "เป้าหมายไม่พร้อมรับการโจมตี" });
      }

      const hasZhuge = player.equipment && player.equipment.weapon && player.equipment.weapon.name === 'ZHUGE_CROSSBOW';
      const isZhangFei = hasCharacter(player, 'ZHANG_FEI');
      if (room.attacksPlayedInTurn >= 1 && !hasZhuge && !isZhangFei) {
        return socket.emit('game_error', { message: "คุณใช้สิทธิ์ SLASH ครบแล้วในเทิร์นนี้" });
      }

      const weaponRange = player.equipment && player.equipment.weapon ? player.equipment.weapon.range : 1;
      const actualDistance = calculateDistance(room, playerId, targetPlayerId);
      if (actualDistance > weaponRange) {
        return socket.emit('game_error', { message: `ระยะไม่ถึง! เป้าหมายอยู่ห่าง ${actualDistance} แต่ระยะโจมตีคือ ${weaponRange}` });
      }

      // Zhuge Liang skill: Empty City
      if (hasCharacter(targetPlayer, 'ZHUGE_LIANG') && targetPlayer.hand.length === 0) {
        return socket.emit('game_error', { message: "ขงเบ้งเปิดใช้สกิล เมืองว่างเปล่า ไม่สามารถตกเป็นเป้าหมายของการโจมตีได้!" });
      }

      const damage = player.wineActive ? 2 : 1;
      player.wineActive = false;
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      player.hand.splice(cardIndex, 1);
      room.attacksPlayedInTurn += 1;
      player.slashedThisTurn = true;

      // Determine damage type: THUNDER_ATTACK = THUNDER, FEATHERED_FAN weapon = FIRE, else NORMAL
      let slashDamageType = 'NORMAL';
      if (cardUsed.name === 'THUNDER_ATTACK') {
        slashDamageType = 'THUNDER';
      } else if (player.equipment && player.equipment.weapon && player.equipment.weapon.name === 'FEATHERED_FAN') {
        slashDamageType = 'FIRE';
      }

      const timeoutMs = 15000;
      const dodgeNeeded = hasCharacter(player, 'LV_BU') ? 2 : 1;
      
      room.pendingAction = {
        type: 'WAITING_FOR_DODGE',
        sourcePlayerId: playerId,
        targetPlayerId: targetPlayerId,
        cardUsedId: cardId,
        damage: damage,
        dodgeNeeded: dodgeNeeded,
        damageType: slashDamageType,
        timeoutAt: Date.now() + timeoutMs
      };

      broadcastRoomState(room);

      if (targetPlayer.isBot) {
        setTimeout(() => {
          handleBotDodge(room, targetPlayerId, damage);
        }, 1200);
      } else {
        // Human timeout
        setTimeout(() => {
          if (room.pendingAction && room.pendingAction.cardUsedId === cardId) {
            const pending = room.pendingAction;
            const attackerId = pending.sourcePlayerId;
            const cardUsedTimeout = getCardById(room, pending.cardUsedId);
            room.pendingAction = null;
            dealDamage(room, targetPlayerId, damage, cardUsedTimeout, attackerId, slashDamageType);
            if (!room.pendingAction) resumeAfterAttack(room);
            broadcastRoomState(room);
          }
        }, timeoutMs);
      }

    } else if (cardUsed.name === 'PEACH') {
      const targetId = targetPlayerId || playerId;
      const targetPlayer = room.players[targetId];
      if (!targetPlayer || !targetPlayer.isAlive || targetPlayer.hp >= targetPlayer.maxHp) {
        return socket.emit('game_error', { message: "ไม่สามารถใช้ PEACH ได้" });
      }

      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      player.hand.splice(cardIndex, 1);
      room.discardPile.push(cardUsed);
      targetPlayer.hp += 1;
      broadcastRoomState(room);

    } else if (cardUsed.name === 'WINE') {
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      player.hand.splice(cardIndex, 1);
      room.discardPile.push(cardUsed);
      player.wineActive = true;
      broadcastRoomState(room);

    } else if (cardUsed.name === 'STEAL') {
      if (!targetPlayerId) return socket.emit('game_error', { message: "กรุณาระบุเป้าหมายที่จะขโมย" });
      const targetPlayer = room.players[targetPlayerId];
      if (!targetPlayer || !targetPlayer.isAlive) {
        return socket.emit('game_error', { message: "เป้าหมายไม่มีผล" });
      }
      const dist = calculateDistance(room, playerId, targetPlayerId);
      if (dist > 1) {
        return socket.emit('game_error', { message: `เป้าหมายอยู่ไกลเกินระยะค่ายกล STEAL` });
      }
      const targetZone = data.targetZone || 'HAND';
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const stealCard = player.hand.splice(cardIndex, 1)[0];
      room.discardPile.push(stealCard);
      startNegateWindow(room, { type: 'STEAL', sourceId: playerId, targetId: targetPlayerId, targetZone: targetZone, cardUsed: stealCard });

    } else if (['ZHUGE_CROSSBOW', 'BLUE_STEEL_SWORD', 'SIX_SWORDS_WU', 'KIRIN_BOW', 'FEATHERED_FAN', 'SERPENT_SPEAR'].includes(cardUsed.name)) {
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const equipCard = player.hand.splice(cardIndex, 1)[0];
      const weaponRangeMap = { 'ZHUGE_CROSSBOW': 1, 'BLUE_STEEL_SWORD': 2, 'SIX_SWORDS_WU': 2, 'KIRIN_BOW': 5, 'FEATHERED_FAN': 4, 'SERPENT_SPEAR': 3 };
      equipCard.range = weaponRangeMap[cardUsed.name] || 1;
      if (player.equipment.weapon) room.discardPile.push(player.equipment.weapon);
      player.equipment.weapon = equipCard;
      broadcastRoomState(room);

    } else if (cardUsed.name === 'LIGHTNING_HOOF' || cardUsed.name === 'SHADOWRUNNER') {
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const equipCard = player.hand.splice(cardIndex, 1)[0];
      if (player.equipment.defensiveHorse) room.discardPile.push(player.equipment.defensiveHorse);
      player.equipment.defensiveHorse = equipCard;
      broadcastRoomState(room);

    } else if (cardUsed.name === 'RED_HARE' || cardUsed.name === 'FERGANA_STEED') {
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const equipCard = player.hand.splice(cardIndex, 1)[0];
      if (player.equipment.offensiveHorse) room.discardPile.push(player.equipment.offensiveHorse);
      player.equipment.offensiveHorse = equipCard;
      broadcastRoomState(room);

    } else if (cardUsed.name === 'SABOTAGE') {
      if (!targetPlayerId) return socket.emit('game_error', { message: "กรุณาระบุเป้าหมายที่จะทำลาย" });
      const targetPlayer = room.players[targetPlayerId];
      if (!targetPlayer || !targetPlayer.isAlive) {
        return socket.emit('game_error', { message: "เป้าหมายไม่มีผล" });
      }
      const targetZone = data.targetZone || 'HAND';
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const saboCard = player.hand.splice(cardIndex, 1)[0];
      room.discardPile.push(saboCard);
      startNegateWindow(room, { type: 'SABOTAGE', sourceId: playerId, targetId: targetPlayerId, targetZone: targetZone, cardUsed: saboCard });

    } else if (cardUsed.name === 'NIO_SHIELD' || cardUsed.name === 'EIGHT_TRIGRAMS_FORMATION' || cardUsed.name === 'SILVER_LION_HELMET' || cardUsed.name === 'RATTAN_ARMOR') {
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const equipCard = player.hand.splice(cardIndex, 1)[0];
      if (player.equipment.armor) {
        room.discardPile.push(player.equipment.armor);
        if (player.equipment.armor.name === 'SILVER_LION_HELMET') {
          player.hp = Math.min(player.maxHp, player.hp + 1);
        }
      }
      player.equipment.armor = equipCard;
      broadcastRoomState(room);

    } else if (cardUsed.name === 'EX_NIHILO') {
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const exCard = player.hand.splice(cardIndex, 1)[0];
      room.discardPile.push(exCard);
      startNegateWindow(room, { type: 'EX_NIHILO', sourceId: playerId, targetId: targetPlayerId, cardUsed: exCard });

    } else if (cardUsed.name === 'DUEL') {
      if (!targetPlayerId) return socket.emit('game_error', { message: "กรุณาระบุเป้าหมายในการ DUEL" });
      const targetPlayer = room.players[targetPlayerId];
      if (!targetPlayer || !targetPlayer.isAlive) return socket.emit('game_error', { message: "เป้าหมายไม่มีผล" });
      if (hasCharacter(targetPlayer, 'ZHUGE_LIANG') && targetPlayer.hand.length === 0) return socket.emit('game_error', { message: "ขงเบ้งเปิดใช้สกิล เมืองว่างเปล่า ไม่สามารถเป็นเป้าหมาย DUEL ได้" });
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const duelCard = player.hand.splice(cardIndex, 1)[0];
      room.discardPile.push(duelCard);
      startNegateWindow(room, { type: 'DUEL', sourceId: playerId, targetId: targetPlayerId, cardUsed: duelCard });

    } else if (cardUsed.name === 'FIRE_ATTACK') {
      if (!targetPlayerId) return socket.emit('game_error', { message: "กรุณาระบุเป้าหมายสำหรับการโจมตีด้วยไฟ" });
      const targetPlayer = room.players[targetPlayerId];
      if (!targetPlayer || !targetPlayer.isAlive) return socket.emit('game_error', { message: "เป้าหมายไม่มีผล" });
      if (targetPlayer.hand.length === 0) return socket.emit('game_error', { message: "เป้าหมายไม่มีการ์ดบนมือ ไม่สามารถใช้การโจมตีด้วยไฟได้" });
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const fireCard = player.hand.splice(cardIndex, 1)[0];
      room.discardPile.push(fireCard);
      startNegateWindow(room, { type: 'FIRE_ATTACK', sourceId: playerId, targetId: targetPlayerId, cardUsed: fireCard });

    } else if (cardUsed.type === 'DELAYED') {
      let targetPlayerIdForDelayed = targetPlayerId;
      if (cardUsed.name === 'LIGHTNING') targetPlayerIdForDelayed = playerId;
      else if (cardUsed.name === 'INDULGENCE' || cardUsed.name === 'STARVATION') {
        if (targetPlayerIdForDelayed === playerId) return socket.emit('game_error', { message: `ไม่สามารถใช้ ${cardUsed.name} ใส่ตัวเองได้` });
      }
      if (!targetPlayerIdForDelayed) return socket.emit('game_error', { message: "กรุณาเลือกเป้าหมาย" });
      const targetPlayer = room.players[targetPlayerIdForDelayed];
      if (!targetPlayer || !targetPlayer.isAlive) return socket.emit('game_error', { message: "เป้าหมายไม่ถูกต้อง" });
      if (targetPlayer.delayedKitZone && targetPlayer.delayedKitZone.some(c => c.name === cardUsed.name)) return socket.emit('game_error', { message: `เป้าหมายมี ${cardUsed.name} อยู่แล้ว` });
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const card = player.hand.splice(cardIndex, 1)[0];
      startNegateWindow(room, { type: 'DELAYED', sourceId: playerId, targetId: targetPlayerIdForDelayed, cardUsed: card });

    } else if (cardUsed.name === 'PEACH_GARDEN') {
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const aoeCard = player.hand.splice(cardIndex, 1)[0];
      room.discardPile.push(aoeCard);
      startNegateWindow(room, { type: 'PEACH_GARDEN', sourceId: playerId, cardUsed: aoeCard });

    } else if (cardUsed.name === 'BUMPER_HARVEST') {
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const bumperCard = player.hand.splice(cardIndex, 1)[0];
      room.discardPile.push(bumperCard);
      startNegateWindow(room, { type: 'BUMPER_HARVEST', sourceId: playerId, cardUsed: bumperCard });

    } else if (cardUsed.name === 'BORROWED_SWORD') {
      if (!targetPlayerId || !data.secondaryTargetId) return socket.emit('game_error', { message: "กรุณาระบุเป้าหมายทั้งสองคนสำหรับการยืมดาบ" });
      const tB = room.players[targetPlayerId];
      const tC = room.players[data.secondaryTargetId];
      if (!tB || !tB.isAlive || !tC || !tC.isAlive) return socket.emit('game_error', { message: "เป้าหมายไม่มีผล" });
      if (!tB.equipment || !tB.equipment.weapon) return socket.emit('game_error', { message: "ผู้ถูกยืมดาบไม่มีอาวุธ" });
      
      const weaponRange = tB.equipment.weapon.range;
      const actualDistance = calculateDistance(room, targetPlayerId, data.secondaryTargetId);
      if (actualDistance > weaponRange) return socket.emit('game_error', { message: "เป้าหมายที่สองอยู่นอกระยะอาวุธของผู้ถูกยืมดาบ" });
      
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const borrowCard = player.hand.splice(cardIndex, 1)[0];
      room.discardPile.push(borrowCard);
      startNegateWindow(room, { type: 'BORROWED_SWORD', sourceId: playerId, targetId: targetPlayerId, victimId: data.secondaryTargetId, cardUsed: borrowCard });

    } else if (cardUsed.name === 'BARBARIAN_INVASION' || cardUsed.name === 'ARROW_BARRAGE') {
      notifyCardPlayed(room, playerId, cardUsed.name, targetPlayerId);
      const aoeCard = player.hand.splice(cardIndex, 1)[0];
      room.discardPile.push(aoeCard);
      const targets = [];
      const myIdx = room.turnOrder.indexOf(playerId);
      for (let i = 1; i < room.turnOrder.length; i++) {
        const tId = room.turnOrder[(myIdx + i) % room.turnOrder.length];
        const t = room.players[tId];
        if (t.isAlive) targets.push(tId);
      }
      if (targets.length === 0) return broadcastRoomState(room);
      startNegateWindow(room, { type: 'AOE', sourceId: playerId, targets: targets, cardUsed: aoeCard });
    }
  });
  socket.on('pick_bumper_card', (data) => {
    const roomId = data.roomId;
    if (!roomId) return;
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction || room.pendingAction.type !== 'WAITING_FOR_BUMPER_PICK') return;

    const playerId = getPlayerIdBySocket(room, socket.id) || data.playerId;
    if (room.pendingAction.currentPickerId !== playerId) {
      if (!room.players[playerId].isBot) {
         return socket.emit('game_error', { message: "ยังไม่ถึงตาคุณเลือกการ์ด" });
      } else {
         return;
      }
    }

    const cardId = data.cardId;
    const cardIdx = room.bumperHarvestCards.findIndex(c => c.id === cardId);
    if (cardIdx === -1) {
      if (!room.players[playerId].isBot) return socket.emit('game_error', { message: "ไม่มีการ์ดใบนี้ให้เลือก" });
      else return;
    }

    const pickedCard = room.bumperHarvestCards.splice(cardIdx, 1)[0];
    room.players[playerId].hand.push(pickedCard);
    
    room.chat = room.chat || [];
    room.chat.push({ sender: 'System', text: `${room.players[playerId].name} เลือก ${pickedCard.name}(${pickedCard.suit}) จากเสบียงอุดมสมบูรณ์`, time: new Date().toLocaleTimeString('th-TH') });

    // Find next picker
    if (room.bumperHarvestCards.length > 0) {
       const myIdx = room.turnOrder.indexOf(playerId);
       let nextPickerId = null;
       for (let i = 1; i < room.turnOrder.length; i++) {
         const tId = room.turnOrder[(myIdx + i) % room.turnOrder.length];
         const t = room.players[tId];
         if (t.isAlive) {
           nextPickerId = tId;
           break;
         }
       }
       if (nextPickerId) {
         room.pendingAction.currentPickerId = nextPickerId;
         room.pendingAction.timeoutAt = Date.now() + 15000;
         broadcastRoomState(room);
         if (room.players[nextPickerId].isBot) {
            setTimeout(() => handleBotBumperPick(room), 1200);
         }
       } else {
         room.discardPile.push(...room.bumperHarvestCards);
         room.bumperHarvestCards = [];
         room.pendingAction = null;
         resumeAfterAttack(room);
         broadcastRoomState(room);
       }
    } else {
       room.bumperHarvestCards = [];
       room.pendingAction = null;
       resumeAfterAttack(room);
       broadcastRoomState(room);
    }
  });
  socket.on('end_turn', (data) => {
    const roomId = data.roomId;
    if (!roomId) return;
    const room = gameRooms[roomId];
    if (!room) return;

    const playerId = getPlayerIdBySocket(room, socket.id);
    if (room.turnOrder[room.currentTurnIndex] !== playerId) return;

    room.currentPhase = 'DISCARD';
    checkDiscardRequirement(room);
  });

  socket.on('discard_cards', ({ roomId, cardIds }) => {
    const room = gameRooms[roomId];
    if (!room) return;

    const playerId = getPlayerIdBySocket(room, socket.id);
    if (room.turnOrder[room.currentTurnIndex] !== playerId) return;
    if (room.currentPhase !== 'DISCARD') return;

    const player = room.players[playerId];
    const hasAll = cardIds.every(cid => player.hand.some(c => c.id === cid));
    if (!hasAll) return socket.emit('game_error', { message: "ไม่พบการ์ดที่ระบุในกองมือ" });

    const requiredDiscard = player.hand.length - player.hp;
    if (cardIds.length !== requiredDiscard) {
      return socket.emit('game_error', { message: `กรุณาทิ้งการ์ดทั้งหมด ${requiredDiscard} ใบ` });
    }

    cardIds.forEach(cid => {
      const idx = player.hand.findIndex(c => c.id === cid);
      const c = player.hand.splice(idx, 1)[0];
      room.discardPile.push(c);
    });

    endPlayerTurn(room);
  });

  socket.on('resolve_pending', (data) => {
    const roomId = data.roomId;
    if (!roomId) return;
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction) return;

    const playerId = getPlayerIdBySocket(room, socket.id) || data.playerId;
    const pending = room.pendingAction;
    
    let expectedTargetId = pending.targetPlayerId;
    if (pending.type === 'WAITING_FOR_AOE') {
      expectedTargetId = pending.targets[pending.currentTargetIndex];
    }
    
    if (playerId !== expectedTargetId) return;

    const targetPlayer = room.players[playerId];
    const response = data.response || data.action;
    const cardId = data.cardId || (data.payload && data.payload.cardId);
    const damage = pending.damage || 1;

    if (response === 'DODGE' || response === 'USE_CARD') {
      if (!cardId) return socket.emit('game_error', { message: "กรุณาระบุการ์ดป้องกัน" });
      const cardIdx = targetPlayer.hand.findIndex(c => c.id === cardId);
      if (cardIdx === -1) return socket.emit('game_error', { message: "การ์ดไม่อยู่บนมือ" });
      
      const card = targetPlayer.hand[cardIdx];
      let isValid = false;

      if (pending && pending.type === 'DIAO_CHAN_SEDUCTION') {
        isValid = card.name === 'SLASH';
        if (!isValid && hasCharacter(targetPlayer, 'ZHAO_YUN')) {
          isValid = card.name === 'DODGE' || data.playAs === 'SLASH';
        }
      } else if (pending && pending.type === 'WAITING_FOR_SLASH_DUEL') {
        isValid = card.name === 'SLASH';
        if (!isValid && hasCharacter(targetPlayer, 'GUAN_YU')) {
          isValid = (card.suit === 'HEART' || card.suit === 'DIAMOND');
        } else if (!isValid && hasCharacter(targetPlayer, 'ZHAO_YUN')) {
          isValid = card.name === 'DODGE' || data.playAs === 'SLASH';
        }
      } else if (pending && pending.type === 'WAITING_FOR_AOE') {
        if (pending.aoeType === 'BARBARIAN_INVASION') {
          isValid = card.name === 'SLASH';
          if (!isValid && hasCharacter(targetPlayer, 'GUAN_YU')) isValid = (card.suit === 'HEART' || card.suit === 'DIAMOND');
          if (!isValid && hasCharacter(targetPlayer, 'ZHAO_YUN')) isValid = card.name === 'DODGE' || data.playAs === 'SLASH';
        } else if (pending.aoeType === 'ARROW_BARRAGE') {
          isValid = card.name === 'DODGE';
          if (!isValid && (hasCharacter(targetPlayer, 'ZHEN_JI') || hasCharacter(targetPlayer, 'LADY_ZHEN'))) isValid = card.suit === 'SPADE' || card.suit === 'CLUB';
          if (!isValid && hasCharacter(targetPlayer, 'ZHAO_YUN')) isValid = card.name === 'SLASH' || data.playAs === 'DODGE';
        }
      } else if (pending && pending.type === 'ZHOU_YU_DISCORD') {
        const color = (card.suit === 'HEART' || card.suit === 'DIAMOND') ? 'RED' : 'BLACK';
        isValid = color === pending.requiredColor;
      } else {
        isValid = card.name === 'DODGE';
        if (!isValid && (hasCharacter(targetPlayer, 'ZHEN_JI') || hasCharacter(targetPlayer, 'LADY_ZHEN'))) {
          isValid = card.suit === 'SPADE' || card.suit === 'CLUB';
        } else if (!isValid && hasCharacter(targetPlayer, 'ZHAO_YUN')) {
          isValid = card.name === 'SLASH' || data.playAs === 'DODGE';
        }
      }

      if (!isValid) return socket.emit('game_error', { message: "การ์ดไม่ถูกต้อง" });

      targetPlayer.hand.splice(cardIdx, 1);
      room.discardPile.push(card);

      if (pending && pending.type === 'WAITING_FOR_SLASH_DUEL') {
        pending.currentPlayerToSlash = pending.currentPlayerToSlash === pending.sourcePlayerId 
          ? pending.targetPlayerId 
          : pending.sourcePlayerId;
        
        pending.timeoutAt = Date.now() + 15000;
        broadcastRoomState(room);
        
        if (room.players[pending.currentPlayerToSlash].isBot) {
          setTimeout(() => handleBotDuelSlash(room), 1200);
        }
        return;
      }
      
      if (pending && pending.type === 'WAITING_FOR_AOE') {
        pending.currentTargetIndex++;
        if (pending.currentTargetIndex >= pending.targets.length) {
          room.pendingAction = null;
          broadcastRoomState(room);
          resumeAfterAttack(room);
        } else {
          pending.timeoutAt = Date.now() + 15000;
          broadcastRoomState(room);
          if (room.players[pending.targets[pending.currentTargetIndex]].isBot) {
            setTimeout(() => handleBotAOE(room), 1200);
          } else {
            setTimeout(() => {
              if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE' && room.pendingAction.currentTargetIndex === pending.currentTargetIndex) {
                const tId = pending.targets[pending.currentTargetIndex];
                const cardUsedForTimeout = getCardById(room, pending.cardUsedId);
                dealDamage(room, tId, 1, cardUsedForTimeout, pending.sourcePlayerId);
                if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE') {
                  handleBotAOE(room);
                } else {
                  broadcastRoomState(room);
                }
              }
            }, 15000);
          }
        }
        return;
      }

      if (pending && (pending.type === 'DIAO_CHAN_SEDUCTION' || pending.type === 'ZHOU_YU_DISCORD')) {
        room.pendingAction = null;
        broadcastRoomState(room);
        resumeAfterAttack(room);
      } else {
        pending.dodgeNeeded = (pending.dodgeNeeded || 1) - 1;
        if (pending.dodgeNeeded <= 0) {
          // DODGE SUCCEEDED - Check for After Dodge hooks
          const attacker = pending.sourcePlayerId ? room.players[pending.sourcePlayerId] : null;
          if (attacker && attacker.equipment && attacker.equipment.weapon) {
            const wName = attacker.equipment.weapon.name;
            const equipCount = Object.values(attacker.equipment).filter(v=>v).length;
            if (wName === 'GREEN_DRAGON_BLADE' && attacker.hand.length > 0) {
              room.pendingAction = {
                type: 'WAITING_FOR_GREEN_DRAGON',
                sourcePlayerId: attacker.id,
                targetPlayerId: pending.targetPlayerId,
                timeoutAt: Date.now() + 15000
              };
              broadcastRoomState(room);
              return;
            } else if (wName === 'ROCK_CLEAVING_AXE' && (attacker.hand.length + equipCount) >= 3) {
              room.pendingAction = {
                type: 'WAITING_FOR_AXE_DISCARD',
                sourcePlayerId: attacker.id,
                targetPlayerId: pending.targetPlayerId,
                originalDamage: pending.damage,
                damageType: pending.damageType || 'NORMAL',
                cardUsedId: pending.cardUsedId,
                timeoutAt: Date.now() + 15000
              };
              broadcastRoomState(room);
              return;
            } else if (wName === 'TWO_BLADED_TRIDENT' && attacker.hand.length >= 1) {
              room.pendingAction = {
                type: 'WAITING_FOR_TRIDENT_DISCARD',
                sourcePlayerId: attacker.id,
                targetPlayerId: pending.targetPlayerId,
                originalDamage: pending.damage,
                damageType: pending.damageType || 'NORMAL',
                cardUsedId: pending.cardUsedId,
                timeoutAt: Date.now() + 15000
              };
              broadcastRoomState(room);
              return;
            } else if (wName === 'YIN_YANG_SWORDS') {
              const attackerHero = allHeroes.find(h => {
                const nameUpper = (h.title || h.name).toUpperCase().replace(/[^A-Z0-9]/g, '_');
                return nameUpper === attacker.character;
              });
              const targetHero = allHeroes.find(h => {
                const nameUpper = (h.title || h.name).toUpperCase().replace(/[^A-Z0-9]/g, '_');
                return nameUpper === targetPlayer.character;
              });
              const aGen = attackerHero ? (attackerHero.gender || 'MALE') : 'MALE';
              const tGen = targetHero ? (targetHero.gender || 'MALE') : 'MALE';
              
              if (aGen !== tGen) {
                if (targetPlayer.hand.length === 0) {
                  const drawn = drawCards(room, 1);
                  attacker.hand.push(...drawn);
                  room.pendingAction = null;
                  resumeAfterAttack(room);
                  broadcastRoomState(room);
                  return;
                } else {
                  room.pendingAction = {
                    type: 'WAITING_FOR_YINYANG_CHOICE',
                    sourcePlayerId: attacker.id,
                    targetPlayerId: targetPlayer.id,
                    timeoutAt: Date.now() + 15000
                  };
                  broadcastRoomState(room);
                  
                  if (targetPlayer.isBot) {
                    setTimeout(() => {
                      if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_YINYANG_CHOICE') {
                        if (Math.random() > 0.5) {
                          const rIdx = Math.floor(Math.random() * targetPlayer.hand.length);
                          room.discardPile.push(targetPlayer.hand.splice(rIdx, 1)[0]);
                        } else {
                          const drawn = drawCards(room, 1);
                          room.players[room.pendingAction.sourcePlayerId].hand.push(...drawn);
                        }
                        room.pendingAction = null;
                        resumeAfterAttack(room);
                        broadcastRoomState(room);
                      }
                    }, 1200);
                  }
                  return;
                }
              }
            }
          }
          // No weapon hooks matched, just end attack
          room.pendingAction = null;
          broadcastRoomState(room);
          resumeAfterAttack(room);
        } else {
          broadcastRoomState(room);
          if (targetPlayer.isBot) {
            setTimeout(() => {
              handleBotDodge(room, playerId, damage);
            }, 600);
          }
        }
      }

    } else if (response === 'TAKE_DAMAGE' || response === 'PASS') {
      const pending = room.pendingAction;
      if (pending && pending.type === 'WAITING_FOR_SLASH_DUEL') {
        const damagedPlayerId = pending.currentPlayerToSlash;
        const attackerId = damagedPlayerId === pending.sourcePlayerId ? pending.targetPlayerId : pending.sourcePlayerId;
        const cardUsed = getCardById(room, pending.cardUsedId);
        room.pendingAction = null;
        dealDamage(room, damagedPlayerId, 1, cardUsed, attackerId);
        if (!room.pendingAction) resumeAfterAttack(room);
      } else if (pending && pending.type === 'WAITING_FOR_AOE') {
        const attackerId = pending.sourcePlayerId;
        const cardUsed = getCardById(room, pending.cardUsedId);
        dealDamage(room, playerId, 1, cardUsed, attackerId);

        if (room.pendingAction && room.pendingAction.type === 'DYING') {
          // Dying phase takes over
        } else {
          pending.currentTargetIndex++;
          if (pending.currentTargetIndex >= pending.targets.length) {
            room.pendingAction = null;
            resumeAfterAttack(room);
          } else {
            pending.timeoutAt = Date.now() + 15000;
            room.pendingAction = pending;
            if (room.players[pending.targets[pending.currentTargetIndex]].isBot) {
              handleBotAOE(room);
            } else {
              setTimeout(() => {
                if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE' && room.pendingAction.currentTargetIndex === pending.currentTargetIndex) {
                  const tId = pending.targets[pending.currentTargetIndex];
                  const cardUsedForTimeout = getCardById(room, pending.cardUsedId);
                  dealDamage(room, tId, 1, cardUsedForTimeout, pending.sourcePlayerId);
                  if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_AOE') {
                    handleBotAOE(room);
                  } else {
                    broadcastRoomState(room);
                  }
                }
              }, 15000);
            }
          }
        }
      } else {
        const attackerId = pending ? pending.sourcePlayerId : null;
        const cardUsed = pending ? getCardById(room, pending.cardUsedId) : null;
        const damage = pending ? pending.damage : 1;
        const savedDamageType = pending ? (pending.damageType || 'NORMAL') : 'NORMAL';
        
        // Check for FROST_SWORD On Hit hook
        const attacker = attackerId ? room.players[attackerId] : null;
        const target = room.players[playerId];
        if (attacker && attacker.equipment && attacker.equipment.weapon && attacker.equipment.weapon.name === 'FROST_SWORD') {
          const targetCardCount = (target.hand ? target.hand.length : 0) + (target.equipment ? Object.values(target.equipment).filter(v=>v).length : 0);
          if (targetCardCount > 0) {
            room.pendingAction = {
              type: 'WAITING_FOR_FROST_DISCARD',
              sourcePlayerId: attacker.id,
              targetPlayerId: target.id,
              originalDamage: damage,
              damageType: savedDamageType,
              cardUsedId: pending ? pending.cardUsedId : null,
              timeoutAt: Date.now() + 15000
            };
            broadcastRoomState(room);
            return;
          }
        }

        room.pendingAction = null;
        dealDamage(room, playerId, damage, cardUsed, attackerId, savedDamageType);
        if (!room.pendingAction) resumeAfterAttack(room);
      }
    }

    broadcastRoomState(room);

    // Resume bot turn if current player is bot
    const currentId = room.turnOrder[room.currentTurnIndex];
    const currentP = room.players[currentId];
    if (currentP && currentP.isBot && room.status === 'PLAYING') {
      setTimeout(() => {
        runBotTurn(room, currentId);
      }, 1000);
    }
  });

  socket.on('trigger_luo_river', ({ roomId }) => {
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction || room.pendingAction.type !== 'LUO_RIVER') return;
    
    const playerId = getPlayerIdBySocket(room, socket.id);
    if (playerId !== room.pendingAction.targetPlayerId) return;
    
    const pending = room.pendingAction;
    const player = room.players[playerId];
    const drawn = drawCards(room, 1);
    
    if (drawn.length > 0) {
      const card = drawn[0];
      if (card.suit === 'SPADE' || card.suit === 'CLUB') {
        player.hand.push(card);
        console.log(`${player.name} Luo River rolled: ${card.suit} (Black)`);
        broadcastRoomState(room);
      } else {
        room.discardPile.push(card);
        console.log(`${player.name} Luo River rolled: ${card.suit} (Red). Skill ends.`);
        room.pendingAction = null;
        executeDrawPhase(room, player, pending.skipDrawPhase, pending.skipPlayPhase);
      }
    }
  });

  socket.on('skip_luo_river', ({ roomId }) => {
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction || room.pendingAction.type !== 'LUO_RIVER') return;
    
    const playerId = getPlayerIdBySocket(room, socket.id);
    if (playerId !== room.pendingAction.targetPlayerId) return;
    
    const pending = room.pendingAction;
    const player = room.players[playerId];
    room.pendingAction = null;
    executeDrawPhase(room, player, pending.skipDrawPhase, pending.skipPlayPhase);
  });

  socket.on('use_peach_dying', ({ roomId, usePeach }) => {
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction || room.pendingAction.type !== 'DYING') return;
    
    const pending = room.pendingAction;
    const askerId = room.turnOrder[pending.currentAskerIdx];
    
    const playerId = getPlayerIdBySocket(room, socket.id);
    if (playerId !== askerId) return;
    
    const asker = room.players[askerId];
    const dyingPlayer = room.players[pending.targetPlayerId];
    
    if (usePeach) {
      const peachIdx = asker.hand.findIndex(c => c.name === 'PEACH');
      if (peachIdx === -1) return socket.emit('game_error', { message: "คุณไม่มีการ์ด PEACH" });
      
      const card = asker.hand.splice(peachIdx, 1)[0];
      room.discardPile.push(card);
      dyingPlayer.hp += 1;
      pending.peachNeeded -= 1;
      
      console.log(`${asker.name} used PEACH to save ${dyingPlayer.name}`);
      
      if (pending.peachNeeded <= 0) {
        room.pendingAction = null;
        console.log(`${dyingPlayer.name} is saved!`);
        broadcastRoomState(room);
        resumeAfterAttack(room);
      } else {
        broadcastRoomState(room);
      }
    } else {
      advanceDyingAsker(room);
    }
  });

  socket.on('use_sun_quan_skill', ({ roomId, cardIds }) => {
    const room = gameRooms[roomId];
    if (!room) return;
    
    const playerId = getPlayerIdBySocket(room, socket.id);
    if (!playerId) return;
    
    const player = room.players[playerId];
    if (!hasCharacter(player, 'SUN_QUAN') || player.skillResignationUsed || room.currentPhase !== 'PLAY') return;
    
    let discardedCount = 0;
    cardIds.forEach(cid => {
      const idx = player.hand.findIndex(c => c.id === cid);
      if (idx !== -1) {
        const card = player.hand.splice(idx, 1)[0];
        room.discardPile.push(card);
        discardedCount += 1;
      }
    });
    
    if (discardedCount > 0) {
      const drawn = drawCards(room, discardedCount);
      player.hand.push(...drawn);
      player.skillResignationUsed = true;
      console.log(`Sun Quan used Resignation: discarded ${discardedCount} cards and drawn ${discardedCount} new cards.`);
      broadcastRoomState(room);
    }
  });

  // ==========================================
  // BORROWED SWORD SKILLS (Phase 2 - Group 6)
  // ==========================================
  socket.on('resolve_borrowed_sword', (data) => {
    const roomId = data.roomId;
    if (!roomId) return;
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction || room.pendingAction.type !== 'WAITING_FOR_BORROW_SLASH') return;

    const playerId = getPlayerIdBySocket(room, socket.id) || data.playerId;
    if (playerId !== room.pendingAction.targetPlayerId) return;

    const playerB = room.players[playerId]; // B
    const playerA = room.players[room.pendingAction.sourcePlayerId]; // A
    const playerC = room.players[room.pendingAction.victimId]; // C

    if (data.cardId) {
      // B chose to use SLASH
      const cardIdx = playerB.hand.findIndex(c => c.id === data.cardId);
      if (cardIdx !== -1) {
        const slashCard = playerB.hand.splice(cardIdx, 1)[0];
        room.discardPile.push(slashCard);
        notifyCardPlayed(room, playerId, 'SLASH', room.pendingAction.victimId);
        
        // Treat as a normal slash attack from B to C
        const damage = playerB.wineActive ? 2 : 1;
        playerB.wineActive = false;
        
        room.pendingAction = {
          type: 'WAITING_FOR_DODGE',
          sourcePlayerId: playerId, // B is now the attacker
          targetPlayerId: room.pendingAction.victimId, // C
          damage: damage,
          cardUsedId: slashCard.id,
          originalAttackerId: room.pendingAction.sourcePlayerId, // A (for tracking if needed)
          timeoutAt: Date.now() + 15000,
          dodgeNeeded: (slashCard.name === 'SLASH' && hasCharacter(playerB, 'LU_BU')) ? 2 : 1,
          attackType: (slashCard.name === 'THUNDER_ATTACK') ? 'THUNDER' : (playerB.equipment && playerB.equipment.weapon && playerB.equipment.weapon.name === 'FEATHERED_FAN') ? 'FIRE' : 'NORMAL'
        };
        broadcastRoomState(room);
        if (playerC && playerC.isBot) {
           setTimeout(() => handleBotDodge(room), 1200);
        }
        return;
      }
    }

    // B chose to pass or didn't have SLASH -> A steals B's weapon
    if (playerB.equipment && playerB.equipment.weapon) {
      const weapon = playerB.equipment.weapon;
      playerB.equipment.weapon = null;
      playerA.hand.push(weapon);
      notifyCardPlayed(room, room.pendingAction.sourcePlayerId, `ขโมย ${weapon.name} จาก ${playerB.name}`);
    }
    
    room.pendingAction = null;
    resumeAfterAttack(room);
    broadcastRoomState(room);
  });

  // ==========================================
  // FIRE ATTACK SKILLS (Phase 2 - Group 2)
  // ==========================================
  socket.on('resolve_fire_reveal', (data) => {
    const roomId = data.roomId;
    if (!roomId) return;
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction || room.pendingAction.type !== 'WAITING_FOR_FIRE_REVEAL') return;

    const playerId = getPlayerIdBySocket(room, socket.id);
    if (playerId !== room.pendingAction.targetPlayerId) return;

    const target = room.players[playerId];
    const cardId = data.cardId;
    const revealedCard = target.hand.find(c => c.id === cardId);

    if (!revealedCard) {
      return socket.emit('game_error', { message: "ไม่พบการ์ดที่เลือก" });
    }

    // Broadcast the revealed card to everyone
    room.chat = room.chat || [];
    room.chat.push({
      sender: 'System',
      text: `${target.name} เปิดเผยการ์ด ${revealedCard.name} (${revealedCard.suit})`,
      time: new Date().toLocaleTimeString('th-TH')
    });

    // Change state to wait for attacker to match
    room.pendingAction = {
      type: 'WAITING_FOR_FIRE_MATCH',
      sourcePlayerId: room.pendingAction.sourcePlayerId,
      targetPlayerId: playerId,
      requiredSuit: revealedCard.suit,
      revealedCard: revealedCard,
      timeoutAt: Date.now() + 15000
    };

    broadcastRoomState(room);
  });

  socket.on('resolve_fire_match', (data) => {
    const roomId = data.roomId;
    if (!roomId) return;
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction || room.pendingAction.type !== 'WAITING_FOR_FIRE_MATCH') return;

    const playerId = getPlayerIdBySocket(room, socket.id);
    if (playerId !== room.pendingAction.sourcePlayerId) return;

    const attacker = room.players[playerId];
    
    if (data.cancel) {
      // Attacker canceled
      room.pendingAction = null;
      resumeAfterAttack(room);
      broadcastRoomState(room);
      return;
    }

    const cardId = data.cardId;
    const matchIdx = attacker.hand.findIndex(c => c.id === cardId);
    
    if (matchIdx === -1) {
      return socket.emit('game_error', { message: "ไม่พบการ์ดที่เลือก" });
    }
    
    const matchedCard = attacker.hand[matchIdx];
    if (matchedCard.suit !== room.pendingAction.requiredSuit) {
      return socket.emit('game_error', { message: `ต้องทิ้งการ์ดดอก ${room.pendingAction.requiredSuit} เท่านั้น` });
    }

    // Discard the matching card
    room.discardPile.push(attacker.hand.splice(matchIdx, 1)[0]);
    
    const targetPlayerId = room.pendingAction.targetPlayerId;
    room.pendingAction = null;
    
    // Deal Fire Damage
    dealDamage(room, targetPlayerId, 1, null, playerId, 'FIRE');
    
    if (!room.pendingAction) resumeAfterAttack(room);
    broadcastRoomState(room);
  });

  // ==========================================
  // YIN-YANG SWORDS CHOICE (Phase 2 - Group 3)
  // ==========================================
  socket.on('resolve_yinyang_choice', (data) => {
    const roomId = data.roomId;
    if (!roomId) return;
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction || room.pendingAction.type !== 'WAITING_FOR_YINYANG_CHOICE') return;

    const playerId = getPlayerIdBySocket(room, socket.id);
    if (playerId !== room.pendingAction.targetPlayerId) return;

    const target = room.players[playerId];
    const attacker = room.players[room.pendingAction.sourcePlayerId];

    if (data.action === 'DISCARD') {
      const cardIdx = target.hand.findIndex(c => c.id === data.cardId);
      if (cardIdx !== -1) {
        room.discardPile.push(target.hand.splice(cardIdx, 1)[0]);
      }
    } else if (data.action === 'DRAW') {
      const drawn = drawCards(room, 1);
      attacker.hand.push(...drawn);
    }

    room.pendingAction = null;
    resumeAfterAttack(room);
    broadcastRoomState(room);
  });

  // ==========================================
  // WEAPON SKILLS (Phase 2 - Group 1)
  // ==========================================
  socket.on('resolve_weapon_skill', (data) => {
    const roomId = data.roomId;
    if (!roomId) return;
    const room = gameRooms[roomId];
    if (!room || !room.pendingAction) return;

    const playerId = getPlayerIdBySocket(room, socket.id);
    if (playerId !== room.pendingAction.sourcePlayerId) return;
    
    const pending = room.pendingAction;
    const attacker = room.players[playerId];
    const target = room.players[pending.targetPlayerId];
    
    if (!data.accept) {
       if (pending.type === 'WAITING_FOR_FROST_DISCARD') {
          room.pendingAction = null;
          dealDamage(room, target.id, pending.originalDamage, getCardById(room, pending.cardUsedId), attacker.id, pending.damageType);
          if (!room.pendingAction) resumeAfterAttack(room);
       } else if (['WAITING_FOR_GREEN_DRAGON', 'WAITING_FOR_AXE_DISCARD', 'WAITING_FOR_TRIDENT_DISCARD'].includes(pending.type)) {
          room.pendingAction = null;
          resumeAfterAttack(room);
       }
       broadcastRoomState(room);
       return;
    }

    if (pending.type === 'WAITING_FOR_GREEN_DRAGON') {
       if (!data.cardIds || data.cardIds.length !== 1) return;
       const idx = attacker.hand.findIndex(c => c.id === data.cardIds[0]);
       if (idx === -1) return;
       const slashCard = attacker.hand[idx];
       if (slashCard.name !== 'SLASH' && slashCard.name !== 'THUNDER_ATTACK') return; // Strictly SLASH or THUNDER
       
       attacker.hand.splice(idx, 1);
       notifyCardPlayed(room, attacker.id, slashCard.name, target.id);
       
       room.pendingAction = {
         type: 'WAITING_FOR_DODGE',
         sourcePlayerId: attacker.id,
         targetPlayerId: target.id,
         cardUsedId: slashCard.id,
         damage: 1, // Followup slash has 1 damage (wine doesn't carry over normally)
         dodgeNeeded: hasCharacter(attacker, 'LV_BU') ? 2 : 1,
         damageType: slashCard.name === 'THUNDER_ATTACK' ? 'THUNDER' : 'NORMAL',
         timeoutAt: Date.now() + 15000
       };
       
       if (attacker.equipment && attacker.equipment.weapon && attacker.equipment.weapon.name === 'FEATHERED_FAN') {
         room.pendingAction.damageType = 'FIRE';
       }

       broadcastRoomState(room);
       if (target.isBot) {
         setTimeout(() => handleBotDodge(room, target.id, 1), 1200);
       } else {
         setTimeout(() => {
           if (room.pendingAction && room.pendingAction.cardUsedId === slashCard.id) {
             const p = room.pendingAction;
             room.pendingAction = null;
             dealDamage(room, p.targetPlayerId, p.damage, getCardById(room, p.cardUsedId), p.sourcePlayerId, p.damageType);
             if (!room.pendingAction) resumeAfterAttack(room);
             broadcastRoomState(room);
           }
         }, 15000);
       }
       return;
    }

    if (pending.type === 'WAITING_FOR_AXE_DISCARD' || pending.type === 'WAITING_FOR_TRIDENT_DISCARD') {
       const needed = pending.type === 'WAITING_FOR_AXE_DISCARD' ? 2 : 1;
       if (!data.cardIds || data.cardIds.length !== needed) return;
       
       data.cardIds.forEach(cid => {
         let c = null;
         const hIdx = attacker.hand.findIndex(x => x.id === cid);
         if (hIdx !== -1) {
           c = attacker.hand.splice(hIdx, 1)[0];
         } else {
           Object.keys(attacker.equipment).forEach(k => {
             if (attacker.equipment[k] && attacker.equipment[k].id === cid) {
                c = attacker.equipment[k];
                attacker.equipment[k] = null;
             }
           });
         }
         if (c) room.discardPile.push(c);
       });
       
       room.pendingAction = null;
       dealDamage(room, target.id, pending.originalDamage, getCardById(room, pending.cardUsedId), attacker.id, pending.damageType);
       if (!room.pendingAction) resumeAfterAttack(room);
       broadcastRoomState(room);
       return;
    }

    if (pending.type === 'WAITING_FOR_FROST_DISCARD') {
       let droppedCount = 0;
       while (droppedCount < 2) {
          const tCards = [];
          if (target.hand) tCards.push(...target.hand.map((c, i) => ({type: 'hand', idx: i})));
          Object.keys(target.equipment).forEach(k => {
             if (target.equipment[k]) tCards.push({type: 'equip', key: k});
          });
          if (tCards.length === 0) break;
          const r = tCards[Math.floor(Math.random() * tCards.length)];
          if (r.type === 'hand') {
             room.discardPile.push(target.hand.splice(r.idx, 1)[0]);
          } else {
             room.discardPile.push(target.equipment[r.key]);
             target.equipment[r.key] = null;
          }
          droppedCount++;
       }
       console.log(`${attacker.name} used Frost Sword, discarded ${droppedCount} cards from ${target.name}`);
       room.pendingAction = null;
       if (!room.pendingAction) resumeAfterAttack(room);
       broadcastRoomState(room);
       return;
    }
  });

  socket.on('add_bot', ({ roomId }) => {
    const room = gameRooms[roomId];
    if (!room || room.status !== 'LOBBY') return;
    
    const playerId = getPlayerIdBySocket(room, socket.id);
    if (!playerId) return;
    const player = room.players[playerId];
    const isHost = (room.hostId === socket.id || playerId === 'p1');
    if (!isHost) return;
    
    const currentCount = room.turnOrder.length;
    if (currentCount >= 10) {
      return socket.emit('game_error', { message: "จำนวนผู้เล่นเต็มแล้ว (สูงสุด 10 คน)" });
    }
    
    const botId = 'BOT_' + Math.random().toString(36).substr(2, 4).toUpperCase();
    const botNames = ['โจโฉ', 'เล่าปี่', 'ซุนกวน', 'กวนอู', 'เตียวหุย', 'จูล่ง', 'จิวยี่', 'ลิโป้', 'เตียวเสี้ยน', 'สุมาอี้'];
    const randomName = botNames[Math.floor(Math.random() * botNames.length)];
    
    room.players[botId] = {
      id: botId,
      socketId: null,
      name: `บอท ${randomName} (Bot)`,
      character: '',
      role: '',
      isHost: false,
      isAlive: true,
      hp: 4,
      maxHp: 4,
      hand: [],
      equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null },
      delayedKitZone: [],
      wineActive: false,
      isBot: true
    };
    
    room.turnOrder.push(botId);
    console.log(`Bot added to room ${roomId}: ${botId}`);
    broadcastRoomState(room);
  });

  socket.on('remove_bot', ({ roomId }) => {
    const room = gameRooms[roomId];
    if (!room || room.status !== 'LOBBY') return;
    
    const playerId = getPlayerIdBySocket(room, socket.id);
    if (!playerId) return;
    const player = room.players[playerId];
    const isHost = (room.hostId === socket.id || playerId === 'p1');
    if (!isHost) return;
    
    let botIdToRemove = null;
    for (let i = room.turnOrder.length - 1; i >= 0; i--) {
      const pid = room.turnOrder[i];
      if (room.players[pid].isBot) {
        botIdToRemove = pid;
        break;
      }
    }
    
    if (botIdToRemove) {
      delete room.players[botIdToRemove];
      room.turnOrder = room.turnOrder.filter(pid => pid !== botIdToRemove);
      console.log(`Bot removed from room ${roomId}: ${botIdToRemove}`);
      broadcastRoomState(room);
    } else {
      socket.emit('game_error', { message: "ไม่มีบอทให้ลบในห้องนี้" });
    }
  });

  socket.on('use_liu_bei_skill', ({ roomId, targetPlayerId, cardIds }) => {
    const room = gameRooms[roomId];
    if (!room || room.status !== 'PLAYING') return;
    
    const playerId = getPlayerIdBySocket(room, socket.id);
    if (!playerId) return;
    const player = room.players[playerId];
    if (!hasCharacter(player, 'LIU_BEI') || room.turnOrder[room.currentTurnIndex] !== playerId || room.currentPhase !== 'PLAY') return;
    
    const targetPlayer = room.players[targetPlayerId];
    if (!targetPlayer || !targetPlayer.isAlive || targetPlayerId === playerId) return;
    
    let hasAll = true;
    cardIds.forEach(cid => {
      if (!player.hand.some(c => c.id === cid)) hasAll = false;
    });
    if (!hasAll) return socket.emit('game_error', { message: "ไม่พบการ์ดที่ระบุบนมือ" });
    
    const transferred = [];
    cardIds.forEach(cid => {
      const idx = player.hand.findIndex(c => c.id === cid);
      const card = player.hand.splice(idx, 1)[0];
      targetPlayer.hand.push(card);
      transferred.push(card.name);
    });
    
    player.cardsGivenThisTurn = (player.cardsGivenThisTurn || 0) + cardIds.length;
    console.log(`${player.name} gave ${cardIds.length} cards to ${targetPlayer.name}`);
    
    if (player.cardsGivenThisTurn >= 2 && !player.liuBeiHealedThisTurn) {
      player.hp = Math.min(player.maxHp, player.hp + 1);
      player.liuBeiHealedThisTurn = true;
      console.log(`${player.name} (Liu Bei) recovered 1 HP. HP: ${player.hp}`);
    }
    
    broadcastRoomState(room);
  });

  socket.on('use_diao_chan_skill', ({ roomId, targetPlayerId, cardId }) => {
    const room = gameRooms[roomId];
    if (!room || room.status !== 'PLAYING') return;
    
    const playerId = getPlayerIdBySocket(room, socket.id);
    if (!playerId) return;
    const player = room.players[playerId];
    if (!hasCharacter(player, 'DIAO_CHAN') || room.turnOrder[room.currentTurnIndex] !== playerId || room.currentPhase !== 'PLAY' || player.skillDiaoChanUsed) return;
    
    const targetPlayer = room.players[targetPlayerId];
    if (!targetPlayer || !targetPlayer.isAlive || targetPlayerId === playerId) return;
    
    const cardIdx = player.hand.findIndex(c => c.id === cardId);
    if (cardIdx === -1) return socket.emit('game_error', { message: "ไม่พบการ์ดที่จะทิ้งบนมือ" });
    
    const discarded = player.hand.splice(cardIdx, 1)[0];
    room.discardPile.push(discarded);
    
    player.skillDiaoChanUsed = true;
    console.log(`${player.name} (Diao Chan) Seduction against ${targetPlayer.name}`);
    notifyCardPlayed(room, playerId, 'สกิล Seduction', targetPlayerId);
    
    const timeoutMs = 15000;
    room.pendingAction = {
      type: 'DIAO_CHAN_SEDUCTION',
      sourcePlayerId: playerId,
      targetPlayerId: targetPlayerId,
      cardUsedId: cardId,
      damage: 1,
      timeoutAt: Date.now() + timeoutMs
    };
    
    broadcastRoomState(room);
    
    if (targetPlayer.isBot) {
      setTimeout(() => {
        handleBotSeduction(room, targetPlayerId);
      }, 1200);
    } else {
      setTimeout(() => {
        if (room.pendingAction && room.pendingAction.cardUsedId === cardId && room.pendingAction.type === 'DIAO_CHAN_SEDUCTION') {
          room.pendingAction = null;
          dealDamage(room, targetPlayerId, 1, null, playerId);
          if (!room.pendingAction) resumeAfterAttack(room);
          broadcastRoomState(room);
        }
      }, timeoutMs);
    }
  });

  socket.on('use_zhou_yu_skill', ({ roomId, targetPlayerId, cardId }) => {
    const room = gameRooms[roomId];
    if (!room || room.status !== 'PLAYING') return;
    
    const playerId = getPlayerIdBySocket(room, socket.id);
    if (!playerId) return;
    const player = room.players[playerId];
    if (!hasCharacter(player, 'ZHOU_YU') || room.turnOrder[room.currentTurnIndex] !== playerId || room.currentPhase !== 'PLAY' || player.skillZhouYuUsed) return;
    
    const targetPlayer = room.players[targetPlayerId];
    if (!targetPlayer || !targetPlayer.isAlive || targetPlayerId === playerId) return;
    
    const cardIdx = player.hand.findIndex(c => c.id === cardId);
    if (cardIdx === -1) return socket.emit('game_error', { message: "ไม่พบการ์ดที่จะทิ้งบนมือ" });
    
    const discarded = player.hand.splice(cardIdx, 1)[0];
    room.discardPile.push(discarded);
    
    const suitColor = (discarded.suit === 'HEART' || discarded.suit === 'DIAMOND') ? 'RED' : 'BLACK';
    player.skillZhouYuUsed = true;
    console.log(`${player.name} (Zhou Yu) Sow Discord against ${targetPlayer.name}`);
    
    const timeoutMs = 15000;
    room.pendingAction = {
      type: 'ZHOU_YU_DISCORD',
      sourcePlayerId: playerId,
      targetPlayerId: targetPlayerId,
      cardUsedId: cardId,
      requiredColor: suitColor,
      damage: 1,
      timeoutAt: Date.now() + timeoutMs
    };
    
    broadcastRoomState(room);
    
    if (targetPlayer.isBot) {
      setTimeout(() => {
        handleBotZhouYu(room, targetPlayerId, suitColor);
      }, 1200);
    } else {
      setTimeout(() => {
        if (room.pendingAction && room.pendingAction.cardUsedId === cardId && room.pendingAction.type === 'ZHOU_YU_DISCORD') {
          room.pendingAction = null;
          dealDamage(room, targetPlayerId, 1, null, playerId);
          if (!room.pendingAction) resumeAfterAttack(room);
          broadcastRoomState(room);
        }
      }, timeoutMs);
    }
  });

  // ==========================================
  // SERPENT SPEAR skill: discard 2 cards to perform a SLASH attack
  // ==========================================
  socket.on('use_serpent_spear', ({ roomId, cardIds, targetPlayerId }) => {
    const room = gameRooms[roomId];
    if (!room || room.status !== 'PLAYING') return;

    const playerId = getPlayerIdBySocket(room, socket.id);
    if (!playerId) return;
    const player = room.players[playerId];
    if (!player || !player.isAlive) return;

    // Must be player's PLAY turn
    if (room.turnOrder[room.currentTurnIndex] !== playerId || room.currentPhase !== 'PLAY') {
      return socket.emit('game_error', { message: 'ไม่ใช่เทิร์นของคุณ หรือไม่ใช่ช่วงร่ายการ์ด' });
    }
    if (room.pendingAction) {
      return socket.emit('game_error', { message: 'กรุณารอการประมวลผลก่อนหน้า' });
    }

    // Must have SERPENT_SPEAR equipped
    if (!player.equipment || !player.equipment.weapon || player.equipment.weapon.name !== 'SERPENT_SPEAR') {
      return socket.emit('game_error', { message: 'คุณต้องสวม SERPENT_SPEAR ก่อนใช้ความสามารถนี้' });
    }

    // Must select exactly 2 cards
    if (!cardIds || cardIds.length !== 2) {
      return socket.emit('game_error', { message: 'กรุณาเลือกการ์ด 2 ใบเพื่อทิ้งแทน SLASH' });
    }

    // Validate all cards are in hand
    for (const cid of cardIds) {
      if (!player.hand.some(c => c.id === cid)) {
        return socket.emit('game_error', { message: 'ไม่พบการ์ดที่ระบุบนมือ' });
      }
    }

    // Check slash limit (Zhuge or Zhang Fei bypass)
    const hasZhuge = player.equipment.weapon && player.equipment.weapon.name === 'ZHUGE_CROSSBOW';
    const isZhangFei = hasCharacter(player, 'ZHANG_FEI');
    if (room.attacksPlayedInTurn >= 1 && !hasZhuge && !isZhangFei) {
      return socket.emit('game_error', { message: 'คุณใช้สิทธิ์โจมตีครบแล้วในเทิร์นนี้' });
    }

    // Validate target
    const targetPlayer = room.players[targetPlayerId];
    if (!targetPlayer || !targetPlayer.isAlive) {
      return socket.emit('game_error', { message: 'เป้าหมายไม่พร้อมรับการโจมตี' });
    }
    const weaponRange = player.equipment.weapon.range || 3;
    const actualDistance = calculateDistance(room, playerId, targetPlayerId);
    if (actualDistance > weaponRange) {
      return socket.emit('game_error', { message: `ระยะไม่ถึง! เป้าหมายอยู่ห่าง ${actualDistance} แต่ระยะโจมตีคือ ${weaponRange}` });
    }
    if (hasCharacter(targetPlayer, 'ZHUGE_LIANG') && targetPlayer.hand.length === 0) {
      return socket.emit('game_error', { message: 'ขงเบ้งเปิดใช้สกิล เมืองว่างเปล่า ไม่สามารถตกเป็นเป้าหมายได้!' });
    }

    // Discard the 2 chosen cards
    cardIds.forEach(cid => {
      const idx = player.hand.findIndex(c => c.id === cid);
      if (idx !== -1) {
        const c = player.hand.splice(idx, 1)[0];
        room.discardPile.push(c);
      }
    });

    const damage = player.wineActive ? 2 : 1;
    player.wineActive = false;
    room.attacksPlayedInTurn += 1;
    player.slashedThisTurn = true;

    notifyCardPlayed(room, playerId, 'SERPENT_SPEAR', targetPlayerId);
    console.log(`${player.name} SERPENT_SPEAR: discarded 2 cards, attacking ${targetPlayer.name}`);

    const timeoutMs = 15000;
    const dodgeNeeded = hasCharacter(player, 'LV_BU') ? 2 : 1;

    room.pendingAction = {
      type: 'WAITING_FOR_DODGE',
      sourcePlayerId: playerId,
      targetPlayerId: targetPlayerId,
      cardUsedId: `serpent_${Date.now()}`,
      damage: damage,
      dodgeNeeded: dodgeNeeded,
      damageType: 'NORMAL',
      timeoutAt: Date.now() + timeoutMs
    };

    broadcastRoomState(room);

    if (targetPlayer.isBot) {
      setTimeout(() => {
        handleBotDodge(room, targetPlayerId, damage);
      }, 1200);
    } else {
      setTimeout(() => {
        if (room.pendingAction && room.pendingAction.type === 'WAITING_FOR_DODGE' && room.pendingAction.sourcePlayerId === playerId) {
          room.pendingAction = null;
          dealDamage(room, targetPlayerId, damage, null, playerId, 'NORMAL');
          if (!room.pendingAction) resumeAfterAttack(room);
          broadcastRoomState(room);
        }
      }, timeoutMs);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    let foundRoom = null;
    let foundPlayerId = null;
    for (const rId in gameRooms) {
      const room = gameRooms[rId];
      const pid = getPlayerIdBySocket(room, socket.id);
      if (pid) {
        foundRoom = room;
        foundPlayerId = pid;
        break;
      }
    }
    
    if (foundRoom && foundRoom.status !== 'LOBBY') {
      const player = foundRoom.players[foundPlayerId];
      if (player && player.isAlive) {
        console.log(`[INSTANT DEATH] Player ${player.name} disconnected during game!`);
        player.hp = 0;
        player.isAlive = false;
        
        if (player.hand) { foundRoom.discardPile.push(...player.hand); player.hand = []; }
        if (player.delayedKitZone) { foundRoom.discardPile.push(...player.delayedKitZone); player.delayedKitZone = []; }
        if (player.equipment) {
          if (player.equipment.weapon) { foundRoom.discardPile.push(player.equipment.weapon); player.equipment.weapon = null; }
          if (player.equipment.armor) { foundRoom.discardPile.push(player.equipment.armor); player.equipment.armor = null; }
          if (player.equipment.defensiveHorse) { foundRoom.discardPile.push(player.equipment.defensiveHorse); player.equipment.defensiveHorse = null; }
          if (player.equipment.offensiveHorse) { foundRoom.discardPile.push(player.equipment.offensiveHorse); player.equipment.offensiveHorse = null; }
        }
        
        const isGameOver = checkGameOver(foundRoom);
        if (!isGameOver) {
          if (foundRoom.turnOrder[foundRoom.currentTurnIndex] === foundPlayerId) {
            foundRoom.currentPhase = 'DISCARD';
            checkDiscardRequirement(foundRoom);
          } else {
            broadcastRoomState(foundRoom);
          }
        }
      }

      // Check if ANY human players are left connected
      const humanPlayersLeft = Object.values(foundRoom.players).filter(p => !p.isBot && p.isAlive).length;
      if (humanPlayersLeft === 0) {
        console.log(`All human players disconnected. Deleting room ${foundRoom.roomId}...`);
        delete gameRooms[foundRoom.roomId];
      }

    }
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Game Server running on port ${PORT}`);
});