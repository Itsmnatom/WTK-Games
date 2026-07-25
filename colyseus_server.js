'use strict';
/**
 * colyseus_server.js
 * WTK-Games — Colyseus 0.15 Server Entry Point
 * 
 * แทน server.js (Socket.IO) ด้วย Colyseus Framework
 * คำสั่งเริ่มต้น: node colyseus_server.js
 */

const http   = require('http');
const express = require('express');
const path   = require('path');
const fs     = require('fs');

const { Server } = require('colyseus');
const { WebSocketTransport } = require('@colyseus/ws-transport');
const { monitor } = require('@colyseus/monitor');
const { WTKRoom } = require('./rooms/WTKRoom');
const { initDatabase, getLeaderboard } = require('./db/database');
const pluginManager = require('./plugins/plugin_manager');

// ─── Setup Express ────────────────────────────────────────────────────────────
const app = express();
const httpServer = http.createServer(app);

// No-cache headers
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ─── Colyseus Monitor Dashboard ────────────────────────────────────────────────
app.use('/colyseus', monitor());

// ─── Static Routes ────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.redirect('/lobby'));
app.get('/lobby', (req, res) => res.sendFile(path.join(__dirname, 'public', 'lobby.html')));
app.get('/room', (req, res) => res.sendFile(path.join(__dirname, 'public', 'room.html')));
app.get('/app/:roomId', (req, res) => res.sendFile(path.join(__dirname, 'public', 'room.html')));
app.get('/room/:roomId', (req, res) => res.sendFile(path.join(__dirname, 'public', 'room.html')));
app.get('/test', (req, res) => res.redirect('/app/ROOM_TEST?test=true&mode=BOT&action=create'));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await getLeaderboard(10);
    res.json({ success: true, data: leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/rooms', (req, res) => {
  try {
    const rooms = gameServer.driver?.rooms || [];
    const publicRooms = rooms.map(r => ({
      roomId: r.roomId,
      players: r.clients?.length || 0,
      maxPlayers: r.maxClients || 10,
      status: r.metadata?.status || 'LOBBY',
    }));
    res.json({ success: true, rooms: publicRooms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Colyseus Server ──────────────────────────────────────────────────────────
const gameServer = new Server({
  transport: new WebSocketTransport({ server: httpServer }),
});

// Register WTK Room
gameServer.define('wtk_room', WTKRoom)
  .filterBy(['mode'])           // allow filtering rooms by mode (BOT/ONLINE)
  .sortBy({ clients: -1 });    // prefer rooms with more players

// ─── Boot ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;

async function boot() {
  // Init SQL database
  await initDatabase().catch(err => console.error('[DB] Init Error:', err));

  // Load plugins
  pluginManager.loadPlugins && pluginManager.loadPlugins();

  // Start Colyseus game server (attaches WebSocket to httpServer)
  await gameServer.listen(PORT);

  console.log(`
  ╔══════════════════════════════════════════════════════╗
  ║   🎮  WTK-Games — Colyseus 0.15 Server               ║
  ║   🌐  http://localhost:${PORT}                          ║
  ║   📊  Monitor: http://localhost:${PORT}/colyseus        ║
  ║   🔌  WebSocket: ws://localhost:${PORT}                 ║
  ║   📜  Room: wtk_room                                  ║
  ╚══════════════════════════════════════════════════════╝
  `);
}

boot().catch(err => {
  console.error('[BOOT] Fatal error:', err);
  process.exit(1);
});
