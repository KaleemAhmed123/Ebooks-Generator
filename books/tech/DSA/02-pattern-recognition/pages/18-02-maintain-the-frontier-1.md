## Maintain the Frontier <span class="lv lv2"></span>

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
