## Recognition drills after Chapter 7 - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Number of Flowers in Full Bloom](https://leetcode.com/problems/number-of-flowers-in-full-bloom/) (LeetCode 2251) | 07-06 | "how many at each moment": starts ≤ t minus ends < t |
| 2 | [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) (LeetCode 435) | 07-07 | "remove the fewest": keep the most, sorted by end |
| 3 | [Max Chunks To Make Sorted II](https://leetcode.com/problems/max-chunks-to-make-sorted-ii/) (LeetCode 768) | 03-04 | no sort: cut where the left max ≤ the right min |
| 4 | [Queue Reconstruction by Height](https://leetcode.com/problems/queue-reconstruction-by-height/) (LeetCode 406) | 07-09 | the rule needs both keys: tallest first, then insert at index k |
| 5 | [Merge Intervals](https://leetcode.com/problems/merge-intervals/) (LeetCode 56) | 07-07 | "busy stretches" is the union: sort by start |
| 6 | [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) (LeetCode 493) | 07-08 | pairs by value: a separate counting pass before each merge |
| 7 | [Remove Covered Intervals](https://leetcode.com/problems/remove-covered-intervals/) (LeetCode 1288) | 07-07 | "contained": sort by start, longer first; covered when end ≤ the running max end |
| 8 | [Minimum Platforms](https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1) (GFG) | 07-06 | "how many at once": the peak of the running count |
| 9 | [Number of Subsequences That Satisfy the Given Sum Condition](https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/) (LeetCode 1498) | 02-08 | only min and max matter: sort, collide, add 2 to the power r − l |
| 10 | [Rank Teams by Votes](https://leetcode.com/problems/rank-teams-by-votes/) (LeetCode 1366) | 07-09 | a comparator over vote-count vectors, letter last |
| 11 | [Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/) (LeetCode 327) | 07-08 | prefix sums: pairs `i < j` with `P[j] − P[i]` in range, counted across halves |
| 12 | [Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) (LeetCode 452) | 07-07 | "fewest points hitting all": sort by end, shoot at each end |

### Score yourself

- **11–12:** you name the sort key before the story
- **7–10:** reread the tree on 07-07, then 07-06 against 07-07
- **0–6:** redo 07-06 to 07-09, then this drill in a week
