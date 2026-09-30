### Misdirection 3: Looks like binary search — predicate isn't monotonic

- **Surface signal:** "Find the minimum/maximum value that satisfies a condition"
- **The trap:** You frame it as binary search on the answer space. But binary search requires the predicate to be monotonic: if `f(x) = true`, then `f(x+1) = true` for all x+1 in the range (or the reverse)
- **Example:** "Find the smallest window size where the window contains all unique elements of the array." If some windows of size 5 work and some don't, the predicate "window of size k contains all elements" is not monotonic in k when the elements are distributed unevenly. You need a different framing
- **The diagnostic:** Check: "If the condition holds for value X, does it hold for all values ≥ X (or all values ≤ X)?" If not, binary search on the answer will give wrong results

### Misdirection 4: Looks like BFS — but costs aren't uniform

- **Surface signal:** "Find the shortest path from A to B"
- **The trap:** You run BFS because BFS finds shortest paths. But the edges have different weights. BFS treats every edge as cost 1. With weighted edges, BFS finds the path with fewest edges, not the path with lowest total cost
- **The real pattern:** Dijkstra's algorithm. Or if all weights are 0 or 1, 0-1 BFS with a deque
- **The diagnostic:** Ask: "Are all edge costs equal?" If yes, BFS. If no, you need a priority queue

### The skill

- Pattern recognition gets you to a candidate technique in 10 seconds
- Pattern validation takes 30 more seconds to confirm the technique's assumptions actually hold
- The 30 seconds of validation saves 25 minutes of debugging the wrong approach
- **Always check the assumptions before writing code**

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
