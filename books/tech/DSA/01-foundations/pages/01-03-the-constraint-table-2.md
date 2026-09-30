### Beyond n: structure matters

| Input structure | Strong signal for |
|---|---|
| Sorted array | Binary search, two pointers |
| Unsorted array, need order | Sort first, then scan |
| String matching | KMP, Z-algorithm, hashing |
| Grid / matrix | BFS/DFS, grid DP |
| Tree | DFS, tree DP, LCA, binary lifting |
| DAG | Topological sort, DAG DP |
| General graph | BFS, DFS, Dijkstra, DSU |
| Queries on ranges | Prefix sum, Fenwick, segment tree |
| Online queries, updates | Segment tree, Fenwick, balanced BST |
| "Find all" / "count all" | DP, combinatorics, inclusion-exclusion |
| "Find the k-th" | Binary search on answer, quickselect, order-statistics tree |
| Optimisation with constraint | DP (knapsack family), greedy with exchange argument |

### When the table is wrong

- A problem with n ≤ 10⁵ might still need O(n) if the constant factor is large (heavy per-element work)
- A problem with n ≤ 20 might have an O(n³) DP solution that's simpler and faster than bitmask
- The table narrows. **You** verify. Module 2 teaches how
