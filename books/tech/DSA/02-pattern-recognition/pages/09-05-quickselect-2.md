## Partition to the k-th - continued

### Where it appears

| Problem | The target index |
|---|---|
| Kth Largest Element in an Array (LeetCode 215) | n − k |
| K Closest Points to Origin (LeetCode 973) | partition by distance, keep the first k |
| Kth Smallest ... (LeetCode 378 / 668) | binary search on value often beats it → 09-04 |
| Wiggle Sort II (LeetCode 324) | find the median, then place |
| Top K Frequent Elements (LeetCode 347) | quickselect on frequencies, or a heap → 15-01 |

- **Go deeper:** quickselect is one use of Hoare/Lomuto partition; the partition schemes and median-of-medians proof are in Module 04.

:::interview
"Kth largest — heap or quickselect?"

A min-heap of size k is O(n log k), keeps input intact, and streams. Quickselect averages O(n) time in place but is O(n²) worst case and reorders the array. Pick the heap when data streams or must stay ordered, quickselect when you want the fastest average one-shot selection and can mutate a copy.
:::
