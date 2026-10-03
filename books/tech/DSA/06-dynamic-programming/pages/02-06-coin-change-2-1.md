### Implementation (Tabulation)

```ts
function coinChange(coins: number[], amount: number): number {
  // Initialize with amount + 1, which acts as our Infinity
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) { // Can we fit this coin in the current amount?
        dp[a] = Math.min(dp[a], 1 + dp[a - c]);
      }
    }
  }

  // If dp[amount] is still amount + 1, it was mathematically impossible 
  // to make the change (e.g., coins = [2], amount = 3)
  return dp[amount] === amount + 1 ? -1 : dp[amount];
}
```

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Coin Change](https://leetcode.com/problems/coin-change/) (LeetCode 322) | Minimum coins to reach a target amount |
| [Coin Change II](https://leetcode.com/problems/coin-change-ii/) (LeetCode 518) | Count distinct combinations that sum to target |
| [Perfect Squares](https://leetcode.com/problems/perfect-squares/) (LeetCode 279) | Minimum perfect squares summing to n — same structure |
| [Minimum Cost for Tickets](https://leetcode.com/problems/minimum-cost-for-tickets/) (LeetCode 983) | Coin change with variable-width "coins" (1, 7, 30 days) |
