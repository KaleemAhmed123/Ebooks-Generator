## Heap for Merge 🟢

- **What it is:** Using a priority queue to multi-way merge K different sorted structures
- **When to reach for it:** "Merge K sorted lists", "Kth smallest element in a sorted matrix"
- **Why it works:** If you have 3 sorted arrays, the absolute smallest element *must* be the first element of Array A, B, or C. If you pick the smallest from those three, the *next* smallest must be one of the remaining two, plus the newly exposed element from the array you just picked from

### The visual mechanism

- Arrays: `A = [1, 5]`, `B = [2, 4]`, `C = [3, 6]`
- Initial Heap contains the heads: `[1, 2, 3]`. The smallest is `1` (from A)
- Pop `1`, push the next element from A (`5`). Heap is now `[2, 3, 5]`
- The smallest is `2` (from B). Pop `2`, push `4` from B. Heap: `[3, 4, 5]`
