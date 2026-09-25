### Why they belong together

- A fixed sliding window remembers the sum of the last k elements
- A monotonic stack (Chapter 10) remembers only the elements still waiting for a match
- In both cases, the algorithm succeeds by keeping a "memory" of a local region, allowing it to process each new element in O(1) amortised time by interacting only with that local memory

### The failure

- **Assuming "subset" implies locality.** A subarray/substring must be contiguous. A subset/subsequence does not. Sliding window cannot find the "longest subset that sums to K". (That is Knapsack DP). Locality needs contiguity
