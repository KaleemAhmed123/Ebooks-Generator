### The checker is the problem

- The loop is Module 04's search (01-05) written in its `lo < hi` form: `lo` and `hi` close in on the first true, so no `best` variable is kept. The work is the check, usually one greedy pass

```ts
// Capacity To Ship Packages Within D Days (LeetCode 1011)
function shipWithinDays(weights: number[], days: number): number {
  const fits = (cap: number) => {   // greedy: fill each day
    let used = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) { used++; load = 0; }
      load += w;
    }
    return used <= days;
  };
  let lo = weights.reduce((m, w) => Math.max(m, w), 0);
  let hi = weights.reduce((a, b) => a + b);
  while (lo < hi) {                 // first capacity that fits
    const mid = (lo + hi) >> 1;
    if (fits(mid)) hi = mid; else lo = mid + 1;
  }
  return lo;
}
```

### Variations

- **Koko Eating Bananas (LeetCode 875):** guess the speed; hours = Σ ⌈pile / speed⌉ (worked in Module 07, 01-04)
- **Split Array Largest Sum (LeetCode 410) / Allocate Minimum Pages (GFG):** the same checker as above, with "days" renamed to "parts"
- **Aggressive Cows (SPOJ AGGRCOW) / Magnetic Force Between Two Balls (LeetCode 1552):** *maximise the minimum*: the checks read `T…TF…F` and the answer is the **last** true (the picture overleaf)
- **Minimize the Maximum Difference of Pairs (LeetCode 2616):** guess the difference; sort, then greedily pair neighbours within it
