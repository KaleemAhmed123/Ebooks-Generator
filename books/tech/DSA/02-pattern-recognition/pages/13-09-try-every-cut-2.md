### Where it appears

| Problem | What each cut produces |
|---|---|
| [Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/) (LeetCode 131) | a palindrome prefix + the rest |
| [Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/) (LeetCode 93) | 4 segments, each 0–255, no leading zero |
| [Word Break II](https://leetcode.com/problems/word-break-ii/) (LeetCode 140) | a dictionary word + the rest |
| [Different Ways to Add Parentheses](https://leetcode.com/problems/different-ways-to-add-parentheses/) (LeetCode 241) | left and right subexpressions around an operator |

:::interview
"Palindrome Partitioning checks `isPalindrome(s, start, end)` at every cut. How do you avoid O(n) per check?"

Precompute a 2D boolean table `pal[i][j]` in O(n²) using the DP: `pal[i][j] = (s[i] === s[j]) && (j − i < 3 || pal[i+1][j−1])`. Then every check during backtracking is O(1), and the total work drops from O(n · 2ⁿ) to O(n²) preprocessing + O(2ⁿ) enumeration.
:::
