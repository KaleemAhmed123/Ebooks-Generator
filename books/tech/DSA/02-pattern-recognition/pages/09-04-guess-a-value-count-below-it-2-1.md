## Guess a Value, Count Below It 🟡 - continued

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
