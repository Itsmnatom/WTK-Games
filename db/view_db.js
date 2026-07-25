const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'wtk_game.sqlite');
const db = new sqlite3.Database(dbPath);

console.log("\n=================== 📊 WTK-GAMES SQL DATABASE VIEWER ===================\n");

db.serialize(() => {
  // 1. Players Table
  console.log("👤 [1] ตารางผู้เล่นและสถิติ (players):");
  db.all("SELECT id, name, matches_played, wins, losses, kills, damage_dealt, exp, created_at FROM players ORDER BY exp DESC LIMIT 10", [], (err, rows) => {
    if (err) console.error(err);
    else console.table(rows);
  });

  // 2. Match History Table
  console.log("\n📜 [2] ตารางประวัติการแข่งขัน (match_history):");
  db.all("SELECT id, room_id, winner_role, player_count, duration_seconds, created_at FROM match_history ORDER BY id DESC LIMIT 5", [], (err, rows) => {
    if (err) console.error(err);
    else console.table(rows);
  });

  // 3. Card DB Table Count
  console.log("\n🃏 [3] ตารางพจนานุกรมการ์ด (card_db_sql):");
  db.get("SELECT COUNT(*) as total_cards FROM card_db_sql", [], (err, row) => {
    if (err) console.error(err);
    else console.log(`จำนวนการ์ดทั้งหมดในระบบ SQL DB: ${row ? row.total_cards : 0} ใบ`);
    console.log("\n=======================================================================\n");
  });
});
