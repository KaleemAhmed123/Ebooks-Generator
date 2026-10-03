## DP with Monotonic Deque <span class="lv lv2"></span>

- Some DP transitions look at a sliding window of previous states: `dp[i] = max(dp[j] + value[i])` for all `j` in `[i - k, i - 1]`. Naively, each transition scans up to k states — total O(nk)
- A **monotonic deque** (double-ended queue that maintains sorted order) reduces each transition to O(1) amortised. The deque stores indices of candidate states, and evicts any that are dominated or out of the window. Total: O(n)

### The pattern

1. **Identify the window.** The transition uses `dp[j]` for `j ∈ [i - k, i - 1]`
2. **Maintain a deque** of indices sorted so that `dp[deque[front]]` ≥ `dp[deque[back]]` (for max; reverse for min)
3. **Before computing `dp[i]`:** evict indices from the front that are out of window (`front < i - k`). The front is now the best candidate
4. **After computing `dp[i]`:** evict indices from the back whose `dp` values are worse than `dp[i]` (they will never be chosen). Push `i`
