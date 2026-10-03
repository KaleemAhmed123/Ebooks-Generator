### Coin Change II (Combinations)

- **The Setup:** Instead of finding the *minimum number of coins*, find the *total number of distinct combinations* that make up that amount.
- **The State:** `dp[a]` = the number of ways to make amount `a`.
- **The Transition:** `dp[a] += dp[a - c]`.
- **The Loop Order Trap:** 
  - In Coin Change I, the outer loop is `amount` and inner is `coins`. 
  - In Coin Change II, if you do `amount` then `coins`, you will count `[1, 2]` and `[2, 1]` as two different combinations (Permutations).
  - To count distinct Combinations, you must flip the loops: **outer loop `coins`, inner loop `amount`**. This forces the algorithm to use all the 1s, then all the 2s, ensuring combinations are strictly ordered.
