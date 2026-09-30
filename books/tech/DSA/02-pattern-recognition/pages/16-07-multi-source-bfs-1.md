## Multi-Source BFS <span class="lv lv1"></span>

- **What:** push **every** source into the queue before the first step. One BFS then spreads all wavefronts at once, and each cell is claimed by its nearest source
- **Spot it:** "distance to the nearest X", "time for all cells to be filled/rotten", "how many minutes until everything is reached"
- **Why:** seeding all sources at distance 0 is the same as one super-source wired to every source with a free edge. The rings still grow by one, so the first arrival is the minimum over *all* sources — no per-source BFS needed

:::mint
<svg viewBox="0 0 470 128" role="img" aria-label="Rotting oranges. A 3 by 3 grid with two rotten cells seeded at distance 0. Minute by minute the rot spreads to 4-neighbours. All rotten sources start in the queue together, so each fresh orange takes the time of the nearest source. The last fresh orange rots at minute 2." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .s { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.3; }
    .d1 { fill: #fff4d6; stroke: #8a5a00; stroke-width: 1.1; }
    .d2 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .empty { fill: #ffffff; stroke: #c9c9c9; stroke-width: 1; }
  </style>
  <g transform="translate(30,12)">
    <rect class="s" x="0" y="0" width="30" height="30"/><text x="15" y="19" class="lb" text-anchor="middle">0</text>
    <rect class="d1" x="30" y="0" width="30" height="30"/><text x="45" y="19" class="lb" text-anchor="middle">1</text>
    <rect class="empty" x="60" y="0" width="30" height="30"/>
    <rect class="d1" x="0" y="30" width="30" height="30"/><text x="15" y="49" class="lb" text-anchor="middle">1</text>
    <rect class="d2" x="30" y="30" width="30" height="30"/><text x="45" y="49" class="lb" text-anchor="middle">2</text>
    <rect class="d1" x="60" y="30" width="30" height="30"/><text x="75" y="49" class="lb" text-anchor="middle">1</text>
    <rect class="d2" x="0" y="60" width="30" height="30"/><text x="15" y="79" class="lb" text-anchor="middle">2</text>
    <rect class="d1" x="30" y="60" width="30" height="30"/><text x="45" y="79" class="lb" text-anchor="middle">1</text>
    <rect class="s" x="60" y="60" width="30" height="30"/><text x="75" y="79" class="lb" text-anchor="middle">0</text>
  </g>
  <text x="150" y="26" class="lb" fill="#ef476e">queue seeded with BOTH sources</text>
  <text x="150" y="44" class="sm">distance 0: two rotten cells</text>
  <text x="150" y="66" class="lb" fill="#8a5a00">minute 1: their neighbours</text>
  <text x="150" y="88" class="lb" fill="#2d6a4f">minute 2: last fresh cell rots</text>
  <text x="150" y="110" class="lb">answer = 2 (the deepest ring)</text>
</svg>
:::

```ts
// Rotting Oranges (LeetCode 994): 2 rotten, 1 fresh, 0 empty
function orangesRotting(grid: number[][]): number {
  const m = grid.length, n = grid[0].length, q: number[][] = [];
  let fresh = 0;
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) {
    if (grid[r][c] === 2) q.push([r, c]);             // ALL sources seeded first
    else if (grid[r][c] === 1) fresh++;
  }
  let minutes = 0;
  for (let h = 0; h < q.length && fresh > 0; ) {
    const size = q.length;
    for (; h < size; h++) {                            // drain one ring
      const [r, c] = q[h];
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const x = r + dr, y = c + dc;
        if (x >= 0 && y >= 0 && x < m && y < n && grid[x][y] === 1) {
          grid[x][y] = 2; fresh--; q.push([x, y]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;                   // leftover fresh = unreachable
}
```

- **Watch out:** running a separate BFS from each source is O(sources × cells) and picks up wrong answers where waves meet. Seed once; the shared frontier is the whole point
