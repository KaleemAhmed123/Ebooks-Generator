## The Wrong Approach (Graphs)

Graph problems have massive boilerplate. A small logical error in line 5 will cause a cascading failure that takes 30 minutes to debug.

### The Ghost Node Trap

- **Naive idea:** A candidate is building an adjacency list from directed edges. They loop through the edges and do `adjList.get(u).push(v)`.
- **Why it breaks:** They never initialized `v` in the Map! Later, when the DFS visits `v`, it tries to do `for (const neighbor of adjList.get(v))`. But `adjList.get(v)` is `undefined`. The program crashes with `Cannot iterate over undefined`.
- **The fix:** Always explicitly initialize BOTH nodes of an edge, even in a directed graph.

### The Infinite Ping-Pong

- **Naive idea:** A candidate writes a DFS on an undirected graph and relies purely on a `visited` set to prevent backtracking.
- **Why it breaks:** If they check `visited` *after* the recursive call, or if they forget to add it to the set entirely, the DFS walks `A -> B`, then `B -> A`, infinitely ping-ponging until the stack overflows.
- **The fix:** In an undirected graph DFS, pass the `parent` node in the recursive call and immediately `if (neighbor === parent) continue;`. 

### The Delayed Visited Trap (BFS)

- **Naive idea:** A candidate pushes nodes into a BFS queue, pops them, and *then* adds them to the `visited` set.
- **Why it breaks:** If multiple nodes in the current layer point to the same unvisited node, they will ALL push it into the queue. The queue explodes exponentially.
- **The fix:** Mark a node as `visited` the absolute microsecond you `push` it into the queue.

:::interview
"If I ask you to find the shortest path in a weighted graph, but some weights are negative, why can't we just add +100 to every edge to make them all positive, and then run Dijkstra?"

This is a classic trap. If Path A has 2 edges and Path B has 5 edges, adding +100 to every edge artificially penalizes Path B by +500, but only penalizes Path A by +200. You have mathematically changed which path is the shortest! You cannot shift weights. You must use Bellman-Ford.
:::
