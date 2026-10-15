import type { GameRoom } from './types';
export declare function deadline(_room?: GameRoom): number;
export declare function schedule(room: GameRoom, callback: () => void, delay: number): any;
export declare function once<T extends any[]>(callback: (...args: T) => void): (...args: T) => void;
//# sourceMappingURL=runtime.d.ts.map