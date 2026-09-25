## Coordinate Keys <span class="lv lv1"></span> - continued

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
      // same key = same diagonal
      const key = r - c;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(mat[r][c]);
    }
  // pop gives smallest
  for (const g of groups.values()) g.sort((a, b) => b - a);
  for (let r = 0; r < mat.length; r++)
    for (let c = 0; c < mat[0].length; c++)
      mat[r][c] = groups.get(r - c)!.pop()!;
  return mat;
}
```
