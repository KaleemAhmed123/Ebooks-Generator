## The Master Pattern Matrix

When deriving a solution, ask yourself what the structural requirement is.

### By Need (Structural Goal)

| I need... | Candidate Patterns |
|---|---|
| **Contiguous subarrays** | Sliding Window, Prefix Sum, Difference Array, Monotonic Deque |
| **Ordering or ranking** | Sorting, Greedy, Binary Search, Sweep Line, Top K (Heaps) |
| **Repeated extremum (Min/Max)** | Heap (Priority Queue), Monotonic Stack, Segment Tree |
| **Connectivity or relationships** | DSU (Union-Find), BFS/DFS, Minimum Spanning Tree |
| **To resolve dependencies** | Topological Sort, Directed Acyclic Graph DP |
| **To narrow down a search space** | Binary Search on Answer, Branch and Bound (Pruning) |
| **To avoid repeating work** | Dynamic Programming (Memoization / Tabulation), Precomputation |

### By Operation (Data Structure)

| I need the fastest... | Candidate Data Structure |
|---|---|
| **Lookup / Membership check** | Hash Map / Hash Set (O(1)) |
| **Min/Max extraction** | Heap (O(log N)), or Monotonic Stack/Deque (O(1) amortised) |
| **Range Sum query** | Prefix Sum (O(1) static), Fenwick / Segment Tree (O(log N) dynamic) |
| **Range Min/Max query** | Sparse Table (O(1) static), Segment Tree (O(log N) dynamic) |
| **String prefix search** | Trie (O(L) where L is length of word) |
| **Cycle detection** | Disjoint Set / Union-Find (near O(1)), DFS with states (O(V+E)) |
