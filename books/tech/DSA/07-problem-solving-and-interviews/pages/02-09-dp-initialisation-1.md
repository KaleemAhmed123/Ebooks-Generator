## DP Initialisation Traps <span class="lv lv1"></span>

Dynamic Programming is notoriously sensitive to how the array is initialised. If the default values are wrong, the transitions will combine garbage data into more garbage data.

### 1. Min/Max Problems

- If the transition formula uses `Math.min()`, you **must** initialize the array with `Infinity`.
  - *Trap:* If you initialize with `0`, `Math.min(0, cost)` will always be `0`. The answer will never change.
- If the transition formula uses `Math.max()`, you **must** initialize with `-Infinity` (or `0` if all values are strictly positive).
  - *Trap:* If negative profits are possible, and you initialize with `0`, `Math.max(0, -5)` will incorrectly choose `0` instead of accepting the penalty.

### 2. The 1D Tabulation Base Case

When you pad an array (e.g., `dp = new Array(n + 1)`), index `0` represents the base case (an empty string, zero items, zero capacity). 
You must explicitly set `dp[0]` based on the mathematical reality of the problem.

- **Counting Ways (e.g., Climbing Stairs):** `dp[0] = 1`. There is exactly 1 way to do nothing.
- **Finding Minimum Cost (e.g., Min Coin Change):** `dp[0] = 0`. The cost to make amount 0 is 0 coins.

If you are doing a "Counting Ways" problem and you initialize the array with `0` everywhere, `dp[1] = dp[0] + something`, which is `0 + 0 = 0`. The entire array stays `0` forever.
