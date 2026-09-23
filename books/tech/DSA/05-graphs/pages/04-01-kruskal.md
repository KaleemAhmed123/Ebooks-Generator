## Kruskal's Algorithm

- A **Spanning Tree** is a subset of edges in a connected, undirected graph that connects all vertices together without any cycles. It is a tree that "spans" the graph.
- A **Minimum Spanning Tree (MST)** is the spanning tree whose sum of edge weights is as small as possible.
- **The Problem:** Connect all cities with fiber optic cables. Cables cost different amounts. Connect everyone for the lowest total price.

### The Mechanics

Kruskal's Algorithm is a beautiful, purely Greedy algorithm.
1. Take every single edge in the graph and sort them by weight (cheapest to most expensive).
2. Look at the cheapest edge. 
   - Does adding this edge create a cycle? (Are the two cities already connected via some other path?)
   - If NO: Buy the cable. Add it to your MST.
   - If YES: Throw it away.
3. Repeat until you have added exactly V - 1 edges (which guarantees a single connected tree).

### Disjoint Set Union (DSU)

The only tricky part of Kruskal's is answering the question: *"Does this edge create a cycle?"* 
Running a DFS every time to check for connectivity is O(V), which makes the overall algorithm O(E times V). That's too slow.
Instead, we use a **Union-Find** (Disjoint Set Union) data structure. It can answer "Are these two nodes connected?" in practically O(1) time.

```ts
class UnionFind {
  parent: number[];
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(i: number): number {
    if (this.parent[i] === i) return i;
    // Path compression: point directly to the absolute root
    return this.parent[i] = this.find(this.parent[i]); 
  }

  union(i: number, j: number): boolean {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true; // Union successful, edge added
    }
    return false; // They were already connected, cycle detected!
  }
}
```

### Kruskal's Implementation

```ts
function kruskalMST(n: number, edges: number[][]): number {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);
  
  const uf = new UnionFind(n);
  let mstCost = 0;
  let edgesAdded = 0;

  for (const [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      mstCost += weight;
      edgesAdded++;
      if (edgesAdded === n - 1) break; // Optimization: We are done
    }
  }

  // If we couldn't add n-1 edges, the graph is disconnected
  return edgesAdded === n - 1 ? mstCost : -1;
}
```

- **Time Complexity:** O(E log E) heavily dominated by sorting the edges. The Union-Find operations take O(E alpha(V)) which is virtually linear.
