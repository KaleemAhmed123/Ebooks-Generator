## Recognition drills: Recursion & Backtracking <span class="lv lv1"></span>

Hide the right column. Name the template (trust, before/after, index recurrence, grid walk, pick-or-skip, loop + skip, stay/restart, fill the slots, cut, place-check-undo) and the start index or state of the next call.

| Problem | Template & next call |
|---|---|
| 1. Tower of Hanoi (GFG) | **Trust the smaller call:** n − 1, move, n − 1 |
| 2. Pow(x, n) (LeetCode 50) | **Trust half:** `pow(x, n/2)` squared |
| 3. Rat in a Maze (GFG) | **Grid walk:** checks at the top, mark, 4 moves, unmark |
| 4. Word Search (LeetCode 79) | **Grid walk** with letter matching, restore the cell |
| 5. Subsets (LeetCode 78) / subsequences of a string (GFG) | **Pick or skip,** `go(i + 1)` both ways |
| 6. Subsets II (LeetCode 90) | **Loop + skip equal siblings,** record every node |
| 7. Combination Sum (LeetCode 39) | **Stay:** `go(i, rem − c[i])` |
| 8. Combination Sum II (LeetCode 40) | **Loop + skip,** `go(i + 1)` |
| 9. Combination Sum IV (LeetCode 377) | **Restart at 0** + memo: order matters |
| 10. Permutations (LeetCode 46) / Permutations II (LeetCode 47) | **Fill the slots;** for duplicates skip when the left twin is unused |
| 11. Letter Combinations of a Phone Number (LeetCode 17) | **Fill the slots,** each slot its own pool |
| 12. Generate Parentheses (LeetCode 22) | **Fill the slots:** `(` while `open < n`, `)` while `close < open` |
| 13. Palindrome Partitioning (LeetCode 131) | **Try every cut** |
| 14. Restore IP Addresses (LeetCode 93) | **Try every cut,** 4 pieces, prune by remaining length |
| 15. N-Queens (LeetCode 51) | **Place, check, undo** with column and diagonal sets |
| 16. Sudoku Solver (LeetCode 37) | **Place, check, undo** with row/column/box sets |

### Score yourself

- **13–16:** you choose the start index of the next call before writing the loop
- **8–12:** reread 13-05 to 13-08; most misses are "once, reuse, or reorder?"
- **0–7:** go back to 13-01 and write the hypothesis for every drill before its code
