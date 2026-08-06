import type { GameRoom, Player } from './types';
declare function botWantsToAttack(bot: Player, target: Player, room: GameRoom): boolean;
declare function runBotTurn(room: GameRoom, botId: string): void;
declare function handleBotDodge(room: GameRoom, botId: string, damage: number): void;
declare function handleBotDuelSlash(room: GameRoom): void;
declare function handleBotAOE(room: GameRoom): void;
declare function handleBotSeduction(room: GameRoom, botId: string): void;
declare function handleBotZhouYu(room: GameRoom, botId: string, requiredColor: string): void;
declare function handleBotBumperPick(room: GameRoom): void;
declare function handleBotBorrowSlash(room: GameRoom): void;
export { runBotTurn, botWantsToAttack, handleBotDodge, handleBotDuelSlash, handleBotAOE, handleBotSeduction, handleBotZhouYu, handleBotBumperPick, handleBotBorrowSlash, };
//# sourceMappingURL=botAI.d.ts.map