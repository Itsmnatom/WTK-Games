const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'wtk_game.sqlite');
const db = new sqlite3.Database(dbPath);

function initDatabase() {
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
      db.get('SELECT COUNT(*) as count FROM card_db_sql', (err, row) => {
        if (!err && row && row.count === 0) {
          const cardsJsonPath = path.join(__dirname, '..', 'public', 'cards_db.json');
          if (fs.existsSync(cardsJsonPath)) {
            const cardsData = JSON.parse(fs.readFileSync(cardsJsonPath, 'utf8'));
            const stmt = db.prepare('INSERT INTO card_db_sql (id, card_name, main_type, sub_type, description, pic_url) VALUES (?, ?, ?, ?, ?, ?)');
            cardsData.forEach(c => {
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

function recordPlayerStats(name, isWin, kills = 0, damage = 0) {
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
    `, [name, isWin ? 1 : 0, isWin ? 0 : 1, kills, damage, isWin ? 100 : 20], function(err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function saveMatchHistory(roomId, winnerRole, playerCount = 4, durationSeconds = 0) {
  return new Promise((resolve, reject) => {
    db.run(`
      INSERT INTO match_history (room_id, winner_role, player_count, duration_seconds)
      VALUES (?, ?, ?, ?)
    `, [roomId, winnerRole, playerCount, durationSeconds], function(err) {
      if (err) return reject(err);
      resolve({ id: this.lastID });
    });
  });
}

function getLeaderboard(limit = 10) {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT name, matches_played, wins, losses, kills, damage_dealt, exp,
             ROUND(CAST(wins AS FLOAT) / MAX(matches_played, 1) * 100, 1) as win_rate
      FROM players
      ORDER BY wins DESC, exp DESC
      LIMIT ?
    `, [limit], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  db,
  initDatabase,
  recordPlayerStats,
  saveMatchHistory,
  getLeaderboard
};
