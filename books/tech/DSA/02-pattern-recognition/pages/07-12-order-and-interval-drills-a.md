## Recognition drills: Order & Intervals, named problems <span class="lv lv1"></span>

Hide the right column. Say what you sort by — value, start, end, a derived key, or a pairwise rule — and what the scan after the sort does.

| Problem | Sort key & scan |
|---|---|
| 1. [Union of 2 Sorted Arrays](https://www.geeksforgeeks.org/problems/union-of-two-sorted-arrays-1587115621/1) (GFG) | **Already sorted:** merge with two pointers, skip equals |
| 2. [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) (LeetCode 88) | **Merge from the back** so nothing is overwritten before it is read |
| 3. [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) (LeetCode 34) | **Lower bound and upper bound − 1** (Module 04, 01-04) |
| 4. [Merge Intervals](https://leetcode.com/problems/merge-intervals/) (LeetCode 56) | **Start;** extend the last merged end |
| 5. [Insert Interval](https://leetcode.com/problems/insert-interval/) (LeetCode 57) | **Already sorted by start:** copy, absorb, copy |
| 6. [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) (LeetCode 435) | **End;** removals = n − kept |
| 7. [Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) (LeetCode 452) | **End;** shoot at an end, skip what it pierces |
| 8. [Minimum Platforms](https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1) (GFG) | **Sweep line** (07-06): sort arrivals and departures separately |
| 9. [Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/) (LeetCode 986) | **Two sorted lists:** overlap `[max start, min end]`, advance the earlier end |
| 10. [Count Inversions](https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1) (GFG) | **Count while you merge:** `mid − i` per right-side win |
| 11. [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) (LeetCode 493) | **Count while you merge,** separate `2·a[j]` pass |
