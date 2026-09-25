### Why they belong together

- A fixed sliding window remembers the sum of the last k elements
- A monotonic stack (Chapter 10) remembers the values of the last k elements that haven't found a match yet
- In both cases, the algorithm succeeds by keeping a "memory" of a local region, allowing it to process new elements in O(1) time by interacting only with that local memory

### The trap

- **Assuming "subset" implies locality.** A subarray/substring must be contiguous. A subset/subsequence does not. Sliding window cannot find the "longest subset that sums to K". (That is Knapsack DP). Locality only works when order and contiguity are strictly enforced
