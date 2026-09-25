## Frontier worked problems 🟡 - continued

- **Problem:** Given a directed weighted graph, find the time it takes for a signal to reach all nodes from a source node
- **Why it is a frontier problem:** Weighted edges → FIFO won't work → need min-heap frontier (Dijkstra)

**Derivation:**
1. **Brute force:** Try all paths from source. Exponential on dense graphs
2. **Frontier pattern:** Use Dijkstra. Frontier is a min-heap of (time, node). Pop the cheapest. If already processed at a better time, skip. Otherwise expand neighbours

- **Answer:** The maximum value in the distance array after Dijkstra completes. If any node is unreachable (distance = ∞), return -1

### Problem 3: Cheapest Flights Within K Stops (modified frontier)

- **Problem:** Find the cheapest flight from source to destination with at most K stops
- **Why it is a frontier problem with a twist:** Standard Dijkstra won't work because we need to track stops as part of the state. The frontier becomes `(cost, node, stopsUsed)`
- **The insight:** The state is not just `node` — it is `(node, stopsUsed)`. A node can be visited multiple times if it was reached with a different number of stops
- **Alternative:** BFS-style relaxation for K + 1 rounds (Bellman-Ford limited to K + 1 iterations)

### The pattern across all three

- Problem 1: Frontier = queue (unit cost), state = word
- Problem 2: Frontier = min-heap (variable cost), state = node
- Problem 3: Frontier = min-heap (variable cost), state = (node, stops)
- Same skeleton. Different frontier. Different state. The unnamed pattern is the glue

:::interview
"How would you approach Word Ladder?"

This is BFS on an implicit graph. Each word is a node. Words differing by one letter are connected. Since all edges cost 1, BFS guarantees the shortest transformation sequence. The frontier is a queue of words at the current depth level.
:::
