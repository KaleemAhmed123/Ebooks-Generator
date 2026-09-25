## Recognition drills: Order & Intervals, named problems <span class="lv lv1"></span>

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
