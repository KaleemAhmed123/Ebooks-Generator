### Where it appears

| Problem | What you permute |
|---|---|
| [Next Permutation](https://leetcode.com/problems/next-permutation/) (LeetCode 31) | the array itself |
| [Next Greater Element III](https://leetcode.com/problems/next-greater-element-iii/) (LeetCode 556) | digits of a number; −1 if result > 2³¹ − 1 |
| [Previous Permutation With One Swap](https://leetcode.com/problems/previous-permutation-with-one-swap/) (LeetCode 1053) | mirror image: find *rise* from right, no reverse |
| [Permutation Sequence](https://leetcode.com/problems/permutation-sequence/) (LeetCode 60) | jump to k-th directly via factorial number system |

:::interview
"Why does reversing the suffix sort it?"

After the swap, the suffix is still in descending order — the swap only exchanged one pair of values while preserving the descending property. Reversing a descending sequence makes it ascending, which is the same as sorting it — but in O(n) instead of O(n log n).
:::
