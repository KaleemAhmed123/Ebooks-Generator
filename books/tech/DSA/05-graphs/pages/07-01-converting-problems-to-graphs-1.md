## Converting Problems to Graphs <span class="lv lv1"></span>

In top-tier interviews, the word "Graph" will almost never appear in the problem description. You are expected to recognize the underlying mathematical structure.

### The Standard Conversions

**1. The "Must happen before" Problem**
- **Clues:** Dependencies, prerequisites, scheduling, compiling, ordering.
- **Conversion:** Node = Task. Directed Edge = `A -> B` means A must happen before B.
- **Algorithm:** Kahn’s Topological Sort.

**2. The "Shortest sequence of transformations" Problem**
- **Clues:** Minimum operations, shortest path, least number of steps to reach a state.
- **Conversion:** Node = State. Edge = 1 valid transformation.
- **Algorithm:** BFS (if unweighted), Dijkstra (if operations have different costs).

**3. The "Group of connected things" Problem**
- **Clues:** Islands, clusters, connected users, infected zones.
- **Conversion:** Node = Person/Cell. Undirected Edge = connection.
- **Algorithm:** DFS (to count components) or Union-Find (DSU).

**4. The "Contradiction / Two Groups" Problem**
- **Clues:** Enemies, rivalries, splitting into two teams, "Can we separate...".
- **Conversion:** Node = Person. Edge = Conflict/Enmity.
- **Algorithm:** Bipartite Graph check (Coloring with BFS/DFS).
