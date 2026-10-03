### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Number of Islands](https://leetcode.com/problems/number-of-islands/) (LeetCode 200) | BFS/DFS on a 2D grid treating cells as implicit graph nodes |
| [Flood Fill](https://leetcode.com/problems/flood-fill/) (LeetCode 733) | Expand from a cell to all same-color neighbors on a grid |
| [Max Area of Island](https://leetcode.com/problems/max-area-of-island/) (LeetCode 695) | DFS on implicit grid graph, aggregate component size |
| [Surrounded Regions](https://leetcode.com/problems/surrounded-regions/) (LeetCode 130) | Grid traversal from borders to mark unreachable regions |
| [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) (LeetCode 417) | Multi-source BFS/DFS from grid edges inward |

### The trap

- **Stringified Sets:** In JavaScript/TypeScript, you cannot use a tuple or array `[r, c]` as a key in a `Set` or `Map`, because `[1, 2] !== [1, 2]` by reference.
- **The fix:** Always serialize the coordinates into a string like `"{r},{c}"`. (Or, if constraints permit, use a 2D boolean array `visited[r][c]` which is far faster than a Hash Set).
