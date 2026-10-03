## House Robber <span class="lv lv1"></span>

The House Robber problem introduces the concept of **Exclusive Choices**.

- **The Setup:** You are a robber planning to rob houses along a street. Each house has a certain amount of money. The only constraint: you cannot rob adjacent houses, or an alarm will trigger. Return the maximum amount of money you can rob.
- **The State:** `dp[i]` = the maximum money you can rob from houses `0` to `i`.

### The Transition

When you arrive at house `i`, you have exactly two choices:
1. **Rob it:** If you rob house `i`, you get `nums[i]`. But you are strictly banned from robbing house `i-1`. Therefore, the best you could have done prior to this is `dp[i-2]`. The total profit is `nums[i] + dp[i-2]`.
2. **Skip it:** If you do not rob house `i`, you get $0 from it. However, because you skipped it, you are allowed to have robbed house `i-1`. The total profit is whatever the best profit was up to `i-1`, which is `dp[i-1]`.

The robber wants the maximum profit, so they simply take the maximum of these two choices:
`dp[i] = Math.max(dp[i-1], nums[i] + dp[i-2])`
