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
