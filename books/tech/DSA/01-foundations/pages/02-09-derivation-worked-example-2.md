### The Derivation

- You started with brute force. You saw the repeated sums. You tried to cache them, hit a space limit, and realised you only needed to cache the *prefixes* to compute the rest. The algorithm was derived, not memorised

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) (LeetCode 303) | The problem this derivation solves — prefix sum for O(1) queries |
| [Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/) (LeetCode 304) | 2D prefix sum extends the same idea to matrices |
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) (LeetCode 560) | Prefix sum plus hash map to count subarrays with target sum |
| [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/) (LeetCode 523) | Prefix sum modulo k finds subarrays divisible by k |
