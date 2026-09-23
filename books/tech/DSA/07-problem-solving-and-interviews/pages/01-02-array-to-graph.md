## Transformation: Array/String to Graph

This is the most frequent transformation in FAANG interviews. You are given a flat array, a string, or a matrix, but the logic requires traversal, shortest paths, or connectivity.

### The Signal

- "Minimum steps to reach..."
- "Can you transform X into Y..."
- "Find the shortest sequence..."
- The input is a list of states, words, or grid coordinates, and rules define how you can move between them.

### The Mapping

- **Nodes:** The individual elements (words, cells, specific states).
- **Edges:** The valid transitions or mutations allowed by the problem rules.
- **Weights:** Usually 1 (unweighted) representing a single step/mutation.

### Canonical Example: Word Ladder

- **Problem:** Given `beginWord`, `endWord`, and a `wordList`, find the length of the shortest transformation sequence. You can only change one letter at a time, and every intermediate word must exist in `wordList`.
- **The Trap:** Trying to write string manipulation logic with nested loops and backtracking. It will TLE (Time Limit Exceeded) massively.
- **The Transformation:**
  - Nodes: Every word in the `wordList`.
  - Edges: An undirected edge exists between Word A and Word B if they differ by exactly one character.
- **The Execution:** Run an unweighted BFS from `beginWord`. The shortest path length is the answer.

### Canonical Example: Pacific Atlantic Water Flow

- **Problem:** Given an `m x n` matrix of island heights, find all cells where water can flow to both the Pacific (top/left) and Atlantic (bottom/right) oceans. Water flows to equal or lower heights.
- **The Transformation:**
  - Nodes: The grid cells `(r, c)`.
  - Edges: Directed edges to adjacent cells `(nx, ny)` *if* `height[nx][ny] >= height[r][c]`. (Notice we reversed the flow).
- **The Execution:** Run Multi-Source BFS/DFS inwards from the Pacific edges, and separately from the Atlantic edges. Cells visited by both are the answer.
