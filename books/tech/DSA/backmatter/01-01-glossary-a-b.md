## Glossary (A–B)

- **Adjacency List:** An array of arrays (or Hash Map) where the index represents a node and the value lists its neighbors, optimal for sparse graphs.
- **Adjacency Matrix:** A 2D array where `matrix[i][j]` indicates an edge between `i` and `j`, requiring O(V²) space.
- **Amortised Analysis:** Calculating the average time per operation over a sequence, showing that occasional expensive operations (like array resizing) average out to O(1).
- **Backtracking:** A recursive brute-force technique that builds a solution incrementally and abandons a path ("pruning") when it is guaranteed to fail.
- **Beam Search:** A best-first search that keeps only the B best candidates at each step.
- **Bellman-Ford Algorithm:** A shortest-path algorithm taking O(V · E) time that handles negative weights and detects negative weight cycles.
- **Binary Lifting:** A table of each node's 2ᵏ-th ancestor, so a k-step jump up a tree takes O(log n) moves.
- **Binary Search:** An O(log N) algorithm that halves the search space at each step, requiring sorted data (or a monotonic boolean function).
- **Binary Search on the Answer:** Binary search over candidate answers, using a yes/no feasibility check that flips exactly once.
- **Binary Trie:** A trie over the bits of numbers, highest bit first; used for maximum-XOR queries.
- **Bitmask:** Using the binary representation of a single integer to compactly store a set of boolean flags (e.g., `1001` means items 0 and 3 are selected).
- **Boyer–Moore Majority Vote:** One candidate and a counter; unequal values cancel in pairs, so a majority survives.
- **Branch and Bound:** Stopping a search branch whose partial cost already exceeds the best complete answer.
- **Breadth-First Search (BFS):** Exploring a graph outward in concentric circles using a Queue, guaranteeing the shortest path in unweighted graphs.
