## Target Sum 🟡

This is the final boss of standard Knapsack variations. It requires algebraic manipulation before you can write the DP.

- **The Setup:** Given an array of integers `nums` and a target integer `S`. You want to build an expression by placing `+` or `-` before each integer so that they evaluate to `S`. Return the total number of different valid expressions.
- **Example:** `nums = [1, 1, 1, 1, 1], S = 3`. Return `5`.

### The Naive DP (2D with Offsets)

You could use memoization: `dfs(index, currentSum)`. But `currentSum` can be negative, so in tabulation, you would have to shift the entire array to the right to avoid negative array indices. It's messy.

### The Algebraic Math Trick

Let's divide the numbers into two subsets:
- P: The numbers we put a `+` in front of.
- N: The numbers we put a `-` in front of.

We know two mathematical truths:
1. Sum(P) - Sum(N) = S (The problem requirement)
2. Sum(P) + Sum(N) = Sum(Total) (The sum of all numbers in the array)

Let's add those two equations together:
2 times Sum(P) = S + Sum(Total)
Sum(P) = S + Sum(Total)/2

**The Revelation:** We don't need to track negative numbers or offsets! The problem is simply asking: *"How many subsets exist in the array that sum to exactly Sum(P)?"*

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
