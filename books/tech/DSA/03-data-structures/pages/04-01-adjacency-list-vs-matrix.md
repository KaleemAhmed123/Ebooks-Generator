## Adjacency List vs Adjacency Matrix

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

### Building the Adjacency List

Most problems give you the edges as a 2D array: `[[0,1], [0,2], [1,2]]`. You must manually compile this into an Adjacency List before traversing.

```ts
// n = number of nodes (0 to n-1)
// edges = array of [u, v] pairs representing an UNDIRECTED edge
function buildGraph(n: number, edges: number[][]): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u); // Remove this line if the graph is DIRECTED
  }
  
  return adj;
}
```

### The Hash Map fallback

- If the node labels are not continuous integers from $0$ to $N-1$ (for example, they are Strings like `"JFK"` or massive IDs like `998244353`), you cannot use an Array for the list.
- **The fix:** Use a `Map<string, string[]>`. 

```ts
function buildStringGraph(edges: string[][]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  
  for (const [u, v] of edges) {
    if (!adj.has(u)) adj.set(u, []);
    if (!adj.has(v)) adj.set(v, []);
    adj.get(u)!.push(v);
    adj.get(v)!.push(u);
  }
  return adj;
}
```

:::interview
"If I need to check if node A is connected to node B, the Adjacency List takes O(Neighbors) time. Can we improve this?"

Yes. Instead of `Map<string, string[]>`, you can use `Map<string, Set<string>>`. This increases memory overhead slightly, but allows you to check `adj.get(A).has(B)` in strict O(1) time. This is useful in Eulerian Path problems or when deleting specific edges dynamically.
:::
