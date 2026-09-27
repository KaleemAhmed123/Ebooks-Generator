## Count While You Merge <span class="lv lv2"></span>

- **What:** merge sort with a counter on the merge step. Every pair `i < j` is split once, into a left and a right half, and both halves are sorted at that moment
- **Spot it:** count pairs `i < j` whose *values* meet an inequality: `a[i] > a[j]`, `a[i] > 2·a[j]`. Symmetric (`a[i] + a[j] ≤ t`) → 02-08
- **Why:** split pairs depend only on values, so sorting each half loses nothing, and the cross count becomes a two-pointer walk: O(n log n)

:::mint
<svg viewBox="0 0 470 112" role="img" aria-label="Merging sorted halves 2, 4, 7 and 1, 3, 5. When the right element 1 is taken, all three remaining left elements are larger, so 3 inversions are counted at once. When 3 is taken, 4 and 7 remain, adding 2. When 5 is taken, 7 remains, adding 1. Total cross inversions 6." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .L { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .R { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
  </style>
  <text x="20" y="27" class="sm">left</text>
  <rect class="L" x="60" y="12" width="28" height="22"/><text x="74" y="27" class="lb" text-anchor="middle">2</text>
  <rect class="L" x="88" y="12" width="28" height="22"/><text x="102" y="27" class="lb" text-anchor="middle">4</text>
  <rect class="L" x="116" y="12" width="28" height="22"/><text x="130" y="27" class="lb" text-anchor="middle">7</text>
  <text x="170" y="27" class="sm">right</text>
  <rect class="R" x="210" y="12" width="28" height="22"/><text x="224" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="R" x="238" y="12" width="28" height="22"/><text x="252" y="27" class="lb" text-anchor="middle">3</text>
  <rect class="R" x="266" y="12" width="28" height="22"/><text x="280" y="27" class="lb" text-anchor="middle">5</text>
  <text x="20" y="58" class="lb">take 1 (right): left still holds 2, 4, 7 → +3</text>
  <text x="20" y="74" class="lb">take 2, take 3: left still holds 4, 7    → +2</text>
  <text x="20" y="90" class="lb">take 4, take 5: left still holds 7       → +1</text>
  <text x="20" y="106" class="lb" fill="#1d4e89">cross inversions = 6, counted in one merge</text>
  <text x="320" y="30" class="sm">rule: when a right element</text>
  <text x="320" y="42" class="sm">wins, every unmerged left</text>
  <text x="320" y="54" class="sm">element forms a pair with it</text>
</svg>
:::

```ts
// Count Inversions (GFG): pairs i < j with a[i] > a[j]
function countInversions(a: number[]): number {
  const buf = new Array(a.length);
  const sort = (lo: number, hi: number): number => {     // [lo, hi)
    if (hi - lo < 2) return 0;
    const mid = (lo + hi) >> 1;
    let count = sort(lo, mid) + sort(mid, hi);
    let i = lo, j = mid, k = lo;
    while (i < mid && j < hi) {
      if (a[i] <= a[j]) buf[k++] = a[i++];
      else { count += mid - i; buf[k++] = a[j++]; } // rest of left > a[j]
    }
    while (i < mid) buf[k++] = a[i++];
    while (j < hi) buf[k++] = a[j++];
    for (let t = lo; t < hi; t++) a[t] = buf[t];
    return count;
  };
  return sort(0, a.length);
}
```

- **Watch out:** for `a[i] > 2·a[j]`, count in a *separate* pass before merging; placing by that test breaks the sort and every count above it
### Where it appears

| Problem | What the merge step counts |
|---|---|
| [Count Inversions](https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1) (GFG) | pairs where left > right |
| [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) (LeetCode 493) | pairs where `a[i] > 2·a[j]`; separate count pass |
| [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (LeetCode 315) | sort index pairs, not raw values |

:::interview
"Why can't you count inversions with a simple sort?"

A simple sort tells you the array is unsorted but not how many swaps fix it. Merge sort naturally splits every pair `(i, j)` into same-half (handled recursively) and cross-half (handled during merge). Because both halves are sorted, the cross count is a single pointer walk — O(n) per level, O(n log n) total.
:::
