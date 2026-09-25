## Keep It Sorted as You Go 🟡

- **What it is:** When each new element must be compared with the *closest* earlier values (the next larger, the next smaller, the nearest), keep the earlier values in a sorted structure and binary search it: an **ordered set**. A heap only knows its top; an ordered set knows every element's neighbours
- **Signal:** "minimum absolute difference between elements at least x apart", "least greater element on the right", "nearby almost duplicate" (index gap ≤ k, value gap ≤ t), "can this booking be added without overlap", "k-th smallest so far"
- **Why it works:** The best partner of a value `v` in a set is either its successor (smallest ≥ v) or its predecessor (largest < v). In a sorted structure both are one binary search away. C++ `std::set` and Java `TreeSet` do insert and neighbour queries in O(log n); in TypeScript, a sorted array with binary-search insertion answers queries in O(log n) and pays O(n) element moves per insert

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Minimum absolute difference with constraint x equals 2 on 4, 3, 2, 4. At index 2 the allowed earlier value is 4, so the sorted set holds 4; the value 2 has successor 4, difference 2. At index 3 the set holds 3 and 4; the value 4 finds itself, difference 0. The answer is 0." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .s { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .c { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
  </style>
  <text x="20" y="18" class="sm">nums = [4, 3, 2, 4], x = 2</text>
  <text x="20" y="42" class="lb">i = 2: insert nums[0]</text>
  <rect class="s" x="190" y="30" width="26" height="18"/><text x="203" y="43" class="lb" text-anchor="middle">4</text>
  <text x="240" y="42" class="lb">query 2 → successor 4, |2 − 4| = 2</text>
  <text x="20" y="72" class="lb">i = 3: insert nums[1]</text>
  <rect class="s" x="190" y="60" width="26" height="18"/><text x="203" y="73" class="lb" text-anchor="middle">3</text>
  <rect class="s" x="216" y="60" width="26" height="18"/><text x="229" y="73" class="lb" text-anchor="middle">4</text>
  <text x="252" y="72" class="lb">query 4 → itself, 0</text>
  <text x="20" y="96" class="sm">only values at least x positions back are in the set; each query needs just two neighbours</text>
</svg>
:::

```ts
// Min Absolute Difference With Constraint (LeetCode 2817)
function minAbsoluteDifference(nums: number[], x: number): number {
  // values nums[0 .. i − x]
  const sorted: number[] = [];
  // first index with sorted[i] ≥ v
  const lowerBound = (v: number) => {
    let lo = 0, hi = sorted.length;
    while (lo < hi) {
      const m = (lo + hi) >> 1;
      if (sorted[m] < v) lo = m + 1; else hi = m;
    }
    return lo;
  };
  let best = Infinity;
  for (let i = x; i < nums.length; i++) {
    const add = nums[i - x];
    // keep it sorted as you go
    sorted.splice(lowerBound(add), 0, add);
    // successor, then predecessor
    const j = lowerBound(nums[i]);
    if (j < sorted.length)
      best = Math.min(best, sorted[j] - nums[i]);
    if (j > 0) best = Math.min(best, nums[i] - sorted[j - 1]);
  }
  return best;
}
```

### Variations

- **Replace every element with the least greater element on its right (GFG):** walk from the right, and for each value query the successor (strictly greater) in the set of values already seen, then insert it
- **Contains Duplicate III (LeetCode 220):** a window of the last k values in an ordered set; check the successor of `v − t`. A bucket trick (bucket width t + 1) gets O(n) without a set
- **My Calendar I (LeetCode 729):** keep bookings sorted by start; a new booking conflicts only with its predecessor and successor
- **Find the conflicting appointments (GFG):** the same neighbour check while inserting appointments one by one
- **Sliding Window Median:** two heaps with lazy deletion (page 15-04), or one ordered multiset and an iterator to the middle

### The failure

- **A heap for neighbour queries.** A heap exposes only the minimum or maximum. "Closest value to v" needs arbitrary predecessors and successors, which a heap cannot give without popping everything
- **Forgetting that the TS version is O(n) per insert.** `splice` shifts elements; with n = 10⁵ inserts that is up to about 5 · 10⁹ element moves in the worst case. It is fast in practice for moderate n; for hard limits say so, and name `TreeSet` / `std::set`, a balanced BST, or an offline Fenwick tree over compressed values (Chapter 19) as the O(log n) versions

:::interview
"What do you use when you need the nearest larger value among everything seen so far?" — An ordered set: C++ `set` or Java `TreeSet`, with `lower_bound` / `ceiling` and `floor` in O(log n). In a language without one I keep a sorted array with binary search, which is O(log n) to query and O(n) to insert, or process the queries offline with coordinate compression and a Fenwick tree.
:::
