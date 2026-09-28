## Transformation: Connectivity to DSU <span class="lv lv1"></span>

DFS and BFS are great for finding connected components. But they are static. If the graph is changing, running DFS repeatedly is a disaster.

### The Signal

- "Are these two nodes in the same group?"
- "We add an edge... now are they connected?"
- "What is the size of the largest group as edges are added?"
- The problem asks about connectivity, and the edges are provided dynamically or need to be processed sequentially.

### The Mapping

We transform standard graph traversal into a **Disjoint Set Union (DSU / Union-Find)** problem.

- **Nodes:** Initialize each node as its own independent set (parent = self).
- **Adding an edge:** Perform a `union(u, v)` operation.
- **Checking connectivity:** Check if `find(u) === find(v)`.

### Canonical Example: Number of Provinces

- **Problem:** Given an N times N matrix indicating if city i and city j are connected, find the total number of connected provinces.
- **The Transformation:** 
  - Initialize a `count = N`.
  - Iterate through the matrix. For every connection `matrix[i][j] == 1`, perform `union(i, j)`.
  - If the union was successful (they were not already in the same set), decrement `count`.
  - Return `count`.

### Canonical Example: Redundant Connection

- **Problem:** A tree has N nodes and N-1 edges. One extra edge is added, creating a cycle. Find that extra edge.
- **The Trap:** Running DFS cycle detection. It works, but it's annoying to write and harder to track exactly which edge caused the cycle.
- **The Transformation:**
  - Start with an empty DSU.
  - Process edges one by one.
  - For each edge `[u, v]`, if `find(u) === find(v)`, you just found the edge that created the cycle! Return it immediately.
  - Otherwise, `union(u, v)`.

DSU is the ultimate tool for processing dynamic connectivity. If a problem involves merging groups, immediately transform it to DSU.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) (LeetCode 547) | Union connected cities, count remaining disjoint sets |
| [Redundant Connection](https://leetcode.com/problems/redundant-connection/) (LeetCode 684) | Union edges sequentially; the one that creates a cycle is the answer |
| [Accounts Merge](https://leetcode.com/problems/accounts-merge/) (LeetCode 721) | Union accounts sharing an email, merge groups at the end |
| [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) (LeetCode 128) | Union consecutive values, track largest component size |
