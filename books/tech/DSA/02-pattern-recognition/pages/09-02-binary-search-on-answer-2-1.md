### The checker is the problem

- The search loop is always the same (Module 04, 01-05). The work is the `feasible(guess)` check, usually one greedy pass

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
  let lo = Math.max(...weights);
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
- **Aggressive Cows (SPOJ AGGRCOW) / Magnetic Force Between Two Balls (LeetCode 1552):** *maximise the minimum*, so the pattern is `T…TF…F` and you want the **last** true
- **Minimize the Maximum Difference of Pairs (LeetCode 2616):** guess the difference; sort, then greedily pair neighbours within it
