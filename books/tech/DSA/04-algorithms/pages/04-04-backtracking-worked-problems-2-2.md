### Where it appears

| Problem | Why it belongs here |
|---|---|
| [N-Queens](https://leetcode.com/problems/n-queens/) (LeetCode 51) | Exact problem solved on this page |
| [N-Queens II](https://leetcode.com/problems/n-queens-ii/) (LeetCode 52) | Count-only variant of the same backtracking |
| [Combination Sum](https://leetcode.com/problems/combination-sum/) (LeetCode 39) | Exact problem solved on this page |
| [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) (LeetCode 22) | Backtracking with open/close counters |

:::interview
"Generate all valid combinations of n pairs of parentheses."

Backtracking with two counters: `open` (how many `(` placed) and `close` (how many `)` placed). At each step, you can place `(` if open < n, and `)` if close < open. Base case: path length = 2n. This prunes invalid sequences without generating them. Time: O(4ⁿ / √n) — the nth Catalan number.
:::
