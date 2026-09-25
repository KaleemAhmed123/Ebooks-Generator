## Place, Check, Undo <span class="lv lv2"></span>

- **What it is:** Constraint puzzles fill one decision point at a time (a row, a cell, a vertex, a bucket). At each point, try every option, **check** it against O(1) bookkeeping, **place** it by updating the bookkeeping, recurse, then **undo** exactly what you placed
- **Signal:** "N-Queens", "solve the Sudoku", "colour the graph with at most m colours", "partition into k subsets with equal sum", "use all matchsticks to form a square", "knight's tour"
- **Why it works:** Each decision point narrows the rest, and a conflict found early kills a whole subtree. The speed comes from the check: keeping sets of used columns and diagonals (or row/column/box digits) makes each test O(1) instead of rescanning the board. Undo restores the bookkeeping so siblings see a clean state

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="4 queens. One queen per row. A cell r, c is attacked if column c, diagonal r minus c, or anti-diagonal r plus c is already used. Sets for columns, diagonals and anti-diagonals make each check constant time. A solution: queens at columns 1, 3, 0, 2." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .w { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .d { fill: #f0f0f0; stroke: #1a1a1a; stroke-width: 1; }
    .q { fill: #1d4e89; }
  </style>
  <rect class="w" x="20" y="12" width="24" height="24"/><rect class="d" x="44" y="12" width="24" height="24"/><rect class="w" x="68" y="12" width="24" height="24"/><rect class="d" x="92" y="12" width="24" height="24"/>
  <rect class="d" x="20" y="36" width="24" height="24"/><rect class="w" x="44" y="36" width="24" height="24"/><rect class="d" x="68" y="36" width="24" height="24"/><rect class="w" x="92" y="36" width="24" height="24"/>
  <rect class="w" x="20" y="60" width="24" height="24"/><rect class="d" x="44" y="60" width="24" height="24"/><rect class="w" x="68" y="60" width="24" height="24"/><rect class="d" x="92" y="60" width="24" height="24"/>
  <rect class="d" x="20" y="84" width="24" height="24"/><rect class="w" x="44" y="84" width="24" height="24"/><rect class="d" x="68" y="84" width="24" height="24"/><rect class="w" x="92" y="84" width="24" height="24"/>
  <circle class="q" cx="56" cy="24" r="7"/><circle class="q" cx="104" cy="48" r="7"/><circle class="q" cx="32" cy="72" r="7"/><circle class="q" cx="80" cy="96" r="7"/>
  <text x="150" y="28" class="lb">safe(r, c) ⇔ c ∉ cols</text>
  <text x="150" y="44" class="lb">           ∧ r − c ∉ diag</text>
  <text x="150" y="60" class="lb">           ∧ r + c ∉ anti</text>
  <text x="150" y="84" class="sm">place: add to all three sets → recurse on r + 1</text>
  <text x="150" y="98" class="sm">undo: delete from all three sets</text>
  <text x="150" y="116" class="sm">keys from page 05-01: a diagonal is r − c, an anti-diagonal r + c</text>
</svg>
:::

```ts
// N-Queens (LeetCode 51)
function solveNQueens(n: number): string[][] {
  const out: string[][] = [], colOf: number[] = [];
  const cols = new Set<number>();
  const diag = new Set<number>(), anti = new Set<number>();
  const row = (c: number) =>
    ".".repeat(c) + "Q" + ".".repeat(n - c - 1);
  const place = (r: number) => {
    if (r === n) { out.push(colOf.map(row)); return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c))
        continue;                                          // check
      cols.add(c); diag.add(r - c); anti.add(r + c);       // place
      colOf.push(c);
      place(r + 1);
      // undo
      cols.delete(c); diag.delete(r - c); anti.delete(r + c);
      colOf.pop();
    }
  };
  place(0);
  return out;
}
```

### Variations

- **Sudoku Solver (LeetCode 37):** decision points are empty cells; the check is three sets per digit (row, column, box `⌊r/3⌋·3 + ⌊c/3⌋`). Fill the cell with the fewest legal digits first to cut the tree sharply
- **M-Coloring Problem (GFG):** decision points are vertices; a colour is legal if no already-coloured neighbour has it
- **Partition to K Equal Sum Subsets (LeetCode 698) / Matchsticks to Square (LeetCode 473):** decision points are items; options are the k buckets. Sort items descending (big items fail fast), and skip a bucket whose current sum equals a bucket already tried at this level (equal siblings again, page 13-06)
- **The Knight's Tour (GFG):** decision points are moves; Warnsdorff's rule (try the square with the fewest onward moves first) finds a tour on large boards almost without backtracking

### The failure

- **Scanning the board to check a placement.** Walking up the column and both diagonals is O(n) per check; the sets make it O(1). For Sudoku, rescanning row, column and box costs 27 reads per try instead of three lookups
- **Undoing the wrong amount.** If "place" updates four structures, "undo" must revert all four in the same call. One forgotten `delete` leaves a phantom queen that silently blocks every later branch

:::interview
"Why is backtracking faster than brute force for N-Queens?" — Brute force would try all nⁿ (or n!) placements and check each at the end. Backtracking places one queen per row and rejects a square the moment it conflicts, so most partial boards die after a few rows. With column and diagonal sets each check is O(1); the search is still exponential, but n = 8 finishes in about 2,000 calls.
:::
