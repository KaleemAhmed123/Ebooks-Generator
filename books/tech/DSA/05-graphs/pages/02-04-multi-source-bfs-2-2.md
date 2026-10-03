### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) (LeetCode 994) | All rotten cells enqueued at t=0, BFS ripples outward |
| [01 Matrix](https://leetcode.com/problems/01-matrix/) (LeetCode 542) | Enqueue all 0-cells, BFS assigns distance to each 1-cell |
| [Shortest Bridge](https://leetcode.com/problems/shortest-bridge/) (LeetCode 934) | DFS to find one island, multi-source BFS to reach the other |
| [As Far from Land as Possible](https://leetcode.com/problems/as-far-from-land-as-possible/) (LeetCode 1162) | Multi-source BFS from all land cells to find farthest water |

### The trap

- **Matrix 01 (Distance to nearest zero):** Multi-source BFS is perfectly built for this. Instead of starting from the 1s and looking for 0s (which requires launching a BFS from every 1), you enqueue all the `0`s as your sources, and let them simultaneously ripple outwards to "claim" the nearest `1`s.
