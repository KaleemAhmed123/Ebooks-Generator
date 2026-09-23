## Fibonacci and Staircases

The absolute foundation of 1D Dynamic Programming. If you understand these, you understand the core mechanics of state transition.

### The Climbing Stairs Problem

- **The Setup:** You are climbing a staircase with N steps. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
- **The State:** `dp(i)` = the number of distinct ways to reach step `i`.
- **The Transition:** How do you get to step `i`? You either took a 1-step from `i-1`, or a 2-step from `i-2`. There are no other ways. Therefore, the total number of ways to reach `i` is the sum of the ways to reach `i-1` and `i-2`.
- `dp[i] = dp[i-1] + dp[i-2]`
- **The Base Cases:** 
  - `dp[0] = 1` (1 way to be on the ground: do nothing)
  - `dp[1] = 1` (1 way to reach the first step)

### Implementation (Tabulation)

```ts
function climbStairs(n: number): number {
  if (n <= 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
```

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

### The rule of thumb

**Always look at your transition formula.** 
If `dp[i]` only relies on `dp[i-1]` and `dp[i-2]`, you can optimize it to O(1) space using variables. 
If `dp[i]` relies on a variable window (e.g., "you can jump up to K steps"), or if you need to return the *actual path* taken instead of just the count, you must keep the full array.
