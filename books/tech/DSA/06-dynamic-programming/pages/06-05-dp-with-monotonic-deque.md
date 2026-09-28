## DP with Monotonic Deque <span class="lv lv2"></span>

- Some DP transitions look at a sliding window of previous states: `dp[i] = max(dp[j] + value[i])` for all `j` in `[i - k, i - 1]`. Naively, each transition scans up to k states — total O(nk)
- A **monotonic deque** (double-ended queue that maintains sorted order) reduces each transition to O(1) amortised. The deque stores indices of candidate states, and evicts any that are dominated or out of the window. Total: O(n)

### The pattern

1. **Identify the window.** The transition uses `dp[j]` for `j ∈ [i - k, i - 1]`
2. **Maintain a deque** of indices sorted so that `dp[deque[front]]` ≥ `dp[deque[back]]` (for max; reverse for min)
3. **Before computing `dp[i]`:** evict indices from the front that are out of window (`front < i - k`). The front is now the best candidate
4. **After computing `dp[i]`:** evict indices from the back whose `dp` values are worse than `dp[i]` (they will never be chosen). Push `i`

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

### The trap

- **Using `deque.shift()` in JS.** Array `.shift()` is O(n) because it reindexes every element. For competitive programming, implement a deque with a circular buffer or use two-pointer indices into a pre-allocated array. For interviews, mention the caveat but use `.shift()` for clarity — interviewers care about the algorithm, not the JS array internals
- **Forgetting to evict stale front entries before reading.** If the window has moved past `deque[0]`, you read an out-of-bounds state. Always evict first, then read

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Jump Game VI](https://leetcode.com/problems/jump-game-vi/) (LeetCode 1696) | Max score with bounded jumps — sliding window max |
| [Constrained Subsequence Sum](https://leetcode.com/problems/constrained-subsequence-sum/) (LeetCode 1425) | Max subsequence sum with gap constraint k |
| [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (LeetCode 239) | The pure monotonic deque template |
| [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) (LeetCode 862) | Deque on prefix sums for minimum-length subarray |

:::interview
"How does the deque make this O(n)?"

Each index enters the deque once and leaves at most once — either evicted from the back (dominated) or from the front (out of window). Total operations across all iterations: 2n pushes and pops. Each transition reads the front in O(1). Amortised O(1) per transition, O(n) total.
:::
