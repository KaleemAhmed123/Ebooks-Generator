## The 0/1 Knapsack Problem

The Knapsack problem is the undisputed king of Dynamic Programming. If you master this, you can solve roughly 30% of all medium/hard DP questions.

- **The Setup:** You are a thief with a knapsack that holds a maximum weight `W`. You are in a vault with `N` items. Each item has a `weight` and a `value`. You cannot split items (you either take an item completely, or leave it—hence "0/1"). What is the maximum value you can steal?
- **The State:** We need to track which items we have evaluated, AND how much space is left.
  - `dp[i][w]` = the maximum value using a subset of items from `0` to `i`, given a remaining capacity of `w`.

### The Transition

For the ith item, you have two choices:
1. **Leave it:** The value doesn't change. The capacity doesn't change. The best you can do is whatever you did for the previous `i-1` items. -> `dp[i-1][w]`
2. **Take it:** You gain `value[i]`. But you lose `weight[i]` capacity. The best you could have done prior to this was whatever you did for `i-1` items using the *reduced* capacity `w - weight[i]`. -> `value[i] + dp[i-1][w - weight[i]]`
   - *Constraint:* You can only take it if `w >= weight[i]`.

`dp[i][w] = Math.max( LeaveIt, TakeIt )`

### Implementation (Tabulation)

```ts
function knapsack(weights: number[], values: number[], W: number): number {
  const n = weights.length;
  // dp[i][w] grid. We use n+1 and W+1 for base cases (0 items, 0 capacity)
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const itemWeight = weights[i - 1];
    const itemValue = values[i - 1];

    for (let w = 1; w <= W; w++) {
      if (itemWeight <= w) {
        // We have room. Max of (Take it, Leave it)
        dp[i][w] = Math.max(
          itemValue + dp[i - 1][w - itemWeight], 
          dp[i - 1][w]
        );
      } else {
        // No room. Must leave it.
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][W];
}
```

### Space Optimization

Notice the transition. `dp[i]` only ever looks at `dp[i-1]`.
We can compress the O(N times W) matrix into a single 1D array of size W.

- **The Loop Order Trap:** If we overwrite `dp[w]` reading from left to right, we will calculate `dp[5]` using the newly written `dp[2]`. This accidentally allows the algorithm to pick the *same item twice*.
- **The Fix:** To preserve the 0/1 constraint in a 1D array, you must loop the capacity `w` **backwards** from `W` down to `itemWeight`.

```ts
function knapsackOptimized(weights: number[], values: number[], W: number): number {
  const dp = new Array(W + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    // Traverse backwards!
    for (let w = W; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }
  return dp[W];
}
```
