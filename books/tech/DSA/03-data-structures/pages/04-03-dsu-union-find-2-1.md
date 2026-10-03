### The Bottleneck: The Linked List Trap

- In the code above, if you `union(1, 2)`, `union(2, 3)`, `union(3, 4)`... you build a Linked List.
- `find(4)` will have to traverse `4 -> 3 -> 2 -> 1`. This takes O(N) time.
- **The Fix: Path Compression.**

### Path Compression (Amortised O(1))

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
