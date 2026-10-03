### Where it appears

| Problem | What each expansion finds |
|---|---|
| [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) (LeetCode 5) | longest palindrome from each centre |
| [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/) (LeetCode 647) | count every successful expansion step |
| [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/) (LeetCode 680) | at first mismatch, try skipping left or right once |

- **Follow-up (O(n)):** Manacher's algorithm reuses mirrored radii inside the rightmost palindrome found so far. Name it, then write the centres version

:::interview
"Why 2n − 1 centres and not just n?"

Odd-length palindromes centre on a character, even-length ones centre on the gap between two characters. `"abba"` centres on the gap between the two b's — no single character is the midpoint. Skipping gaps misses every even-length palindrome.
:::
