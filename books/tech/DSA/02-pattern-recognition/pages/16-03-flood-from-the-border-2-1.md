## Flood From the Border 🟡 - continued

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="Surrounded Regions. Left: a 4 by 4 board with O cells at row 1 columns 1 and 2, row 2 column 2, and row 3 column 1 on the bottom edge. The flood starts from border O cells only, so it marks the bottom-edge O as safe. Right: the result, where the three interior O cells became X and the bottom-edge O remains." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .x { fill: #ffffff; stroke: #1a1a1a; stroke-width: 0.8; }
    .safe { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .cap { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.2; }
    .edge { fill: none; stroke: #1d4e89; stroke-width: 2; stroke-dasharray: 5 3; }
  </style>
  <defs><marker id="m1603" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/></marker></defs>
  <g transform="translate(40,10)">
    <rect class="x" x="0" y="0" width="26" height="26"/><rect class="x" x="26" y="0" width="26" height="26"/><rect class="x" x="52" y="0" width="26" height="26"/><rect class="x" x="78" y="0" width="26" height="26"/>
    <rect class="x" x="0" y="26" width="26" height="26"/><rect class="cap" x="26" y="26" width="26" height="26"/><rect class="cap" x="52" y="26" width="26" height="26"/><rect class="x" x="78" y="26" width="26" height="26"/>
    <rect class="x" x="0" y="52" width="26" height="26"/><rect class="x" x="26" y="52" width="26" height="26"/><rect class="cap" x="52" y="52" width="26" height="26"/><rect class="x" x="78" y="52" width="26" height="26"/>
    <rect class="x" x="0" y="78" width="26" height="26"/><rect class="safe" x="26" y="78" width="26" height="26"/><rect class="x" x="52" y="78" width="26" height="26"/><rect class="x" x="78" y="78" width="26" height="26"/>
    <text x="39" y="43" class="lb" text-anchor="middle">O</text><text x="65" y="43" class="lb" text-anchor="middle">O</text><text x="65" y="69" class="lb" text-anchor="middle">O</text><text x="39" y="95" class="lb" text-anchor="middle">O</text>
    <rect class="edge" x="-3" y="-3" width="110" height="110"/>
  </g>
  <text x="160" y="30" class="sm">1. seed every border O</text>
  <text x="160" y="44" class="sm">   (dashed ring) as safe</text>
  <text x="160" y="62" class="sm">2. flood inward from seeds</text>
  <text x="160" y="80" class="sm">3. untouched O → X</text>
  <line x1="162" y1="96" x2="296" y2="96" stroke="#1a1a1a" stroke-width="1" marker-end="url(#m1603)"/>
  <g transform="translate(320,10)">
    <rect class="x" x="0" y="0" width="26" height="26"/><rect class="x" x="26" y="0" width="26" height="26"/><rect class="x" x="52" y="0" width="26" height="26"/><rect class="x" x="78" y="0" width="26" height="26"/>
    <rect class="x" x="0" y="26" width="26" height="26"/><rect class="x" x="26" y="26" width="26" height="26"/><rect class="x" x="52" y="26" width="26" height="26"/><rect class="x" x="78" y="26" width="26" height="26"/>
    <rect class="x" x="0" y="52" width="26" height="26"/><rect class="x" x="26" y="52" width="26" height="26"/><rect class="x" x="52" y="52" width="26" height="26"/><rect class="x" x="78" y="52" width="26" height="26"/>
    <rect class="x" x="0" y="78" width="26" height="26"/><rect class="safe" x="26" y="78" width="26" height="26"/><rect class="x" x="52" y="78" width="26" height="26"/><rect class="x" x="78" y="78" width="26" height="26"/>
    <text x="39" y="95" class="lb" text-anchor="middle">O</text>
  </g>
  <text x="40" y="128" class="sm">red = enclosed, captured</text><text x="320" y="128" class="sm">green = reached from the border</text>
</svg>
:::

```ts
// Surrounded Regions (LeetCode 130): capture every enclosed 'O'
function solve(board: string[][]): void {
  const m = board.length, n = board[0].length;
  const stack: number[][] = [];
  const seed = (r: number, c: number) => {
    if (r < 0 || c < 0 || r >= m || c >= n) return;
    if (board[r][c] !== "O") return;
    // safe; marked on push, never twice
    board[r][c] = "S";
    stack.push([r, c]);
  };
  for (let r = 0; r < m; r++) { seed(r, 0); seed(r, n - 1); }
  for (let c = 0; c < n; c++) { seed(0, c); seed(m - 1, c); }
  while (stack.length) {
    const [r, c] = stack.pop()!;
    seed(r + 1, c); seed(r - 1, c); seed(r, c + 1); seed(r, c - 1);
  }
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      board[r][c] = board[r][c] === "S" ? "O" : "X";
}
```
