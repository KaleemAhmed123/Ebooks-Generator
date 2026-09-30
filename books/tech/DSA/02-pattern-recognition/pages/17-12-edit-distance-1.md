## LCS & Edit Distance <span class="lv lv1"></span>

- **What:** align two strings with a grid `f(i, j)`, one index per string. On a **match**, step diagonally; on a **mismatch**, take the best of consuming from one side or the other (and replacing, for edit distance)
- **Spot it:** "longest common subsequence", "edit / Levenshtein distance", "min insert+delete to make equal", "diff two strings", "one edit away"
- **Why:** at position `(i, j)` the only moves are drop A[i], drop B[j], or match both. Each `(i, j)` is solved once, so the m × n grid is filled in O(m · n)

:::mint
<svg viewBox="0 0 470 150" role="img" aria-label="LCS grid for a c e down the side and a b c d e across the top. A diagonal move on a matching letter adds one; a mismatch takes the max of the cell above or the cell to the left. The matched cells a, c, e form the diagonal path and the bottom-right value is 3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .hd { font: bold 9px Consolas, monospace; fill: #1d4e89; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #c9c9c9; stroke-width: 1; }
    .m { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
    .d { stroke: #2d6a4f; stroke-width: 1.6; }
  </style>
  <defs><marker id="e1712" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2d6a4f"/></marker></defs>
  <g transform="translate(60,18)">
    <text x="-14" y="14" class="hd">a</text><text x="-14" y="42" class="hd">c</text><text x="-14" y="70" class="hd">e</text>
    <text x="14" y="-4" class="hd" text-anchor="middle">a</text><text x="42" y="-4" class="hd" text-anchor="middle">b</text><text x="70" y="-4" class="hd" text-anchor="middle">c</text><text x="98" y="-4" class="hd" text-anchor="middle">d</text><text x="126" y="-4" class="hd" text-anchor="middle">e</text>
    <rect class="m" x="0" y="0" width="28" height="28"/><text x="14" y="18" class="lb" text-anchor="middle">1</text>
    <rect class="c" x="28" y="0" width="28" height="28"/><text x="42" y="18" class="lb" text-anchor="middle">1</text>
    <rect class="c" x="56" y="0" width="28" height="28"/><text x="70" y="18" class="lb" text-anchor="middle">1</text>
    <rect class="c" x="84" y="0" width="28" height="28"/><text x="98" y="18" class="lb" text-anchor="middle">1</text>
    <rect class="c" x="112" y="0" width="28" height="28"/><text x="126" y="18" class="lb" text-anchor="middle">1</text>
    <rect class="c" x="0" y="28" width="28" height="28"/><text x="14" y="46" class="lb" text-anchor="middle">1</text>
    <rect class="c" x="28" y="28" width="28" height="28"/><text x="42" y="46" class="lb" text-anchor="middle">1</text>
    <rect class="m" x="56" y="28" width="28" height="28"/><text x="70" y="46" class="lb" text-anchor="middle">2</text>
    <rect class="c" x="84" y="28" width="28" height="28"/><text x="98" y="46" class="lb" text-anchor="middle">2</text>
    <rect class="c" x="112" y="28" width="28" height="28"/><text x="126" y="46" class="lb" text-anchor="middle">2</text>
    <rect class="c" x="0" y="56" width="28" height="28"/><text x="14" y="74" class="lb" text-anchor="middle">1</text>
    <rect class="c" x="28" y="56" width="28" height="28"/><text x="42" y="74" class="lb" text-anchor="middle">1</text>
    <rect class="c" x="56" y="56" width="28" height="28"/><text x="70" y="74" class="lb" text-anchor="middle">2</text>
    <rect class="c" x="84" y="56" width="28" height="28"/><text x="98" y="74" class="lb" text-anchor="middle">2</text>
    <rect class="m" x="112" y="56" width="28" height="28"/><text x="126" y="74" class="lb" text-anchor="middle">3</text>
    <line class="d" x1="14" y1="14" x2="70" y2="42" marker-end="url(#e1712)"/>
    <line class="d" x1="70" y1="42" x2="126" y2="70" marker-end="url(#e1712)"/>
  </g>
  <text x="235" y="40" class="sm">match → diagonal + 1</text>
  <text x="235" y="70" class="sm">mismatch → max(up, left)</text>
  <text x="235" y="104" class="lb" fill="#2d6a4f">LCS("ace","abcde") = 3</text>
</svg>
:::

```ts
// Longest Common Subsequence (LeetCode 1143)
function lcs(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    dp[i][j] = a[i - 1] === b[j - 1]
      ? dp[i - 1][j - 1] + 1                            // match: take it, step both
      : Math.max(dp[i - 1][j], dp[i][j - 1]);           // else: drop one side
  return dp[m][n];
}
```
