### Where it appears

| Problem | What the traversals tell you |
|---|---|
| [Build Tree from Preorder and Inorder](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) (LeetCode 105) | preorder picks the root, inorder splits left/right |
| [Build Tree from Inorder and Postorder](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) (LeetCode 106) | read post-order from the back; build right first |
| [BST from Preorder](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/) (LeetCode 1008) | carry an upper bound instead of inorder |
| [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) (LeetCode 297) | pre-order with null markers — no inorder needed |

:::interview
"Why is building from preorder + postorder alone not unique, but preorder + inorder is?"

Inorder tells you exactly which nodes are left vs right of the root. Postorder gives the same root information as preorder (just at the end), but neither preorder nor postorder alone says where the left subtree ends. With a single child, both orderings look the same whether it is left or right — so the tree is ambiguous.
:::
