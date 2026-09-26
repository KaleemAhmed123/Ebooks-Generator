## Recognition drills: Recursion & Backtracking <span class="lv lv1"></span> - continued

| Problem | Template & next call |
|---|---|
| 12. Generate Parentheses (LeetCode 22) | **Fill the slots:** `(` while `open < n`, `)` while `close < open` |
| 13. Palindrome Partitioning (LeetCode 131) | **Try every cut** |
| 14. Restore IP Addresses (LeetCode 93) | **Try every cut,** 4 pieces, prune by remaining length |
| 15. N-Queens (LeetCode 51) | **Place, check, undo** with column and diagonal sets |
| 16. Sudoku Solver (LeetCode 37) | **Place, check, undo** with row/column/box sets |

### Score yourself

- **13–16:** you choose the start index of the next call before writing the loop
- **8–12:** reread 13-05 to 13-08; most misses are "once, reuse, or reorder?"
- **0–7:** go back to 13-01 and write the hypothesis for every drill before its code
