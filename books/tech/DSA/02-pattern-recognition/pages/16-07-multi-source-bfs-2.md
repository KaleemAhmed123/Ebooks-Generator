### Where it appears

| Problem | The sources seeded together |
|---|---|
| Rotting Oranges (LeetCode 994) | every rotten orange |
| 01 Matrix (LeetCode 542) | every 0 cell; answer is distance to nearest 0 |
| Walls and Gates (LeetCode 286) | every gate |
| As Far from Land as Possible (LeetCode 1162) | every land cell; take the deepest ring |

:::interview
"Why seed all sources before stepping instead of BFS-ing from each?"

A single BFS with every source at distance 0 makes each cell settle at its nearest source in one O(cells) pass. Per-source BFS repeats the whole grid for every source and still needs a min over runs. The multi-source queue collapses that to one traversal.
:::
