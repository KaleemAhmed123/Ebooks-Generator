## Feasibility and Capacity 🟡

- The most common application of Boundary Finding is converting a "Find the optimal value" problem into a "Can we do it with this value?" problem
- This is known as **Binary Search on Answer** or **Feasibility Search**

### The Feasibility Signature

You should immediately think of Feasibility Search if a problem asks:
1. **Minimise the maximum** (e.g., "split array into K parts to minimise the largest sum")
2. **Maximise the minimum** (e.g., "place K items such that the minimum distance between them is maximised")
3. **Find the smallest capacity that works** (e.g., "minimum ship capacity to transport cargo in D days")

### The structural transformation

- **The original problem:** "What is the minimum ship capacity to deliver all packages in D days?" This is hard because the capacity could be anything, and the greedy packing strategy depends on the capacity
- **The transformed problem:** "If the ship capacity is exactly C, can we deliver all packages in D days?" This is trivially easy. You just iterate through the packages, packing the ship until it's full, sending it, and counting how many days it took
- **The boundary:** If capacity C takes ≤ D days, then C+1, C+2 will also take ≤ D days. It's monotonic: `[F, F, F, T, T, T]`. We just binary search for the first C that returns True

### The `isPossible(x)` contract

For this to work, `isPossible(x)` must run relatively fast (usually O(N)) and must be strictly monotonic.

```ts
// The generic Feasibility skeleton
function optimalCapacity(packages: number[], days: number): number {
  let low = Math.max(...packages); // Min capacity is the largest single item
  let high = packages.reduce((a, b) => a + b, 0); // Max capacity is all items at once

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isPossible(packages, days, mid)) {
      high = mid;    // mid works, try to find a smaller capacity
    } else {
      low = mid + 1; // mid failed, need more capacity
    }
  }
  return low;
}
```

### The trap

- **Choosing the wrong search space bounds.** 
- If `low` is too small (e.g., `low = 0` when the minimum capacity must be at least the largest package), `isPossible` might infinite loop or throw errors because it can never pack that item
- If `high` is too small, the true answer lies outside your boundary and binary search will return a false boundary
- Always take a minute to define the literal worst-case and best-case bounds for your search space

:::interview
"How did you know to binary search here? The array isn't sorted."

The array isn't sorted, but the *answer space* is. If a ship of capacity 10 works, a ship of capacity 11 must also work. That monotonicity `[F, F, T, T, T]` means I can binary search the capacity itself, reducing a complex optimization problem to a series of O(n) feasibility checks.
:::
