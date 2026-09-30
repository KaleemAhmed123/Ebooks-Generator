### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) (LeetCode 303) | Prefix sum array makes each range query O(1) |
| [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) (LeetCode 238) | Prefix and suffix product arrays precompute partial results |
| [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/) (LeetCode 1109) | Difference array preprocesses range updates into O(1) each |
| [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) (LeetCode 724) | Prefix sum lets you compare left and right sums in O(1) |

:::interview
"You have an array and 100,000 range-sum queries. How do you handle this efficiently?"

I would preprocess the array into a prefix sum array in O(n). Then each query becomes a single subtraction: sum(L, R) = prefix[R] − prefix[L−1]. Total time drops from O(n × Q) to O(n + Q).
:::
