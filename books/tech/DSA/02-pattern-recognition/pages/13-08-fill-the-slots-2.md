### Where it appears

| Problem | What fills each slot |
|---|---|
| [Permutations](https://leetcode.com/problems/permutations/) (LeetCode 46) | any unused element |
| [Permutations II](https://leetcode.com/problems/permutations-ii/) (LeetCode 47) | any unused element, skip equal siblings |
| [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) (LeetCode 17) | the letters mapped to that digit — no `used[]` |
| [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) (LeetCode 22) | `(` while `open < n`, `)` while `close < open` |

:::interview
"Generate Parentheses uses `close < open` as the guard. Why not `close < n`?"

`close < n` allows `)` even when there is no unmatched `(` to close — producing invalid strings like `)(`. `close < open` ensures every `)` matches an earlier `(`, so the string is valid at every prefix, not just at the end.
:::
