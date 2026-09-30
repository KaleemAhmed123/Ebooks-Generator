## Flood the Component <span class="lv lv1"></span>

- **What:** a component is one connected blob of the same kind. Walk it fully, marking each cell visited, and every fresh start is one new component
- **Spot it:** "number of islands", "provinces", "connected groups", "regions of one colour", "friend circles"
- **Why:** mark on discovery and each cell is entered once; the count of fresh starts is the count of components. O(m · n) over a grid, O(V + E) over a graph

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="A 3 by 5 grid of land and water. Two land blobs: the top-left blob of four cells is flooded green as component 1, the bottom-right blob of three cells is flooded blue as component 2. A scan in reading order hits the first unvisited land cell of each blob and starts a flood, so two fresh starts give two components." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .water { fill: #ffffff; stroke: #c9c9c9; stroke-width: 1; }
    .c1 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .c2 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .seed { fill: none; stroke: #ef476e; stroke-width: 2; }
  </style>
  <g transform="translate(24,14)">
    <rect class="c1" x="0" y="0" width="28" height="28"/><rect class="c1" x="28" y="0" width="28" height="28"/><rect class="water" x="56" y="0" width="28" height="28"/><rect class="water" x="84" y="0" width="28" height="28"/><rect class="water" x="112" y="0" width="28" height="28"/>
    <rect class="c1" x="0" y="28" width="28" height="28"/><rect class="c1" x="28" y="28" width="28" height="28"/><rect class="water" x="56" y="28" width="28" height="28"/><rect class="water" x="84" y="28" width="28" height="28"/><rect class="c2" x="112" y="28" width="28" height="28"/>
    <rect class="water" x="0" y="56" width="28" height="28"/><rect class="water" x="28" y="56" width="28" height="28"/><rect class="water" x="56" y="56" width="28" height="28"/><rect class="c2" x="84" y="56" width="28" height="28"/><rect class="c2" x="112" y="56" width="28" height="28"/>
    <rect class="seed" x="0" y="0" width="28" height="28"/>
    <rect class="seed" x="112" y="28" width="28" height="28"/>
  </g>
  <text x="180" y="30" class="lb">scan reading order →</text>
  <text x="180" y="48" class="sm">first unvisited land = a fresh start</text>
  <text x="180" y="70" class="lb" fill="#2d6a4f">start 1 floods the green blob</text>
  <text x="180" y="88" class="lb" fill="#1d4e89">start 2 floods the blue blob</text>
  <text x="180" y="112" class="lb" fill="#ef476e">2 fresh starts → 2 components</text>
</svg>
:::

```ts
// Number of Islands (LeetCode 200): '1' land, '0' water
function numIslands(grid: string[][]): number {
  const m = grid.length, n = grid[0].length, stack: number[][] = [];
  let count = 0;
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) {
    if (grid[r][c] !== "1") continue;
    count++; grid[r][c] = "0"; stack.push([r, c]);   // fresh start; sink on discovery
    while (stack.length) {
      const [i, j] = stack.pop()!;
      for (const [di, dj] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const x = i + di, y = j + dj;
        if (x >= 0 && y >= 0 && x < m && y < n && grid[x][y] === "1") {
          grid[x][y] = "0"; stack.push([x, y]);       // mark BEFORE pushing
        }
      }
    }
  }
  return count;
}
```

- **Watch out:** mark a cell visited when you *push* it, not when you pop it. Marking on pop lets the same cell enter the stack from two neighbours, and the walk degrades toward O((mn)²)
