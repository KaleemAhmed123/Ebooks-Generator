### Where it appears

| Problem | What each element waits for |
|---|---|
| [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) (LeetCode 739) | next warmer day |
| [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) (LeetCode 496) | next greater value |
| [Online Stock Span](https://leetcode.com/problems/online-stock-span/) (LeetCode 901) | previous greater (read top after popping) |
| [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/) (LeetCode 503) | circular; push only first lap (→ 04-06) |

:::interview
"What changes for 'next smaller' instead of 'next greater'?"

Flip the comparison: pop while the top is *greater than* the newcomer instead of *less than*. The stack then holds values in increasing order (bottom to top) instead of decreasing. Everything else — the loop, the answer assignment, the sentinel — stays the same.
:::
