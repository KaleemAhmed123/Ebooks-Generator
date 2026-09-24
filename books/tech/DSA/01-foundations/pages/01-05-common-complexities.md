## Common complexities

- You must instantly recognise what code structure produces what complexity, and vice-versa

| Complexity | Name | Typical Code Structure |
|---|---|---|
| **O(1)** | Constant | Math formulas, array lookups, hash map lookups |
| **O(log n)** | Logarithmic | Binary search, halving the search space at each step |
| **O(n)** | Linear | A single loop over the input, or two pointers |
| **O(n log n)** | Linearithmic | Sorting, or doing a binary search for each of the n items |
| **O(n²)** | Quadratic | Two nested loops over the input (e.g. comparing all pairs) |
| **O(2ⁿ)** | Exponential | Generating all subsets (include or exclude each item) |
| **O(n!)** | Factorial | Generating all permutations |

### The mathematical reality

- O(log n) is astonishingly fast. The logarithm of 1 billion (base 2) is roughly 30. If an operation is O(log n), scaling from 1,000 items to 1,000,000,000 items only requires 20 more operations
- O(n log n) is the absolute limit for sorting algorithms that use comparisons
- O(n²) is the boundary of "too slow" for most modern problems where n ≥ 10⁵

### Why logs are base 2

- In computer science, log always means log₂ unless specified otherwise, because algorithms split data in half (binary search) or build binary trees
- In Big-O notation, the base doesn't matter anyway. By the change of base formula, loga n = logb n/logb a. The denominator is a constant factor, which Big-O ignores. So O(log₂ n) = O(log₁₀ n)

### The failure

- A common interview mistake is describing a recursive algorithm that branches twice at each level as O(n²). It is O(2ⁿ).
- n² means doubling the input quadruples the time. 2ⁿ means adding **one** element to the input doubles the time. The difference is the universe exploding

:::interview
"What is the time complexity of looking up a value in a hash map?"

O(1) on average, assuming a good hash function and load factor. But O(n) in the worst case if every key collides and chains into a single linked list.
:::
