## Dungeon Game 🔴

This is a phenomenal interview question because it flips the fundamental mechanics of Grid DP upside down.

- **The Setup:** A knight starts at `(0, 0)` and must rescue a princess at `(m-1, n-1)`. The grid contains demons (negative health) and magic orbs (positive health). The knight's health can never drop to 0 or below, or he dies. Return the *minimum initial health* the knight needs to start with to survive the journey.
- **The Trap:** You want to run standard Minimum Path Sum from top-left to bottom-right. But you can't. 
  - If you track "accumulated health", you don't know what initial health you needed to survive the minimum dips. 
  - If you track "minimum initial health needed so far", adding a massive health potion doesn't change the initial health you needed to survive the demon you fought 3 rooms ago. Local decisions depend heavily on future rooms.

### The Insight: Reverse DP

If a problem's constraints dictate that a state must *survive* a future event, you must start from the future and work backwards.

- **The State:** `dp[r][c]` = the minimum health required *before entering* cell `(r, c)` to survive the rest of the journey.
- **The Destination:** We start at the Princess `(m-1, n-1)`.
  - If her room has a demon `-5`, we need `6` health before entering.
  - If her room has a potion `+5`, we need `1` health before entering (health can never be ≤ 0).
  - `dp[m-1][n-1] = Math.max(1, 1 - dungeon[m-1][n-1])`

### The Transition

At cell `(r, c)`, we can move to `(r+1, c)` or `(r, c+1)`. We want to take the path that demands the *least* amount of health from us.
- `minHealthRequired = Math.min(dp[r+1][c], dp[r][c+1])`
- But we also gain/lose health in our current room `(r, c)`. We subtract the room's value from the requirement.
- `dp[r][c] = Math.max(1, minHealthRequired - dungeon[r][c])`

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
