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

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [House Robber](https://leetcode.com/problems/house-robber/) (LeetCode 198) | The original non-adjacent selection problem |
| [House Robber II](https://leetcode.com/problems/house-robber-ii/) (LeetCode 213) | Circular variant, split into two linear passes |
| [House Robber III](https://leetcode.com/problems/house-robber-iii/) (LeetCode 337) | Same constraint on a binary tree |
| [Delete and Earn](https://leetcode.com/problems/delete-and-earn/) (LeetCode 740) | Reduces to House Robber after frequency counting |
