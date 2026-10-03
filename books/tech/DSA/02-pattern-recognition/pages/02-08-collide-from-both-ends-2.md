### Where it appears

| Problem | What the two pointers eliminate |
|---|---|
| [Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) (LeetCode 167) | pairs whose sum is too small (row) or too big (column) |
| [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) (LeetCode 11) | move the shorter wall: it caps every pair it could still form |
| [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) (LeetCode 125) | non-alnum characters; mismatch → not a palindrome |
| [Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/) (LeetCode 977) | the larger absolute value goes next in reverse |
| [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) (LeetCode 42) | the shorter side's water is bounded; advance it |

:::interview
"In Container With Most Water, why is it safe to move the shorter wall?"

The shorter wall is the bottleneck. Moving it might find a taller wall and increase area. Moving the taller wall can only shrink or keep the area: width drops by 1, and the height is still capped by the other (shorter) wall. So every pair skipped by advancing the shorter pointer is provably worse than what you already recorded.
:::
