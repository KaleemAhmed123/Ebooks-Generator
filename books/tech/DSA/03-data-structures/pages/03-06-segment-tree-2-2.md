### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307) | Segment tree alternative to Fenwick for range sums |
| [Range Minimum Query](https://leetcode.com/problems/range-minimum-query/) (LeetCode 2569) | Min has no inverse, so Fenwick cannot help |
| [Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/) (LeetCode 327) | Segment tree on coordinate-compressed prefix sums |

:::interview
"Why use a Segment Tree over a Fenwick Tree if both do O(log N) updates and queries?"

A Fenwick Tree is incredibly concise (10 lines of code) and uses only $O(N)$ space, making it strictly faster due to cache locality and bitwise operations. However, Fenwick Trees cannot do Range Minimum Queries (RMQ) efficiently because `min()` doesn't have an inverse operation (you can't "subtract" a minimum). A Segment Tree requires $O(4N)$ space and is much more verbose to write, but it is infinitely more flexible.
:::
