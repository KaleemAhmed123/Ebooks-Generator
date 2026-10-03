### Where it appears

| Problem | Sort key and why |
|---|---|
| [Merge Intervals](https://leetcode.com/problems/merge-intervals/) (LeetCode 56) | by start; extend or close |
| [Insert Interval](https://leetcode.com/problems/insert-interval/) (LeetCode 57) | already sorted; O(n), no sort |
| [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) (LeetCode 435) | by end; removals = n − kept |
| [Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) (LeetCode 452) | by end; touching balloons share an arrow |
| [Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/) (LeetCode 986) | two pointers; overlap = `[max starts, min ends]` |

:::interview
"Why does sorting by start fail for 'remove the fewest intervals'?"

`[1, 100], [2, 3], [4, 5]` sorted by start keeps `[1, 100]` and removes both short intervals — 1 kept. Sorted by end, it keeps `[2, 3]` and `[4, 5]` — 2 kept. The earliest-ending interval leaves the most room for the rest. This is the activity selection exchange argument.
:::
