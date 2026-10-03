### Where it appears

| Problem | Which node wins per column |
|---|---|
| [Vertical Order Traversal](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/) (LeetCode 987) | all nodes, sorted by row then value |
| [Top View of Binary Tree](https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1) (GFG) | first node seen per column (BFS order) |
| [Bottom View of Binary Tree](https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1) (GFG) | last node seen per column (overwrite) |

:::interview
"Why does DFS give the wrong top view, but BFS works?"

DFS explores depth-first — it can reach a deep left node in column 1 before a shallow right child in the same column. The deep node gets recorded as "first", but the shallow one is actually higher. BFS processes nodes level by level, so the first node it sees in each column is genuinely the topmost.
:::
