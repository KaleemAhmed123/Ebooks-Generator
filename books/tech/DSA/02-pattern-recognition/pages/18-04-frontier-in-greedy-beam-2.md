### Multi-Source BFS

- Sometimes the frontier starts with multiple nodes instead of one
- **Example:** "Find the shortest distance from any rotten orange to each fresh orange." Initialize the frontier with *all* rotten oranges simultaneously
- This is the same BFS skeleton. The only difference is the initialisation step: instead of `frontier = [start]`, it's `frontier = [all sources]`
- The distances computed are the shortest distance from the *nearest* source to each node

### The unifying insight

- Every algorithm here follows the same loop: maintain a set of candidates, select the best, expand, repeat
- The variation is in three choices:
  1. **What data structure holds the frontier** (queue, heap, bounded heap, sorted list)
  2. **How you select the next candidate** (FIFO, min-cost, heuristic, earliest deadline)
  3. **How aggressively you prune** (never, overlapping intervals, beam width)

:::interview
"When would you use Beam Search instead of A*?"

When the state space is too large to explore exactly. Beam Search caps the frontier at a fixed width B, so memory stays constant. The tradeoff is that it might miss the optimal solution. Use it when a good-enough answer fast is better than the perfect answer never.
:::
