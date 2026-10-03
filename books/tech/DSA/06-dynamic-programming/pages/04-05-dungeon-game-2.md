### Implementation

```ts
function calculateMinimumHP(dungeon: number[][]): number {
  const m = dungeon.length;
  const n = dungeon[0].length;
  
  const dp = Array.from({ length: m }, () => new Array(n).fill(Infinity));
  
  // Base Case: The Princess room
  dp[m - 1][n - 1] = Math.max(1, 1 - dungeon[m - 1][n - 1]);

  // Fill bottom row (can only move right)
  for (let c = n - 2; c >= 0; c--) {
    dp[m - 1][c] = Math.max(1, dp[m - 1][c + 1] - dungeon[m - 1][c]);
  }

  // Fill right column (can only move down)
  for (let r = m - 2; r >= 0; r--) {
    dp[r][n - 1] = Math.max(1, dp[r + 1][n - 1] - dungeon[r][n - 1]);
  }

  // Fill the rest from bottom-right to top-left
  for (let r = m - 2; r >= 0; r--) {
    for (let c = n - 2; c >= 0; c--) {
      const minFutureHealth = Math.min(dp[r + 1][c], dp[r][c + 1]);
      dp[r][c] = Math.max(1, minFutureHealth - dungeon[r][c]);
    }
  }

  return dp[0][0]; // Initial health required at the start
}
```

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Dungeon Game](https://leetcode.com/problems/dungeon-game/) (LeetCode 174) | The classic reverse grid DP problem |
| [Cherry Pickup](https://leetcode.com/problems/cherry-pickup/) (LeetCode 741) | Grid DP where future affects past — two simultaneous traversals |
| [Cherry Pickup II](https://leetcode.com/problems/cherry-pickup-ii/) (LeetCode 1463) | Two robots collecting, same reverse-dependency thinking |
