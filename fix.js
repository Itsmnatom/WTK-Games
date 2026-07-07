const fs = require('fs');
let lines = fs.readFileSync('public/room_app.js', 'utf8').split('\n');
let start = 1660;
let end = 1675;
let replacement = `    if (prev.currentTurnPlayerId !== next.currentTurnPlayerId) {
      const nextP = next.players[next.currentTurnPlayerId];
      addLog(\`== เริ่มเทิร์นใหม่ของ \${nextP?.name || next.currentTurnPlayerId} (เฟส: \${next.currentPhase}) ==\`, 'system');
    }

    if (next.pendingAction && (!prev.pendingAction || prev.pendingAction.type !== next.pendingAction.type || prev.pendingAction.targetPlayerId !== next.pendingAction.targetPlayerId || prev.pendingAction.actionId !== next.pendingAction.actionId)) {
      if (next.pendingAction.type === 'WAITING_FOR_AOE') {
        const aoeName = next.pendingAction.aoeType === 'BARBARIAN_INVASION' ? 'คนเถื่อนบุกรุก!' : 'ธนูหมื่นดอก!';
        showSystemAlert(\`🚨 สัญญาณเตือน: \${aoeName}\`, 4000);
      } else if (next.pendingAction.type === 'WAITING_FOR_SLASH_DUEL') {
        showSystemAlert('⚔️ การดวลเริ่มต้นขึ้น!', 3000);
      }
    }
  }

  // --- LOAD WTK DATABASE ---
  fetch('/heroes.json')`;

lines.splice(start, end - start + 1, replacement);
fs.writeFileSync('public/room_app.js', lines.join('\n'));
console.log('Fixed');
