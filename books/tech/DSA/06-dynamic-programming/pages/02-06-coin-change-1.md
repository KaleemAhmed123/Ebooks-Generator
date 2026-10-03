## Coin Change <span class="lv lv1"></span>

Coin Change bridges the gap between simple 1D arrays and unbounded Knapsack problems. 

- **The Setup:** You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the **fewest number of coins** that you need to make up that amount. Assume you have an infinite supply of each coin.
- **Example:** `coins = [1, 2, 5], amount = 11`. Result: 3 (`5 + 5 + 1`).

### The DP State

- **State:** `dp[a]` = the minimum number of coins needed to make exactly amount `a`.
- **Transition:** To make amount `a`, we could try using one of our coins (e.g., coin `c`). If we use coin `c`, the remaining amount we need to make is `a - c`. The number of coins used would be `1 + dp[a - c]`. We want to test every available coin and take the minimum.

`dp[a] = min( 1 + dp[a - c] ) for all c in coins`

### The Base Case and Initialization

- **Base Case:** `dp[0] = 0`. (It takes 0 coins to make $0).
- **Initialization Trap:** What should we fill the rest of the `dp` array with? 
  - If we are doing `Math.max` (like in House Robber), we initialize with `0`.
  - But we are doing `Math.min`. If we initialize the array with `0`, `Math.min(0, 1 + dp[a-c])` will always return `0`. 
  - We must initialize the array with `Infinity` (or a number safely larger than any possible answer, like `amount + 1`).
