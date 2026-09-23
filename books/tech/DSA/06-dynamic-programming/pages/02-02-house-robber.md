## House Robber

The House Robber problem introduces the concept of **Exclusive Choices**.

- **The Setup:** You are a robber planning to rob houses along a street. Each house has a certain amount of money. The only constraint: you cannot rob adjacent houses, or an alarm will trigger. Return the maximum amount of money you can rob.
- **The State:** `dp[i]` = the maximum money you can rob from houses `0` to `i`.

### The Transition

When you arrive at house `i`, you have exactly two choices:
1. **Rob it:** If you rob house `i`, you get `nums[i]`. But you are strictly banned from robbing house `i-1`. Therefore, the best you could have done prior to this is `dp[i-2]`. The total profit is `nums[i] + dp[i-2]`.
2. **Skip it:** If you do not rob house `i`, you get $0 from it. However, because you skipped it, you are allowed to have robbed house `i-1`. The total profit is whatever the best profit was up to `i-1`, which is `dp[i-1]`.

The robber wants the maximum profit, so they simply take the maximum of these two choices:
`dp[i] = Math.max(dp[i-1], nums[i] + dp[i-2])`

### Implementation (Space Optimized)

Just like Climbing Stairs, `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`. We can use O(1) space.

```ts
function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let prev2 = 0; // max profit if we had no houses
  let prev1 = nums[0]; // max profit for just house 0
  
  for (let i = 1; i < nums.length; i++) {
    const robCurrent = nums[i] + prev2;
    const skipCurrent = prev1;
    
    const currentMax = Math.max(robCurrent, skipCurrent);
    
    prev2 = prev1;
    prev1 = currentMax;
  }
  
  return prev1;
}
```

### House Robber II (Circular Street)

- **The Twist:** The houses are arranged in a circle. House 0 is adjacent to House N-1.
- **The Trap:** If you rob House 0, you cannot rob House N-1. If you don't rob House 0, you *can* rob House N-1. You cannot track this in a standard 1D array without expanding the state to 2D (which makes it slow).
- **The Solution:** Break the circle into two separate, standard House Robber problems.
  1. Run the algorithm from House 0 to N-2 (ignoring the last house).
  2. Run the algorithm from House 1 to N-1 (ignoring the first house).
  3. Return the maximum of the two results.
