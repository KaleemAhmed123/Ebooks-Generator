## Grid DP: Unique Paths

Grid DP is the most visually intuitive form of Dynamic Programming. 

- **The Setup:** A robot is located at the top-left corner of an `m x n` grid. The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner. How many possible unique paths are there?
- **The State:** `dp[r][c]` = the number of unique paths to reach cell `(r, c)`.

### The Transition

To get to cell `(r, c)`, the robot must have come from either:
1. The cell directly above it: `(r-1, c)`
2. The cell directly to its left: `(r, c-1)`

Since these are the only two possible origins, the total number of ways to reach `(r, c)` is exactly the sum of the ways to reach those two origins.
`dp[r][c] = dp[r-1][c] + dp[r][c-1]`

### Base Cases

- The robot starts at `(0, 0)`. There is exactly `1` way to be at the start: do nothing. `dp[0][0] = 1`.
- For any cell in the top row `(0, c)`, the robot can only arrive from the left. `dp[0][c] = 1`.
- For any cell in the left column `(r, 0)`, the robot can only arrive from above. `dp[r][0] = 1`.

### Implementation (Tabulation)

```ts
function uniquePaths(m: number, n: number): number {
  const dp = Array.from({ length: m }, () => new Array(n).fill(1));

  // Start at 1,1 since row 0 and col 0 are already base cases (1)
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }

  return dp[m - 1][n - 1];
}
```

### Unique Paths II (Obstacles)

- **The Twist:** The grid contains obstacles (represented by `1`). You cannot walk on an obstacle.
- **The Fix:** If `grid[r][c] === 1`, it is a dead end. Set `dp[r][c] = 0` (there are 0 ways to reach an obstacle).
- **The Trap:** If there is an obstacle in the top row, every cell to the right of it is unreachable. If you blindly fill the top row with `1`s, you will fail. You must initialize the top row with `1` *only until you hit the first obstacle*, then the rest are `0`. 
  - An easier way to handle this is to pad the `dp` array with an extra top row and left column of `0`s, set `dp[0][1] = 1`, and run the standard loop with `dp[r][c] = (grid[r-1][c-1] === 1) ? 0 : dp[r-1][c] + dp[r][c-1]`.
