# Chapter 19 - Hard Range Structures & CP Tricks

## The Range Interaction Family <span class="lv lv3"></span>

- **What it is:** Performing operations (queries or updates) on contiguous subsegments of an array, repeatedly
- **The signal:** "Sum of elements between L and R", "Add X to all elements from L to R", "Subarray sum equals K"
- **The mechanism:** A naive range operation on a length N array takes O(N). If you have Q queries, the total time is O(N · Q). This family relies on precomputation. By spending O(N) time upfront, we can answer queries in O(1) (static data) or process updates and queries in O(log N)

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Prefix Sums** | "Sum of range `[L, R]`" on static data | Sum[L, R] = Sum[0, R] - Sum[0, L-1] |
| **Difference Array** | "Add X to range `[L, R]`" without querying until the end | Modifying the boundary of a range implicitly modifies everything inside it |
| **Prefix Hash Map** | "Find a subarray that sums to K" | If Sum[0, i] - K exists earlier in the array, the subarray between them sums to K |
| **Fenwick Tree** | "Point update, Range sum" on dynamic data | Numbers can be represented as sums of powers of 2 |
| **Segment Tree** | "Point update, Range min/max/sum" on dynamic data | Arrays can be queried as binary trees of merged blocks |
| **Lazy Propagation** | "Range update, Range query" on dynamic data | Updates can be cached at higher nodes and propagated on-demand |
