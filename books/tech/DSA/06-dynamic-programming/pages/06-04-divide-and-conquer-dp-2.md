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
