### The space cost

- Remembering things costs memory. You are trading O(1) space for O(n) space (or O(n²) space for 2D DP)
- Always check the constraints. If n = 10⁵, an O(n) hash map is perfectly fine (a few megabytes). An O(n²) cache table is 40 gigabytes. You cannot afford to remember everything in 2D

### The trap

- **Hashing the wrong thing.** In the "Subarray Sum Equals K" problem, beginners try to hash the subarrays themselves. There are O(n²) subarrays. The correct approach is to hash the *prefix sums*. You must figure out the exact minimal state to remember

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Two Sum](https://leetcode.com/problems/two-sum/) (LeetCode 1) | Hash map replaces O(n) inner scan with O(1) lookup |
| [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) (LeetCode 128) | Hash set remembers all values for O(1) neighbor checks |
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) (LeetCode 560) | Hash map stores prefix sum frequencies to find complements in O(1) |
| [Word Break](https://leetcode.com/problems/word-break/) (LeetCode 139) | DP cache remembers which starting indices can form valid splits |
| [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) (LeetCode 70) | Memoisation converts exponential recursion to O(n) DP |

:::interview
"Your recursive solution is too slow. How would you speed it up?"

I would check if the function is being called with the same arguments more than once. If it is, I would add a cache — an array or hash map keyed by the arguments. Before computing, check the cache. After computing, store the result. This is memoisation, and it converts exponential-time recursion into polynomial-time DP.
:::
