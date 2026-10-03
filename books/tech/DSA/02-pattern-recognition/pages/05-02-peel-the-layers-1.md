## Peel the Layers <span class="lv lv1"></span>

- **What:** treat the matrix as nested rings. Keep four boundaries; walk one side, then pull that boundary in
- **Spot it:** spiral order, the boundary, "rotate each layer", a 90° turn in place. A zig-zag along diagonals → 05-01
- **Why:** a walked side is never needed again, so moving its boundary removes it. Each walk shrinks the rectangle, and the loop ends when it is empty

:::mint
<svg viewBox="0 0 470 116" role="img" aria-label="Left: spiral order on a 3 by 4 matrix holding 1 to 12. The path runs along the top row 1 2 3 4, down the right column to 12, back along the bottom row to 9, up to 5, then right through 6 and 7; each side is followed by top++, right−−, bottom−− or left++. Right: a 3 by 3 matrix 1 to 9 is transposed into columns 1 2 3, 4 5 6, 7 8 9, then each row is reversed, giving rows 7 4 1, 8 5 2, 9 6 3: the matrix turned 90 degrees clockwise." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .ms { font: 8.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .t { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .p { stroke: #1d4e89; stroke-width: 1.6; fill: none; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>
  <defs><marker id="m0502" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker><marker id="m0502b" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <rect class="c" x="20" y="10" width="34" height="30"/><text x="37" y="35" class="lb" text-anchor="middle">1</text>
  <rect class="c" x="54" y="10" width="34" height="30"/><text x="71" y="35" class="lb" text-anchor="middle">2</text>
  <rect class="c" x="88" y="10" width="34" height="30"/><text x="105" y="35" class="lb" text-anchor="middle">3</text>
  <rect class="c" x="122" y="10" width="34" height="30"/><text x="139" y="35" class="lb" text-anchor="middle">4</text>
  <rect class="c" x="20" y="40" width="34" height="30"/><text x="37" y="65" class="lb" text-anchor="middle">5</text>
  <rect class="c" x="54" y="40" width="34" height="30"/><text x="71" y="65" class="lb" text-anchor="middle">6</text>
  <rect class="c" x="88" y="40" width="34" height="30"/><text x="105" y="65" class="lb" text-anchor="middle">7</text>
  <rect class="c" x="122" y="40" width="34" height="30"/><text x="139" y="65" class="lb" text-anchor="middle">8</text>
  <rect class="c" x="20" y="70" width="34" height="30"/><text x="37" y="95" class="lb" text-anchor="middle">9</text>
  <rect class="c" x="54" y="70" width="34" height="30"/><text x="71" y="95" class="lb" text-anchor="middle">10</text>
  <rect class="c" x="88" y="70" width="34" height="30"/><text x="105" y="95" class="lb" text-anchor="middle">11</text>
  <rect class="c" x="122" y="70" width="34" height="30"/><text x="139" y="95" class="lb" text-anchor="middle">12</text>
  <path class="p" d="M 25 18 L 151 18 L 151 79 L 25 79 L 25 49 L 114 49" marker-end="url(#m0502)"/>
  <text x="20" y="112" class="sm">per side: top++, right−−, bottom−−, left++</text>
  <text x="223" y="20" class="sm" text-anchor="middle">before</text>
  <rect class="c" x="196" y="28" width="18" height="18"/><text x="205" y="40.5" class="ms" text-anchor="middle">1</text>
  <rect class="c" x="214" y="28" width="18" height="18"/><text x="223" y="40.5" class="ms" text-anchor="middle">2</text>
  <rect class="c" x="232" y="28" width="18" height="18"/><text x="241" y="40.5" class="ms" text-anchor="middle">3</text>
  <rect class="c" x="196" y="46" width="18" height="18"/><text x="205" y="58.5" class="ms" text-anchor="middle">4</text>
  <rect class="c" x="214" y="46" width="18" height="18"/><text x="223" y="58.5" class="ms" text-anchor="middle">5</text>
  <rect class="c" x="232" y="46" width="18" height="18"/><text x="241" y="58.5" class="ms" text-anchor="middle">6</text>
  <rect class="c" x="196" y="64" width="18" height="18"/><text x="205" y="76.5" class="ms" text-anchor="middle">7</text>
  <rect class="c" x="214" y="64" width="18" height="18"/><text x="223" y="76.5" class="ms" text-anchor="middle">8</text>
  <rect class="c" x="232" y="64" width="18" height="18"/><text x="241" y="76.5" class="ms" text-anchor="middle">9</text>
  <text x="311" y="20" class="sm" text-anchor="middle">transpose</text>
  <rect class="t" x="284" y="28" width="18" height="18"/><text x="293" y="40.5" class="ms" text-anchor="middle">1</text>
  <rect class="c" x="302" y="28" width="18" height="18"/><text x="311" y="40.5" class="ms" text-anchor="middle">4</text>
  <rect class="c" x="320" y="28" width="18" height="18"/><text x="329" y="40.5" class="ms" text-anchor="middle">7</text>
  <rect class="c" x="284" y="46" width="18" height="18"/><text x="293" y="58.5" class="ms" text-anchor="middle">2</text>
  <rect class="t" x="302" y="46" width="18" height="18"/><text x="311" y="58.5" class="ms" text-anchor="middle">5</text>
  <rect class="c" x="320" y="46" width="18" height="18"/><text x="329" y="58.5" class="ms" text-anchor="middle">8</text>
  <rect class="c" x="284" y="64" width="18" height="18"/><text x="293" y="76.5" class="ms" text-anchor="middle">3</text>
  <rect class="c" x="302" y="64" width="18" height="18"/><text x="311" y="76.5" class="ms" text-anchor="middle">6</text>
  <rect class="t" x="320" y="64" width="18" height="18"/><text x="329" y="76.5" class="ms" text-anchor="middle">9</text>
  <text x="399" y="20" class="sm" text-anchor="middle">reverse rows</text>
  <rect class="c" x="372" y="28" width="18" height="18"/><text x="381" y="40.5" class="ms" text-anchor="middle">7</text>
  <rect class="c" x="390" y="28" width="18" height="18"/><text x="399" y="40.5" class="ms" text-anchor="middle">4</text>
  <rect class="c" x="408" y="28" width="18" height="18"/><text x="417" y="40.5" class="ms" text-anchor="middle">1</text>
  <rect class="c" x="372" y="46" width="18" height="18"/><text x="381" y="58.5" class="ms" text-anchor="middle">8</text>
  <rect class="c" x="390" y="46" width="18" height="18"/><text x="399" y="58.5" class="ms" text-anchor="middle">5</text>
  <rect class="c" x="408" y="46" width="18" height="18"/><text x="417" y="58.5" class="ms" text-anchor="middle">2</text>
  <rect class="c" x="372" y="64" width="18" height="18"/><text x="381" y="76.5" class="ms" text-anchor="middle">9</text>
  <rect class="c" x="390" y="64" width="18" height="18"/><text x="399" y="76.5" class="ms" text-anchor="middle">6</text>
  <rect class="c" x="408" y="64" width="18" height="18"/><text x="417" y="76.5" class="ms" text-anchor="middle">3</text>
  <path class="a" d="M 254 55 L 280 55" marker-end="url(#m0502b)"/>
  <path class="a" d="M 342 55 L 368 55" marker-end="url(#m0502b)"/>
  <text x="196" y="100" class="sm">90° clockwise, in place: transpose across the shaded</text>
  <text x="196" y="112" class="sm">diagonal, reverse each row (anticlockwise: each column)</text>
</svg>
:::

```ts
// Spiral Matrix (LeetCode 54)
function spiralOrder(m: number[][]): number[] {
  const out: number[] = [];
  let top = 0, bottom = m.length - 1, left = 0, right = m[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(m[top][c]); top++;
    for (let r = top; r <= bottom; r++) out.push(m[r][right]); right--;
    if (top <= bottom) {     // a row is still left
      for (let c = right; c >= left; c--) out.push(m[bottom][c]);
      bottom--;
    }
    if (left <= right) {     // a column is still left
      for (let r = bottom; r >= top; r--) out.push(m[r][left]);
      left++;
    }
  }
  return out;
}
```

- **Watch out:** drop the two `if` guards and a 3×1 matrix returns `[1, 2, 3, 2]`: the left walk reads the middle cell back. Re-check the rectangle after each side
