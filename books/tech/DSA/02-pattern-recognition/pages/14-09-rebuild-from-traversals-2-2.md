### Variations

- **Construct from Inorder and Postorder (LeetCode 106):** post-order ends with the root. Read it from the back, and build the *right* subtree before the left
- **Construct BST from Preorder Traversal (LeetCode 1008):** no in-order needed: carry an upper bound down; take the next value while it is below the bound. Each value is read once, O(n)
- **Serialize and Deserialize Binary Tree (LeetCode 297):** pre-order with an explicit marker for `null` children is enough on its own, even with duplicate values; deserialising reads the tokens with the same recursion
- **Construct Binary Tree from String with Bracket Representation (GFG):** `4(2(3)(1))(6(5))`: read a number, then an optional `(…)` for the left subtree and another for the right; match brackets by depth or recursion
- **Convert Sorted Array to Binary Search Tree (LeetCode 108) / normal BST to balanced BST (GFG):** the middle element is the root; recurse on both halves. For an existing BST, read it in order first (page 14-08)

### The failure

- **`indexOf` inside the recursion.** Searching the in-order array for every root is O(n) per node, O(n²) total: survivable at a few thousand nodes, too slow at 10⁵, and the first thing an interviewer asks you to fix. Build the value → index map once
- **Duplicate values.** With repeated values the root's in-order position is ambiguous and the tree is not unique. The problem must promise distinct values, or you must serialise with null markers instead

:::interview
"Why does pre-order plus in-order determine the tree, but pre-order plus post-order does not?" — In-order tells you, for each root, exactly which nodes lie on its left. Pre-order and post-order both only tell you the order of roots and subtrees; a node with a single child could have it on either side, and both orders look the same. That ambiguity disappears only for full binary trees.
:::
