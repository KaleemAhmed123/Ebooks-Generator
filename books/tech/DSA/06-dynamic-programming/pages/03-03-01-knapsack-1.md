## The 0/1 Knapsack Problem <span class="lv lv1"></span>

The Knapsack problem is the undisputed king of Dynamic Programming. If you master this, you can solve roughly 30% of all medium/hard DP questions.

- **The Setup:** You are a thief with a knapsack that holds a maximum weight `W`. You are in a vault with `N` items. Each item has a `weight` and a `value`. You cannot split items (you either take an item completely, or leave it—hence "0/1"). What is the maximum value you can steal?
- **The State:** We need to track which items we have evaluated, AND how much space is left.
  - `dp[i][w]` = the maximum value using a subset of items from `0` to `i`, given a remaining capacity of `w`.

### The Transition

For the ith item, you have two choices:
1. **Leave it:** The value doesn't change. The capacity doesn't change. The best you can do is whatever you did for the previous `i-1` items. -> `dp[i-1][w]`
2. **Take it:** You gain `value[i]`. But you lose `weight[i]` capacity. The best you could have done prior to this was whatever you did for `i-1` items using the *reduced* capacity `w - weight[i]`. -> `value[i] + dp[i-1][w - weight[i]]`
   - *Constraint:* You can only take it if `w >= weight[i]`.

`dp[i][w] = Math.max( LeaveIt, TakeIt )`
