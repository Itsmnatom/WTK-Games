const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'wtk_game.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('====================================================');
console.log('📊 WTK-GAMES SQL DATABASE VIEWER');
console.log('====================================================\n');

db.serialize(() => {
  // 1. View Players
  db.all('SELECT * FROM players', [], (err, rows) => {
    console.log('👤 [TABLE: players] สถิติผู้เล่นทั้งหมด:');
    if (err) console.error(err.message);
    else console.table(rows);
    console.log('\n----------------------------------------------------\n');
  });

  // 2. View Match History
  db.all('SELECT * FROM match_history ORDER BY id DESC LIMIT 5', [], (err, rows) => {
    console.log('📜 [TABLE: match_history] ประวัติการแข่ง 5 นัดล่าสุด:');
    if (err) console.error(err.message);
    else console.table(rows);
    console.log('\n----------------------------------------------------\n');
  });

  // 3. View Cards Count & Sample
  db.all('SELECT id, card_name, main_type, pic_url FROM card_db_sql LIMIT 10', [], (err, rows) => {
    console.log('🃏 [TABLE: card_db_sql] ตัวอย่างข้อมูลการ์ดใน SQL DB (10 รายการแรก):');
    if (err) console.error(err.message);
    else console.table(rows);
    console.log('\n====================================================');
  });
});
