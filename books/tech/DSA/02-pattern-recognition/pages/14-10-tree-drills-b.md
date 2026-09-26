## Recognition drills: Trees <span class="lv lv1"></span> - continued

| Problem | Direction & move |
|---|---|
| 12. [All Nodes Distance K in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/) (LeetCode 863) | **Anywhere:** parent map + BFS |
| 13. [Amount of Time for Binary Tree to Be Infected](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/) (LeetCode 2385) / [Burning Tree](https://www.geeksforgeeks.org/problems/burning-tree/1) (GFG) | **Anywhere:** BFS until empty |
| 14. [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) (LeetCode 236) | **Split point** in post-order |
| 15. [House Robber III](https://leetcode.com/problems/house-robber-iii/) (LeetCode 337) | **Up:** return `(robbed, skipped)` pair (Module 06) |
| 16. [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) (LeetCode 230) / [Kth Largest in BST](https://www.geeksforgeeks.org/problems/kth-largest-element-in-bst/1) (GFG) | **In order** (reverse in order for largest) with a stack |
| 17. [Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/) (LeetCode 99) | **In order,** find the drops |
| 18. [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) (LeetCode 105) | **Rebuild:** index map, split by the root |
| 19. [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) (LeetCode 297) | **Pre-order with null markers** |

### Score yourself

- **16–19:** you pick the signature (parameters, return value, queue, parent map) before writing the body
- **10–15:** reread 14-01's direction table; misses are usually "up" solved "down"
- **0–9:** redo 14-02 and 14-03 on paper, they cover half of this table
