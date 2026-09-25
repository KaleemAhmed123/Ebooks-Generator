## Recognition drills: Trees 🟢 - continued

| Problem | Direction & move |
|---|---|
| 26. Kth Smallest / Largest in BST (LeetCode 230 / GFG) | **In order** (reverse in order for largest) with a stack |
| 27. Two Sum IV in BST / pairs from two BSTs (LeetCode 653 / GFG) | **Two in-order iterators,** collide |
| 28. Recover Binary Search Tree (LeetCode 99) | **In order,** find the drops |
| 29. Construct from Preorder and Inorder (LeetCode 105) | **Rebuild:** index map, split by the root |
| 30. Serialize and Deserialize Binary Tree (LeetCode 297) | **Pre-order with null markers** |
| 31. Check whether BST contains a dead end (GFG) | **Down:** carry the open range `(lo, hi)`, starting at `(0, ∞)` for positive values; a leaf whose range has room for nothing but itself (`hi − lo === 2`) is a dead end |
| 32. Largest BST in a Binary Tree (GFG) | **Up:** return `(isBST, min, max, size)`, record the best size |
| 33. Minimum swaps to convert a binary tree into a BST (GFG) | **In order + cycles:** read the tree in order, then minimum swaps to sort (04-02) |
| 34. Morris traversal / median of BST in O(1) space | **Threads, no stack** (Chapter 19) |

### Score yourself

- **28–34:** you pick the signature (parameters, return value, queue, parent map) before writing the body
- **18–27:** reread 14-01's direction table; misses are usually "up" solved "down"
- **0–17:** redo 14-02 and 14-03 on paper, they cover half of this table
