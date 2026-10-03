### Jump Game VI (LC 1696)

- **Problem:** Given an array `nums` and integer `k`, start at index 0. From index `i` you can jump to any index in `[i+1, i+k]`. Score = sum of `nums[j]` at every index you land on. Maximise the score
- **State:** `dp[i]` = max score to reach index `i`
- **Transition:** `dp[i] = nums[i] + max(dp[j])` for `j ∈ [i-k, i-1]`
- **Without deque:** O(nk). With n = 10⁵ and k = 10⁵, that is 10¹⁰ — TLE
- **With deque:** O(n)

```ts
function maxResult(nums: number[], k: number): number {
  const n = nums.length;
  const dp = new Array(n).fill(-Infinity);
  dp[0] = nums[0];
  const deque: number[] = [0];  // stores indices, dp[deque[0]] is the max

  for (let i = 1; i < n; i++) {
    // Evict out-of-window indices from the front
    while (deque.length > 0 && deque[0] < i - k) deque.shift();

    // Best previous state is at the front
    dp[i] = nums[i] + dp[deque[0]];

    // Evict from back: indices whose dp is ≤ dp[i] will never beat dp[i]
    while (deque.length > 0 && dp[deque[deque.length - 1]] <= dp[i]) deque.pop();
    deque.push(i);
  }

  return dp[n - 1];
}
```

### Constrained Subsequence Sum (LC 1425)

- **Problem:** Given an array and integer `k`, find the maximum sum of a subsequence where no two consecutive chosen elements are more than `k` indices apart
- Same shape: `dp[i] = nums[i] + max(0, max(dp[j]))` for `j ∈ [i-k, i-1]`. The `max(0, ...)` handles the choice to start a new subsequence at `i`
