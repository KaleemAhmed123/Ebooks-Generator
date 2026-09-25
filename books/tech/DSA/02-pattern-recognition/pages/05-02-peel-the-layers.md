## Peel the Layers <span class="lv lv1"></span>

- **What it is:** Treat a matrix as nested rings. Keep four boundaries (`top`, `bottom`, `left`, `right`), walk one side, then pull that boundary inward. Rotations use the same ring view, or its shortcut: two reflections
- **Signal:** "return the elements in spiral order", "fill an n×n matrix in spiral order", "rotate the image 90° in place", "print the boundary", "rotate each ring by k"
- **Why it works:** After the top row is walked it is never needed again, so `top++` removes it from the problem. Each of the four walks shrinks the rectangle by one row or column, and the loop ends when the rectangle is empty. Every cell is visited exactly once, with no `visited` grid

:::mint
<svg viewBox="0 0 470 128" role="img" aria-label="Spiral order on a 3 by 4 matrix with values 1 to 12. Walk the top row 1 2 3 4 then top increases, walk the right column 8 12 then right decreases, walk the bottom row 11 10 9 then bottom decreases, walk the left column 5 then left increases, and finally 6 7. Beside it, rotating 90 degrees clockwise equals transpose then reverse each row." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .p { stroke: #1d4e89; stroke-width: 1.6; fill: none; }
  </style>
  <defs><marker id="m0502" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <g>
    <rect class="c" x="20" y="12" width="30" height="26"/><text x="35" y="29" class="lb" text-anchor="middle">1</text>
    <rect class="c" x="50" y="12" width="30" height="26"/><text x="65" y="29" class="lb" text-anchor="middle">2</text>
    <rect class="c" x="80" y="12" width="30" height="26"/><text x="95" y="29" class="lb" text-anchor="middle">3</text>
    <rect class="c" x="110" y="12" width="30" height="26"/><text x="125" y="29" class="lb" text-anchor="middle">4</text>
    <rect class="c" x="20" y="38" width="30" height="26"/><text x="35" y="55" class="lb" text-anchor="middle">5</text>
    <rect class="c" x="50" y="38" width="30" height="26"/><text x="65" y="55" class="lb" text-anchor="middle">6</text>
    <rect class="c" x="80" y="38" width="30" height="26"/><text x="95" y="55" class="lb" text-anchor="middle">7</text>
    <rect class="c" x="110" y="38" width="30" height="26"/><text x="125" y="55" class="lb" text-anchor="middle">8</text>
    <rect class="c" x="20" y="64" width="30" height="26"/><text x="35" y="81" class="lb" text-anchor="middle">9</text>
    <rect class="c" x="50" y="64" width="30" height="26"/><text x="65" y="81" class="lb" text-anchor="middle">10</text>
    <rect class="c" x="80" y="64" width="30" height="26"/><text x="95" y="81" class="lb" text-anchor="middle">11</text>
    <rect class="c" x="110" y="64" width="30" height="26"/><text x="125" y="81" class="lb" text-anchor="middle">12</text>
  </g>
  <path class="p" d="M 28 20 L 132 20 L 132 76 L 28 76 L 28 48 L 100 48" marker-end="url(#m0502)"/>
  <text x="20" y="106" class="sm">1 2 3 4 · 8 12 · 11 10 9 · 5 · 6 7</text>
  <text x="20" y="120" class="sm">after each side: top++, right−−, bottom−−, left++</text>
  <text x="180" y="30" class="lb">rotate 90° clockwise, in place:</text>
  <text x="180" y="50" class="lb">1. transpose      a[r][c] ↔ a[c][r]</text>
  <text x="180" y="66" class="lb">2. reverse each row</text>
  <text x="180" y="90" class="sm">counter-clockwise: transpose, then reverse each column</text>
  <text x="180" y="104" class="sm">(or reverse each row first, then transpose)</text>
</svg>
:::

```ts
// Spiral Matrix (LeetCode 54)
function spiralOrder(m: number[][]): number[] {
  const out: number[] = [];
  let top = 0, bottom = m.length - 1;
  let left = 0, right = m[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(m[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) out.push(m[r][right]);
    right--;
    // a row is still left
    if (top <= bottom) {
      for (let c = right; c >= left; c--) out.push(m[bottom][c]);
      bottom--;
    }
    // a column is still left
    if (left <= right) {
      for (let r = bottom; r >= top; r--) out.push(m[r][left]);
      left++;
    }
  }
  return out;
}
```

### Variations

- **Spiral Matrix II (LeetCode 59):** the same four walks, writing `1, 2, 3, …` instead of reading
- **Rotate Image (LeetCode 48):** transpose (swap `a[r][c]` with `a[c][r]` for `c > r`), then reverse every row. Both steps are in place; together they are the 2-D form of "reverse to rotate" (page 04-03)
- **Boundary traversal of a matrix (GFG):** a single ring of the spiral: one iteration of the `while` loop
- **Rotate each ring by k:** copy one ring into a list in spiral order, rotate that list by k (page 04-03), write it back in the same order. Every ring shrinks the problem as in the template

### The failure

- **Double-counting a single row or column.** Drop the two `if` guards and a 3×1 matrix returns `[1, 2, 3, 2]`: the left-column walk reads the middle cell back (on a 1×3 matrix the bottom-row walk does the same, giving `[1, 2, 3, 2, 1]`). The guards re-check the rectangle after each side, not once per loop
- **Rotating by writing into the same matrix cell by cell.** `a[c][n−1−r] = a[r][c]` overwrites values that have not been read yet. Either use four-way swaps per ring or the transpose-and-reverse pair

:::interview
"How do you rotate an n×n matrix in place?" — A 90° clockwise turn equals a transpose followed by reversing each row. Both are swaps on the matrix itself, so the extra space is O(1) and the time is O(n²), which is optimal because every cell moves. For the spiral, I shrink four boundaries and never need a visited grid.
:::
