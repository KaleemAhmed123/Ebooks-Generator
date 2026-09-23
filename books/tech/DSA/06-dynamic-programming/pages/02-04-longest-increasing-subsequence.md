## Longest Increasing Subsequence (LIS) 🟡

LIS is a massive leap in complexity. In Climbing Stairs and House Robber, `dp[i]` only looked back at `dp[i-1]` and `dp[i-2]`. In LIS, `dp[i]` must look back at **every single state that came before it**.

- **The Setup:** Given an integer array, return the length of the longest strictly increasing subsequence.
- **Example:** `[10, 9, 2, 5, 3, 7, 101, 18]` -> `[2, 3, 7, 101]` -> Length: 4.
- **The State:** `dp[i]` = the length of the longest increasing subsequence that *strictly ends with the element at index i*.

### The Transition

To find the longest subsequence ending at `nums[i]`, we need to find some previous element `nums[j]` that we can legally append `nums[i]` to.
- It is legal to append `nums[i]` to `nums[j]` if and only if `nums[j] < nums[i]` (strictly increasing).
- If it is legal, the new sequence length is `dp[j] + 1`.
- We want to maximize this length, so we check *every single* `j` from `0` to `i-1`.

`dp[i] = max(dp[i], dp[j] + 1) for all j < i where nums[j] < nums[i]`

### Implementation O(N²)

```ts
function lengthOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0;
  
  // Every element is inherently a subsequence of length 1 (itself)
  const dp = new Array(nums.length).fill(1);
  let maxLIS = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        // Can we form a longer sequence by appending nums[i] to nums[j]?
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    // Track the global maximum. It might not be at the very end of the array!
    maxLIS = Math.max(maxLIS, dp[i]);
  }

  return maxLIS;
}
```

### The trap: Returning `dp[n-1]`

In Climbing Stairs, the answer is always in the last cell of the array. 
In LIS, the longest sequence could be hidden in the middle of the array! (e.g., `[1, 2, 3, 4, 5, 0]`. The `dp` for `0` is `1`. If you return `dp[n-1]`, you return `1` instead of `5`).
**Always keep a running `globalMax` variable if the DP state is "ends exactly at index i".**

### The O(N log N) Optimization

There is a legendary O(N log N) solution for LIS using Binary Search (often called Patience Sorting). It involves building a "sub sequence array" and using binary search to replace elements. While brilliant, it is not actually Dynamic Programming, and is rarely expected unless you are interviewing at a trading firm. Memorize the O(N²) DP first.
