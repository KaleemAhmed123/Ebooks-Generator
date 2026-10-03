### Where it appears

| Problem | What the prefix code encodes |
|---|---|
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) (LeetCode 560) | the running sum; look up `sum − k` |
| [Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/) (LeetCode 974) | `sum % k` (normalise negative remainders) |
| [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/) (LeetCode 523) | `sum % k`; store first index, accept `i − first ≥ 2` |
| [Contiguous Array](https://leetcode.com/problems/contiguous-array/) (LeetCode 525) | count difference (0 → −1, 1 → +1) |
| [Find the Longest Substring Containing Vowels in Even Counts](https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/) (LeetCode 1371) | a 5-bit vowel parity mask (XOR-based) |

- **Follow-up (LeetCode 1915):** at most one letter odd: also look up `m ^ (1 << b)` for each of the 10 letters

:::interview
"Why seed the map with `{0: 1}` (or `{0: −1}` for longest)?"

The seed represents the empty prefix before index 0. Without it, a subarray that starts at index 0 is invisible — its code never finds a match. Seeding avoids a special case for "the whole prefix is valid".
:::
