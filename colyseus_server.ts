'use strict';
import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { Server } from 'colyseus';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { monitor } from '@colyseus/monitor';
import { WTKRoom } from './rooms/WTKRoom';
import { initDatabase, getLeaderboard } from './db/database';
import pluginManager from './plugins/plugin_manager';

// ─── Setup Express ────────────────────────────────────────────────────────────
const app = express();
const httpServer = http.createServer(app);

// No-cache headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

const publicDir = fs.existsSync(path.join(process.cwd(), 'public'))
  ? path.join(process.cwd(), 'public')
  : path.join(__dirname, '..', 'public');

app.use(express.static(publicDir));
app.use(express.json());

// ─── Colyseus Monitor Dashboard (Basic Auth Guard) ────────────────────────────
const MONITOR_USER = process.env.MONITOR_USER || 'admin';
const MONITOR_PASS = process.env.MONITOR_PASS || 'monitor123';
app.use('/colyseus', (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="WTK Monitor"');
    return res.status(401).send('Authentication required');
  }
  const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  if (user !== MONITOR_USER || pass !== MONITOR_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="WTK Monitor"');
    return res.status(401).send('Invalid credentials');
  }
  next();
}, monitor());

// ─── Static Routes ────────────────────────────────────────────────────────────
app.get('/', (req: Request, res: Response) => res.redirect('/lobby'));
app.get('/lobby', (req: Request, res: Response) => res.sendFile(path.join(publicDir, 'lobby.html')));
app.get('/room', (req: Request, res: Response) => res.sendFile(path.join(publicDir, 'room.html')));
app.get('/app/:roomId', (req: Request, res: Response) => res.sendFile(path.join(publicDir, 'room.html')));
app.get('/room/:roomId', (req: Request, res: Response) => res.sendFile(path.join(publicDir, 'room.html')));
app.get('/test', (req: Request, res: Response) => res.redirect('/app/ROOM_TEST?test=true&mode=BOT&action=create'));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.get('/api/leaderboard', async (req: Request, res: Response) => {
  try {
    const leaderboard = await getLeaderboard(10);
    res.json({ success: true, data: leaderboard });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/rooms', (req: Request, res: Response) => {
  try {
    const rooms = (gameServer as any).driver?.rooms || [];
    const publicRooms = rooms.map((r: any) => ({
      roomId: r.roomId,
      players: r.clients?.length || 0,
      maxPlayers: r.maxClients || 10,
      status: r.metadata?.status || 'LOBBY',
    }));
    res.json({ success: true, rooms: publicRooms });
  } catch (err: any) {
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
const PORT = Number(process.env.PORT) || 3001;

async function boot() {
  // Init SQL database
  await initDatabase().catch(err => console.error('[DB] Init Error:', err));

  // Load plugins
  if (pluginManager.loadPlugins) pluginManager.loadPlugins();

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
