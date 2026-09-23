## Glossary (A–D)

- **Adjacency List:** An array of arrays (or Hash Map) where the index represents a node and the value lists its neighbors, optimal for sparse graphs.
- **Adjacency Matrix:** A 2D array where `matrix[i][j]` indicates an edge between `i` and `j`, requiring O(V²) space.
- **Amortised Analysis:** Calculating the average time per operation over a sequence, showing that occasional expensive operations (like array resizing) average out to O(1).
- **Backtracking:** A recursive brute-force technique that builds a solution incrementally and abandons a path ("pruning") when it is guaranteed to fail.
- **Bellman-Ford Algorithm:** A shortest-path algorithm taking O(V · E) time that handles negative weights and detects negative weight cycles.
- **Binary Search:** An O(log N) algorithm that halves the search space at each step, requiring sorted data (or a monotonic boolean function).
- **Bitmask:** Using the binary representation of a single integer to compactly store a set of boolean flags (e.g., `1001` means items 0 and 3 are selected).
- **Breadth-First Search (BFS):** Exploring a graph outward in concentric circles using a Queue, guaranteeing the shortest path in unweighted graphs.
- **Depth-First Search (DFS):** Exploring a graph by plunging as deep as possible down one branch before backtracking, utilizing a Stack.
- **Dijkstra's Algorithm:** A greedy shortest-path algorithm using a Priority Queue, taking O(E log V), which fails on negative edge weights.
- **Disjoint Set (Union-Find):** A data structure that tracks elements partitioned into disjoint subsets, answering "Are these connected?" in near O(1) time.
- **Dynamic Programming (DP):** An optimization over plain recursion that caches the results of overlapping subproblems to prevent redundant calculations.
