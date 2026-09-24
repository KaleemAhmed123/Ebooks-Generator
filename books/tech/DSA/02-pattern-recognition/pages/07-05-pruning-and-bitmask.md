## State Space Pruning and Bitmasks

- When a search space is massive, you cannot visit every state. You must prune branches that are guaranteed to fail
- This page covers the two most important techniques for navigating complex state spaces: identifying dead ends early (Pruning) and representing state efficiently (Bitmasks)

### Pruning: Failing Fast

- In backtracking, the worst thing you can do is explore a path for 15 steps only to realise step 1 made it invalid
- **Feasibility Pruning:** Stop exploring if the current state violates the rules. (e.g. in N-Queens, do not place a queen if the diagonal is already attacked. Don't wait until the board is full to check)
- **Optimality Pruning (Branch and Bound):** If you are trying to find the minimum cost, keep track of the `bestCostSoFar`. If your current partial path already costs more than `bestCostSoFar`, stop. It can never win
- **Symmetry Pruning:** If exploring option A is structurally identical to exploring option B, only explore A. (e.g. if you have 3 identical red balls, it doesn't matter which one you pick first. Enforce an artificial order to prevent duplicate branches)

### Bitmasks: Micro-State

- If your state requires tracking a set of items (e.g. "which cities have I visited?"), you could use an array of booleans or a Hash Set. But in DFS or BFS, passing sets around is incredibly slow (memory allocation, hashing overhead)
- If the number of items is $\le 32$ (or 64), use an integer as a **Bitmask**. Each bit represents a boolean

| Operation | Array / Set | Bitmask Equivalent |
|---|---|---|
| Initialize empty | `visited = new Set()` | `mask = 0` |
| Mark `i` as visited | `visited.add(i)` | `mask \|= (1 << i)` |
| Unmark `i` | `visited.delete(i)` | `mask &= ~(1 << i)` |
| Check if `i` is visited | `visited.has(i)` | `(mask & (1 << i)) !== 0` |
| Are all N visited? | `visited.size === N` | `mask === (1 << N) - 1` |

### Why Bitmasks matter for Search

- **Speed:** Bitwise operations take 1 CPU cycle. Hashing takes hundreds
- **Immutability:** When you recurse `dfs(mask | (1 << i))`, you are passing a value, not a reference. You do not need to "backtrack" (undo the change) after the recursive call returns, because you never mutated the original `mask`
- **Memoization:** If you want to cache the result of `(node, visitedSet)`, caching a Set is impossible. Caching `(node, mask)` is trivial — it's just a 2D array or a single combined integer key

:::interview
"Can you use bitmasks if N = 100?"

Not natively. Bitmasks fit perfectly in 32-bit or 64-bit integers. If N = 100, you would need a BigInt or an array of integers (a BitSet). At that point, the O(1) CPU register benefits are lost, though it remains far more memory-efficient than a Hash Set of booleans.
:::
