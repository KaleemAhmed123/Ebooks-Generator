# Chapter 16 - Graphs & Dependency

## Graphs <span class="lv lv1"></span>

- **What it is:** the statement describes relationships, not a sequence: "A is friends with B", "course C needs D". Items are nodes, relationships edges
- **Signal:** items 0 to n − 1 with pairs, "connected", "fewest steps", "X before Y", "share something", "reach the nearest"
- **Mechanism:** once the edge is named, the question is standard. This chapter builds each engine — traverse and group, shortest paths, ordering, spanning — from scratch; Module 05 goes deeper (Bellman–Ford, Floyd–Warshall, A*, bridges)

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **16-02** | the statement never says "edge" | a shared value, range or ratio is one |
| **16-05** | count regions or groups | one flood per component |
| **16-06** | fewest steps, unweighted | BFS settles in equal-distance rings |
| **16-07** | distance to the nearest source | seed every source, one BFS |
| **16-08** | "is it possible", circular deps | an edge into an open node is a cycle |
| **16-09** | split into two groups | an odd cycle blocks 2-colouring |
| **16-10** | streaming "same group?" edges | union–find, near O(1) per merge |
| **16-03** | "enclosed", "surrounded" | flood what is *not* enclosed |
| **16-04** | "X before Y", build order | in-degree 0 is always safe |
| **16-11** | cheapest weighted path | a heap; settle the closest on pop |
| **16-12** | connect all at min cost | the cheapest cross-group edge is safe |
| **16-13** | keys or budget also matter | the node is `(place, extra state)` |

### The skeleton: adjacency list + visited

```ts
const adj: number[][] = Array.from({ length: n }, () => []);
for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); } // drop one push if directed
const seen = new Array(n).fill(false);
// then: DFS/BFS for reach (16-05/06), a heap for weights (16-11), in-degrees for order (16-04)
```

### The trap

- **Building the graph literally.** Comparing every pair of items to find edges is O(n²) before the search starts. Generate neighbours on the fly, or index by the shared value (16-02)
- **Strongly connected components, bridges and articulation points** (Tarjan / Kosaraju) are contest-tier — see Module 05.
