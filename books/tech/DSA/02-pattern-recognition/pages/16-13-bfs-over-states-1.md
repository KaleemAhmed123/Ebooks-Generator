## BFS Over States <span class="lv lv2"></span>

- **What:** when the answer depends on more than position — keys held, budget left, steps used — make the **whole situation** the node. A state is `(place, extra)`, and BFS finds the fewest moves over states
- **Spot it:** "shortest path collecting all keys", "with at most k obstacles removed", "you may break one wall", a grid where the same cell is worth revisiting under different conditions
- **Why:** two visits to the same cell are genuinely different if the carried information differs. Keying `visited` on the full state, not the cell, lets BFS reach a cell again when it arrives better-equipped — while still never repeating an identical situation

:::mint
<svg viewBox="0 0 470 128" role="img" aria-label="A cell C reached with two different budgets. Visiting C with 1 elimination left and again with 0 left are two distinct states, so both are explored. Keying visited only by cell would block the second, cheaper-later arrival. The state is the pair cell plus remaining budget." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .s1 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .s2 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .cell { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .e { stroke: #6b6b6b; stroke-width: 1; }
  </style>
  <defs><marker id="s1613" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#6b6b6b"/></marker></defs>
  <rect class="cell" x="30" y="52" width="56" height="26" rx="4"/><text x="58" y="69" class="lb" text-anchor="middle">cell C</text>
  <line class="e" x1="86" y1="60" x2="150" y2="34" marker-end="url(#s1613)"/>
  <line class="e" x1="86" y1="70" x2="150" y2="96" marker-end="url(#s1613)"/>
  <rect class="s1" x="150" y="20" width="120" height="28" rx="4"/><text x="210" y="38" class="lb" text-anchor="middle">(C, rem = 1)</text>
  <rect class="s2" x="150" y="84" width="120" height="28" rx="4"/><text x="210" y="102" class="lb" text-anchor="middle">(C, rem = 0)</text>
  <text x="290" y="30" class="sm">same cell, different budget</text>
  <text x="290" y="46" class="sm">→ two distinct states</text>
  <text x="290" y="86" class="lb" fill="#1d4e89">visited keyed on (cell, rem)</text>
  <text x="290" y="104" class="sm">not on cell alone</text>
</svg>
:::

```ts
// Shortest Path in a Grid with Obstacle Elimination (LeetCode 1293)
function shortestPath(grid: number[][], k: number): number {
  const m = grid.length, n = grid[0].length;
  if (m === 1 && n === 1) return 0;
  const seen = new Set<string>();                       // key = "r,c,remaining"
  let q: [number, number, number][] = [[0, 0, k]];
  seen.add(`0,0,${k}`);
  let steps = 0;
  while (q.length) {
    steps++;
    const next: [number, number, number][] = [];
    for (const [r, c, rem] of q) {
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const x = r + dr, y = c + dc;
        if (x < 0 || y < 0 || x >= m || y >= n) continue;
        const nrem = rem - grid[x][y];                  // spend one if it is a wall
        if (nrem < 0) continue;                          // out of budget
        if (x === m - 1 && y === n - 1) return steps;
        const key = `${x},${y},${nrem}`;
        if (seen.has(key)) continue;                     // this exact state seen
        seen.add(key); next.push([x, y, nrem]);
      }
    }
    q = next;
  }
  return -1;
}
```

- **Watch out:** keying `visited` on the cell alone is the classic bug — it blocks a later path that reaches the cell with more budget and could have finished. The state must carry every piece of info that changes what happens next, and no more (extra state explodes the search)
