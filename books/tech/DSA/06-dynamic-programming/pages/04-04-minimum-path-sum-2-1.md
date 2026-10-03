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
