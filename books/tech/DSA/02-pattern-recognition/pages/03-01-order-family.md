## The Order Family

- **What it is:** The answer to the problem depends on the relative magnitude of the elements, not their original positions
- **The signal:** "Find the pairs", "Find the closest", "Can you form...", "Kth largest"
- **The mechanism:** Data in random order contains no structural guarantees. Once data is sorted, you gain the power to eliminate candidates without checking them, or greedily pick the best candidate immediately

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Sort then Scan** | "Find duplicates", "Closest pair" | Sorting brings related elements physically adjacent to each other |
| **Greedy via Sorting** | "Maximise profit", "Minimise cost" | The optimal choice is always at one extreme of the sorted order |
| **Two Pointers (Collision)** | "Two Sum", "Three Sum" | Moving left/right predictably increases/decreases the sum |
| **Binary Search** | "Find X in O(log n)" | You can eliminate half the remaining search space with one comparison |
| **Sweep Line** | "Overlapping intervals" | Processing events in chronological/spatial order reveals overlap |

### The preprocessing cost

- Almost all techniques in this family require you to sort the input first. Sorting takes O(n log n) time
- This means if the constraint is n ≤ 10⁵, you can afford the sort. If the constraint is n ≤ 10⁷, sorting will Time Limit Exceed (TLE). At 10⁷, you must find an O(n) solution (like a Hash Map or Counting Sort)
- **The golden rule of Order:** If the problem requires an O(n²) search, but you can sort the array and then use Two Pointers or Binary Search to solve it in O(n), the total time drops from O(n²) to O(n log n). This is the most common optimisation in all of computer science
