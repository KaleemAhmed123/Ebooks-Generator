## Subsequence DP - continued

### Where it appears

| Problem | The range decision |
|---|---|
| Longest Palindromic Subsequence (LeetCode 516) | equal ends add 2 |
| Minimum Insertion Steps to Make a Palindrome (LeetCode 1312) | `n − LPS` |
| Longest Palindromic Substring (LeetCode 5) | substring needs contiguity → 06-02 |
| Count Different Palindromic Subsequences (LeetCode 730) | count variant, dedupe equal ends |

- **Go deeper:** two-string subsequence alignment (LCS, edit distance) is 17-12; increasing subsequences are 17-11.

:::interview
"Palindromic subsequence vs substring — why different techniques?"

A substring is contiguous, so it is found by expanding around each centre (06-02), O(n²) time O(1) space. A subsequence may skip characters, so no centre exists; it is a range DP `f(i, j)` that keeps matching ends and drops mismatched ones, O(n²) time and space.
:::
