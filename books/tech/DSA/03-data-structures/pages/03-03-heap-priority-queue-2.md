### The Removal Trap

- A Heap only guarantees O(log N) removal for the **root** element.
- If you need to remove an arbitrary element from the middle of the Heap, you must first *find* it. Because a Heap is not perfectly sorted, finding an element takes O(N).
- **The fix:** If you need to frequently remove non-root elements, you must either:
  1. Use a **Lazy Deletion** strategy (keep a Hash Map of deleted elements, and only `pop()` them when they eventually reach the root).
  2. Use a different structure, like an Ordered Set (TreeSet in Java), which supports O(log N) search and removal.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (LeetCode 215) | Min-heap of size K tracks top K |
| [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) (LeetCode 23) | Heap tracks K current-smallest candidates |
| [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) (LeetCode 295) | Two heaps maintain the dynamic median |
| [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) (LeetCode 347) | Heap extracts K most frequent after counting |

:::interview
"Why use a Heap for Top-K instead of sorting the array?"

Sorting the array takes O(N log N). If N is 10 million, that's slow. If K is 5, a Heap approach takes O(N log K), which is roughly O(N). Furthermore, if the data is a continuous infinite stream, sorting is impossible. A size-K Heap processes streams perfectly.
:::
