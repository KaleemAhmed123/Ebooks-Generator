### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Number of Islands](https://leetcode.com/problems/number-of-islands/) (LeetCode 200) | Grid as implicit adjacency matrix |
| [Clone Graph](https://leetcode.com/problems/clone-graph/) (LeetCode 133) | Traverse and copy an adjacency list |
| [Find if Path Exists in Graph](https://leetcode.com/problems/find-if-path-exists-in-graph/) (LeetCode 1971) | Build adjacency list from edge pairs, then BFS |

:::interview
"If I need to check if node A is connected to node B, the Adjacency List takes O(Neighbors) time. Can we improve this?"

Yes. Instead of `Map<string, string[]>`, you can use `Map<string, Set<string>>`. This increases memory overhead slightly, but allows you to check `adj.get(A).has(B)` in strict O(1) time. This is useful in Eulerian Path problems or when deleting specific edges dynamically.
:::
