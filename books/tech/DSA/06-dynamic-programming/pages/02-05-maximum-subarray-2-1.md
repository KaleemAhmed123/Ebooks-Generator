### Implementation (O(N) Space)

```ts
function maxSubArray(nums: number[]): number {
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  let globalMax = dp[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    globalMax = Math.max(globalMax, dp[i]);
  }

  return globalMax;
}
```

### Implementation (O(1) Space Kadane's)

Because `dp[i]` only ever looks at `dp[i-1]`, we don't need an array. We just need a single variable to track the running sum.

```ts
function maxSubArrayOptimized(nums: number[]): number {
  let currentSum = nums[0];
  let globalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    globalMax = Math.max(globalMax, currentSum);
  }

  return globalMax;
}
```
