### Where it appears

| Problem | What the pair comparison decides |
|---|---|
| [Largest Number](https://leetcode.com/problems/largest-number/) (LeetCode 179) | which concatenation is lexicographically bigger |
| [Queue Reconstruction by Height](https://leetcode.com/problems/queue-reconstruction-by-height/) (LeetCode 406) | tallest first, then insert at index `k` |
| [Custom Sort String](https://leetcode.com/problems/custom-sort-string/) (LeetCode 791) | a given letter ordering |
| [Two City Scheduling](https://leetcode.com/problems/two-city-scheduling/) (LeetCode 1029) | cost difference collapses to a single key (→ 08-05) |

:::interview
"Why must the comparator return a number, not a boolean?"

JavaScript's `Array.sort` expects negative, zero, or positive. A boolean coerces to 0 or 1 — never negative — so the sort never sees "a comes before b". The result is an implementation-dependent order that looks correct on small arrays and fails on larger ones.
:::
