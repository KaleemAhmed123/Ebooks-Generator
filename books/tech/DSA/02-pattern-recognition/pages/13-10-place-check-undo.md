## Place, Check, Undo <span class="lv lv2"></span>

- **What:** per decision point, try each option: **check** in O(1), **place**, recurse, **undo**
- **Spot it:** no two queens share a line; Sudoku; k groups of equal sum. Only a running total → 13-06
- **Why:** a conflict found early kills a whole subtree, and sets of used columns and diagonals make each check O(1)

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
  <text x="150" y="116" class="sm">keys from Coordinate Keys: a diagonal is r − c, an anti-diagonal r + c</text>
</svg>
:::

```ts
// N-Queens (LeetCode 51)
function solveNQueens(n: number): string[][] {
  const out: string[][] = [], colOf: number[] = [];
  const cols = new Set<number>();
  const diag = new Set<number>(), anti = new Set<number>();
  const row = (c: number) => ".".repeat(c) + "Q" + ".".repeat(n - c - 1);
  const place = (r: number) => {
    if (r === n) { out.push(colOf.map(row)); return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c)) continue;
      cols.add(c); diag.add(r - c); anti.add(r + c); colOf.push(c);
      place(r + 1);
      cols.delete(c); diag.delete(r - c); anti.delete(r + c);  // undo
      colOf.pop();
    }
  };
  place(0);
  return out;
}
```

- **Watch out:** undo all four sets you updated. One forgotten `delete` leaves a phantom queen
- **Also solves:** [Sudoku Solver](https://leetcode.com/problems/sudoku-solver/) (LeetCode 37) (fewest options first) · [Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) (LeetCode 698) (sort descending)
