/**
 * public/colyseus_client.js
 * Colyseus 0.15 Client SDK — ให้ API เหมือน Socket.IO เพื่อให้ room_app.js ไม่ต้องแก้
 * 
 * สร้าง global function io() ที่ return socket-like object
 * ใช้ Colyseus.Client + joinOrCreate() ภายใน
 * 
 * ต้อง load colyseus.js ก่อน script นี้:
 *   <script src="https://unpkg.com/colyseus.js@0.15.23/dist/colyseus.js"></script>
 */

(function () {
  // ─── Socket-like wrapper ────────────────────────────────────────────────────
  class SocketLike {
    constructor() {
      this._listeners = {};
      this._room = null;
      this.id = null;
      this.connected = false;
    }

    // Socket.IO API: socket.on(event, callback)
    on(event, callback) {
      if (!this._listeners[event]) this._listeners[event] = [];
      this._listeners[event].push(callback);
      return this;
    }

    // Remove listeners
    off(event, callback) {
      if (!this._listeners[event]) return;
      if (callback) this._listeners[event] = this._listeners[event].filter(fn => fn !== callback);
      else delete this._listeners[event];
    }

    // Socket.IO API: socket.emit(event, data)
    emit(event, data) {
      if (!this._room) return;
      // Colyseus: room.send(type, message)
      this._room.send(event, data || {});
    }

    // Socket.IO: socket.disconnect()
    disconnect() {
      if (this._room) this._room.leave();
    }

    // Internal: trigger listeners
    _trigger(event, data) {
      const cbs = this._listeners[event] || [];
      cbs.forEach(fn => {
        try { fn(data); } catch (e) { console.error('[SocketLike] Error in listener for:', event, e); }
      });
    }

    // Connect to Colyseus room
    async _connect(roomName, options) {
      const wsProtocol = location.protocol === 'https:' ? 'wss' : 'ws';
      const host = location.hostname + (location.port ? ':' + location.port : '');
      const client = new window.Colyseus.Client(`${wsProtocol}://${host}`);

      try {
        let room;
        if (options._action === 'create') {
          room = await client.create(roomName, options);
        } else if (options._action === 'join') {
          try {
            room = await client.joinOrCreate(roomName, options);
          } catch (e) {
            console.warn('[SocketLike] joinOrCreate failed, trying create:', e.message);
            room = await client.create(roomName, options);
          }
        } else if (options._action === 'reconnect') {
          try {
            room = await client.reconnect(options._reconnectToken, options);
          } catch (e) {
            console.warn('[SocketLike] reconnect failed, joining fresh:', e.message);
            room = await client.joinOrCreate(roomName, options);
          }
        } else {
          room = await client.joinOrCreate(roomName, options);
        }

        this._room = room;
        this.id = room.sessionId;
        this.connected = true;

        // Forward all room messages as socket.on events
        room.onMessage('*', (type, message) => {
          this._trigger(type, message);
        });

        // Colyseus room.onLeave → socket 'disconnect'
        room.onLeave((code) => {
          this.connected = false;
          this._trigger('disconnect', { code });
          // Auto reconnect
          if (code === 1000) return; // normal close
          console.log('[SocketLike] Unexpected disconnect. Attempting reconnect...');
          setTimeout(() => this._connect(roomName, options), 3000);
        });

        // Connected successfully
        console.log('[SocketLike] Connected to room:', room.id, 'sessionId:', room.sessionId);

      } catch (err) {
        console.error('[SocketLike] Could not connect to room:', err);
        this._trigger('connect_error', { message: err.message });
        // Retry after 3s
        setTimeout(() => this._connect(roomName, options), 3000);
      }
    }
  }

  // ─── Global io() drop-in replacement ─────────────────────────────────────────
  // room_app.js calls: socket = io()
  // After calling io(), room_app.js hooks connect, then calls socket.emit('create_room', ...)
  // We intercept socket.emit('create_room') / 'join_room' / 'reconnect_player' to do the actual join

  window.io = function (serverUrl, ioOptions) {
    const socket = new SocketLike();

    // Trigger initial 'connect' event on next tick so room_app.js can emit create_room / join_room
    setTimeout(() => {
      socket._trigger('connect', {});
    }, 10);

    // Intercept emit to catch 'create_room', 'join_room', 'reconnect_player'
    // and use them to trigger the real Colyseus connection
    const origEmit = socket.emit.bind(socket);

    socket._hasInitiatedConnect = false;

    socket.emit = function (event, data) {
      if (event === 'create_room' || event === 'join_room' || event === 'reconnect_player') {
        if (socket._hasInitiatedConnect) return;
        socket._hasInitiatedConnect = true;

        if (event === 'create_room') {
          const opts = {
            playerName: data.playerName || 'Player',
            mode: data.mode || 'ONLINE',
            botCount: data.botCount || 3,
            roomId: data.roomId,
            _action: 'create',
          };
          socket._connect('wtk_room', opts);
          return;
        }
        if (event === 'join_room') {
          const opts = {
            playerName: data.playerName || 'Player',
            roomId: data.roomId,
            mode: 'ONLINE',
            _action: 'join',
          };
          socket._connect('wtk_room', opts);
          return;
        }
        if (event === 'reconnect_player') {
          const token = localStorage.getItem('colyseusToken_' + data.playerId) || '';
          const opts = {
            playerName: sessionStorage.getItem('playerName') || 'Player',
            roomId: data.roomId,
            reconnectPlayerId: data.playerId,
            roomAction: 'reconnect',
            _action: 'reconnect',
            _reconnectToken: token,
          };
          socket._connect('wtk_room', opts);
          return;
        }
      }
      // All other emits: forward to Colyseus room.send
      origEmit(event, data);
    };

    // Delay connect trigger until after room_app.js registers handlers
    // room_app.js: socket.on('connect', cb) → socket = io() (same tick)
    // We fire 'connect' during _connect() after Colyseus handshake

    return socket;
  };

  // ─── Save Colyseus reconnect token on room join ───────────────────────────
  // room_app.js listens to 'room_joined' and 'room_created'
  // We store the Colyseus reconnect token after join
  const origWindowIo = window.io;
  const _patchedIo = function (serverUrl, ioOptions) {
    const sock = origWindowIo(serverUrl, ioOptions);
    // Patch 'room_joined' to save reconnect token
    const origOn = sock.on.bind(sock);
    sock.on = function (event, cb) {
      if (event === 'room_joined' || event === 'room_created') {
        origOn(event, function (data) {
          // Save Colyseus reconnect token
          if (sock._room && data.playerId) {
            const token = sock._room.reconnectionToken;
            if (token) localStorage.setItem('colyseusToken_' + data.playerId, token);
          }
          cb(data);
        });
        return sock;
      }
      return origOn(event, cb);
    };
    return sock;
  };
  window.io = _patchedIo;

  console.log('[Colyseus Client] Socket.IO compatibility layer loaded.');
})();
