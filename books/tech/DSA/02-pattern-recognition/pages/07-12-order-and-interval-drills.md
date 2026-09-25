## Recognition drills: Order & Intervals, named problems 🟢

Hide the right column. Say what you sort by — value, start, end, a derived key, or a pairwise rule — and what the scan after the sort does.

| Problem | Sort key & scan |
|---|---|
| 1. Union of Two Sorted Arrays (GFG) | **Already sorted:** merge with two pointers, skip equals |
| 2. Common elements in three sorted arrays (GFG) | **Three pointers:** all equal → record; else advance the smallest |
| 3. Merge Sorted Array (LeetCode 88) | **Merge from the back** so nothing is overwritten before it is read |
| 4. Find First and Last Position of Element in Sorted Array (LeetCode 34) | **Lower bound and upper bound − 1** (07-04) |
| 5. Find pair with given difference (GFG) | **Sort, two pointers moving the same way;** or a hash of `x + diff` |
| 6. Merge Intervals (LeetCode 56) | **Start;** extend the last merged end |
| 7. Insert Interval (LeetCode 57) | **Already sorted by start:** copy, absorb, copy |
| 8. Non-overlapping Intervals (LeetCode 435) | **End;** removals = n − kept |
| 9. N meetings in one room / Activity Selection (GFG) | **End;** keep when `start > lastEnd`; check whether the statement lets a meeting start at the previous end |
| 10. Minimum Number of Arrows to Burst Balloons (LeetCode 452) | **End;** shoot at an end, skip what it pierces |
| 11. Minimum Platforms (GFG) | **Sweep line** (07-06): sort arrivals and departures separately |
| 12. Interval List Intersections (LeetCode 986) | **Two sorted lists:** overlap `[max start, min end]`, advance the earlier end |
| 13. Count Inversions (GFG) | **Count while you merge:** `mid − i` per right-side win |
| 14. Reverse Pairs (LeetCode 493) | **Count while you merge,** separate `2·a[j]` pass |
| 15. Count of Smaller Numbers After Self (LeetCode 315) | **Count while you merge** on indices |
| 16. Largest Number (LeetCode 179) | **Pairwise rule:** `b + a` vs `a + b` |
| 17. Sort by set bit count (GFG) | **Derived key** + stable sort |
| 18. Queue Reconstruction by Height (LeetCode 406) | **Height desc, k asc,** insert at k |
| 19. Least Number of Unique Integers after K Removals (LeetCode 1481) | **Frequency ascending:** remove the rarest values first |
| 20. Sort Array by Increasing Frequency (LeetCode 1636) | **Derived key:** frequency asc, then value desc |
| 21. Find K Closest Elements (LeetCode 658) | **Binary search the window start** in `[0, n − k]`, compare `x − a[m]` with `a[m + k] − x` |
| 22. Merge two sorted arrays without extra space (GFG) 🟡 | **Gap method (shell-sort step)** `gap = ⌈gap/2⌉`, compare across both arrays; or swap the tails and sort each |

### Score yourself

- **19–22:** you can name the key before you think about the story
- **12–18:** reread 07-07; "start or end" decides most interval questions
- **0–11:** reread 07-01 and 07-03 before redoing the table
