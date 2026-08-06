import type { GameRoom, ActionData, SocketLike } from './types';
declare function startNegateWindow(room: GameRoom, actionData: ActionData): void;
declare function resolveActionChain(room: GameRoom): void;
declare function executeOriginalAction(room: GameRoom, action: ActionData): void;
declare function handleUseCard(room: GameRoom, socket: SocketLike | null, data: any): void;
declare function handleResolvePending(room: GameRoom, socket: SocketLike | null, data: any): void;
export { startNegateWindow, resolveActionChain, executeOriginalAction, handleUseCard, handleResolvePending, };
//# sourceMappingURL=cardLogic.d.ts.map