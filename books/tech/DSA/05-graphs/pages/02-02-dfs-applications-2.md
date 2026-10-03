### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) (LeetCode 547) | Count connected components via DFS launches |
| [Course Schedule](https://leetcode.com/problems/course-schedule/) (LeetCode 207) | Directed cycle detection with 3-color DFS |
| [All Paths From Source to Target](https://leetcode.com/problems/all-paths-from-source-to-target/) (LeetCode 797) | DFS backtracking to enumerate all paths in a DAG |

### Backtracking (Path Generation)

- If a problem asks "Return *all* possible paths from A to B", you cannot just mark nodes as `visited` and leave them.
- You must add a node to the path, mark it visited, recurse, and then **backtrack**: remove it from the path and mark it *unvisited* so other divergent branches can reuse it. (See the Backtracking module for more detail).
