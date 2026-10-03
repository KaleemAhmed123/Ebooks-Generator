### Where it appears

| Problem | What is compressed |
|---|---|
| [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (LeetCode 315) | array values → ranks for a Fenwick |
| [Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/) (LeetCode 327) | prefix sums and their `±lo/hi` bounds |
| [The Skyline Problem](https://leetcode.com/problems/the-skyline-problem/) (LeetCode 218) | x-coordinates of building edges |

:::interview
"When do you actually need compression, and when is it wasted work?"

You need it whenever an algorithm indexes an array *by value* — a Fenwick, a counting bucket, a segment tree over the value axis — and that value range is larger than n (big ints, floats, negatives, timestamps). Compressing makes memory O(n) instead of O(max value). It is wasted when the structure is keyed by position, not value (a prefix sum over indices), or when values are already small and dense, say `0 … n`. Compression never changes the answer to order-based queries, only the storage, so the test is purely "does the value range blow up memory?".
:::
