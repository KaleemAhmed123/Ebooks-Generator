## Recognition drills: Recursion & Backtracking <span class="lv lv1"></span> - continued

| Problem | Template & next call |
|---|---|
| 12. [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) (LeetCode 22) | **Fill the slots:** `(` while `open < n`, `)` while `close < open` |
| 13. [Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/) (LeetCode 131) | **Try every cut** |
| 14. [Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/) (LeetCode 93) | **Try every cut,** 4 pieces, prune by remaining length |
| 15. [N-Queens](https://leetcode.com/problems/n-queens/) (LeetCode 51) | **Place, check, undo** with column and diagonal sets |
| 16. [Sudoku Solver](https://leetcode.com/problems/sudoku-solver/) (LeetCode 37) | **Place, check, undo** with row/column/box sets |

### Score yourself

- **13–16:** you choose the start index of the next call before writing the loop
- **8–12:** reread 13-05 to 13-08; most misses are "once, reuse, or reorder?"
- **0–7:** go back to 13-01 and write the hypothesis for every drill before its code
