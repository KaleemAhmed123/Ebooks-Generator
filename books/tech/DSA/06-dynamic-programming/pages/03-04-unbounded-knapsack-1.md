## Unbounded Knapsack <span class="lv lv1"></span>

- **The Setup:** The exact same problem as 0/1 Knapsack (maximize value for a given capacity `W`), but with one crucial difference: you have an **infinite supply** of each item.
- This is the exact same structure as the Coin Change problem.

### The Transition Difference

In 0/1 Knapsack, if you decide to take item `i`, you must move on to item `i-1`. You can never look at item `i` again.
- 0/1 Transition: `TakeIt = value[i] + dp[i-1][w - weight[i]]`

In Unbounded Knapsack, if you decide to take item `i`, you can still take item `i` *again*. You do not move to `i-1`. You stay on `i`.
- Unbounded Transition: `TakeIt = value[i] + dp[i][w - weight[i]]`

### Implementation (O(W) Space)

Because we *want* the ability to pick the same item multiple times, we intentionally write the inner loop **forwards** (from left to right). This is the exact trap we avoided in the 1D optimized 0/1 Knapsack.

```ts
function unboundedKnapsack(weights: number[], values: number[], W: number): number {
  const dp = new Array(W + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    // Traverse FORWARDS to allow infinite selection
    for (let w = weights[i]; w <= W; w++) {
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }
  
  return dp[W];
}
```
