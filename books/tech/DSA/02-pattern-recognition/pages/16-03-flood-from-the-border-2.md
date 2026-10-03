### Where it appears

| Problem | What the border flood marks |
|---|---|
| [Surrounded Regions](https://leetcode.com/problems/surrounded-regions/) (LeetCode 130) | border-connected O's that survive |
| [Number of Enclaves](https://leetcode.com/problems/number-of-enclaves/) (LeetCode 1020) | border land sunk; count remaining |
| [Number of Closed Islands](https://leetcode.com/problems/number-of-closed-islands/) (LeetCode 1254) | sink border islands first, then count |
| [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) (LeetCode 417) | two floods inward from each ocean |

:::interview
"Why flood from the border instead of from each interior region outward?"

Flooding outward from each interior cell, you must prove the region never touches the border — one hit and the whole DFS is wasted. Flooding inward from the border marks everything reachable in one pass; whatever remains unmarked is enclosed by definition. One pass vs potentially repeating work for every region.
:::
