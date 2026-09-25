## Walk the Grid <span class="lv lv2"></span>

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

### Variations

- **Count maze paths, moves right and down only (Pepcoding / Unique Paths, LeetCode 62):** no marking needed, because right/down paths cannot loop. `count(r, c) = count(r+1, c) + count(r, c+1)`; memoise it (Chapter 17), or use `C(m + n − 2, m − 1)`
- **Maze path with obstacles (Unique Paths II, LeetCode 63):** the same count, returning 0 at a blocked cell
- **Maze path with jumps (Pepcoding):** the move set becomes "1..k cells right, 1..k down, 1..k diagonal": a loop inside the loop of directions
- **Word Search (LeetCode 79):** "usable" means the cell matches the next letter. Mark by overwriting the cell with `'#'`, restore it after the four calls
- **Longest possible route in a matrix with hurdles (GFG):** return `1 + max(child routes)` instead of collecting paths; `−∞` when the destination is unreachable
- **Shortest path in a grid:** *not* this pattern. Backtracking explores exponentially many paths; the shortest one needs BFS (Chapter 16)

### The failure

- **Checking validity before each call instead of at the top.** Four copies of the bounds-and-blocked test, one per direction, is where a `>=` becomes `>`. One check at the top of the function is written once
- **Forgetting to unmark.** Without `m[r][c] = 1` on the way out, every cell an earlier branch touched stays blocked, so "all paths" silently returns only some of them

:::interview
"How do you find all paths in a maze?" — Depth-first search over moves, with backtracking: at each cell I return early if it is outside, blocked or already on the current path; otherwise I mark it, recurse into every allowed move, and unmark it on the way out. If the question asks for the *shortest* path, I switch to BFS, because enumerating paths is exponential.
:::
