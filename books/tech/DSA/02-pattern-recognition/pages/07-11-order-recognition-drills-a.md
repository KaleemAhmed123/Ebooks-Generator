## Recognition drills: Order and Ranking <span class="lv lv1"></span>

Hide the right column. Identify the correct Order/Ranking technique (Sort then Scan, Greedy via Sorting, Binary Search on Sorted Input, Coordinate Compression, Sweep Line) and justify your answer.

| Problem | Order Pattern & Justification |
|---|---|
| 1. Find the maximum number of non-overlapping intervals you can select from a given set of intervals. | **Greedy via Sorting.** Sort intervals by their end time. Scan and greedily pick the first interval that does not overlap with the previously picked one. |
| 2. Given an array of coordinates up to 10⁹, you need to use them as indices in an array or Fenwick Tree. | **Coordinate Compression.** The absolute values don't matter, only their relative order. Sort the unique coordinates and map them to their dense ranks (1, 2, 3...). |
| 3. Given a set of points on a 2D plane, find if there are any three points that lie on the same vertical line. | **Sort then Scan.** Sort points primarily by X, secondarily by Y. Any points on the same vertical line will now be adjacent in the sorted array. Scan for triplets with identical X. |
| 4. You have a list of user session start and end times. Find the minute with the maximum number of concurrent users. | **Sweep Line.** Convert intervals into events: `(start, +1)` and `(end, -1)`. Sort the events by time. Sweep through the sorted events, maintaining a running sum. The maximum running sum is the answer. |
| 5. Given two arrays A and B, find the pair `(A[i], B[j])` with the smallest absolute difference. | **Sort then Scan (or Binary Search).** Sort both arrays. Use two pointers to scan them simultaneously, advancing the pointer that points to the smaller value. (Alternatively, sort A, and for each element in B, binary search A). |
