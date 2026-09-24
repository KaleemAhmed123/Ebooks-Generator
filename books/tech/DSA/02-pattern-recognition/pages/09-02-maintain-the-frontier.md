## Maintain the Frontier

- **What it is:** A set of candidates (the *frontier*) separates what has been fully processed from what has not. At every step, you pick the best candidate from the frontier, process it, and add its neighbours to the frontier
- **Why nobody named it:** Each algorithm that uses it has its own name — BFS, Dijkstra, A*, best-first search, beam search. Nobody noticed they share the same skeleton

### The skeleton

```
frontier = initial candidates
processed = empty set

while frontier is not empty:
    pick the "best" candidate from frontier     ← selection rule varies
    mark it as processed
    for each neighbour of candidate:
        if neighbour is not processed:
            add neighbour to frontier            ← expansion rule varies
```

- The *selection rule* determines the algorithm's identity:

| Selection rule | Algorithm | Data structure for frontier |
|---|---|---|
| First-in, first-out | BFS | Queue (deque) |
| Smallest distance | Dijkstra | Min-heap (priority queue) |
| Smallest f(n) = g(n) + h(n) | A* | Min-heap |
| Any unvisited neighbour | DFS | Stack (implicit call stack) |
| Top-k by heuristic | Beam Search | Bounded priority queue |

### Why this matters

- When you recognise that a problem is asking you to **expand from a known set into an unknown set**, and you need to find the **best or shortest or cheapest** expansion, you are looking at Frontier Maintenance
- The technique you choose depends on the selection rule the problem demands
- If all edges cost the same → BFS (FIFO frontier)
- If edges have varying costs → Dijkstra (min-heap frontier)
- If you need an approximation fast → Beam Search (bounded frontier)

### The trap

- **Expanding without marking processed.** If you add a node to the frontier but forget to mark it as processed when you pop it, you will visit it multiple times. BFS degrades to exponential. Dijkstra gives wrong answers. The frontier bloats without bound

:::interview
"How does BFS guarantee the shortest path?"

BFS uses a FIFO queue as its frontier. Since all edges cost 1, the first time a node is popped from the queue, it has been reached by the fewest edges possible. Any later path to the same node would be longer. The frontier structure (FIFO) guarantees this ordering.
:::
