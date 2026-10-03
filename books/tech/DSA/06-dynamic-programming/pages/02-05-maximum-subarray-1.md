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
