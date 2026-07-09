const fs = require('fs');
let code = fs.readFileSync('public/room_app.js', 'utf8');

let match = code.match(/function renderOpponents\(\) \{([\s\S]*?)\} \/\/\s*function renderPlayerStatus/);
if (!match) {
    match = code.match(/function renderOpponents\(\) \{([\s\S]*?)(?=function renderPlayerStatus)/);
}

if (match) {
    let body = match[1];
    body = body.replace(/opponentsZone\.appendChild\(card\);/g, 'console.log("Appended card for " + pId);');
    body = body.replace(/opponentsZone\.innerHTML = '';/g, 'console.log("Cleared zone");');
    
    const mockState = {
      players: {
         "p1": { name: "P1", hp: 4, maxHp: 4, handCount: 0, isAlive: true, role: "LORD", character: "CAO_CAO", equipment: {} },
         "p2": { name: "P2", hp: 4, maxHp: 4, handCount: 0, isAlive: true, role: "REBEL", character: "ZHAO_YUN", equipment: {} }
      },
      turnOrder: ["p1", "p2"],
      currentTurnPlayerId: "p1",
      currentPhase: "PLAY"
    };

    const ctxCode = `
      let gameState = ${JSON.stringify(mockState)};
      let myPlayerId = "p1";
      let selectedCardId = null;
      let selectedDiscardIds = [];
      let awaitingTarget = false;
      let currentLobbyAction = null;
      let ROLE_LABELS = { 'LORD': 'L', 'REBEL': 'R' };
      let ROLE_CSS = { 'LORD': 'l-css', 'REBEL': 'r-css' };
      let wtkHeroes = [];
      let CHAR_ICONS = {};
      let CARD_NAME_MAPPING = {};
      
      const opponentsZone = { innerHTML: '', appendChild: () => {} };
      const document = { createElement: () => ({ classList: {add:()=>{}}, dataset: {}, addEventListener: ()=>{} }) };
      
      function calculateClientDistance() { return 1; }
      function getHpClass() { return 'hp-green'; }
      function getHeroPic() { return null; }
      function onSelectTarget() {}
      
      function runTest() {
        ${body}
      }
      runTest();
    `;
    
    try {
       eval(ctxCode);
       console.log("Success! No runtime error.");
    } catch(e) {
       console.error("Runtime error in renderOpponents:");
       console.error(e);
    }
}
