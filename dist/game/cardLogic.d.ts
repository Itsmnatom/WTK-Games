import type { GameRoom, ActionData, SocketLike, PendingAction } from './types';
declare function scheduleResponse(room: GameRoom, callback: () => void, delay: number): void;
declare function attackDistance(room: GameRoom, sourceId: string, targetId: string, costSlot?: string | null): number;
/** The room watchdog calls this for an expired action; no human card is spent. */
declare function resolvePendingAction(room: GameRoom, expected?: PendingAction | null): boolean;
declare function startNegateWindow(room: GameRoom, actionData: ActionData): void;
declare function resolveActionChain(room: GameRoom): void;
declare function executeOriginalAction(room: GameRoom, action: ActionData): void;
declare function handleUseCard(room: GameRoom, socket: SocketLike | null, data: any): void;
declare function handleResolvePending(room: GameRoom, socket: SocketLike | null, data: any): void;
export { startNegateWindow, resolveActionChain, executeOriginalAction, handleUseCard, handleResolvePending, resolvePendingAction, scheduleResponse, attackDistance, };
//# sourceMappingURL=cardLogic.d.ts.map