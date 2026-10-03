## Subset Sum <span class="lv lv1"></span>

Knapsack problems are rarely phrased as "robbers" and "backpacks". The most common disguise is the **Subset Sum** problem.

- **The Problem:** Given a set of non-negative integers, and a value `sum`, determine if there is a subset of the given set with sum equal to given `sum`.
- **The Disguise:** This is exactly 0/1 Knapsack. 
  - The `capacity` is the target `sum`.
  - The `weight` of an item is the integer itself.
  - We don't care about maximizing `value`, we just care about returning a `boolean` (True/False).

### The DP State

- `dp[w]` = `true` if it is possible to make sum `w` using the elements seen so far.
- Because each number can only be used once, we use the **backwards** 1D loop (0/1 Knapsack logic).

### Implementation

```ts
function canPartition(nums: number[], targetSum: number): boolean {
  // dp array of booleans
  const dp = new Array(targetSum + 1).fill(false);
  dp[0] = true; // Base case: We can always make sum 0 by picking nothing

  for (const num of nums) {
    // Traverse backwards! (0/1 Knapsack)
    for (let w = targetSum; w >= num; w--) {
      // We can make sum w if:
      // 1. We could already make it before (dp[w] is true)
      // 2. We can make the required remainder (dp[w - num] is true)
      dp[w] = dp[w] || dp[w - num];
    }
  }

  return dp[targetSum];
}
```
