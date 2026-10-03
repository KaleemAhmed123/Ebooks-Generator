### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) (LeetCode 323) | Union edges, count distinct roots |
| [Redundant Connection](https://leetcode.com/problems/redundant-connection/) (LeetCode 684) | Union returns false on the cycle-forming edge |
| [Accounts Merge](https://leetcode.com/problems/accounts-merge/) (LeetCode 721) | Union shared emails across accounts |
| [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) (LeetCode 547) | DSU groups connected cities |

:::interview
"Can DSU handle removing edges?"

Generally, no. DSU merges sets efficiently, but splitting a set apart requires knowing which nodes belonged to which sub-branch, which Path Compression actively destroys. If a problem asks you to remove edges and check connectivity, the standard trick is to process the queries **in reverse**: start with the final graph, and "add" the edges back one by one.
:::
