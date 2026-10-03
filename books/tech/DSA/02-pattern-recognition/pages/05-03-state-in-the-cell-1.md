## State in the Cell <span class="lv lv2"></span>

- **What:** when each cell's new value depends on its neighbours' *old* values and no copy is allowed, keep both in the cell: old in bit 0, new in bit 1. Read with `& 1`, finish with `>> 1`
- **Spot it:** every cell changes "at the same moment" from its neighbours; a zero wipes its row and column; "in place". A change that spreads in rounds (rotting, infection) → 16-01
- **Why:** bit 0 keeps the old grid intact while bit 1 builds the new one; one final pass shifts every cell

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
          if (nr >= 0 && nr < R && nc >= 0 && nc < C)
            live += b[nr][nc] & 1;          // old bit
        }
      const alive = b[r][c] & 1;
      if (live === 3 || (alive && live === 2)) b[r][c] |= 2; // new bit
    }
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) b[r][c] >>= 1;
}
```

- **Watch out:** Set Matrix Zeroes keeps its flags in row 0 and column 0. Clear those *last*: zeroing row 0 first erases every column's marker and the whole matrix becomes 0
