## The Frontier in Greedy and Beam Search <span class="lv lv2"></span>

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
