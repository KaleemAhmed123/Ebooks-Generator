### Where it appears

| Problem | The grid transition |
|---|---|
| Longest Common Subsequence (LeetCode 1143) | match adds 1 |
| Edit Distance (LeetCode 72) | min of insert, delete, replace |
| Delete Operation for Two Strings (LeetCode 583) | `m + n − 2·LCS` |
| Shortest Common Supersequence (LeetCode 1092) | build from the LCS path |

:::interview
"LCS and edit distance share a grid — what is the real difference?"

Both walk `f(i, j)` over two prefixes. On a match, both step diagonally. On a mismatch, LCS *maximises* over dropping one side (it counts matches); edit distance *minimises* over insert, delete, and replace (it counts changes, replace being the extra diagonal move). Same structure, opposite objective and one extra transition.
:::
