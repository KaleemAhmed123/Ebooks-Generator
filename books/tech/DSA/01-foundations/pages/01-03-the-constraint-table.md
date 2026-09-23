## The constraint table

- This table maps every common constraint pattern to its candidate algorithms. Use it as a starting point — not a decision tree, but a shortlist generator

| Constraint | Complexity ceiling | Candidate approaches |
|---|---|---|
| n ≤ 10–12 | O(n! · n) | Permutation brute force, backtracking |
| n ≤ 20 | O(2ⁿ · n) | Bitmask DP, subset enumeration |
| n ≤ 40 | O(2ⁿ/²) | Meet-in-the-middle |
| n ≤ 100 | O(n⁴) | Four nested loops, small matrix DP |
| n ≤ 500 | O(n³) | Floyd-Warshall, interval DP, 3D DP |
| n ≤ 5,000 | O(n²) | Simple DP, pairwise comparison, LIS quadratic |
| n ≤ 10⁵ | O(n log n) | Sorting, segment tree, binary search, merge sort tree |
| n ≤ 10⁶ | O(n) or O(n log n) | Two pointers, sliding window, prefix sum, monotonic stack |
| n ≤ 10⁷ | O(n) | Linear scan, sieve, counting sort |
| n ≤ 10⁸ | O(n) tight | Single pass, mathematical formula |
| n ≤ 10¹⁸ | O(log n) or O(√n) | Binary search, matrix exponentiation, digit DP, baby-giant |

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
