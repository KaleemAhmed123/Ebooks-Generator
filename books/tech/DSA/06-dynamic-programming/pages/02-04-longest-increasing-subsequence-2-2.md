### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) (LeetCode 300) | The classic LIS problem |
| [Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) (LeetCode 673) | Count all LIS paths, not just the length |
| [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/) (LeetCode 354) | 2D LIS after sorting by one dimension |
| [Longest String Chain](https://leetcode.com/problems/longest-string-chain/) (LeetCode 1048) | LIS where predecessor is defined by character insertion |

### The O(N log N) Optimization

There is a legendary O(N log N) solution for LIS using Binary Search (often called Patience Sorting). It involves building a "sub sequence array" and using binary search to replace elements. While brilliant, it is not actually Dynamic Programming, and is rarely expected unless you are interviewing at a trading firm. Memorize the O(N²) DP first.
