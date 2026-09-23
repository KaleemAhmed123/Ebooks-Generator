## Centroid Decomposition 🔴

**The Problem:** "Find the number of paths in a tree of length exactly K."
A standard DFS from every node takes O(N²), which TLEs for N = 10⁵. We need an O(N log N) solution.

### The Centroid

Every tree has a **Centroid**: a node that, if removed, splits the tree into a forest of subtrees where *no subtree has more than N/2 nodes*.

If we find the Centroid and remove it, we can divide the paths in the tree into two categories:
1. **Paths that pass through the Centroid.**
2. **Paths that exist entirely within one of the remaining subtrees.**

### The Divide and Conquer Algorithm

1. **Find the Centroid:** Run a DFS to compute subtree sizes. Start at the root and repeatedly move to any child that has size > N/2. The node where you stop is the Centroid. This takes O(N).
2. **Process Paths Through Centroid:** Run a DFS/BFS from the Centroid into all its branches to find the distances of all nodes from the Centroid. If a node in Branch A has distance D, we need a node in Branch B with distance K - D. We can use a Hash Map or Two Pointers to count these valid pairs in O(N) or O(N log N) time.
3. **Decompose:** Remove the Centroid from the tree. This creates several smaller disconnected trees.
4. **Recurse:** Recursively apply this algorithm to each of the smaller trees.

### Complexity Proof

Because the Centroid strictly splits the tree so that no component is larger than N/2, the depth of the recursion tree is at most log₂ N.
At each level of the recursion tree, we do O(text{Size}) work to process paths. The sum of sizes across a single level is exactly N.
Total time complexity: O(N log N) or O(N log² N) depending on how you process the paths.

### The Centroid Tree

If you keep track of which Centroid spawned which sub-Centroids, you build a new tree called the **Centroid Tree**.
- The height of the Centroid Tree is strictly O(log N).
- The distance between any two nodes U and V in the original tree can be found by looking at their Lowest Common Ancestor (LCA) in the Centroid Tree!

This makes the Centroid Tree perfect for answering dynamic queries like: "Update the color of node U, and query the distance to the nearest red node."
You just walk up the Centroid Tree from U (which takes log N steps) and update/query the state at each Centroid ancestor.
