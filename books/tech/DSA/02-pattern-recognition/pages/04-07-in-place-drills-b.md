## Recognition drills after Chapter 4 <span class="lv lv1"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Defuse the Bomb](https://leetcode.com/problems/defuse-the-bomb/) (LeetCode 1652) | 04-06 | "**circular**", fixed k: one window read with `% n` |
| 2 | [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) (LeetCode 448) | 04-02 | values **1..n**: negate `a[|v| − 1]`; positive slots are missing |
| 3 | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) (LeetCode 42) | 03-04 | water over a bar needs **both sides**: left and right max |
| 4 | [Minimum Index of a Valid Split](https://leetcode.com/problems/minimum-index-of-a-valid-split/) (LeetCode 2780) | 04-05 | "**more than half**": vote, then count with a prefix |
| 5 | [Rotate Array](https://leetcode.com/problems/rotate-array/) (LeetCode 189) | 04-03 | **in place** rotation: three reversals, `k %= n` |
| 6 | [Find All Duplicates in an Array](https://leetcode.com/problems/find-all-duplicates-in-an-array/) (LeetCode 442) | 04-02 | **1..n**, O(1) space: an already-negative slot is a repeat |
| 7 | [Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/) (LeetCode 1493) | 02-03 | at most **one** zero in the window; answer = length − 1 |
| 8 | [Next Greater Element III](https://leetcode.com/problems/next-greater-element-iii/) (LeetCode 556) | 04-04 | "**smallest larger** arrangement": find the dip |
| 9 | [Check if Array Is Sorted and Rotated](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/) (LeetCode 1752) | 04-06 | count descents **circularly**; at most one |
| 10 | [Majority Element II](https://leetcode.com/problems/majority-element-ii/) (LeetCode 229) | 04-05 | "more than **n/3**": two candidates, then verify |
| 11 | [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) (LeetCode 287) | 12-04 | "**without modifying**": `i → a[i]` is a list; find the cycle |
| 12 | [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) (LeetCode 41) | 04-02 | answer in **1..n + 1**: send values home, scan for a gap |

### Score yourself

- **11–12:** you read the constraints ("1..n", "circular", "O(1) space", "without modifying") before the story
- **8–10:** revisit 04-02: bounded values are the most common unlock in this chapter
- **0–7:** reread 04-01, then redo rows 2, 6, 11 and 12
