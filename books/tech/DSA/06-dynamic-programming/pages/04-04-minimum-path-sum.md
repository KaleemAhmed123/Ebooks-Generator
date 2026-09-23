## Minimum Path Sum

This is a direct evolution of Unique Paths. Instead of counting *how many* paths exist, we want to find the *best* path based on grid values.

- **The Setup:** Given a `m x n` grid filled with non-negative numbers, find a path from top-left to bottom-right, which minimizes the sum of all numbers along its path. You can only move down or right.
- **The State:** `dp[r][c]` = the minimum sum required to reach cell `(r, c)`.

### The Transition

To reach `(r, c)`, you must have come from either `(r-1, c)` or `(r, c-1)`.
You want the minimum sum, so you simply look at the accumulated cost of those two origins, pick the cheaper one, and add the current cell's cost.

`dp[r][c] = grid[r][c] + Math.min(dp[r-1][c], dp[r][c-1])`

### The Setup Trap

Unlike Unique Paths, where the edges are trivially `1`, the edges in Minimum Path Sum are accumulative.
- The top row can only be reached from the left. `dp[0][c] = dp[0][c-1] + grid[0][c]`.
- The left column can only be reached from above. `dp[r][0] = dp[r-1][0] + grid[r][0]`.

### Implementation (In-Place Optimization)

If the interviewer permits modifying the input matrix, Grid DP problems can often be solved with **O(1) Extra Space** by overwriting the input grid itself.

```ts
function minPathSum(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  // Fill top row (accumulative sum from left)
  for (let c = 1; c < n; c++) {
    grid[0][c] += grid[0][c - 1];
  }

  // Fill left column (accumulative sum from top)
  for (let r = 1; r < m; r++) {
    grid[r][0] += grid[r - 1][0];
  }

  // Fill the rest of the grid
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      grid[r][c] += Math.min(grid[r - 1][c], grid[r][c - 1]);
    }
  }

  return grid[m - 1][n - 1];
}
```

### The rule of thumb

If a grid problem only allows moving `Down` and `Right`, it is solvable with DP. 
If the problem allows moving `Up`, `Down`, `Left`, and `Right`, it is a **Graph** problem (cycles are possible). You cannot use DP. You must use BFS (unweighted) or Dijkstra (weighted).
