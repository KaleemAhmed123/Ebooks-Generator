## Longest Increasing Subsequence - continued

### Where it appears

| Problem | The increasing chain |
|---|---|
| Longest Increasing Subsequence (LeetCode 300) | the pile count |
| Russian Doll Envelopes (LeetCode 354) | sort by width, LIS on height |
| Number of Longest Increasing Subsequence (LeetCode 673) | count variant (needs O(n²) dp) |
| Longest String Chain (LeetCode 1048) | chain by "add one letter" |
| Maximum Height by Stacking Cuboids (LeetCode 1691) | LIS in 3 sorted dimensions |

- **Go deeper:** the patience-sorting proof and reconstruction are in Module 06; the "keep the smallest tail" idea is the frontier pattern (18-02).

:::interview
"LIS in O(n log n) — what does the array you binary-search actually hold?"

Not a subsequence — `tails[k]` is the smallest possible tail value among all increasing subsequences of length k + 1. It is sorted, so binary search finds where the next number extends (append) or improves (replace) a length. The array's length equals the LIS length, but its contents are not a valid LIS.
:::
