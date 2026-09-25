## Recognition drills: Order & Intervals, named problems <span class="lv lv1"></span>

Hide the right column. Say what you sort by — value, start, end, a derived key, or a pairwise rule — and what the scan after the sort does.

| Problem | Sort key & scan |
|---|---|
| 1. Union of Two Sorted Arrays (GFG) | **Already sorted:** merge with two pointers, skip equals |
| 2. Merge Sorted Array (LeetCode 88) | **Merge from the back** so nothing is overwritten before it is read |
| 3. Find First and Last Position of Element in Sorted Array (LeetCode 34) | **Lower bound and upper bound − 1** (07-04) |
| 4. Merge Intervals (LeetCode 56) | **Start;** extend the last merged end |
| 5. Insert Interval (LeetCode 57) | **Already sorted by start:** copy, absorb, copy |
| 6. Non-overlapping Intervals (LeetCode 435) | **End;** removals = n − kept |
| 7. N meetings in one room / Activity Selection (GFG) | **End;** keep when `start > lastEnd`; check whether the statement lets a meeting start at the previous end |
| 8. Minimum Number of Arrows to Burst Balloons (LeetCode 452) | **End;** shoot at an end, skip what it pierces |
| 9. Minimum Platforms (GFG) | **Sweep line** (07-06): sort arrivals and departures separately |
| 10. Interval List Intersections (LeetCode 986) | **Two sorted lists:** overlap `[max start, min end]`, advance the earlier end |
| 11. Count Inversions (GFG) | **Count while you merge:** `mid − i` per right-side win |
| 12. Reverse Pairs (LeetCode 493) | **Count while you merge,** separate `2·a[j]` pass |
| 13. Count of Smaller Numbers After Self (LeetCode 315) | **Count while you merge** on indices |
| 14. Largest Number (LeetCode 179) | **Pairwise rule:** `b + a` vs `a + b` |
| 15. Queue Reconstruction by Height (LeetCode 406) | **Height desc, k asc,** insert at k |
| 16. Find K Closest Elements (LeetCode 658) | **Binary search the window start** in `[0, n − k]`, compare `x − a[m]` with `a[m + k] − x` |

### Score yourself

- **13–16:** you can name the key before you think about the story
- **8–12:** reread 07-07; "start or end" decides most interval questions
- **0–7:** reread 07-01 and 07-03 before redoing the table
