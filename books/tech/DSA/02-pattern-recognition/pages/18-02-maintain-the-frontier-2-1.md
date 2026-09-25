## Maintain the Frontier <span class="lv lv2"></span> - continued

:::mint
<svg viewBox="0 0 470 150" role="img" aria-label="A 4 by 4 elevation grid for Swim in Rising Water. Settled cells near the start are green, the frontier ring around them is blue, unknown cells are white. The frontier is a min-heap keyed by the highest elevation on the path so far. On the right, one loop with four selection rules: a queue gives BFS, a heap by summed cost gives Dijkstra, a heap by the maximum gives this page, a stack gives DFS." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .set { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
    .fr { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.4; }
    .un { fill: #ffffff; stroke: #c9c9c9; stroke-width: 1; }
    .rule { fill: #ffffff; stroke: #1a1a1a; stroke-width: 0.9; }
    .me { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.2; }
  </style>
  <g transform="translate(18,14)">
    <rect class="set" x="0" y="0" width="28" height="28"/><rect class="set" x="28" y="0" width="28" height="28"/><rect class="fr" x="56" y="0" width="28" height="28"/><rect class="un" x="84" y="0" width="28" height="28"/>
    <rect class="set" x="0" y="28" width="28" height="28"/><rect class="fr" x="28" y="28" width="28" height="28"/><rect class="un" x="56" y="28" width="28" height="28"/><rect class="un" x="84" y="28" width="28" height="28"/>
    <rect class="fr" x="0" y="56" width="28" height="28"/><rect class="un" x="28" y="56" width="28" height="28"/><rect class="un" x="56" y="56" width="28" height="28"/><rect class="un" x="84" y="56" width="28" height="28"/>
    <rect class="un" x="0" y="84" width="28" height="28"/><rect class="un" x="28" y="84" width="28" height="28"/><rect class="un" x="56" y="84" width="28" height="28"/><rect class="un" x="84" y="84" width="28" height="28"/>
    <text x="14" y="18" class="lb" text-anchor="middle">0</text><text x="42" y="18" class="lb" text-anchor="middle">2</text><text x="70" y="18" class="lb" text-anchor="middle">9</text><text x="98" y="18" class="lb" text-anchor="middle">4</text>
    <text x="14" y="46" class="lb" text-anchor="middle">1</text><text x="42" y="46" class="lb" text-anchor="middle">7</text><text x="70" y="46" class="lb" text-anchor="middle">3</text><text x="98" y="46" class="lb" text-anchor="middle">8</text>
    <text x="14" y="74" class="lb" text-anchor="middle">5</text><text x="42" y="74" class="lb" text-anchor="middle">6</text><text x="70" y="74" class="lb" text-anchor="middle">10</text><text x="98" y="74" class="lb" text-anchor="middle">11</text>
    <text x="14" y="102" class="lb" text-anchor="middle">12</text><text x="42" y="102" class="lb" text-anchor="middle">13</text><text x="70" y="102" class="lb" text-anchor="middle">14</text><text x="98" y="102" class="lb" text-anchor="middle">15</text>
  </g>
  <text x="18" y="142" class="sm">green settled · blue frontier · next pop: key 5</text>
  <text x="160" y="24" class="lb">the loop</text>
  <text x="160" y="40" class="sm">pop best → settle → push neighbours</text>
  <rect class="rule" x="160" y="52" width="140" height="18" rx="3"/><text x="166" y="64" class="lb">queue</text><text x="236" y="64" class="sm">→ BFS</text>
  <rect class="rule" x="160" y="74" width="140" height="18" rx="3"/><text x="166" y="86" class="lb">heap by Σ cost</text><text x="262" y="86" class="sm">→ Dijkstra</text>
  <rect class="me" x="160" y="96" width="140" height="18" rx="3"/><text x="166" y="108" class="lb">heap by max</text><text x="252" y="108" class="sm">→ this page</text>
  <rect class="rule" x="160" y="118" width="140" height="18" rx="3"/><text x="166" y="130" class="lb">stack</text><text x="236" y="130" class="sm">→ DFS</text>
  <text x="318" y="64" class="sm">all edges cost 1</text>
  <text x="318" y="86" class="sm">costs add up (Module 05)</text>
  <text x="318" y="108" class="sm">the worst step decides</text>
  <text x="318" y="130" class="sm">reachability only</text>
</svg>
:::

```ts
// Swim in Rising Water (LeetCode 778) · Heap: 15-11
function swimInWater(grid: number[][]): number {
  const n = grid.length, seen = grid.map(r => r.map(() => false));
  // [level,r,c]
  const heap = new Heap<number[]>((x, y) => x[0] < y[0]);
  heap.push([grid[0][0], 0, 0]);
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (heap.size() > 0) {
    const [level, r, c] = heap.pop()!;
    if (seen[r][c]) continue;          // stale entry
    // settled: its level is final
    seen[r][c] = true;
    if (r === n - 1 && c === n - 1) return level;
    for (const [dr, dc] of dirs) {
      const x = r + dr, y = c + dc;
      if (x < 0 || y < 0 || x >= n || y >= n) continue;
      if (seen[x][y]) continue;
      heap.push([Math.max(level, grid[x][y]), x, y]);
    }
  }
  return -1;
}
```
