### Where it appears

| Problem | What the deque tracks |
|---|---|
| [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (LeetCode 239) | decreasing values — front is the window max |
| [Longest Continuous Subarray With Absolute Diff ≤ Limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/) (LeetCode 1438) | two deques: one for max, one for min |
| [Jump Game VI](https://leetcode.com/problems/jump-game-vi/) (LeetCode 1696) | best dp value among the last k positions |
| [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) (LeetCode 862) | increasing prefix sums — front is the candidate left end |

:::interview
"LeetCode 862 has negative numbers. Why does a plain sliding window fail, and how does the deque fix it?"

With negatives, growing the window can *decrease* the prefix sum — so "sum ≥ K" can appear, disappear, and reappear as you extend right. A plain two-pointer cannot safely advance the left because shrinking might skip a valid window. The deque holds prefix-sum indices in increasing order; when `prefix[i] − prefix[dq.front] ≥ K`, record the length and pop the front (no later `i` will give a shorter window with that same front). The increasing invariant guarantees each candidate is tested exactly once.
:::
