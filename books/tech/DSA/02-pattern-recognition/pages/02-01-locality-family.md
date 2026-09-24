## The Locality Family

- **What it is:** The answer to the problem depends on a small, contiguous chunk of the data
- **The signal:** "Subarray", "Substring", "Consecutive", "Next greater element", "Window"
- **The mechanism:** If the answer is local, you do not need to scan the entire array every time. You only need to look at elements that are "near" the current element

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Sliding Window (Fixed)** | "Subarray of size k" | Sum of window i overlaps 99% with window i-1 |
| **Sliding Window (Variable)** | "Longest/shortest subarray with property X" | Monotonicity: growing window increases sum/count |
| **Two Pointers (Same direction)** | "Remove duplicates in place" | One pointer writes, one pointer explores |
| **Monotonic Stack** | "Next greater/smaller element" | A larger element renders all previous smaller elements useless |

### Why they belong together

- A fixed sliding window remembers the sum of the last k elements
- A monotonic stack remembers the values of the last k elements that haven't found a match yet
- In both cases, the algorithm succeeds by keeping a "memory" of a local region, allowing it to process new elements in O(1) time by interacting only with that local memory

### The trap

- **Assuming "subset" implies locality.** A subarray/substring must be contiguous. A subset/subsequence does not. Sliding window cannot find the "longest subset that sums to K". (That is Knapsack DP). Locality only works when order and contiguity are strictly enforced
