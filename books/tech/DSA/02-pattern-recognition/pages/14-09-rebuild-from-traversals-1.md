## Rebuild from Traversals 🟡

- **What it is:** A pre-order list tells you *which* node is the root (always first). An in-order list tells you *which nodes are on each side* of it. Together they rebuild the tree uniquely when values are distinct: take the next pre-order value as the root, split the in-order range at its position, recurse left then right
- **Signal:** "construct a binary tree from preorder and inorder", "from inorder and postorder", "BST from preorder", "serialize and deserialize", "tree from a bracket string", "balanced BST from a sorted array"
- **Why it works:** In pre-order, a root comes before everything in its subtree, and the left subtree comes before the right one. In in-order, the root sits between its left and right subtrees. So the root's offset within the current in-order range is exactly the size of its left subtree, which tells the recursion where to split both lists. A value → index map makes each split O(1)
