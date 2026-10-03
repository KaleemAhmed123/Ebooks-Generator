```ts
// Median of Two Sorted Arrays (LeetCode 4). Binary search the shorter array.
function findMedianSortedArrays(a: number[], b: number[]): number {
  if (a.length > b.length) [a, b] = [b, a];          // search the shorter one
  const m = a.length, n = b.length, half = (m + n + 1) >> 1;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1, j = half - i;          // j forced by i
    const aL = i ? a[i - 1] : -Infinity, aR = i < m ? a[i] : Infinity;
    const bL = j ? b[j - 1] : -Infinity, bR = j < n ? b[j] : Infinity;
    if (aL <= bR && bL <= aR) {                      // valid split found
      const left = Math.max(aL, bL);
      if ((m + n) & 1) return left;                  // odd total: left median
      return (left + Math.min(aR, bR)) / 2;          // even: average the border
    } else if (aL > bR) hi = i - 1;                  // too many from a
    else lo = i + 1;                                 // too few from a
  }
  return 0;                                          // unreachable for valid input
}
```

- **Watch out:** the ±Infinity sentinels at the ends are what make the four border reads total-safe — without them an empty side needs a special case every comparison. Always binary-search the **shorter** array so `j` can never fall outside `b`
### Where it appears

| Problem | The cut it searches |
|---|---|
| [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) (LeetCode 4) | split both into equal-size halves |
| [K-th Smallest in Two Sorted Arrays](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) (LeetCode 378, row-pair view) | left count = k |
| Interview: merge-free rank query on two feeds | elements ranked below a boundary |

:::interview
"Why is this O(log(m+n)) and not O(m+n)?"

A merge touches every element to find the middle. This never merges: it only asks *where the two cuts belong*. Because moving one cut right forces the other left, the "is this split valid" test flips exactly once as the cut slides, so binary search halves the candidate positions each step. You search only the shorter array's `m+1` cut positions, giving O(log min(m, n)), which is at most O(log(m+n)).
:::
