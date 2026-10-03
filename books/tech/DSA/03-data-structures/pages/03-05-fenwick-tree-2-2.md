### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307) | Point update + prefix sum query |
| [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (LeetCode 315) | Fenwick tree tracks frequency of values seen |
| [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) (LeetCode 493) | Count inversions via Fenwick on compressed values |

:::interview
"If I need to update a range of elements (e.g. add 5 to indices L through R) and query a single point, can I use a Fenwick Tree?"

Yes. You use a Difference Array logic. You call `update(L, 5)` and `update(R + 1, -5)`. Then, to find the value at point `X`, you simply query the prefix sum up to `X`. The tree is now storing the *deltas*, not the absolute values.
:::
