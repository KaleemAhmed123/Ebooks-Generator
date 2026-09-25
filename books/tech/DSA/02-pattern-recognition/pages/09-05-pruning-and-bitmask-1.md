## State Space Pruning and Bitmasks <span class="lv lv2"></span>

- When a search space is massive, you cannot visit every state. You must prune branches that are guaranteed to fail
- Two techniques tame large state spaces: identifying dead ends early (Pruning) and representing state compactly (Bitmasks)

### Pruning: Failing Fast

- In backtracking, the worst thing you can do is explore a path for 15 steps only to realise step 1 made it invalid
- **Feasibility Pruning:** Stop exploring if the current state violates the rules. (e.g. in N-Queens, do not place a queen if the diagonal is already attacked. Don't wait until the board is full to check)
- **Optimality Pruning (Branch and Bound):** If you are trying to find the minimum cost, keep track of the `bestCostSoFar`. If your current partial path already costs more than `bestCostSoFar`, stop. It can never win
- **Symmetry Pruning:** If exploring option A is structurally identical to exploring option B, only explore A. (e.g. if you have 3 identical red balls, it doesn't matter which one you pick first. Enforce an artificial order to prevent duplicate branches)

### Bitmasks: Micro-State

- If your state requires tracking a set of items (e.g. "which cities have I visited?"), you could use an array of booleans or a Hash Set. But in DFS or BFS, passing sets around is incredibly slow (memory allocation, hashing overhead)
- If the number of items is ≤ 32 (or 64), use an integer as a **Bitmask**. Each bit represents a boolean

| Operation | Array / Set | Bitmask Equivalent |
|---|---|---|
| Initialize empty | `visited = new Set()` | `mask = 0` |
| Mark `i` as visited | `visited.add(i)` | `mask \|= (1 << i)` |
| Unmark `i` | `visited.delete(i)` | `mask &= ~(1 << i)` |
| Check if `i` is visited | `visited.has(i)` | `(mask & (1 << i)) !== 0` |
| Are all N visited? | `visited.size === N` | `mask === (1 << N) - 1` |
