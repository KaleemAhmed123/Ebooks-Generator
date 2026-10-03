### Where it appears

| Problem | What you count per column |
|---|---|
| [Single Number II](https://leetcode.com/problems/single-number-ii/) (LeetCode 137) | `count % 3` recovers the single value's bit |
| [Total Hamming Distance](https://leetcode.com/problems/total-hamming-distance/) (LeetCode 477) | `ones · zeros` = pairs that differ in that column |
| [Minimum Flips to Make a OR b Equal to c](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/) (LeetCode 1318) | flips needed to make `a|b` match `c` in that column |

:::interview
"Single Number II has a well-known two-variable state-machine solution (ones/twos). When would you prefer the 32-column loop instead?"

The state-machine version runs in one pass and constant space — faster in practice. But it only works for `k = 3`. The column-counting loop generalises to any `k` with a one-character change (`count % k`). In an interview, if you cannot recall the state transitions, the column approach is safe, correct, and easy to reason about under pressure.
:::
