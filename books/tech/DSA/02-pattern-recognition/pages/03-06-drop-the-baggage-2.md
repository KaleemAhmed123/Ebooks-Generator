### Where it appears

| Problem | What state you carry forward |
|---|---|
| [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) (LeetCode 53) | `maxHere`: extend or restart |
| [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) (LeetCode 152) | `maxHere` and `minHere` (sign flip swaps them) |
| [Maximum Subarray Sum with One Deletion](https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/) (LeetCode 1186) | two states: no deletion yet, one element deleted |
| [Maximum Absolute Sum of Any Subarray](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/) (LeetCode 1749) | best and worst subarray sums |

- **Follow-up (LeetCode 2272):** per letter pair, map `hi → +1`, `lo → −1` and run Kadane. A window must hold at least one `lo`, so carry a "seen `lo`" flag

:::interview
"Why does Kadane's algorithm fail on Maximum Product Subarray?"

Kadane resets when the sum drops below zero — fine for sums, because a negative prefix always hurts. For products, a negative prefix can *help* if a future negative flips its sign. You must carry both the largest and smallest product ending here, because today's worst can become tomorrow's best after one negative multiply.
:::
