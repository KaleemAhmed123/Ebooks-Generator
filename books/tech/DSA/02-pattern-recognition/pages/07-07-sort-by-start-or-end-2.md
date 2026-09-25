### Variations

- **Insert Interval (LeetCode 57):** input is already sorted, so no sort: copy intervals ending before `new.start`, absorb every interval with `start ≤ new.end` into `new`, copy the rest. O(n)
- **Non-overlapping Intervals (LeetCode 435):** removals = `n − (maximum kept)`, and maximum kept is activity selection: sort by end, keep an interval when `start ≥ lastEnd`
- **Minimum Number of Arrows to Burst Balloons (LeetCode 452):** sort by end; shoot at the first end, skip every balloon whose start ≤ that point, shoot again at the next unburst end. Touching balloons share an arrow, so the test is `start > arrow`
- **Interval List Intersections (LeetCode 986):** both lists are sorted; two pointers. The overlap is `[max(starts), min(ends)]`; advance the pointer whose interval ends first
- **Meeting Rooms II (LeetCode 253) / Minimum Platforms (GFG):** a *count of simultaneous* intervals, not a merge; use the sweep line on page 07-06

### The failure

- **Sorting by start for "remove the fewest".** Greedily keeping the earliest-starting interval can keep one long interval that blocks many short ones: `[1, 100], [2, 3], [4, 5]` keeps 1 interval by start and 2 by end
- **Comparing with the previous input interval instead of the merged one.** `[1, 10], [2, 3], [4, 8]` must merge into one; checking `[4, 8]` against `[2, 3]` (start 4 > end 3) splits it wrongly. Always compare with `out`'s last interval, whose end is a running maximum

:::interview
"How do you choose between sorting by start and sorting by end?" — If I am building the union, I sort by start, because then an interval can only touch the group that is still open. If I am choosing which intervals to keep, I sort by end, because the one that frees the timeline earliest can replace any other choice in an optimal answer without making it worse.
:::
