### Where it appears

| Problem | What wraps around |
|---|---|
| [Minimum Swaps to Group All 1's Together II](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/) (LeetCode 2134) | a fixed window of size `ones` on a circular array |
| [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/) (LeetCode 503) | monotonic stack on doubled indices; push only first lap |
| [Defuse the Bomb](https://leetcode.com/problems/defuse-the-bomb/) (LeetCode 1652) | circular window sum forward or backward |
| [Check if Array Is Sorted and Rotated](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/) (LeetCode 1752) | at most one descent when counted circularly |

:::interview
"Why not just copy the array twice?"

You can — it works and the code is simpler. But it doubles the memory. Reading `a[i % n]` gives the same doubled view without allocating anything. For large arrays or streaming data, the modular trick matters. For contest speed, concatenating is fine.
:::
