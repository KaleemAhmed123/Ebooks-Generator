### Variations

- **Lowest Common Ancestor of a BST (LeetCode 235):** no recursion into both sides: if both values are smaller go left, if both are larger go right, otherwise this node is the split. O(height), O(1) space
- **Min distance between two given nodes (GFG):** `depth(a) + depth(b) − 2 · depth(LCA)`, or find the LCA and add the two downward depths from it
- **Step-By-Step Directions From a Binary Tree Node to Another (LeetCode 2096):** paths from the root to both nodes as `L`/`R` strings; drop their common prefix (that is the LCA); answer = `U` for each step left in the start path + the rest of the destination path
- **Lowest Common Ancestor of Deepest Leaves (LeetCode 1123):** return `(depth, lca)` from each subtree: deeper side wins, equal depths make the current node the answer (return one, record another, page 14-03)
- **Many LCA queries:** binary lifting answers each in O(log n) after O(n log n) preprocessing (Module 03)

### The failure

- **Assuming both nodes exist when they may not.** The template returns `p` when only `p` is in the tree. If a node may be missing, count how many targets were actually found and return `null` unless it is two
- **Comparing values instead of nodes.** In a general binary tree, values may repeat; `root.val === p.val` can stop at the wrong node. Compare references

:::interview
"How does the recursive LCA work?" — Each call returns p or q if it found one in its subtree, else null. When a node gets non-null from both children, p and q are on different sides, so it is the lowest common ancestor. If a node is itself p or q, it returns immediately, which covers the case where one target is an ancestor of the other. One post-order pass, O(n).
:::
