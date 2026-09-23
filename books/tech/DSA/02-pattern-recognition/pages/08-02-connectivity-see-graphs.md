## Connectivity? See Graphs

- Many problems describe relationships between entities rather than sequences of data. "A is friends with B", "Course C requires Course D", "City E is connected to City F"
- These are not array problems. These are graph problems

### The Graph Boundary

- If the problem asks questions about **reachability, connectivity, cycles, or shortest paths through arbitrary relationships**, you have crossed the boundary into Graph Theory
- While we discussed the *Frontier Maintenance* pattern (BFS/Dijkstra) in Chapter 9, that was an abstraction of the search mechanism. Graph theory encompasses much more:
  - Disjoint Set Union (Union-Find) for dynamic connectivity
  - Topological Sorting for dependency resolution
  - Strongly Connected Components
  - Minimum Spanning Trees

### Where to go next

- If your problem is fundamentally about nodes and edges, jump to **Module 05: Graphs**
- Module 05 covers how to model relationships, how to traverse them efficiently, and how to detect structural properties (like cycles or bipartite sets)
