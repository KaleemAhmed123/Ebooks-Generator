### Implementation

This is just **Subset Sum**, but instead of returning a `boolean`, we return an `integer` counting the total number of ways (like Coin Change II).

```ts
function findTargetSumWays(nums: number[], S: number): number {
  const totalSum = nums.reduce((a, b) => a + b, 0);

  // If the target is unreachable, or the numerator is odd (can't divide by 2)
  if (S > totalSum || S < -totalSum || (S + totalSum) % 2 !== 0) {
    return 0; 
  }

  const targetP = (S + totalSum) / 2;

  // Now run standard 0/1 Knapsack to find number of subsets equal to targetP
  const dp = new Array(targetP + 1).fill(0);
  dp[0] = 1; // 1 way to make sum 0 (pick nothing)

  for (const num of nums) {
    // 0/1 Knapsack: Traverse backwards
    for (let w = targetP; w >= num; w--) {
      dp[w] += dp[w - num];
    }
  }

  return dp[targetP];
}
```

This transforms a potentially memory-limit-exceeding 2D DP matrix into a blazing fast O(N times Sum) algorithm using a 1D array.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Target Sum](https://leetcode.com/problems/target-sum/) (LeetCode 494) | The original +/- assignment problem |
| [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) (LeetCode 416) | Same algebraic trick, boolean instead of count |
| [Last Stone Weight II](https://leetcode.com/problems/last-stone-weight-ii/) (LeetCode 1049) | Minimise |Sum(P) - Sum(N)| — same subset split |
