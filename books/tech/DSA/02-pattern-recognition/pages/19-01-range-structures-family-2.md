### The mathematical foundation of boundaries

- A range `[L, R]` has two defining boundaries. 
- In **Prefix Sums**, we calculate the area *up to* the right boundary (R) and subtract the area *before* the left boundary (L-1).
- In **Difference Arrays**, we add a value at the left boundary (L) and subtract it just after the right boundary (R+1) so it stops affecting the running sum.
- Both techniques exploit the fact that a range operation can be perfectly defined by manipulating exactly two points, regardless of how wide the range is.

:::interview
"Why do we need Prefix Hash Maps instead of sliding windows for subarrays summing to K?"

Because sliding windows rely on monotonicity. If the array contains negative numbers, adding a new element might DECREASE the sum, meaning we can't safely shrink the window from the left. A Prefix Hash Map doesn't rely on monotonicity; it purely relies on the algebraic fact that `prefix[i] - prefix[j] = K`.
:::

### This chapter

- **19-02 to 19-07 Range structures:** Fenwick tree, segment tree, lazy propagation, sparse table, and their drills
- **19-08 and 19-09 CP tricks:** convex hull trick, meet in the middle
- **19-10 Thread back to the parent:** Morris traversal, O(1)-space tree walks
- **19-11 Choose the opposite bit:** the binary trie for XOR queries
- **19-12 Drills:** the hard tail, reduced to one structure each
