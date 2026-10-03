### Where it appears

| Problem | What "K" means |
|---|---|
| [Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/) (LeetCode 992) | K distinct values |
| [Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/) (LeetCode 930) | sum = goal on a 0/1 array |
| [Count Number of Nice Subarrays](https://leetcode.com/problems/count-number-of-nice-subarrays/) (LeetCode 1248) | K odd numbers (map to `n % 2`, then sum = K) |
| [Number of Subarrays with Bounded Maximum](https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/) (LeetCode 795) | max in `[L, R]` = atMost(R) − atMost(L − 1) |

:::interview
"Can you solve 'exactly K distinct' in one pass?"

You can, with two left pointers (`leftNear` and `leftFar`) tracking the range of valid starts. Each step the count is `leftNear − leftFar`. It works but the code is harder to write and debug under pressure. Two calls to the same helper is safer and still O(n).
:::
