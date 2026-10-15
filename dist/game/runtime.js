"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deadline = deadline;
exports.schedule = schedule;
exports.once = once;
const catalog_1 = require("../shared/catalog");
function deadline(_room) { return Date.now() + catalog_1.RULES.reactionMs; }
function schedule(room, callback, delay) {
    const guarded = () => { if (!room._disposed && room.status !== 'ENDED')
        callback(); };
    if (room._schedule)
        return room._schedule(guarded, delay);
    const timer = setTimeout(guarded, delay);
    timer.unref?.();
    return timer;
}
function once(callback) {
    let completed = false;
    return (...args) => { if (completed)
        return; completed = true; callback(...args); };
}
//# sourceMappingURL=runtime.js.map