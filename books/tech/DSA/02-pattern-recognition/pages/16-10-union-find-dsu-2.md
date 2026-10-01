### Where it appears

| Problem | What a union means |
|---|---|
| Number of Provinces (LeetCode 547) | union connected cities; `count` is the answer |
| Redundant Connection (LeetCode 684) | the first edge whose `union` returns false |
| Accounts Merge (LeetCode 721) | union accounts sharing an email → 16-02 |
| Number of Connected Components (LeetCode 323) | union each edge; report `count` |

- **Go deeper:** weighted DSU (ratios), rollback DSU and DSU-on-tree are in Modules 05 and 08.

:::interview
"Why is union–find near-constant time?"

Path compression flattens each queried path so later `find`s are almost direct, and union by size keeps trees shallow by never hanging a big tree under a small one. Their combined amortised cost is O(α(n)) per operation, where α is the inverse Ackermann function — at most about 4 for any input that fits in memory.
:::
