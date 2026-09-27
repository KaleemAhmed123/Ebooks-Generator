## Coordinate Keys <span class="lv lv1"></span>

- **What:** one formula turns `(r, c)` into a key, and cells sharing a key belong together: a diagonal `r − c`, an anti-diagonal `r + c`, a box `⌊r/3⌋·3 + ⌊c/3⌋`, a flat index `r·C + c`
- **Spot it:** cells grouped by diagonal or 3×3 box; "each row starts above the previous row's end"; "reshape", "shift the grid". Rows and columns sorted separately → 05-04
- **Why:** along a diagonal both `r` and `c` grow by 1, so `r − c` is fixed. Once the key is a number, one pass with a map groups the cells; nothing walks a diagonal by hand

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="A 4 by 4 grid labelled with r minus c. Each top-left to bottom-right diagonal shares one value: 0 on the main diagonal, positive below it, negative above it. Beside it the four standard keys: r times cols plus c for flattening, r minus c for diagonals, r plus c for anti-diagonals, and floor r over 3 times 3 plus floor c over 3 for sudoku boxes." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .d0 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
    .d1 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
  </style>
  <rect class="d0" x="20" y="12" width="26" height="26"/><text x="33" y="29" class="lb" text-anchor="middle">0</text>
  <rect class="c" x="46" y="12" width="26" height="26"/><text x="59" y="29" class="lb" text-anchor="middle">−1</text>
  <rect class="c" x="72" y="12" width="26" height="26"/><text x="85" y="29" class="lb" text-anchor="middle">−2</text>
  <rect class="c" x="98" y="12" width="26" height="26"/><text x="111" y="29" class="lb" text-anchor="middle">−3</text>
  <rect class="d1" x="20" y="38" width="26" height="26"/><text x="33" y="55" class="lb" text-anchor="middle">1</text>
  <rect class="d0" x="46" y="38" width="26" height="26"/><text x="59" y="55" class="lb" text-anchor="middle">0</text>
  <rect class="c" x="72" y="38" width="26" height="26"/><text x="85" y="55" class="lb" text-anchor="middle">−1</text>
  <rect class="c" x="98" y="38" width="26" height="26"/><text x="111" y="55" class="lb" text-anchor="middle">−2</text>
  <rect class="c" x="20" y="64" width="26" height="26"/><text x="33" y="81" class="lb" text-anchor="middle">2</text>
  <rect class="d1" x="46" y="64" width="26" height="26"/><text x="59" y="81" class="lb" text-anchor="middle">1</text>
  <rect class="d0" x="72" y="64" width="26" height="26"/><text x="85" y="81" class="lb" text-anchor="middle">0</text>
  <rect class="c" x="98" y="64" width="26" height="26"/><text x="111" y="81" class="lb" text-anchor="middle">−1</text>
  <rect class="c" x="20" y="90" width="26" height="26"/><text x="33" y="107" class="lb" text-anchor="middle">3</text>
  <rect class="c" x="46" y="90" width="26" height="26"/><text x="59" y="107" class="lb" text-anchor="middle">2</text>
  <rect class="d1" x="72" y="90" width="26" height="26"/><text x="85" y="107" class="lb" text-anchor="middle">1</text>
  <rect class="d0" x="98" y="90" width="26" height="26"/><text x="111" y="107" class="lb" text-anchor="middle">0</text>
  <text x="20" y="128" class="sm">each cell shows r − c</text>
  <text x="160" y="28" class="lb">flat index    k = r · cols + c</text>
  <text x="160" y="44" class="sm">              r = ⌊k / cols⌋, c = k % cols</text>
  <text x="160" y="66" class="lb">diagonal      r − c</text>
  <text x="160" y="84" class="lb">anti-diagonal r + c</text>
  <text x="160" y="106" class="lb">3×3 box       ⌊r/3⌋ · 3 + ⌊c/3⌋</text>
</svg>
:::

```ts
// Sort the Matrix Diagonally (LeetCode 1329)
function diagonalSort(mat: number[][]): number[][] {
  const groups = new Map<number, number[]>();
  for (let r = 0; r < mat.length; r++)
    for (let c = 0; c < mat[0].length; c++) {
      const key = r - c;                 // same key = same diagonal
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(mat[r][c]);
    }
  for (const g of groups.values()) g.sort((a, b) => b - a); // pop = smallest
  for (let r = 0; r < mat.length; r++)
    for (let c = 0; c < mat[0].length; c++)
      mat[r][c] = groups.get(r - c)!.pop()!;
  return mat;
}
```

- **Watch out:** `r = ⌊k / cols⌋`, never `⌊k / rows⌋`. On a square matrix both agree, so the bug passes every square test and fails the first 2×3 one
### Where it appears

| Problem | Which key formula |
|---|---|
| [Sort the Matrix Diagonally](https://leetcode.com/problems/sort-the-matrix-diagonally/) (LeetCode 1329) | `r − c` groups each diagonal |
| [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) (LeetCode 74) | `r·C + c` flattens to a 1-D binary search |
| [Diagonal Traverse](https://leetcode.com/problems/diagonal-traverse/) (LeetCode 498) | `r + c` groups anti-diagonals; reverse alternating |
| [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/) (LeetCode 36) | `⌊r/3⌋·3 + ⌊c/3⌋` for box membership |
| [Shift 2D Grid](https://leetcode.com/problems/shift-2d-grid/) (LeetCode 1260) | flatten, rotate, unflatten with `k/C` and `k%C` |

:::interview
"Why can Search a 2D Matrix use a flat binary search but Search a 2D Matrix II cannot?"

In LeetCode 74, the first element of each row is greater than the last element of the previous row — the entire matrix is one sorted sequence. Flattening with `r·C + c` preserves order. In LeetCode 240, rows and columns are sorted independently — cell (1, 0) can be smaller than cell (0, 2) — so no single index orders all cells. Use staircase search (05-04) instead.
:::
