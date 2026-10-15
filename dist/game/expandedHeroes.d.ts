import type { Card, GameRoom, Player } from './types';
export declare function drawWithHeroes(room: GameRoom, player: Player, done: () => void): void;
export declare function expandedDamageSkills(room: GameRoom, player: Player, damage: number): void;
/** Claim is resolved after judgment result, before continuing the suspended action. */
export declare function claimJudgment(room: GameRoom, player: Player, card: Card, done: () => void): void;
export declare function queueTacticDraw(room: GameRoom, playerId: string): void;
export declare function qingnang(room: GameRoom, player: Player, data: any): boolean;
export declare function validRedirect(room: GameRoom, player: Player, target: Player, sourceId: string, costId?: string): boolean;
export declare function offerRedirection(room: GameRoom): boolean;
export declare function expandedBotAction(room: GameRoom, bot: Player): boolean;
//# sourceMappingURL=expandedHeroes.d.ts.map