## Recognition drills: Order and Ranking 🟢

Hide the right column. Identify the correct Order/Ranking technique (Sort then Scan, Greedy via Sorting, Binary Search on Sorted Input, Coordinate Compression, Sweep Line) and justify your answer.

| Problem | Order Pattern & Justification |
|---|---|
| 1. Find the maximum number of non-overlapping intervals you can select from a given set of intervals. | **Greedy via Sorting.** Sort intervals by their end time. Scan and greedily pick the first interval that does not overlap with the previously picked one. |
| 2. Given an array of coordinates up to 10⁹, you need to use them as indices in an array or Fenwick Tree. | **Coordinate Compression.** The absolute values don't matter, only their relative order. Sort the unique coordinates and map them to their dense ranks (1, 2, 3...). |
| 3. Given a set of points on a 2D plane, find if there are any three points that lie on the same vertical line. | **Sort then Scan.** Sort points primarily by X, secondarily by Y. Any points on the same vertical line will now be adjacent in the sorted array. Scan for triplets with identical X. |
| 4. You have a list of user session start and end times. Find the minute with the maximum number of concurrent users. | **Sweep Line.** Convert intervals into events: `(start, +1)` and `(end, -1)`. Sort the events by time. Sweep through the sorted events, maintaining a running sum. The maximum running sum is the answer. |
| 5. Given two arrays A and B, find the pair `(A[i], B[j])` with the smallest absolute difference. | **Sort then Scan (or Binary Search).** Sort both arrays. Use two pointers to scan them simultaneously, advancing the pointer that points to the smaller value. (Alternatively, sort A, and for each element in B, binary search A). |
| 6. Given an array, find two numbers that sum to exactly K. | **Sort then Scan (Two Pointers) or Hash Map.** If the array is already sorted, use a left and right pointer. If not sorted, a Hash Map is O(N). Sorting first would take O(N log N). |
| 7. Given an array of meeting time intervals, determine if a person could attend all meetings. | **Sort then Scan.** Sort by start time. Scan the array. If any meeting starts before the previous meeting ends, return false. |
| 8. Find the total length of coverage given a set of overlapping 1D line segments. | **Sweep Line (or Sort then Merge).** Sort segments by start time. Maintain a `currentStart` and `currentEnd`. If the next segment overlaps, extend `currentEnd`. If it doesn't, add `currentEnd - currentStart` to the total and reset the markers. |

### Score yourself
- **7-8 correct:** You can reliably identify when sorting destroys sequence but reveals structure (adjacency, hierarchy)
- **4-6 correct:** You might be confusing Sweep Line with basic Two Pointers. Remember: Sweep Line processes *events*, Two Pointers process *elements*
- **0-3 correct:** Review the Order Family introduction (07-01)
