### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/) (LeetCode 94) | Canonical in-order DFS |
| [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) (LeetCode 102) | BFS with queue, snapshot per level |
| [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) (LeetCode 104) | Post-order: height depends on children |
| [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/) (LeetCode 110) | Post-order bottleneck: check heights bottom-up |

:::interview
"If I give you the Pre-order array and the Post-order array, can you uniquely reconstruct the original Binary Tree?"

No. You need the In-order array combined with either Pre-order or Post-order. Without In-order, if a node has only one child, you cannot determine if that child is the left child or the right child.
:::
