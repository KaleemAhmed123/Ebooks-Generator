# Chapter 16 - Graphs & Dependency

## Graphs <span class="lv lv1"></span>

- **What it is:** the statement describes relationships, not a sequence: "A is friends with B", "course C needs D". Items are nodes, relationships edges
- **Signal:** items 0 to n − 1 with pairs, "connected", "fewest steps", "X before Y", "share something"
- **Mechanism:** once the edge is named, the question is standard: reach and group (BFS, DFS, union–find), shortest paths (BFS, Dijkstra), order (topological sort), each in Module 05

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **16-02** | the statement never says "edge" | a shared value, a range, a ratio is one |
| **16-03** | "enclosed", "surrounded" | flood what is *not* enclosed |
| **16-04** | "X before Y", build order | in-degree 0 is always safe |
| **18-02** | cheapest path, weighted steps | a heap keyed on the cost |

### The skeleton: BFS

```ts
const adj: number[][] = Array.from({ length: n }, () => []);
for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
const dist = new Array(n).fill(-1), q = [src];
dist[src] = 0;
for (let h = 0; h < q.length; h++)               // a head index, not shift()
  for (const v of adj[q[h]])
    if (dist[v] < 0) { dist[v] = dist[q[h]] + 1; q.push(v); }
```

### The trap

- **Building the graph literally.** Comparing every pair of items to find edges is O(n²) before the search starts. Generate neighbours on the fly, or index by the shared value (16-02)
