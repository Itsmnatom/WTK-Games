'use strict';

import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const verbose = sqlite3.verbose();
let dbPath = path.join(process.cwd(), 'db', 'wtk_game.sqlite');
if (!fs.existsSync(path.dirname(dbPath))) {
  dbPath = path.join(__dirname, 'wtk_game.sqlite');
}
const db = new verbose.Database(dbPath);

interface PlayerStatsInput {
  name?: string;
  won?: boolean;
  isWin?: boolean;
  kills?: number;
  damage?: number;
}

interface MatchHistoryInput {
  roomId?: string;
  winnerRole?: string;
  playerCount?: number;
  durationSeconds?: number;
  duration?: number;
}

function initDatabase(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 1. Players Table
      db.run(`
        CREATE TABLE IF NOT EXISTS players (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          matches_played INTEGER DEFAULT 0,
          wins INTEGER DEFAULT 0,
          losses INTEGER DEFAULT 0,
          kills INTEGER DEFAULT 0,
          damage_dealt INTEGER DEFAULT 0,
          exp INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 2. Match History Table
      db.run(`
        CREATE TABLE IF NOT EXISTS match_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          room_id TEXT NOT NULL,
          winner_role TEXT NOT NULL,
          player_count INTEGER DEFAULT 4,
          duration_seconds INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 3. Card DB Table
      db.run(`
        CREATE TABLE IF NOT EXISTS card_db_sql (
          id TEXT PRIMARY KEY,
          card_name TEXT NOT NULL,
          main_type TEXT NOT NULL,
          sub_type TEXT,
          description TEXT,
          pic_url TEXT
        )
      `);

      // Seed Card DB from JSON if empty
      db.get('SELECT COUNT(*) as count FROM card_db_sql', (err: Error | null, row: any) => {
        if (!err && row && row.count === 0) {
          let cardsJsonPath = path.join(process.cwd(), 'public', 'cards_db.json');
          if (!fs.existsSync(cardsJsonPath)) {
            cardsJsonPath = path.join(__dirname, '..', 'public', 'cards_db.json');
          }
          if (fs.existsSync(cardsJsonPath)) {
            const cardsData = JSON.parse(fs.readFileSync(cardsJsonPath, 'utf8'));
            const stmt = db.prepare('INSERT INTO card_db_sql (id, card_name, main_type, sub_type, description, pic_url) VALUES (?, ?, ?, ?, ?, ?)');
            cardsData.forEach((c: any) => {
              stmt.run(c.id || c.card_name, c.card_name, c.main_type || 'Basic', c.sub_type || '', c.description || '', c.pic_url || '');
            });
            stmt.finalize();
            console.log('🗄️ SQL DB: Seeded 41 cards into SQLite database successfully!');
          }
        }
      });

      console.log('🗄️ SQL DB: SQLite database initialized successfully at db/wtk_game.sqlite');
      resolve(db);
    });
  });
}

function recordPlayerStats(name: string | PlayerStatsInput, isWin?: boolean, kills: number = 0, damage: number = 0): Promise<{ id: number; changes: number }> {
  let pName: string, pWin: boolean, pKills: number, pDamage: number;

  if (typeof name === 'object' && name !== null) {
    pName = name.name!;
    pWin = name.won !== undefined ? name.won : !!name.isWin;
    pKills = name.kills || 0;
    pDamage = name.damage || 0;
  } else {
    pName = name;
    pWin = !!isWin;
    pKills = kills || 0;
    pDamage = damage || 0;
  }

  return new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO players (name, matches_played, wins, losses, kills, damage_dealt, exp)
      VALUES (?, 1, ?, ?, ?, ?, ?)
      ON CONFLICT(name) DO UPDATE SET
        matches_played = matches_played + 1,
        wins = wins + excluded.wins,
        losses = losses + excluded.losses,
        kills = kills + excluded.kills,
        damage_dealt = damage_dealt + excluded.damage_dealt,
        exp = exp + (excluded.wins * 100) + (excluded.kills * 30)
    `, [pName, pWin ? 1 : 0, pWin ? 0 : 1, pKills, pDamage, pWin ? 100 : 20], function(this: sqlite3.RunResult, err: Error | null) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function saveMatchHistory(roomId: string | MatchHistoryInput, winnerRole?: string, playerCount: number = 4, durationSeconds: number = 0): Promise<{ id: number }> {
  let rId: string, wRole: string, pCount: number, dSec: number;

  if (typeof roomId === 'object' && roomId !== null) {
    rId = roomId.roomId!;
    wRole = roomId.winnerRole || 'UNKNOWN';
    pCount = roomId.playerCount || 4;
    dSec = roomId.durationSeconds || roomId.duration || 0;
  } else {
    rId = roomId;
    wRole = winnerRole || 'UNKNOWN';
    pCount = playerCount || 4;
    dSec = durationSeconds || 0;
  }

  return new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO match_history (room_id, winner_role, player_count, duration_seconds)
      VALUES (?, ?, ?, ?)
    `, [rId, wRole, pCount, dSec], function(this: sqlite3.RunResult, err: Error | null) {
      if (err) return reject(err);
      resolve({ id: this.lastID });
    });
  });
}

function getLeaderboard(limit: number = 10): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT name, matches_played, wins, losses, kills, damage_dealt, exp,
             ROUND(CAST(wins AS FLOAT) / MAX(matches_played, 1) * 100, 1) as win_rate
      FROM players
      ORDER BY wins DESC, exp DESC
      LIMIT ?
    `, [limit], (err: Error | null, rows: any[]) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export {
  db,
  initDatabase,
  recordPlayerStats,
  saveMatchHistory,
  getLeaderboard
};
