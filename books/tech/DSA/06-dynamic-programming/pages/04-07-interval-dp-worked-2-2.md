### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Burst Balloons](https://leetcode.com/problems/burst-balloons/) (LeetCode 312) | "Which to burst last" reframe |
| [Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/) (LeetCode 516) | Interval shrinks from both ends |
| [Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/) (LeetCode 132) | Minimum cuts with palindrome precomputation |
| [Minimum Cost Tree From Leaf Values](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/) (LeetCode 1130) | Interval DP choosing which leaf pair to merge |

:::interview
"How do you recognise an interval DP problem?"

The problem collapses a contiguous range by combining or removing adjacent elements. After each operation, the remaining elements stay in their original relative order — nothing rearranges. If the subproblems are sub-intervals of the original range, interval DP applies.
:::
