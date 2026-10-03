### Where it appears

| Problem | What you keep in the middle |
|---|---|
| [Minimum Operations to Reduce X to Zero](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/) (LeetCode 1658) | longest window with sum = total − x |
| [Maximum Points You Can Obtain from Cards](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/) (LeetCode 1423) | fixed window of n − k; minimise its sum |
| [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/) (LeetCode 918) | total − worst Kadane (guard all-negative) |

:::interview
"Why can't you just greedily take the larger end each time?"

Greedy picks the locally larger value but can miss a globally better sequence. `[3, 5, 1, 4]` with x = 9: greedy takes 4, 3, 1 = 8 and stops. The answer takes 3, 5, 1 = 9 from the left. The window approach considers every split at once.
:::
