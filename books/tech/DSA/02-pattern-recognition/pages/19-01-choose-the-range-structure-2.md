### Where it appears

| Problem | What the range structure queries |
|---|---|
| [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307) | prefix sums with point updates |
| [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (LeetCode 315) | BIT over value ranks — count below current |
| [Longest Increasing Subsequence II](https://leetcode.com/problems/longest-increasing-subsequence-ii/) (LeetCode 2407) | segment tree range-max over a value window |

:::interview
"When would you use a BIT over a segment tree?"

A BIT (Binary Indexed Tree / Fenwick Tree) handles prefix operations (sum, max up to i) in half the code and constant factor of a segment tree. Use it when queries are prefix-based and updates are point-based. A segment tree is needed when queries are arbitrary ranges or require lazy propagation (range updates). If the BIT fits, always prefer it — fewer bugs, faster in practice.
:::
