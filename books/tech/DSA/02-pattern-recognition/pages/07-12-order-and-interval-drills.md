## Recognition drills: Order & Intervals, named problems <span class="lv lv1"></span>

Hide the right column. Say what you sort by — value, start, end, a derived key, or a pairwise rule — and what the scan after the sort does.

| Problem | Sort key & scan |
|---|---|
| 1. Union of Two Sorted Arrays (GFG) | **Already sorted:** merge with two pointers, skip equals |
| 2. Merge Sorted Array (LeetCode 88) | **Merge from the back** so nothing is overwritten before it is read |
| 3. Find First and Last Position of Element in Sorted Array (LeetCode 34) | **Lower bound and upper bound − 1** (Module 04, 01-04) |
| 4. Merge Intervals (LeetCode 56) | **Start;** extend the last merged end |
| 5. Insert Interval (LeetCode 57) | **Already sorted by start:** copy, absorb, copy |
| 6. Non-overlapping Intervals (LeetCode 435) | **End;** removals = n − kept |
| 7. Minimum Number of Arrows to Burst Balloons (LeetCode 452) | **End;** shoot at an end, skip what it pierces |
| 8. Minimum Platforms (GFG) | **Sweep line** (07-06): sort arrivals and departures separately |
| 9. Interval List Intersections (LeetCode 986) | **Two sorted lists:** overlap `[max start, min end]`, advance the earlier end |
| 10. Count Inversions (GFG) | **Count while you merge:** `mid − i` per right-side win |
| 11. Reverse Pairs (LeetCode 493) | **Count while you merge,** separate `2·a[j]` pass |
| 12. Count of Smaller Numbers After Self (LeetCode 315) | **Count while you merge** on indices |
| 13. Largest Number (LeetCode 179) | **Pairwise rule:** `b + a` vs `a + b` |
| 14. Queue Reconstruction by Height (LeetCode 406) | **Height desc, k asc,** insert at k |
| 15. Find K Closest Elements (LeetCode 658) | **Binary search the window start** in `[0, n − k]`, compare `x − a[m]` with `a[m + k] − x` |

### Score yourself

- **12–15:** you can name the key before you think about the story
- **8–11:** reread 07-07; "start or end" decides most interval questions
- **0–7:** reread 07-01 and 07-07 before redoing the table
