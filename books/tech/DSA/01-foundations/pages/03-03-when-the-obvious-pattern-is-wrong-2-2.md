### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) (LeetCode 560) | Looks like sliding window but has negatives — needs prefix sum plus hash map |
| [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) (LeetCode 435) | Looks like DP but greedy by end-time is simpler and optimal |
| [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/) (LeetCode 1091) | Uniform-cost grid — BFS works, but weighted variants need Dijkstra |
| [Network Delay Time](https://leetcode.com/problems/network-delay-time/) (LeetCode 743) | Looks like BFS but edges have weights — needs Dijkstra |

:::interview
"I think this is a sliding window problem."

Before committing, check: does shrinking the window always move the validity metric in one direction? If the array has negative numbers, the sum can go either way when you shrink. That breaks the monotonic assumption sliding window needs. Consider prefix sums instead.
:::
