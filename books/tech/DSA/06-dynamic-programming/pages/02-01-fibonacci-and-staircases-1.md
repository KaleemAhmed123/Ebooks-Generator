## Fibonacci and Staircases <span class="lv lv1"></span>

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
