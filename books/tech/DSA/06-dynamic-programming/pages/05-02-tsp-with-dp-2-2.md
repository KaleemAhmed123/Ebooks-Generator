### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) (LeetCode 847) | Visit every node exactly once — TSP on a graph |
| [Find the Shortest Superstring](https://leetcode.com/problems/find-the-shortest-superstring/) (LeetCode 943) | Optimal ordering with overlap costs — TSP variant |
| [Minimum Cost to Visit Every Node in a Graph](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) (LeetCode 847) | BFS + bitmask for all-node traversal |

### The takeaway

If an interview problem asks for an optimal sequence, grouping, or permutation, and the size of the input is extremely small (N ≤ 20), write a Bitmask DP. The state will almost always be `dfs(mask, lastUsedElement)`.
