# Chapter 7 - Order & Intervals

## The Order Family 🟢

- **What it is:** The answer to the problem depends on the relative magnitude of the elements, not their original positions
- **The signal:** "Find the pairs", "Find the closest", "Can you form...", "Kth largest"
- **The mechanism:** Data in random order contains no structural guarantees. Once data is sorted, you can eliminate candidates without checking them, or greedily pick the best candidate immediately

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Sort then Scan** | "Find duplicates", "Closest pair" | Sorting brings related elements physically adjacent to each other |
| **Greedy via Sorting** | "Maximise profit", "Minimise cost" | The optimal choice is always at one extreme of the sorted order |
| **Two Pointers (Collision)** | "Two Sum", "Three Sum" | Moving left/right predictably increases/decreases the sum |
| **Binary Search** | "Find X in O(log n)" | You can eliminate half the remaining search space with one comparison |
| **Sweep Line** | "Overlapping intervals" | Processing events in chronological/spatial order reveals overlap |
| **Sort by Start or End** (07-07) | "Merge intervals", "remove the fewest" | Start order exposes the open group; end order leaves the most room |
| **Count While You Merge** (07-08) | "Count inversions / reverse pairs" | Sorted halves turn cross pairs into a two-pointer count |
| **Let Pairs Decide** (07-09) | "Largest number", "reconstruct the queue" | A consistent pairwise rule plus an exchange argument |
