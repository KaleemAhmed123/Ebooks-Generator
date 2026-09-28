## Maximum Subarray (Kadane's Algorithm) <span class="lv lv1"></span>

This is one of the most famous algorithms in computer science. It is technically Dynamic Programming, but it is so heavily optimized that it looks like a simple Greedy algorithm.

- **The Setup:** Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum, and return its sum.
- **Example:** `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` -> `[4, -1, 2, 1]` -> Sum: 6.
- **Subarray vs Subsequence:** A Subsequence can skip elements (like LIS). A Subarray must be strictly contiguous (no gaps).

### The DP State

Because a subarray must be contiguous, the DP state is very rigid:
- **State:** `dp[i]` = the maximum subarray sum that *strictly ends at index i*.
- **Transition:** At index `i`, we have exactly two choices to form a valid contiguous subarray ending at `i`:
  1. We append `nums[i]` to the best subarray that ended at `i-1`. (Result: `dp[i-1] + nums[i]`)
  2. We throw away the past completely and start a brand new subarray starting with `nums[i]`. (Result: `nums[i]`)

`dp[i] = Math.max(nums[i], dp[i-1] + nums[i])`

### The Intuition (Kadane's)

Think about the math of `Math.max(nums[i], dp[i-1] + nums[i])`.
If `dp[i-1]` (the sum of the best past subarray) is **negative**, adding it to `nums[i]` will strictly drag `nums[i]` down. 
Therefore, if the running sum ever drops below zero, it has become toxic. We discard it and start fresh from the current element.

### Implementation (O(N) Space)

```ts
function maxSubArray(nums: number[]): number {
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  let globalMax = dp[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    globalMax = Math.max(globalMax, dp[i]);
  }

  return globalMax;
}
```

### Implementation (O(1) Space Kadane's)

Because `dp[i]` only ever looks at `dp[i-1]`, we don't need an array. We just need a single variable to track the running sum.

```ts
function maxSubArrayOptimized(nums: number[]): number {
  let currentSum = nums[0];
  let globalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    globalMax = Math.max(globalMax, currentSum);
  }

  return globalMax;
}
```

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) (LeetCode 53) | The original Kadane's problem |
| [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/) (LeetCode 918) | Kadane's with wrap-around handled via total minus min-subarray |
| [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) (LeetCode 152) | Track both max and min running products |
| [Maximum Subarray Sum with One Deletion](https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/) (LeetCode 1186) | Expand state to dp[i][canDelete] |

### Why does this matter?

Kadane's algorithm is beautiful, but if you only memorize the O(1) variable trick, you will fail if the interviewer asks a follow-up like "Find the maximum subarray sum if you are allowed to delete exactly one element." 
If you understand the underlying `dp[i]` state, you can easily expand it to 2D: `dp[i][canDelete]` and solve the follow-up. Always master the DP logic before memorizing the space-optimized trick.
