## Walk the Grid 🟡

- **What it is:** Maze and path problems on a grid share one skeleton: from `(r, c)`, check whether the cell is usable, mark it, try each allowed move, unmark it. The only things that change between problems are the move set, what "usable" means, and whether you count, collect or optimise paths
- **Signal:** "rat in a maze", "print all paths from top-left to bottom-right", "maze with obstacles", "maze with jumps", "word search in a grid", "longest route avoiding hurdles"
- **Why it works:** A path is a sequence of moves, so the search is a tree whose branches are moves. Marking the current cell forbids revisits along *this* path only; unmarking on return lets other paths use it. Putting every validity check at the top of the call ("is it out of bounds, blocked or visited?") keeps each move a one-line call

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="Rat in a maze, 4 by 4 grid with open and blocked cells. From the top-left, moves are tried in the order D, L, R, U. Two paths reach the bottom-right: DDRDRR and DRDDRR. Blocked cells are dark; the current path is marked so it cannot revisit itself." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .o { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .x { fill: #1a1a1a; }
    .p { stroke: #1d4e89; stroke-width: 2; fill: none; }
  </style>
  <rect class="o" x="20" y="12" width="24" height="24"/><rect class="x" x="44" y="12" width="24" height="24"/><rect class="x" x="68" y="12" width="24" height="24"/><rect class="x" x="92" y="12" width="24" height="24"/>
  <rect class="o" x="20" y="36" width="24" height="24"/><rect class="o" x="44" y="36" width="24" height="24"/><rect class="x" x="68" y="36" width="24" height="24"/><rect class="o" x="92" y="36" width="24" height="24"/>
  <rect class="o" x="20" y="60" width="24" height="24"/><rect class="o" x="44" y="60" width="24" height="24"/><rect class="x" x="68" y="60" width="24" height="24"/><rect class="x" x="92" y="60" width="24" height="24"/>
  <rect class="x" x="20" y="84" width="24" height="24"/><rect class="o" x="44" y="84" width="24" height="24"/><rect class="o" x="68" y="84" width="24" height="24"/><rect class="o" x="92" y="84" width="24" height="24"/>
  <path class="p" d="M 32 24 L 32 72 L 56 72 L 56 96 L 104 96"/>
  <text x="150" y="30" class="lb">paths (D, L, R, U order):</text>
  <text x="150" y="48" class="lb">DDRDRR</text>
  <text x="150" y="64" class="lb">DRDDRR</text>
  <text x="150" y="90" class="sm">drawn: DDRDRR</text>
  <text x="300" y="30" class="sm">at the top of every call:</text>
  <text x="300" y="44" class="sm">out of bounds? blocked? visited?</text>
  <text x="300" y="56" class="sm">→ return</text>
  <text x="300" y="80" class="sm">mark → try moves → unmark</text>
</svg>
:::

```ts
// Rat in a Maze (GFG): all paths, moves in "DLRU" order
function findPaths(m: number[][]): string[] {
  const n = m.length, out: string[] = [];
  const moves: [string, number, number][] =
    [["D", 1, 0], ["L", 0, -1], ["R", 0, 1], ["U", -1, 0]];
  const go = (r: number, c: number, path: string) => {
    if (r < 0 || c < 0 || r >= n || c >= n || m[r][c] !== 1) return;
    if (r === n - 1 && c === n - 1) { out.push(path); return; }
    // mark: on this path
    m[r][c] = 2;
    for (const [d, dr, dc] of moves) go(r + dr, c + dc, path + d);
    // unmark for other paths
    m[r][c] = 1;
  };
  go(0, 0, "");
  return out;
}
```
