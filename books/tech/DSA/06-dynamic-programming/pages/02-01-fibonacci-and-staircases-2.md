### Space Optimization

Notice the loop `dp[i] = dp[i - 1] + dp[i - 2]`. 
To calculate `dp[10]`, you only need `dp[9]` and `dp[8]`. You completely ignore `dp[0]` through `dp[7]`.
Why are we keeping an entire array of size N in memory if we only ever look at the last two variables?

We can optimize the space complexity from O(N) down to O(1) by replacing the array with two simple variables.

```ts
function climbStairsOptimized(n: number): number {
  if (n <= 1) return 1;
  
  let prev2 = 1; // dp[0]
  let prev1 = 1; // dp[1]
  
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    // Shift the variables forward for the next iteration
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1; // prev1 is always the most recent calculation (dp[n])
}
```

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) (LeetCode 70) | Direct Fibonacci recurrence with 1 or 2 steps |
| [Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/) (LeetCode 746) | Same recurrence with a cost array added |
| [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) (LeetCode 509) | The literal Fibonacci definition |
| [N-th Tribonacci Number](https://leetcode.com/problems/n-th-tribonacci-number/) (LeetCode 1137) | Extends to three previous states instead of two |

### The rule of thumb

**Always look at your transition formula.** 
If `dp[i]` only relies on `dp[i-1]` and `dp[i-2]`, you can optimize it to O(1) space using variables. 
If `dp[i]` relies on a variable window (e.g., "you can jump up to K steps"), or if you need to return the *actual path* taken instead of just the count, you must keep the full array.
