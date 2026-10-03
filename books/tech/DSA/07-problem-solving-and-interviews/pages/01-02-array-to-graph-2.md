### Canonical Example: Pacific Atlantic Water Flow

- **Problem:** Given an `m x n` matrix of island heights, find all cells where water can flow to both the Pacific (top/left) and Atlantic (bottom/right) oceans. Water flows to equal or lower heights.
- **The Transformation:**
  - Nodes: The grid cells `(r, c)`.
  - Edges: Directed edges to adjacent cells `(nx, ny)` *if* `height[nx][ny] >= height[r][c]`. (Notice we reversed the flow).
- **The Execution:** Run Multi-Source BFS/DFS inwards from the Pacific edges, and separately from the Atlantic edges. Cells visited by both are the answer.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Word Ladder](https://leetcode.com/problems/word-ladder/) (LeetCode 127) | Words are nodes, one-letter diffs are edges, BFS finds shortest path |
| [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) (LeetCode 417) | Grid cells become graph nodes with height-based directed edges |
| [Open the Lock](https://leetcode.com/problems/open-the-lock/) (LeetCode 752) | Lock states are nodes, single-digit turns are edges, BFS to target |
| [Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/) (LeetCode 433) | Gene strings are nodes, single-char mutations are edges |
