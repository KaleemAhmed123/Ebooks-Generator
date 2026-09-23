## Subset Sum

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

### Partition Equal Subset Sum

- **The Problem:** Given an array, determine if you can partition the array into two subsets such that the sum of elements in both subsets is equal.
- **Example:** `[1, 5, 11, 5]` -> True (`[1, 5, 5]` and `[11]`).
- **The Solution:** 
  1. Calculate the total sum of the array.
  2. If the total sum is odd, it is mathematically impossible to divide it in half. Return `false`.
  3. If it is even, the target sum for each half is exactly `totalSum / 2`.
  4. The problem has now perfectly transformed into standard Subset Sum with `targetSum = totalSum / 2`. Just run the `canPartition` function above.
