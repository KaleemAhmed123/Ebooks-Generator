### Why Bitmasks matter for Search

- **Speed:** a bitwise operation is a single machine instruction; hashing a set is many
- **Immutability:** When you recurse `dfs(mask | (1 << i))`, you are passing a value, not a reference. You do not need to "backtrack" (undo the change) after the recursive call returns, because you never mutated the original `mask`
- **Memoization:** If you want to cache the result of `(node, visitedSet)`, caching a Set is impossible. Caching `(node, mask)` is trivial — it's just a 2D array or a single combined integer key

:::interview
"Can you use bitmasks if N = 100?"

Not natively. Bitmasks fit perfectly in 32-bit or 64-bit integers. If N = 100, you would need a BigInt or an array of integers (a BitSet). At that point, the O(1) CPU register benefits are lost, though it still uses far less memory than a Hash Set of booleans.
:::
