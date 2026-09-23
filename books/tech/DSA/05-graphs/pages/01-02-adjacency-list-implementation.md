## Adjacency List Implementation

There are three ways to represent a graph in code: an Edge List, an Adjacency Matrix, and an Adjacency List. In 99% of interviews, you should use an Adjacency List.

### Why Adjacency Lists?

- **Edge List (`[[0, 1], [1, 2]]`):** Terrible for traversal. To find all neighbors of node `0`, you have to scan the entire list O(E).
- **Adjacency Matrix (`grid[u][v] = 1`):** Takes O(V²) space. If you have 10,000 nodes but only 20,000 edges, you are creating an array of 100,000,000 elements just to store 20,000 ones. It will crash the memory limit.
- **Adjacency List (`map[u] = [v1, v2]`):** Takes O(V + E) space. You only store exactly what exists. To find the neighbors of `u`, you just look them up in O(1) time.

### Implementation (TypeScript)

If the nodes are strictly numbered `0` to `N-1`, use an Array of Arrays. If the nodes are strings or non-sequential numbers, use a Hash Map (or `Map`).

```ts
// For nodes labeled 0 to N-1
function buildGraphMatrix(n: number, edges: number[][]): number[][] {
  const adjList = Array.from({ length: n }, () => [] as number[]);
  
  for (const [u, v] of edges) {
    adjList[u].push(v);
    adjList[v].push(u); // Remove this line if the graph is Directed
  }
  
  return adjList;
}
```

```ts
// For string nodes or sparse nodes
function buildGraphMap(edges: [string, string][]): Map<string, string[]> {
  const adjList = new Map<string, string[]>();
  
  for (const [u, v] of edges) {
    if (!adjList.has(u)) adjList.set(u, []);
    if (!adjList.has(v)) adjList.set(v, []); // Ensure v is registered
    
    adjList.get(u)!.push(v);
    adjList.get(v)!.push(u); // Remove if Directed
  }
  
  return adjList;
}
```

### The trap

- **The Missing Node Trap:** Look closely at the `buildGraphMap` snippet. Notice `if (!adjList.has(v)) adjList.set(v, [])`. If node `u` points to node `v`, and `v` has no outbound edges of its own, it might never appear as a `u` in the edge list. If you don't explicitly register it, querying `adjList.get(v)` later will return `undefined` and crash your traversal.
- **The fix:** Always initialize both sides of an edge in a Map-based adjacency list, even for Directed graphs.
