### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Kth Ancestor of a Tree Node](https://leetcode.com/problems/kth-ancestor-of-a-tree-node/) (LeetCode 1483) | Jump K steps via binary decomposition |
| [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) (LeetCode 236) | LCA via lifting both nodes to same depth |
| [Maximum Genetic Difference Query](https://leetcode.com/problems/maximum-genetic-difference-query/) (LeetCode 1938) | Binary lifting on a tree with XOR queries |

:::interview
"Can we find LCA without Binary Lifting?"

Yes, for a single query, you can do a standard DFS which takes O(N). But if an interviewer asks you to answer $10^5$ LCA queries on a tree with $10^5$ nodes, O(N) per query will Time Limit Exceed. Binary Lifting reduces the query time to O(log N), completing all queries effortlessly.
:::
