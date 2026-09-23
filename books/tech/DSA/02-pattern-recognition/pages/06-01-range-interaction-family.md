## The Range Interaction Family

- **What it is:** Performing operations (queries or updates) on contiguous subsegments of an array, repeatedly
- **The signal:** "Sum of elements between L and R", "Add X to all elements from L to R", "Subarray sum equals K"
- **The mechanism:** A naive range operation on a length N array takes O(N). If you have Q queries, the total time is O(N · Q). This family relies on precomputation. By spending O(N) time upfront, we can answer queries or process updates in O(1) time

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Prefix Sums** | "Sum of range `[L, R]`" on static data | Sum[L, R] = Sum[0, R] - Sum[0, L-1] |
| **Difference Array** | "Add X to range `[L, R]`" without querying until the end | Modifying the boundary of a range implicitly modifies everything inside it |
| **Prefix Hash Map** | "Find a subarray that sums to K" | If Sum[0, i] - K exists earlier in the array, the subarray between them sums to K |
| **Fenwick Tree** | "Point update, Range sum" on dynamic data | Numbers can be represented as sums of powers of 2 |
| **Segment Tree** | "Point update, Range min/max/sum" on dynamic data | Arrays can be queried as binary trees of merged blocks |
| **Lazy Propagation** | "Range update, Range query" on dynamic data | Updates can be cached at higher nodes and propagated on-demand |

### The mathematical foundation of boundaries

- A range `[L, R]` has two defining boundaries. 
- In **Prefix Sums**, we calculate the area *up to* the right boundary (R) and subtract the area *before* the left boundary (L-1).
- In **Difference Arrays**, we add a value at the left boundary (L) and subtract it just after the right boundary (R+1) so it stops affecting the running sum.
- Both techniques exploit the fact that a range operation can be perfectly defined by manipulating exactly two points, regardless of how wide the range is.

:::interview
"Why do we need Prefix Hash Maps instead of sliding windows for subarrays summing to K?" — Because sliding windows rely on monotonicity. If the array contains negative numbers, adding a new element might DECREASE the sum, meaning we can't safely shrink the window from the left. A Prefix Hash Map doesn't rely on monotonicity; it purely relies on the algebraic fact that `prefix[i] - prefix[j] = K`.
:::
