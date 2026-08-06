'use strict';

const {
  initDatabase,
  recordPlayerStats,
  saveMatchHistory,
  getLeaderboard
} = require('../dist/db/database');

describe('db/database Module', () => {
  beforeAll(async () => {
    await initDatabase();
  });

  test('initDatabase() should complete without errors', async () => {
    await expect(initDatabase()).resolves.not.toThrow();
  });

  test('recordPlayerStats() and getLeaderboard() integration', async () => {
    const testPlayerName = 'JestUnitTestPlayer_' + Date.now();
    await recordPlayerStats(testPlayerName, {
      won: true,
      kills: 2,
      damage: 10,
      expGained: 50
    });

    const leaderboard = await getLeaderboard(50);
    expect(Array.isArray(leaderboard)).toBe(true);
    const found = leaderboard.find(p => p.name === testPlayerName);
    expect(found).toBeDefined();
    expect(found.wins).toBeGreaterThanOrEqual(1);
  });

  test('saveMatchHistory() should record match successfully', async () => {
    const matchData = {
      roomId: 'JEST_MATCH_' + Date.now(),
      winnerRole: 'LORD',
      playerCount: 4,
      durationSeconds: 120
    };

    await expect(saveMatchHistory(matchData)).resolves.not.toThrow();
  });
});
