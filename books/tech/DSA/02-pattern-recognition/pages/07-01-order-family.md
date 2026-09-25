# Chapter 7 - Order & Intervals

## The Order Family <span class="lv lv1"></span>

- **What it is:** The answer to the problem depends on the relative magnitude of the elements, not their original positions
- **Signal:** "Find the pairs", "Find the closest", "Can you form...", "Kth largest"
- **Why it works:** Data in random order contains no structural guarantees. Once data is sorted, you can eliminate candidates without checking them, or greedily pick the best candidate immediately

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Sort then Scan** | "Find duplicates", "Closest pair" | Sorting makes related elements adjacent; O(1) extra space, unlike a hash set |
| **Greedy via Sorting** (07-07, Module 04 03-04) | "Most meetings", "fewest removals" | The best next choice sits at one end of the sorted order |
| **Two Pointers (Collision)** (02-08, 02-10) | "Two Sum", "Three Sum" | Moving left/right predictably increases/decreases the sum |
| **Binary Search** (Module 04, 01-02 to 01-04) | "Find X in O(log n)" | You can eliminate half the remaining search space with one comparison |
| **Sweep Line** (07-06) | "How many overlap at once" | Processing events in chronological/spatial order reveals overlap |
| **Sort by Start or End** (07-07) | "Merge intervals", "remove the fewest" | Start order exposes the open group; end order leaves the most room |
| **Count While You Merge** (07-08) | "Count inversions / reverse pairs" | Sorted halves turn cross pairs into a two-pointer count |
| **Coordinate Compression** (Module 08, 05-01) | "Values up to 10⁹ as indices" | Only the rank of each value matters |
| **Let Pairs Decide** (07-09) | "Largest number", "reconstruct the queue" | A consistent pairwise rule plus an exchange argument |

### The preprocessing cost

- Every technique here starts with an O(n log n) sort, affordable up to n ≈ 10⁶ (Module 01, 01-03). Sort numbers with a comparator: `[10, 2, 1].sort()` is `[1, 10, 2]` (Module 04, 02-05)
