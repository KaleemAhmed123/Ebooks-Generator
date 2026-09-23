## The Frontier in Greedy and Beam Search

- The frontier pattern extends beyond graph traversal. Greedy algorithms and beam search are also frontier-based — they just have different selection and pruning rules

### Greedy as a frontier algorithm

- In interval scheduling, the "frontier" is the set of intervals that haven't been scheduled yet
- **Selection rule:** Pick the interval with the earliest end time
- **Pruning:** After selecting an interval, discard all overlapping intervals from the frontier. They are permanently eliminated
- The greedy choice is just a frontier selection rule with aggressive pruning

```
frontier = all intervals, sorted by end time

while frontier is not empty:
    pick the interval with the smallest end time
    add it to the schedule
    remove all intervals that overlap with the selected one
```

- This is the same skeleton: frontier → select best → expand/prune → repeat

### Beam Search: bounded frontier

- A* maintains a frontier of all reachable states. On large state spaces, this frontier explodes
- **Beam Search** caps the frontier at size B (the "beam width"). At each step, it keeps only the B most promising candidates and throws the rest away
- **Selection rule:** Smallest heuristic cost (like A*)
- **Pruning:** After expansion, truncate the frontier to B entries

| Method | Frontier size | Guarantee |
|---|---|---|
| BFS | Unbounded | Shortest path (unit cost) |
| Dijkstra | Unbounded | Shortest path (weighted) |
| A* | Unbounded | Shortest path (with admissible heuristic) |
| Beam Search | Bounded by B | No guarantee — approximate |

- Beam Search trades optimality for speed. It is widely used in NLP (machine translation, speech recognition) where the state space is too large for exact search

### Multi-Source BFS

- Sometimes the frontier starts with multiple nodes instead of one
- **Example:** "Find the shortest distance from any rotten orange to each fresh orange." Initialize the frontier with *all* rotten oranges simultaneously
- This is the same BFS skeleton. The only difference is the initialisation step: instead of `frontier = [start]`, it's `frontier = [all sources]`
- The distances computed are the shortest distance from the *nearest* source to each node

### The unifying insight

- Every algorithm in this section follows the same loop: maintain a set of candidates, select the best, expand, repeat
- The variation is in three choices:
  1. **What data structure holds the frontier** (queue, heap, bounded heap, sorted list)
  2. **How you select the next candidate** (FIFO, min-cost, heuristic, earliest deadline)
  3. **How aggressively you prune** (never, overlapping intervals, beam width)

:::interview
"When would you use Beam Search instead of A*?" — When the state space is too large to explore exactly. Beam Search caps the frontier at a fixed width B, so memory stays constant. The tradeoff is that it might miss the optimal solution. Use it when a good-enough answer fast is better than the perfect answer never.
:::
