## Shortest Path Variants

Interviewers rarely ask you to just "Run Dijkstra". They add a constraint that breaks the standard template, forcing you to modify the graph state.

### 1. Shortest Path with exactly K edges

- **The Problem:** Find the cheapest flight from City A to City B with at most K stops.
- **The Trap:** If you run standard Dijkstra, it will find the absolute cheapest path (e.g., taking 10 tiny, cheap flights). But if K = 2, that path is invalid. 
- **The Solution:** Use a modified BFS or Bellman-Ford.
  - Standard Bellman-Ford runs V-1 times.
  - If you run Bellman-Ford exactly K+1 times, the `dist` array mathematically represents the cheapest paths using *at most* K+1 edges (which equals K intermediate stops).
  - You must use a temporary `nextDist` array during each sweep to prevent a single iteration from cascading across multiple edges.

### 2. Shortest Path with an "Ability"

- **The Problem:** Find the shortest path in a maze, but you have the ability to break exactly 1 wall.
- **The Trap:** The graph is no longer just R times C. Your state has changed.
- **The Solution (State Expansion):** You duplicate the graph. 
  - Layer 0: The grid where you have NOT broken a wall.
  - Layer 1: The grid where you HAVE broken a wall.
  - If you are in Layer 0 and encounter a wall, you can traverse *down* into Layer 1. Once in Layer 1, you can only traverse empty spaces.
  - The node state changes from `(r, c)` to `(r, c, wallsBroken)`.
  - Your `visited` set must track the full state: `visited.add("{r},{c},${wallsBroken}")`. You run a standard BFS on this new 3D graph.

### The rule of thumb

Whenever an interview problem introduces a "coupon", a "special ability", or a "stamina meter" to a shortest path problem, you are dealing with **State Space Expansion**. Add a dimension to your queue and your visited set. The underlying algorithm (BFS or Dijkstra) remains exactly the same.
