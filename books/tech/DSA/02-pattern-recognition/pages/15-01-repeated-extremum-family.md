# Chapter 15 - Heaps & Ordered Sets

## The Repeated Extremum Family <span class="lv lv1"></span>

- **What it is:** The problem requires you to find the maximum, minimum, or "best" element, and it asks you to do this repeatedly as the data changes
- **Signal:** "Top K", "Merge K", "Kth largest", "Running median", "Max in sliding window", "Next greater element"
- **Why it works:** Scanning an array for the max takes O(n). Doing it k times takes O(k · n). You must trade space for a data structure that maintains the extremum internally, allowing O(1) or O(log n) retrieval

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Heap (Priority Queue)** (15-03, 15-11) | "Top K", "Merge K sorted" | A partial sort is faster than a full sort. Maintains the absolute global extremum |
| **Monotonic Stack** (10-05) | "Next greater element" | A local extremum eliminates the need to check smaller previous elements |
| **Two Heaps** (15-04) | "Running median" | Two tops hold the middle of the data |
| **Merge the Two Smallest** (15-05) | "Connect ropes", "Huffman" | The cheapest items belong deepest in the merge tree |
| **Take Now, Regret Later** (15-06) | "Refuelling stops", "courses by deadline" | Undo the worst accepted choice when a constraint breaks |
| **Ordered Set** (Module 03, 05-01) | "Nearest larger value seen so far" | Every element's neighbours, not just the top |
| **Segment Tree** (19-01) | "Max in range `[L, R]` with updates" | Tree structure allows querying any arbitrary range in O(log n) |
| **Sparse Table** (19-01) | "Max in range `[L, R]`, static data" | Precomputes intervals of length 2^k for O(1) overlapping queries |

### Heap vs sorting

- Top-k with a size-k min-heap costs O(n log k) against O(n log n) for a full sort; the heap for top-k is worked in Module 07 (01-10) and Module 03 (03-03)
