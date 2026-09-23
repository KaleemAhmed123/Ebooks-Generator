## Disjoint Set Union (DSU / Union-Find)

- **What it is:** A forest of trees (represented by an array) used exclusively to group elements into disjoint sets and check if two elements belong to the same set
- **The Contract:** O(1) amortised time (Inverse Ackermann function) to merge two sets (`union`) or find the set representative (`find`)
- **Why it works:** It abandons the idea of storing edges. Instead of traversing a graph to see if A connects to B, DSU instantly resolves both A and B to their "ultimate parent". If the parents match, they are connected

### The Core Structure

DSU uses a single array, `parent`. 
- Initially, every node is its own boss: `parent[i] = i`.
- When we connect node A and node B, we make B's boss report to A's boss.

```ts
class DSU {
  parent: number[];
  
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }
  
  // Find the ultimate boss of 'x'
  find(x: number): number {
    if (this.parent[x] === x) return x;
    return this.find(this.parent[x]);
  }
  
  // Merge the sets containing 'x' and 'y'
  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) return false; // Already in the same set
    
    this.parent[rootY] = rootX; // Make rootY report to rootX
    return true; // Successfully merged
  }
}
```

### The Bottleneck: The Linked List Trap

- In the code above, if you `union(1, 2)`, `union(2, 3)`, `union(3, 4)`... you build a Linked List.
- `find(4)` will have to traverse `4 -> 3 -> 2 -> 1`. This takes O(N) time.
- **The Fix: Path Compression.**

### Path Compression (The O(1) Magic)

- When you call `find(4)`, it traverses up to `1`. 
- **The Insight:** Why should `4` report to `3`, if it ultimately reports to `1`? 
- We can rewrite the pointer so `4` points directly to `1`. The next time we call `find(4)`, it takes exactly 1 step.

```ts
  find(x: number): number {
    if (this.parent[x] === x) return x;
    // Path Compression: Overwrite the parent with the ultimate root
    this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
```

### When to reach for DSU

1. **Cycle Detection (Undirected):** If you are iterating through edges and building a graph, and you call `union(u, v)` but it returns `false` (they share the same root), you have just detected a cycle.
2. **Kruskal's Minimum Spanning Tree:** Sort all edges by weight. Iterate through them. If `union(u, v)` returns true, add that edge to the MST. If false, skip it.
3. **Dynamic Connectivity:** Any problem asking "how many connected components are there?" as edges are being added one by one.

:::interview
"Can DSU handle removing edges?" — Generally, no. DSU merges sets efficiently, but splitting a set apart requires knowing which nodes belonged to which sub-branch, which Path Compression actively destroys. If a problem asks you to remove edges and check connectivity, the standard trick is to process the queries **in reverse**: start with the final graph, and "add" the edges back one by one.
:::
