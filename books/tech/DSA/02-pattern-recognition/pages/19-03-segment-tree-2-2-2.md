| Problem | Operation stored | Why not a Fenwick |
|---|---|---|
| [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307) | sum, point update | (a Fenwick also fits — use it) |
| [Longest Increasing Subsequence II](https://leetcode.com/problems/longest-increasing-subsequence-ii/) (LeetCode 2407) | max over a value window | max is not subtractable |
| Range-minimum with updates | min | min has no inverse |

:::interview
"A Fenwick and a segment tree both do O(log n) updates. When must it be a segment tree?"

A Fenwick (83) only handles operations with an inverse — sum, XOR — because it answers a range as the difference of two prefixes. A segment tree answers a range by *merging* node-blocks, so it needs only that the operation be associative, not invertible. That buys min, max, gcd, assignment, and range updates via lazy tags — none of which a Fenwick can do. The price is about double the code and constant factor, so when the operation is plain sum with point updates, the Fenwick is the right lazy choice.
:::
