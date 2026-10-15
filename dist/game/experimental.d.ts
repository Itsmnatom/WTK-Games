import type { GameRoom, Player } from './types';
export declare const experimental: (room: GameRoom) => boolean;
export declare function beginStrategies(room: GameRoom): boolean;
export declare function chooseStrategy(room: GameRoom, player: Player, id: string): boolean;
export declare function finishStrategies(room: GameRoom): void;
export declare function useStrategy(room: GameRoom, p: Player, cardId: string): boolean;
export declare function observePublicPlay(room: GameRoom, actor: string, name: string, targets: string[], kind: string, skill?: string, playId?: string): void;
export declare function balanceSummary(room: GameRoom): unknown;
/** In experimental mode, another living player's hidden role is never consulted. */
export declare function publicFriendly(room: GameRoom, self: Player, target: Player): boolean;
export declare function publicEnemy(room: GameRoom, self: Player, target: Player): boolean;
export declare function experimentalBotTurn(room: GameRoom, bot: Player): boolean;
//# sourceMappingURL=experimental.d.ts.map