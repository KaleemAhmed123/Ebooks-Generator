# Chapter 15 - Heaps & Ordered Sets

## The Repeated Extremum Family <span class="lv lv1"></span>

- **What it is:** The problem requires you to find the maximum, minimum, or "best" element, and it asks you to do this repeatedly as the data changes
- **The signal:** "Top K", "Merge K", "Kth largest", "Running median", "Max in sliding window", "Next greater element"
- **The mechanism:** Scanning an array for the max takes O(n). Doing it k times takes O(k · n). You must trade space for a data structure that maintains the extremum internally, allowing O(1) or O(log n) retrieval

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Heap (Priority Queue)** | "Top K", "Merge K sorted" | A partial sort is faster than a full sort. Maintains the absolute global extremum |
| **Monotonic Stack** | "Next greater element" | A local extremum eliminates the need to check smaller previous elements |
| **Two Heaps** (15-04) | "Running median" | Two tops hold the middle of the data |
| **Merge the Two Smallest** (15-05) | "Connect ropes", "Huffman" | The cheapest items belong deepest in the merge tree |
| **Take Now, Regret Later** (15-06) | "Refuelling stops", "courses by deadline" | Undo the worst accepted choice when a constraint breaks |
| **Ordered Set** (Module 03, 05-01) | "Nearest larger value seen so far" | Every element's neighbours, not just the top |
| **Segment Tree** (Chapter 19) | "Max in range `[L, R]` with updates" | Tree structure allows querying any arbitrary range in O(log n) |
| **Sparse Table** (Chapter 19) | "Max in range `[L, R]`, static data" | Precomputes intervals of length 2^k for O(1) overlapping queries |

### Heap vs Sorting

- If a problem asks for the *largest* element, scanning takes O(n)
- If a problem asks for the *Kth largest*, you can sort the array and return `arr[n - k]`. This takes O(n log n)
- If you use a Heap (Priority Queue) of size k, you process each element in O(log k). Total time: O(n log k)
- **The mathematical difference:** If n = 1,000,000 and k = 10, n log n ≈ 20,000,000 operations. n log k ≈ 3,000,000 operations. A heap is nearly an order of magnitude faster for small k
