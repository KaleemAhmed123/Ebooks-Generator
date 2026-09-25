### The Query Logic

- When querying a range `[L, R]`, you start at the root (which represents `[0, N-1]`)
- **Case 1: Total Overlap.** The node's range is completely inside `[L, R]`. Return the node's value immediately. Do not traverse further down
- **Case 2: No Overlap.** The node's range is completely outside `[L, R]`. Return a neutral value (e.g. `Infinity` for minimum, `0` for sum)
- **Case 3: Partial Overlap.** The node intersects `[L, R]`. Recursively query the left and right children and combine their results

### The power of associativity

- Segment Trees work because we can safely break `[L, R]` into smaller disjoint pieces, query them independently, and merge the results
- This requires the operation to be **associative**: `(A + B) + C = A + (B + C)`
- It does not require invertibility. It does not require idempotence. This makes Segment Trees the most flexible range querying structure

:::interview
"What is the memory complexity of a Segment Tree?"

It requires O(N) memory, specifically a flat array of size 4N. A perfect binary tree with N leaves has 2N-1 total nodes, but because N is rarely a perfect power of 2, the bottom level might not be completely full. The 4N sizing safely guarantees we won't get out-of-bounds errors regardless of the shape of the array.
:::
