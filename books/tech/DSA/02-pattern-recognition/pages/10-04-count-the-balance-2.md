### Where it appears

| Problem | What the balance decides |
|---|---|
| [Minimum Add to Make Parentheses Valid](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/) (LeetCode 921) | unmatched opens + unmatched closes |
| [Minimum Number of Swaps to Make the String Balanced](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/) (LeetCode 1963) | `⌈unmatched / 2⌉` |
| [Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/) (LeetCode 32) | forward + backward counter passes |
| [Minimum Remove to Make Valid Parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/) (LeetCode 1249) | mark indices to remove |
| [Valid Parenthesis String](https://leetcode.com/problems/valid-parenthesis-string/) (LeetCode 678) | track lowest and highest possible balance |

:::interview
"Why does a counter fail with multiple bracket types?"

`"([)]"` keeps both `(` and `[` counters valid — each opens and closes once. But the nesting is wrong: the `]` closes the `(` context. Only a stack records *which kind* opened last, so mismatched nesting is caught.
:::
