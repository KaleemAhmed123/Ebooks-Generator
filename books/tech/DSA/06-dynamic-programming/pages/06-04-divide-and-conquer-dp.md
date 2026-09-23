## Divide and Conquer DP Optimization 🔴

This is another elite-level optimization used specifically for 2D DP problems that partition arrays into contiguous segments.

- **The Problem Signature:** "Partition an array into exactly K contiguous subarrays such that the sum of costs of all subarrays is minimized."
- **Standard DP:** `dp[i][j]` = minimum cost to partition the prefix of length `i` into `j` subarrays.
- **The Transition:** `dp[i][j] = min(dp[k][j-1] + cost(k, i))` for all k < i.
- **The Complexity:** O(K · N²). If N = 10⁴, N² will TLE.

### The Monotonicity Condition

Let opt(i, j) be the optimal splitting point k that minimizes `dp[i][j]`.
If the cost function satisfies the **Quadrangle Inequality** (which basically means the cost function is well-behaved and predictable), a magical mathematical property emerges:

opt(i, j) ≤ opt(i+1, j)

In plain English: If the best place to make the cut for the first 10 elements is at index 4, then if we look at the first 11 elements, the best place to make the cut *must be at or to the right of index 4*. It can never move backwards.

### The Optimization

If we know that the optimal splitting point only moves right, we don't have to scan all k from 0 to i every single time. 
We can use a recursive Divide and Conquer function to evaluate the DP states.

```ts
// Evaluates dp[j] for indices between [left, right]
// knowing the optimal split must lie between [optLeft, optRight]
function compute(left: number, right: number, optLeft: number, optRight: number) {
  if (left > right) return;

  const mid = Math.floor((left + right) / 2);
  let bestVal = Infinity;
  let bestOpt = -1;

  // We only search for k within the known bounds!
  for (let k = optLeft; k <= Math.min(mid, optRight); k++) {
    const currentCost = oldDp[k] + cost(k, mid);
    if (currentCost < bestVal) {
      bestVal = currentCost;
      bestOpt = k;
    }
  }

  newDp[mid] = bestVal;

  // The recursive split: 
  // For indices < mid, the optimal split must be <= bestOpt
  compute(left, mid - 1, optLeft, bestOpt);
  // For indices > mid, the optimal split must be >= bestOpt
  compute(mid + 1, right, bestOpt, optRight);
}
```

This drastically narrows the search space for k, dropping the time complexity from O(K · N²) to O(K · N log N).
