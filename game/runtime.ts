import { RULES } from '../shared/catalog';
import type { GameRoom } from './types';
export function deadline(_room?: GameRoom): number { return Date.now() + RULES.reactionMs; }
export function schedule(room: GameRoom, callback: () => void, delay: number): any {
  const guarded = () => { if (!room._disposed && room.status !== 'ENDED') callback(); };
  if (room._schedule) return room._schedule(guarded, delay);
  const timer=setTimeout(guarded, delay);
  timer.unref?.();
  return timer;
}
export function once<T extends any[]>(callback: (...args: T) => void): (...args: T) => void {
  let completed = false;
  return (...args) => { if (completed) return; completed = true; callback(...args); };
}
