## Keep It Sorted as You Go 🟡 - continued

```ts
// Min Abs Difference Between Elements With Constraint (LC 2817)
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
