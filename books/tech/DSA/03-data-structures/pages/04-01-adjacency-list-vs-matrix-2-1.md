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
