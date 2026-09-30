## Detect a Cycle - continued

### Where it appears

| Problem | What the cycle means |
|---|---|
| Course Schedule (LeetCode 207) | a cycle → the courses cannot be ordered |
| Course Schedule II (LeetCode 210) | no cycle → return the topological order → 16-04 |
| Find Eventual Safe States (LeetCode 802) | nodes on or leading to a cycle are unsafe |
| Redundant Connection (LeetCode 684) | the edge that first closes a cycle (undirected → 16-10) |

:::interview
"Directed cycle detection — why three colours, not a visited set?"

A visited set cannot tell "still on the current DFS path" from "finished long ago". A finished (black) node reached again is a diamond, not a loop. Grey marks nodes currently on the stack; only an edge into grey is a back edge, and a back edge is exactly a cycle. Kahn's BFS is the alternative: if fewer than n nodes get processed, a cycle remains.
:::
