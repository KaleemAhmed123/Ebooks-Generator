### Where it appears

| Problem | What the bijection maps |
|---|---|
| [Word Pattern](https://leetcode.com/problems/word-pattern/) (LeetCode 290) | pattern letter ↔ word |
| [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) (LeetCode 205) | character ↔ character |
| [Find and Replace Pattern](https://leetcode.com/problems/find-and-replace-pattern/) (LeetCode 890) | each word tested against the pattern |

:::interview
"Why does a single map fail for 'abba' vs 'dog dog dog dog'?"

The forward map sees a → dog (fine) and b → dog (no conflict — b has no entry yet). Both letters land on "dog" and the map never complains. The reverse map catches it: dog was already claimed by a when b tries to map to it. A bijection requires both directions.
:::
