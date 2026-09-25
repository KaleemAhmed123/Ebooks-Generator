## State in the Cell <span class="lv lv2"></span>

- **What it is:** When every cell's new value depends on its neighbours' *old* values, and a copy of the grid is not allowed, store both values in the cell: the old one in bit 0, the new one in bit 1. Read with `& 1`, finish with `>> 1`
- **Signal:** "update the board simultaneously", "in place", "O(1) extra space", "if an element is 0, set its entire row and column to 0"
- **Why it works:** The update is a function of the old grid. Writing new values directly would let later cells read already-updated neighbours. Bit 0 keeps the old grid intact while bit 1 accumulates the new one; a final pass shifts every cell once. The same idea shows up as "use the first row and column as markers" when the extra state is one flag per row and per column

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Game of Life encoding. A cell value has two bits: bit 0 is the old state, bit 1 is the new state. 0 means dead stays dead, 1 means alive dies, 2 means dead becomes alive, 3 means alive stays alive. Neighbours are counted with value and 1, and the final pass shifts right by one." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="20" class="sm">cell value = (new ≪ 1) | old</text>
  <rect class="c" x="20" y="30" width="96" height="22"/><text x="68" y="45" class="lb" text-anchor="middle">0 = 00 dead→dead</text>
  <rect class="c" x="120" y="30" width="96" height="22"/><text x="168" y="45" class="lb" text-anchor="middle">1 = 01 live→dead</text>
  <rect class="hi" x="220" y="30" width="96" height="22"/><text x="268" y="45" class="lb" text-anchor="middle">2 = 10 dead→live</text>
  <rect class="hi" x="320" y="30" width="96" height="22"/><text x="368" y="45" class="lb" text-anchor="middle">3 = 11 live→live</text>
  <text x="20" y="74" class="lb">pass 1: read neighbours with  v &amp; 1   (old state only)</text>
  <text x="20" y="90" class="lb">pass 2: every cell  v &gt;&gt;= 1          (new state wins)</text>
</svg>
:::

```ts
// Game of Life (LeetCode 289), in place
function gameOfLife(b: number[][]): void {
  const R = b.length, C = b[0].length;
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) {
      let live = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          // old bit
          if (nr >= 0 && nr < R && nc >= 0 && nc < C)
            live += b[nr][nc] & 1;
        }
      const alive = b[r][c] & 1;
      // new bit
      if (live === 3 || (alive && live === 2)) b[r][c] |= 2;
    }
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) b[r][c] >>= 1;
}
```

### Variations

- **Set Matrix Zeroes (LeetCode 73):** the extra state is "row r has a zero" and "column c has a zero". Store those flags in row 0 and column 0 themselves. Row 0 and column 0 overlap at `[0][0]`, so keep one extra boolean for column 0, and clear row 0 and column 0 *last*
- **Rotting oranges, flood fills, "mark visited" in grids:** overwrite the cell (`'#'`, 2, −1) instead of a separate `visited` array, then restore it if the caller needs the grid back. Chapter 13 uses this in word search
- **Candy Crush (LeetCode 723):** mark every cell that belongs to a run of three by negating it, so it still matches its neighbours while the scan continues; crush and drop only after the whole board is marked. Same rule: if a cell must be read in its old form after it is written, it needs a second bit, a sign, or a second grid

### The failure

- **Updating in one pass without encoding.** A cell set to "alive" is counted as a live neighbour by the cells after it. On a blinker (three live cells in a row) the in-place naive update does not produce the vertical bar the rules require
- **Clearing row 0 first in Set Matrix Zeroes.** If row 0 holds a zero, zeroing it early erases the markers for every column, and the whole matrix ends up zero. Markers are the last thing you overwrite

:::interview
"Can you do Game of Life without a second grid?" — Yes. The cell values are only 0 or 1, so the upper bits are free. I write the next state into bit 1 while every neighbour count reads bit 0, then one pass shifts right. Time O(m·n), extra space O(1). If the board were infinite, I would switch to a set of live coordinates instead.
:::
