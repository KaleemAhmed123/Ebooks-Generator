## Staircase Search <span class="lv lv1"></span>

- **What:** rows sorted left to right, columns top to bottom: start at the top-right. Too big, step left; too small, step down. Each comparison drops a row or a column
- **Spot it:** rows and columns sorted *separately*; "count the cells ≤ x"; "the row with the most 1s". Each row starts above the previous row's end: one binary search → 05-01
- **Why:** at the top-right, everything to the left is smaller and everything below is larger, so one comparison rules out a whole line: O(m + n)

:::mint
<svg viewBox="0 0 470 112" role="img" aria-label="Staircase search for 16 in the matrix 1 4 7, 2 5 20, 3 16 22. Start at the top-right 7: 7 is less than 16, so row 0 is ruled out and the walk moves down to 20. 20 is greater than 16, so column 2 is ruled out and the walk moves left to 5. 5 is less than 16, so row 1 is ruled out and the walk moves down to 16, the target. Ruled-out cells are grey; 3 is never examined." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .gy { font: 9.5px Consolas, monospace; fill: #9a9a9a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .x { fill: #f1f1f1; stroke: #9a9a9a; stroke-width: 1; }
    .v { fill: #f1f1f1; stroke: #1d4e89; stroke-width: 1.6; }
    .ok { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.6; }
    .p { stroke: #1d4e89; stroke-width: 1.3; fill: none; }
  </style>
  <defs><marker id="m0504" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <rect class="x" x="20" y="16" width="34" height="26"/><text x="37" y="34" class="gy" text-anchor="middle">1</text>
  <rect class="x" x="54" y="16" width="34" height="26"/><text x="71" y="34" class="gy" text-anchor="middle">4</text>
  <rect class="v" x="88" y="16" width="34" height="26"/><text x="105" y="34" class="lb" text-anchor="middle">7</text>
  <rect class="x" x="20" y="42" width="34" height="26"/><text x="37" y="60" class="gy" text-anchor="middle">2</text>
  <rect class="v" x="54" y="42" width="34" height="26"/><text x="71" y="60" class="lb" text-anchor="middle">5</text>
  <rect class="v" x="88" y="42" width="34" height="26"/><text x="105" y="60" class="lb" text-anchor="middle">20</text>
  <rect class="c" x="20" y="68" width="34" height="26"/><text x="37" y="86" class="lb" text-anchor="middle">3</text>
  <rect class="ok" x="54" y="68" width="34" height="26"/><text x="71" y="86" class="lb" text-anchor="middle">16</text>
  <rect class="x" x="88" y="68" width="34" height="26"/><text x="105" y="86" class="gy" text-anchor="middle">22</text>
  <path class="p" d="M 117 36 L 117 49" marker-end="url(#m0504)"/>
  <path class="p" d="M 97 48 L 83 48" marker-end="url(#m0504)"/>
  <path class="p" d="M 83 62 L 83 75" marker-end="url(#m0504)"/>
  <text x="150" y="28" class="sm">target 16, start at the top-right corner</text>
  <text x="150" y="43" class="lb">1.  7 &lt; 16 → all of row 0 is too small: down</text>
  <text x="150" y="58" class="lb">2.  20 &gt; 16 → all of column 2 is too big: left</text>
  <text x="150" y="73" class="lb">3.  5 &lt; 16 → the rest of row 1 is too small: down</text>
  <text x="150" y="88" class="lb">4.  16 = 16 → found after 4 comparisons</text>
  <text x="20" y="106" class="sm">grey: ruled out by a single comparison · 3 is never read</text>
</svg>
:::

```ts
// Search a 2D Matrix II (LeetCode 240)
function searchMatrix(m: number[][], target: number): boolean {
  let r = 0, c = m[0].length - 1;          // top-right corner
  while (r < m.length && c >= 0) {
    if (m[r][c] === target) return true;
    // column c below r is all larger
    if (m[r][c] > target) c--;
    // row r left of c is all smaller
    else r++;
  }
  return false;
}
```

- **Watch out:** starting at the top-left. Both moves increase the value, so a comparison never says which way to go. Only the top-right and bottom-left corners work
### Where it appears

| Problem | What the staircase eliminates |
|---|---|
| [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/) (LeetCode 240) | a row or column per comparison |
| [Count Negative Numbers in a Sorted Matrix](https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/) (LeetCode 1351) | start bottom-left; add `n − c` per step |
| [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) (LeetCode 378) | staircase counts cells ≤ x; binary search on x (→ 09-04) |

:::interview
"Why start at the top-right and not the top-left?"

At the top-left, both right and down lead to larger values — a comparison cannot tell you which way to go. At the top-right, left is smaller and down is larger, so each comparison rules out exactly one row or column. The bottom-left corner works too, for the same reason.
:::
