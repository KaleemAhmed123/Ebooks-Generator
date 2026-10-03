### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Course Schedule](https://leetcode.com/problems/course-schedule/) (LeetCode 207) | Directed cycle detection determines if graduation is possible |
| [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) (LeetCode 210) | Detect cycles, then return valid ordering if acyclic |
| [Redundant Connection](https://leetcode.com/problems/redundant-connection/) (LeetCode 684) | DSU cycle detection finds the extra edge in an undirected graph |
| [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/) (LeetCode 261) | A tree is a connected acyclic graph; check both properties |

### Disjoint Set Union (DSU)

For undirected graphs, you can also use DSU for cycle detection. 
- Iterate through all edges. 
- Attempt to `union(u, v)`. 
- If `find(u) === find(v)`, they are already in the same component. Adding this edge creates a cycle.
- This is incredibly fast and avoids recursion entirely.
