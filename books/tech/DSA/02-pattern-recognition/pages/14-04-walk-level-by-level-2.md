### Variations

- **Left View of Binary Tree (GFG):** `level[0]` instead of the last node. DFS alternative: visit left before right and record the first node seen at each depth
- **Binary Tree Zigzag Level Order Traversal (LeetCode 103):** collect each level left to right, reverse every other one (or fill an array from the back on odd levels)
- **Maximum Width of Binary Tree (LeetCode 662):** give each node its heap index (`2i`, `2i + 1`); width = last index − first index + 1 per level. Subtract the level's first index before doubling, or indices overflow on deep, thin trees
- **Check Completeness of a Binary Tree (LeetCode 958):** BFS that also enqueues `null` children; once a `null` has been seen, any later real node means the tree is not complete
- **Check if all levels of two trees are anagrams (GFG):** walk both trees level by level together; compare each pair of levels as sorted lists or frequency maps
- **Reverse Level Order Traversal (GFG):** collect levels, then reverse the list of levels (or push right child before left and reverse the whole output)

### The failure

- **Using the queue's changing length as the loop bound.** `for (let i = 0; i < queue.length; i++)` while pushing children keeps extending the loop into the next level. Snapshot the size first, or build `next` separately as the template does
- **Right view as "keep going right".** Following only right children misses nodes that stick out below a shorter right side. For `[1, 2, 3, 4]` (4 is the left child of 2) the right-child walk gives `1, 3`; the view is `1, 3, 4`, because nothing on level 2 is to the right of 4

:::interview
"How do you get the right side view of a binary tree?" — BFS level by level, and the last node of each level is visible from the right. Equivalently, DFS visiting the right child first and recording the first node at each new depth. Both are O(n); BFS uses O(width) memory, DFS O(height).
:::
