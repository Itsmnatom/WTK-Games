document.addEventListener('DOMContentLoaded', () => {
  // ─── Element refs ────────────────────────────────────────
  const btnCreateOnline   = document.getElementById('btn-create-online');
  const btnJoinOnline     = document.getElementById('btn-join-online');
  const inputNickname     = document.getElementById('input-nickname');
  const inputOnlineRoomId = document.getElementById('input-online-room-id');
  const panelReconnect    = document.getElementById('panel-reconnect');
  const btnReconnectGame  = document.getElementById('btn-reconnect-game');

  // ─── Load cached player name ──────────────────────────────
  const cachedName = localStorage.getItem('savedPlayerName');
  if (cachedName && inputNickname) {
    inputNickname.value = cachedName;
  }

  if (inputNickname) {
    inputNickname.addEventListener('input', () => {
      localStorage.setItem('savedPlayerName', inputNickname.value.trim());
    });
  }

  // ─── Reconnect panel ──────────────────────────────────────
  const activeRoomId   = localStorage.getItem('activeRoomId');
  const activePlayerId = localStorage.getItem('activePlayerId');
  if (activeRoomId && activePlayerId && panelReconnect) {
    panelReconnect.classList.remove('hidden');
  }

  if (btnReconnectGame) {
    btnReconnectGame.addEventListener('click', () => {
      sessionStorage.setItem('roomAction', 'reconnect');
      sessionStorage.setItem('reconnectRoomId', activeRoomId);
      sessionStorage.setItem('reconnectPlayerId', activePlayerId);
      window.location.href = `/app/${activeRoomId}`;
    });
  }

  // ─── Bot Count Stepper ─────────────────────────────────────
  let botCount = 3;
  const display = document.getElementById('bot-count-display');
  const hiddenInput = document.getElementById('select-bot-count');
  const btnDown = document.getElementById('bot-count-down');
  const btnUp = document.getElementById('bot-count-up');

  if (btnDown) {
    btnDown.addEventListener('click', () => {
      if (botCount > 1) {
        botCount--;
        if (display) display.textContent = botCount;
        if (hiddenInput) hiddenInput.value = botCount;
      }
    });
  }

  if (btnUp) {
    btnUp.addEventListener('click', () => {
      if (botCount < 9) {
        botCount++;
        if (display) display.textContent = botCount;
        if (hiddenInput) hiddenInput.value = botCount;
      }
    });
  }

  // ─── Bot Start Button ──────────────────────────────────────
  const btnStartBot = document.getElementById('btn-start-bot');
  if (btnStartBot) {
    btnStartBot.addEventListener('click', () => {
      const name = (inputNickname ? inputNickname.value.trim() : '') || 'ผู้เล่น';
      localStorage.setItem('savedPlayerName', name);
      const rId = 'BOT_' + Math.random().toString(36).substr(2, 4).toUpperCase();
      sessionStorage.setItem('playerName', name);
      sessionStorage.setItem('gameMode', 'BOT');
      sessionStorage.setItem('botCount', botCount);
      sessionStorage.setItem('roomAction', 'create');
      window.location.href = `/app/${rId}?mode=BOT&botCount=${botCount}&action=create`;
    });
  }

  // ─── Room ID auto uppercase ───────────────────────────────
  if (inputOnlineRoomId) {
    inputOnlineRoomId.addEventListener('input', () => {
      const v = inputOnlineRoomId.value.toUpperCase();
      inputOnlineRoomId.value = v;
    });
  }

  // ─── Create Online Room ───────────────────────────────────
  if (btnCreateOnline) {
    btnCreateOnline.addEventListener('click', () => {
      const name = (inputNickname ? inputNickname.value.trim() : '') || 'ผู้เล่น';
      localStorage.setItem('savedPlayerName', name);
      const rId = 'ROOM_' + Math.random().toString(36).substr(2, 4).toUpperCase();
      sessionStorage.setItem('playerName', name);
      sessionStorage.setItem('gameMode', 'ONLINE');
      sessionStorage.setItem('roomAction', 'create');
      window.location.href = `/app/${rId}?mode=ONLINE&action=create`;
    });
  }

  // ─── Join Online Room ─────────────────────────────────────
  if (btnJoinOnline) {
    btnJoinOnline.addEventListener('click', () => {
      const name = (inputNickname ? inputNickname.value.trim() : '') || 'ผู้เล่น';
      let rId = (inputOnlineRoomId ? inputOnlineRoomId.value.trim().toUpperCase() : '');
      if (!rId) return alert('กรุณาระบุรหัสห้องให้ถูกต้อง!');
      localStorage.setItem('savedPlayerName', name);
      sessionStorage.setItem('playerName', name);
      sessionStorage.setItem('gameMode', 'ONLINE');
      sessionStorage.setItem('roomAction', 'join');
      window.location.href = `/app/${rId}?mode=ONLINE&action=join`;
    });

    if (inputOnlineRoomId) {
      inputOnlineRoomId.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btnJoinOnline.click();
      });
    }
  }
});
