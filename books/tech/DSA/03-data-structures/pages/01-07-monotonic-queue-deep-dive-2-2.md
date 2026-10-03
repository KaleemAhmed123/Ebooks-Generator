### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (LeetCode 239) | Canonical monotonic deque for window max |
| [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) (LeetCode 862) | Monotonic deque on prefix sums with negative values |
| [Longest Continuous Subarray With Absolute Diff <= Limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/) (LeetCode 1438) | Two deques track sliding min and max simultaneously |

:::interview
"Why use a Monotonic Queue instead of a Max-Heap for the Sliding Window Maximum?"

A Max-Heap can find the maximum in O(1) and add elements in O(log K). But *removing* an expired element from the middle of a Heap takes O(K). Lazy removal (waiting until the expired element reaches the top) works, but a Monotonic Queue is strictly O(N) overall (amortised O(1) per element) and is conceptually cleaner once mastered.
:::
