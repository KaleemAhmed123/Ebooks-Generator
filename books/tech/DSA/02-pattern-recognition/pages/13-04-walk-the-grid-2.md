### Where it appears

| Problem | What the grid walk explores |
|---|---|
| [Number of Islands](https://leetcode.com/problems/number-of-islands/) (LeetCode 200) | connected land cells — mark visited in place |
| [Word Search](https://leetcode.com/problems/word-search/) (LeetCode 79) | a path matching the word — mark with `'#'`, restore after |
| [Path with Maximum Gold](https://leetcode.com/problems/path-with-maximum-gold/) (LeetCode 1219) | all paths, tracking the best sum |
| [Unique Paths](https://leetcode.com/problems/unique-paths/) (LeetCode 62) | right and down only — no mark needed; memoise (17-01) |

:::interview
"Word Search marks cells by writing '#'. Why not use a separate visited set?"

A set costs O(m·n) extra space. Writing directly into the grid and restoring after the call uses O(1) extra — the call stack is already O(m·n) in the worst case anyway. The tradeoff: if the grid is read-only (e.g. frozen input), you must use a set.
:::
