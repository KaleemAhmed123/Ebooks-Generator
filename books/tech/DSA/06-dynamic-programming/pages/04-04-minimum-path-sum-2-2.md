### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/) (LeetCode 64) | The standard grid cost minimisation |
| [Triangle](https://leetcode.com/problems/triangle/) (LeetCode 120) | Same idea on a triangular grid, top-down or bottom-up |
| [Minimum Falling Path Sum](https://leetcode.com/problems/minimum-falling-path-sum/) (LeetCode 931) | Grid path with three directional choices per row |

### The rule of thumb

If a grid problem only allows moving `Down` and `Right`, it is solvable with DP. 
If the problem allows moving `Up`, `Down`, `Left`, and `Right`, it is a **Graph** problem (cycles are possible). You cannot use DP. You must use BFS (unweighted) or Dijkstra (weighted).
