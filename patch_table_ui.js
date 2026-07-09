const fs = require('fs');

// 1. Update HTML
let html = fs.readFileSync('public/room.html', 'utf8');
const oldBoard = `    <!-- Main Board -->
    <div class="board-layout">

      <!-- Opponents Zone -->
      <div class="opponents-zone" id="opponents-zone">
        <!-- Dynamically populated -->
      </div>`;

const newBoard = `    <!-- Main Board -->
    <div class="board-layout table-mode">
      <div class="table-area">
        <div class="opponents-zone" id="opponents-zone">
          <!-- Dynamically populated -->
        </div>
        
        <div class="table-center" id="table-center">
           <div class="deck-pile" id="deck-pile">
             <div class="card-back-img"></div>
             <span class="deck-count">กองการ์ด</span>
           </div>
           <div class="discard-pile" id="discard-pile">
             <span class="discard-text">กองทิ้ง</span>
           </div>
        </div>`;

if (!html.includes('table-mode')) {
  html = html.replace(oldBoard, newBoard);
  
  const oldActionPanel = `      <!-- Action / Log Panel -->
      <div class="action-panel glass-panel">`;
  const newActionPanel = `      </div> <!-- End table-area -->
      <!-- Action / Log Panel -->
      <div class="action-panel glass-panel sidebar-log">`;
  html = html.replace(oldActionPanel, newActionPanel);
  
  fs.writeFileSync('public/room.html', html, 'utf8');
}

// 2. Update CSS
let css = fs.readFileSync('public/style.css', 'utf8');
const tableCSS = `
/* --- Tabletop Mode Layout --- */
.table-mode {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 80px);
  overflow: hidden;
  gap: 20px;
}
.table-area {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: radial-gradient(circle at center, rgba(30, 40, 50, 0.4) 0%, rgba(10, 15, 20, 0.8) 100%);
  border-radius: 40px;
  box-shadow: inset 0 0 50px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.7);
  border: 2px solid rgba(255,215,0, 0.1);
  padding: 20px;
  overflow: hidden;
}
.sidebar-log {
  width: 300px;
  max-width: 300px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

/* Center Table Elements */
.table-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 40px;
  align-items: center;
  z-index: 10;
}
.deck-pile, .discard-pile {
  width: 85px;
  height: 120px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  position: relative;
}
.deck-pile {
  background: var(--bg-glass);
  border: 2px solid var(--accent-gold);
  cursor: pointer;
}
.card-back-img {
  width: 100%;
  height: 100%;
  background-image: url('https://i.imgur.com/vHqT8U5.png'); /* Generic card back placeholder if needed, or CSS */
  background-size: cover;
  background-color: #8b0000; /* Dark red */
  border-radius: 6px;
  border: 2px solid #daa520;
}
.deck-count {
  position: absolute;
  bottom: -25px;
  font-size: 12px;
  color: var(--accent-gold);
  font-weight: bold;
}
.discard-pile {
  background: rgba(255,255,255,0.05);
  border: 2px dashed rgba(255,255,255,0.3);
}
.discard-text {
  color: rgba(255,255,255,0.4);
  font-size: 12px;
}

/* Redefine Opponents Zone to be radial */
.table-mode .opponents-zone {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 35%; /* Keep clear of player zone */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  pointer-events: none; /* Let clicks pass through to center */
}
.table-mode .opponent-card {
  pointer-events: auto; /* Re-enable clicks */
  position: absolute;
  transform: translate(-50%, -50%);
  width: 200px;
  transition: all 0.5s ease;
  z-index: 20;
}
.table-mode .player-zone {
  margin-top: auto;
  position: relative;
  z-index: 30;
  pointer-events: auto;
}

/* Animations */
@keyframes flyCard {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    transform: translate(var(--endX), var(--endY)) scale(1);
    opacity: 1;
  }
}
.flying-card-anim {
  position: fixed;
  width: 80px;
  height: 112px;
  background-size: cover;
  border-radius: 6px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.8);
  z-index: 9999;
  pointer-events: none;
}
`;

if (!css.includes('.table-mode')) {
  css += '\n' + tableCSS;
  fs.writeFileSync('public/style.css', css, 'utf8');
}

console.log('HTML and CSS patched for table mode!');
