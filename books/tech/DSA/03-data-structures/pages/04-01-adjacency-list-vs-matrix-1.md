## Adjacency List vs Adjacency Matrix <span class="lv lv1"></span>

- **What it is:** The two primary ways to represent a Graph (nodes and edges) in memory
- **The Contract:** 
  - **List:** O(V + E) space. Fast to iterate over neighbors. Slow to check if a specific edge exists.
  - **Matrix:** O(V²) space. O(1) to check if a specific edge exists. Slow to iterate over neighbors.
- **Why it matters:** Choosing the wrong representation will instantly cause a Memory Limit Exceeded (MLE) or Time Limit Exceeded (TLE) error on large graphs

### The Adjacency Matrix (Dense Graphs)

- A 2D array `matrix[u][v]` which is `1` if an edge exists from `u` to `v`, and `0` otherwise.
- **The fatal flaw:** If a graph has 100,000 nodes, the matrix requires $100,000 \times 100,000 = 10^{10}$ integers. This is roughly 40 Gigabytes of RAM. You will MLE instantly.
- **When to use:** Only when $V \le 1000$ (e.g., Floyd-Warshall algorithm), or when the problem explicitly gives you the graph as a matrix (e.g. "Number of Islands" grid problems).

### The Adjacency List (Sparse Graphs)

- An array of arrays (or a Map of arrays). `list[u]` contains an array of all nodes connected to `u`.
- **The strength:** It only stores the edges that actually exist. If a 100,000-node graph has only 200,000 edges, the memory used is trivial.
- **When to use:** Almost always. 99% of interview and competitive programming graph problems require an Adjacency List to perform BFS, DFS, Dijkstra, or Topological Sort efficiently.
