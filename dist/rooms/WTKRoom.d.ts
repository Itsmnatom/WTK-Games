/**
 * rooms/WTKRoom.ts
 * Colyseus 0.15 Room class — replaces socket.io handlers in server.js
 */
import { Room, Client } from 'colyseus';
import { WTKState } from './schema/WTKSchema';
import type { GameRoom } from '../game/types';
export declare class WTKRoom extends Room<WTKState> {
    gameState: GameRoom;
    private _reconnectTokens;
    private _adminSockets;
    onCreate(options: any): void;
    onJoin(client: Client, options: any): Promise<void>;
    onLeave(client: Client, consented?: boolean): Promise<void>;
    onDispose(): Promise<void>;
    private _registerHandlers;
    private _getPlayerIdByClient;
    private _makeSocketLike;
    private _broadcastAll;
}
//# sourceMappingURL=WTKRoom.d.ts.map