## Guess a Value, Count Below It <span class="lv lv2"></span>

- **What it is:** To find the k-th smallest item of a set you cannot list cheaply, binary search on the *value*. For a guess `x`, count the items `≤ x`. The answer is the smallest `x` whose count reaches k
- **Signal:** "k-th smallest in a sorted matrix", "median of a row-wise sorted matrix", "k-th smallest pair distance", "k-th number in the multiplication table", sets of size n² or n·m that are too big to build
- **Why it works:** `count(x)` never decreases as `x` grows, so "count(x) ≥ k" is a boundary `F…FT…T` (Chapter 18). The first `T` is exactly the k-th smallest value: it is in the set, because the count only changes at values that are in the set. The search costs `log(range)` guesses, each paid with one structural count, usually O(n) or O(n log m)

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Sorted matrix rows 1 5 9, 10 11 13, 12 13 15, k equals 8. Guess x equals 13: the staircase walk from the bottom-left counts 8 values at most 13, so 13 is feasible. Guess 12 counts 6, not enough. The smallest feasible value is 13." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .in { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
  </style>
  <rect class="in" x="30" y="14" width="34" height="24"/><text x="47" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="in" x="64" y="14" width="34" height="24"/><text x="81" y="30" class="lb" text-anchor="middle">5</text>
  <rect class="in" x="98" y="14" width="34" height="24"/><text x="115" y="30" class="lb" text-anchor="middle">9</text>
  <rect class="in" x="30" y="38" width="34" height="24"/><text x="47" y="54" class="lb" text-anchor="middle">10</text>
  <rect class="in" x="64" y="38" width="34" height="24"/><text x="81" y="54" class="lb" text-anchor="middle">11</text>
  <rect class="in" x="98" y="38" width="34" height="24"/><text x="115" y="54" class="lb" text-anchor="middle">13</text>
  <rect class="in" x="30" y="62" width="34" height="24"/><text x="47" y="78" class="lb" text-anchor="middle">12</text>
  <rect class="in" x="64" y="62" width="34" height="24"/><text x="81" y="78" class="lb" text-anchor="middle">13</text>
  <rect class="c" x="98" y="62" width="34" height="24"/><text x="115" y="78" class="lb" text-anchor="middle">15</text>
  <text x="30" y="104" class="sm">shaded: values ≤ 13 (8 of them)</text>
  <text x="170" y="30" class="lb">k = 8</text>
  <text x="170" y="50" class="lb">count(12) = 6  &lt; 8  → too small</text>
  <text x="170" y="66" class="lb">count(13) = 8  ≥ 8  → feasible</text>
  <text x="170" y="90" class="lb" fill="#2d6a4f">answer = smallest feasible = 13</text>
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
  // first x with count ≥ k
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (countAtMost(mid) >= k) hi = mid; else lo = mid + 1;
  }
  return lo;
}
```

### Variations

- **Median in a row-wise sorted matrix (GFG):** rows are sorted, columns are not, so count with an upper-bound binary search per row: O(r log c) per guess. The median is the smallest `x` with count `> (r·c)/2`
- **Find K-th Smallest Pair Distance (LeetCode 719):** sort; for a guess `d`, count pairs with difference `≤ d` using two pointers in O(n). The n² distances are never built
- **Kth Smallest Number in Multiplication Table (LeetCode 668):** `count(x) = Σ min(⌊x / i⌋, n)` over rows `i`: one line per row, no table
- **Heap alternative for 378:** a min-heap of row heads popped k times (page 15-03) is O(k log n); better when k is small, worse when k ≈ n²

### The failure

- **Stopping when `count(mid) === k`.** `mid` may not be in the matrix: with `[[1, 3], [5, 7]]` and k = 2, `count(4) = 2` but 4 is not an element. Keep searching for the *smallest* feasible value; that one is always an element
- **Using `lo <= hi` with `hi = mid`.** The loop never ends when `lo === hi === mid`. The template above pairs `lo < hi` with `hi = mid`; keep the two together

:::interview
"Why does binary searching on values return an actual matrix element?" — `count(x)` only increases at values present in the matrix. The smallest `x` with `count(x) ≥ k` is therefore a point where the count just jumped, which is an element. So I never need the elements explicitly: log(max − min) guesses, each an O(n) staircase count.
:::
