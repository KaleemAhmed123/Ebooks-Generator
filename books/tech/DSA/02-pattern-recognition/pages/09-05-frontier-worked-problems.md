## Frontier worked problems

### Problem 1: Word Ladder (BFS frontier)

- **Problem:** Given two words and a dictionary, find the shortest transformation sequence from `beginWord` to `endWord`, changing one letter at a time. Each intermediate word must exist in the dictionary
- **Why it is a frontier problem:** Each word is a node. Two words that differ by one letter are connected by an edge. All edges cost 1. This is BFS on an implicit graph

**Derivation:**
1. **Brute force:** Try all possible sequences recursively. Exponential
2. **What's repeated?** We visit the same word from different paths. The first visit is always the shortest (unit-cost edges)
3. **Frontier pattern:** Use BFS. The frontier is a queue of words at the current distance. Each expansion generates all 1-letter variants. Mark visited to avoid reprocessing

```ts
function ladderLength(begin: string, end: string, dict: Set<string>): number {
  const frontier: string[] = [begin];
  const visited = new Set<string>([begin]);
  let depth = 1;

  while (frontier.length > 0) {
    const nextLevel: string[] = [];
    for (const word of frontier) {
      for (let i = 0; i < word.length; i++) {
        for (let c = 97; c <= 122; c++) {        // 'a' to 'z'
          const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
          if (next === end) return depth + 1;
          if (dict.has(next) && !visited.has(next)) {
            visited.add(next);
            nextLevel.push(next);
          }
        }
      }
    }
    frontier.length = 0;
    frontier.push(...nextLevel);
    depth++;
  }
  return 0;
}
```

- **Complexity:** O(N × M × 26) where N = dictionary size, M = word length

### Problem 2: Network Delay Time (Dijkstra frontier)

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
- **Alternative:** BFS-style relaxation for K rounds (Bellman-Ford limited to K iterations)

### The pattern across all three

- Problem 1: Frontier = queue (unit cost), state = word
- Problem 2: Frontier = min-heap (variable cost), state = node
- Problem 3: Frontier = min-heap (variable cost), state = (node, stops)
- Same skeleton. Different frontier. Different state. The unnamed pattern is the glue

:::interview
"How would you approach Word Ladder?" — This is BFS on an implicit graph. Each word is a node. Words differing by one letter are connected. Since all edges cost 1, BFS guarantees the shortest transformation sequence. The frontier is a queue of words at the current depth level.
:::
