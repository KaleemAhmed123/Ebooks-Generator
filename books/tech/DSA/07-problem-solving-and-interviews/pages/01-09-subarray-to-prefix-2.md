### The Binary Transformation Twist

- **Problem:** Longest subarray with equal 0s and 1s.
- **The Transformation:** 
  - Change all `0`s to `-1`s.
  - Now, a subarray has equal 0s and 1s if and only if its sum is exactly `0`.
  - The problem perfectly transforms into "Longest subarray with sum 0". 
  - Use the exact same Prefix Sum Hash Map technique, but store the *first index* where a sum was seen to maximize length.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) (LeetCode 560) | Prefix sum + hash map counting complements |
| [Contiguous Array](https://leetcode.com/problems/contiguous-array/) (LeetCode 525) | Map 0 to -1, then longest subarray with prefix sum 0 |
| [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) (LeetCode 238) | Prefix and suffix product arrays replace division |
| [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) (LeetCode 303) | Direct prefix sum for O(1) range queries |
