## Grid DP <span class="lv lv1"></span>

- **What:** each cell's best answer is its own value plus the best of the cells that can step into it. With right/down moves, that is the cell above and the cell to the left. Fill in reading order
- **Spot it:** "min / max path sum", "count paths top-left to bottom-right", "moves only right or down", "unique paths with obstacles"
- **Why:** a cell depends only on cells already filled, so one sweep settles the grid. Only the previous row is ever needed → collapse to a single rolling row, O(n) space

:::mint
<svg viewBox="0 0 470 138" role="img" aria-label="Minimum Path Sum on a 3 by 3 grid of costs. The dp value of a cell is its cost plus the smaller of the cell above and the cell to the left. Cell (1,1) with cost 5 takes min of dp above 4 and dp left 2, giving 2, so dp is 7. The bottom-right dp is 7, the minimum path total." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .cost { fill: #ffffff; stroke: #c9c9c9; stroke-width: 1; }
    .dp { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .foc { fill: #fff4d6; stroke: #8a5a00; stroke-width: 1.5; }
    .a { stroke: #1d4e89; stroke-width: 1.4; }
  </style>
  <defs><marker id="g1708" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <g transform="translate(24,14)">
    <rect class="dp" x="0" y="0" width="40" height="30"/><text x="20" y="20" class="lb" text-anchor="middle">1</text>
    <rect class="dp" x="40" y="0" width="40" height="30"/><text x="60" y="20" class="lb" text-anchor="middle">4</text>
    <rect class="dp" x="80" y="0" width="40" height="30"/><text x="100" y="20" class="lb" text-anchor="middle">5</text>
    <rect class="dp" x="0" y="30" width="40" height="30"/><text x="20" y="50" class="lb" text-anchor="middle">2</text>
    <rect class="foc" x="40" y="30" width="40" height="30"/><text x="60" y="50" class="lb" text-anchor="middle">7</text>
    <rect class="cost" x="80" y="30" width="40" height="30"/><text x="100" y="50" class="lb" text-anchor="middle">·</text>
    <rect class="cost" x="0" y="60" width="40" height="30"/><text x="20" y="80" class="lb" text-anchor="middle">6</text>
    <rect class="cost" x="40" y="60" width="40" height="30"/><text x="60" y="80" class="lb" text-anchor="middle">·</text>
    <rect class="dp" x="80" y="60" width="40" height="30"/><text x="100" y="80" class="lb" text-anchor="middle">7</text>
    <line class="a" x1="60" y1="30" x2="60" y2="12" marker-end="url(#g1708)"/>
    <line class="a" x1="40" y1="45" x2="24" y2="45" marker-end="url(#g1708)"/>
  </g>
  <text x="150" y="30" class="lb" fill="#8a5a00">cell cost 5, dp = ?</text>
  <text x="150" y="48" class="sm">above dp 4, left dp 2</text>
  <text x="150" y="66" class="lb">dp = 5 + min(4, 2) = 7</text>
  <text x="150" y="92" class="sm">first row/col: only one way in</text>
  <text x="150" y="110" class="lb" fill="#2d6a4f">bottom-right dp = the answer</text>
</svg>
:::

```ts
// Minimum Path Sum (LeetCode 64): move right or down, minimise total
function minPathSum(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  const dp = new Array(n).fill(Infinity);
  dp[0] = 0;                                            // seed before the first row
  for (let r = 0; r < m; r++) {
    dp[0] += grid[r][0];                                // top edge: only from above
    for (let c = 1; c < n; c++)
      dp[c] = grid[r][c] + Math.min(dp[c], dp[c - 1]);  // dp[c] is "above", dp[c-1] is "left"
  }
  return dp[n - 1];
}
```

- **Watch out:** the first row and first column have a single entry path — handle them before the general `min(above, left)`, or a stray `Infinity`/0 leaks in. For **counting** paths, replace `min` with `+` and seed the edges with 1
