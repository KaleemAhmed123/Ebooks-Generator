## State in the Cell 🟡 - continued

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
