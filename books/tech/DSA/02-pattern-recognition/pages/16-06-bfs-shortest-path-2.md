### Where it appears

| Problem | The deciding fact |
|---|---|
| Shortest Path in Binary Matrix (LeetCode 1091) | 8-direction grid BFS |
| Word Ladder (LeetCode 127) | words are nodes, one-letter change is an edge |
| Rotting Oranges (LeetCode 994) | many sources at once → 16-07 |
| Open the Lock (LeetCode 752) | 4-dial states, one turn per edge |

- **Go deeper:** weighted edges break the equal-ring guarantee — that is Dijkstra, 16-11 and Module 05.

:::interview
"Why does BFS give the shortest path but DFS does not?"

BFS expands nodes in nondecreasing distance order, so the first arrival at a node is along a minimum-length path. DFS dives down one branch first and may reach a node by a long detour before the short route, recording the wrong distance. The equal-cost edge is what makes ring order equal distance order.
:::
