import sqlite3 from 'sqlite3';
declare const db: sqlite3.Database;
interface PlayerStatsInput {
    name?: string;
    won?: boolean;
    isWin?: boolean;
    kills?: number;
    damage?: number;
}
interface MatchHistoryInput {
    roomId?: string;
    winnerRole?: string;
    playerCount?: number;
    durationSeconds?: number;
    duration?: number;
}
declare function initDatabase(): Promise<sqlite3.Database>;
declare function recordPlayerStats(name: string | PlayerStatsInput, isWin?: boolean, kills?: number, damage?: number): Promise<{
    id: number;
    changes: number;
}>;
declare function saveMatchHistory(roomId: string | MatchHistoryInput, winnerRole?: string, playerCount?: number, durationSeconds?: number): Promise<{
    id: number;
}>;
declare function getLeaderboard(limit?: number): Promise<any[]>;
export { db, initDatabase, recordPlayerStats, saveMatchHistory, getLeaderboard };
//# sourceMappingURL=database.d.ts.map