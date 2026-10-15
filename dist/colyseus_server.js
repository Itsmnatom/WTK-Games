'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const colyseus_1 = require("colyseus");
const ws_transport_1 = require("@colyseus/ws-transport");
const monitor_1 = require("@colyseus/monitor");
const WTKRoom_1 = require("./rooms/WTKRoom");
const database_1 = require("./db/database");
const plugin_manager_1 = __importDefault(require("./plugins/plugin_manager"));
// ─── Setup Express ────────────────────────────────────────────────────────────
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
// No-cache headers
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});
const publicDir = fs_1.default.existsSync(path_1.default.join(process.cwd(), 'public'))
    ? path_1.default.join(process.cwd(), 'public')
    : path_1.default.join(__dirname, '..', 'public');
app.use(express_1.default.static(publicDir));
app.use(express_1.default.json());
// ─── Colyseus Monitor Dashboard (Basic Auth Guard) ────────────────────────────
const MONITOR_USER = process.env.MONITOR_USER || 'admin';
const MONITOR_PASS = process.env.MONITOR_PASS || 'monitor123';
app.use('/colyseus', (req, res, next) => {
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
}, (0, monitor_1.monitor)());
// ─── Static Routes ────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.redirect('/lobby'));
const pixelPage = path_1.default.join(publicDir, 'pixel', 'index.html');
const serveClient = (legacy) => (req, res) => res.sendFile(fs_1.default.existsSync(pixelPage) ? pixelPage : path_1.default.join(publicDir, legacy));
app.get('/lobby', serveClient('lobby.html'));
app.get('/room', serveClient('room.html'));
app.get('/app/:roomId', serveClient('room.html'));
app.get('/room/:roomId', serveClient('room.html'));
app.get('/legacy/lobby', (req, res) => res.sendFile(path_1.default.join(publicDir, 'lobby.html')));
app.get('/legacy/room', (req, res) => res.sendFile(path_1.default.join(publicDir, 'room.html')));
app.get('/test', (req, res) => res.redirect('/app/ROOM_TEST?test=true&mode=BOT&action=create'));
// ─── API Routes ───────────────────────────────────────────────────────────────
app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboard = await (0, database_1.getLeaderboard)(10);
        res.json({ success: true, data: leaderboard });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
app.get('/api/rooms', async (req, res) => {
    try {
        const { matchMaker } = await Promise.resolve().then(() => __importStar(require('colyseus')));
        const rooms = await matchMaker.query({ name: 'wtk_room', locked: false });
        const publicRooms = rooms.map((r) => ({
            roomId: r.roomId,
            players: r.clients || 0,
            maxPlayers: r.maxClients || 10,
            status: 'LOBBY',
        }));
        res.json({ success: true, rooms: publicRooms });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// ─── Colyseus Server ──────────────────────────────────────────────────────────
const gameServer = new colyseus_1.Server({
    transport: new ws_transport_1.WebSocketTransport({ server: httpServer }),
});
// Register WTK Room
gameServer.define('wtk_room', WTKRoom_1.WTKRoom)
    .filterBy(['mode']) // allow filtering rooms by mode (BOT/ONLINE)
    .sortBy({ clients: -1 }); // prefer rooms with more players
// ─── Boot ─────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT) || 3002;
async function boot() {
    // Init SQL database
    await (0, database_1.initDatabase)().catch(err => console.error('[DB] Init Error:', err));
    // Load plugins
    if (plugin_manager_1.default.loadPlugins)
        plugin_manager_1.default.loadPlugins();
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
//# sourceMappingURL=colyseus_server.js.map