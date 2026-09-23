## Dijkstra's Algorithm

- BFS finds the shortest path on an unweighted graph. But if the edges have different costs (weights), a path with 5 edges might be cheaper than a path with 2 edges.
- Dijkstra's Algorithm is the definitive solution for finding the shortest path on a **Weighted Graph**.
- **The Core Constraint:** Dijkstra completely breaks if the graph has **negative edge weights**. It fundamentally assumes that adding an edge to a path can only increase its total cost, never decrease it.

### The Mechanics

- Dijkstra is essentially a BFS, but instead of using a standard Queue (FIFO), it uses a **Priority Queue (Min-Heap)**.
- It always processes the node that currently has the *absolute smallest known total distance from the start*. 
- Because it always greedily locks in the closest node, by the time it pops a node from the Priority Queue, it has mathematically proven that it is impossible to find a cheaper path to that node.

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dijkstra greedy choice">
  <circle cx="50" cy="70" r="20" fill="#1d4e89" />
  <text x="45" y="75" class="l" fill="#ffffff">A</text>
  
  <circle cx="200" cy="40" r="20" fill="#e2fcf3" stroke="#12121a" stroke-width="2" />
  <text x="195" y="45" class="l">B</text>
  
  <circle cx="200" cy="100" r="20" fill="#e2fcf3" stroke="#12121a" stroke-width="2" />
  <text x="195" y="105" class="l">C</text>
  
  <path d="M70 65 L180 45" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <text x="110" y="45" class="s">Cost 10</text>
  
  <path d="M70 75 L180 95" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <text x="110" y="105" class="s">Cost 5</text>
  
  <circle cx="350" cy="70" r="20" fill="#f4f4f4" stroke="#12121a" stroke-width="2" />
  <text x="345" y="75" class="l">D</text>
  
  <path d="M220 40 L330 65" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M220 100 L330 75" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  
  <!-- Highlight -->
  <rect x="180" y="80" width="40" height="40" fill="none" stroke="#ef476e" stroke-width="3" stroke-dasharray="4" />
  <text x="180" y="135" class="s" fill="#ef476e">Pop C first!</text>
</svg>
:::

### Edge Relaxation

The process of updating a neighbor's distance is called **Relaxation**.
If `DistanceTo(U) + Weight(U -> V) < DistanceTo(V)`:
- We have found a cheaper way to reach `V`.
- We "relax" the edge by updating `DistanceTo(V)` and pushing `V` back into the Priority Queue with its new, cheaper distance.

### The trap

- **Missing the `visited` check:** A node can be pushed into the Priority Queue multiple times with different distances (e.g., we found a path of cost 10, then later found a path of cost 8). The PQ will pop the cost 8 version first. When the cost 10 version eventually bubbles up and pops, we must completely ignore it, because we already processed that node optimally.
- **The fix:** When you pop `[cost, node]`, immediately check if `cost > dist[node]`. If it is, `continue`. This prevents processing stale, outdated paths and saves massive amounts of time.
