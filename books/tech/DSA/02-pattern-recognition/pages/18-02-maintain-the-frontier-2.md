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
