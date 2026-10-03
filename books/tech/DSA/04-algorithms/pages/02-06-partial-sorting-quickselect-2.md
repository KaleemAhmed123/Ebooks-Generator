### Complexity Breakdown

- Quick Sort processes *both* halves recursively: N + N/2 + N/4... = O(N log N) total work across all levels of the tree.
- Quickselect only processes *one* half recursively: N + N/2 + N/4 + N/8... This is a geometric series that sums exactly to 2N.
- Therefore, the average time complexity is O(N).

### The trap

- **The Worst Case:** Just like Quick Sort, if Quickselect repeatedly picks the worst possible pivot (e.g., the array is already sorted and it picks the last element), it discards only 1 element per recursion. The complexity collapses to O(N²).
- **The fix:** Always randomize the pivot before partitioning, or shuffle the array O(N) before passing it to Quickselect.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (LeetCode 215) | Direct quickselect application |
| [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) (LeetCode 347) | Quickselect on frequency to find top K |
| [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) (LeetCode 973) | Quickselect by distance |
