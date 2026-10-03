### Pre-order vs Post-order

- **Pre-order:** You do work *before* visiting neighbors (as you travel down the tree). Good for passing information downwards.
- **Post-order:** You do work *after* visiting all neighbors (as you bubble back up). Good for aggregating information from children (e.g., "what is the size of my subtree?").

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Number of Islands](https://leetcode.com/problems/number-of-islands/) (LeetCode 200) | DFS from each unvisited land cell to mark a component |
| [Clone Graph](https://leetcode.com/problems/clone-graph/) (LeetCode 133) | Recursive DFS to deep-copy each node exactly once |
| [Max Area of Island](https://leetcode.com/problems/max-area-of-island/) (LeetCode 695) | DFS aggregation returning subtree size per component |
| [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) (LeetCode 547) | Count DFS launches on an adjacency-matrix graph |

### The trap

- **Stack Overflow:** The call stack in JavaScript has a limit (usually around 10,000 frames). If the graph is a single straight line of 20,000 nodes, recursive DFS will crash with `Maximum call stack size exceeded`.
- **The fix:** If constraints say N ≥ 10⁵ and the graph could be highly skewed, you must use an iterative DFS with a manual `Stack` array, or transition to BFS if you only need connectivity.
