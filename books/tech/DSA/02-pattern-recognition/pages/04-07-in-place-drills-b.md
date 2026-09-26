## Recognition drills: In-Place & Index Tricks <span class="lv lv1"></span> - continued

| Problem | Trick & the enabling fact |
|---|---|
| 12. [Sort Colors](https://leetcode.com/problems/sort-colors/) (LeetCode 75) | **Dutch flag** (02-09): three regions, one pass |
| 13. [Three way partitioning](https://www.geeksforgeeks.org/problems/three-way-partitioning/1) (GFG) | **Dutch flag** around a range `[a, b]` instead of the values 0, 1, 2 |
| 14. [Minimum Swaps to Group All 1's Together II](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/) (LeetCode 2134) | **Wrap around** + fixed window of length `ones` |
| 15. [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/) (LeetCode 503) | **Wrap around** + monotonic stack over `2n` steps |

### Score yourself

- **12–15:** you read the constraints ("1..n", "circular", "O(1) space") before the story
- **8–11:** revisit 04-02: bounded values are the most common unlock in this chapter
- **0–7:** reread 04-01 and redo drills 4–8
