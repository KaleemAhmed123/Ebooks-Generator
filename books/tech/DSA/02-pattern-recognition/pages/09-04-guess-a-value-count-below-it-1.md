## Guess a Value, Count Below It <span class="lv lv2"></span>

- **What:** guess a *value* `x` and count the items `≤ x`; the k-th smallest is the smallest `x` whose count reaches k
- **Spot it:** the k-th smallest or median of a set too big to list: a sorted matrix, all pair distances. Small k over sorted lists → 15-03
- **Why:** `count(x)` never falls, so it flips once; the first true is in the set

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Sorted matrix rows 1 5 9, 10 11 13, 12 13 15, k equals 8. The count for x equals 13 walks from the bottom-left: 12 is at most 13, so its whole column of 3 counts, step right; 13 is at most 13, add 3, step right; 15 is above 13, step up; 13 is at most 13, add 2, and the walk leaves the matrix. count of 13 is 8, feasible. count of 12 is 3 plus 2 plus 1, 6, too small. The smallest feasible value, 13, is the answer." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .in { fill: #b7e4c7; stroke: #2d6a4f; stroke-width: 1; }
    .p { stroke: #1d4e89; stroke-width: 1.4; fill: none; }
  </style>
  <defs><marker id="m0904" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <rect class="in" x="30" y="10" width="34" height="24"/><text x="47" y="26" class="lb" text-anchor="middle">1</text>
  <rect class="in" x="64" y="10" width="34" height="24"/><text x="81" y="26" class="lb" text-anchor="middle">5</text>
  <rect class="in" x="98" y="10" width="34" height="24"/><text x="115" y="26" class="lb" text-anchor="middle">9</text>
  <rect class="in" x="30" y="34" width="34" height="24"/><text x="47" y="50" class="lb" text-anchor="middle">10</text>
  <rect class="in" x="64" y="34" width="34" height="24"/><text x="81" y="50" class="lb" text-anchor="middle">11</text>
  <rect class="in" x="98" y="34" width="34" height="24"/><text x="115" y="50" class="lb" text-anchor="middle">13</text>
  <rect class="in" x="30" y="58" width="34" height="24"/><text x="47" y="74" class="lb" text-anchor="middle">12</text>
  <rect class="in" x="64" y="58" width="34" height="24"/><text x="81" y="74" class="lb" text-anchor="middle">13</text>
  <rect class="c" x="98" y="58" width="34" height="24"/><text x="115" y="74" class="lb" text-anchor="middle">15</text>
  <path class="p" d="M 34 79 L 127 79 L 127 54 L 146 54" marker-end="url(#m0904)"/>
  <text x="47" y="94" class="sm" text-anchor="middle">+3</text>
  <text x="81" y="94" class="sm" text-anchor="middle">+3</text>
  <text x="115" y="94" class="sm" text-anchor="middle">+2</text>
  <text x="30" y="112" class="sm">shaded: values ≤ 13 · arrow: the walk for x = 13</text>
  <text x="190" y="24" class="lb">k = 8</text>
  <text x="190" y="42" class="lb">count(12) = 3 + 2 + 1 = 6  &lt; 8</text>
  <text x="190" y="60" class="lb">count(13) = 3 + 3 + 2 = 8  ≥ 8</text>
  <text x="190" y="78" class="lb" fill="#2d6a4f">answer = smallest feasible = 13</text>
  <text x="190" y="100" class="sm">each step adds a whole column part (≤ x) or drops a row (&gt; x)</text>
</svg>
:::

```ts
// Kth Smallest Element in a Sorted Matrix (LeetCode 378)
function kthSmallest(m: number[][], k: number): number {
  const n = m.length;
  // staircase from bottom-left, O(n)
  const countAtMost = (x: number) => {
    let r = n - 1, c = 0, cnt = 0;
    while (r >= 0 && c < n) {
      // whole column part fits
      if (m[r][c] <= x) { cnt += r + 1; c++; }
      else r--;
    }
    return cnt;
  };
  let lo = m[0][0], hi = m[n - 1][n - 1];
  while (lo < hi) {                      // first x with count ≥ k
    const mid = lo + Math.floor((hi - lo) / 2);
    if (countAtMost(mid) >= k) hi = mid; else lo = mid + 1;
  }
  return lo;
}
```

- **Watch out:** stopping at `count(mid) === k`: on `[[1, 3], [5, 7]]`, k = 2, `count(4) = 2`, yet 4 is absent
