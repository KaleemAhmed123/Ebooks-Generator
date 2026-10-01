### Where it appears

| Problem | The state beyond position |
|---|---|
| Shortest Path in a Grid with Obstacle Elimination (LeetCode 1293) | (cell, eliminations left) |
| Shortest Path to Get All Keys (LeetCode 864) | (cell, bitmask of keys held) |
| Minimum Moves to Reach Target with Rotations (LeetCode 1210) | (cells, orientation) |
| Jump Game IV (LeetCode 1345) | index; edges to same-value indices |

- **Go deeper:** when the extra state is a subset, it becomes a bitmask (11-04, 17-xx); weighted state transitions become Dijkstra over states (16-11).

:::interview
"Grid BFS but the cell can be revisited — what changes?"

The node is no longer the cell; it is the cell plus the carried state (keys, remaining budget). `visited` keys on that pair, so the same cell can be entered again under a different state but never under an identical one. BFS still gives the fewest moves because every edge is one step.
:::
