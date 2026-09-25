## Recognition drills: Recursion & Backtracking 🟢

Hide the right column. Name the template (trust, before/after, index recurrence, grid walk, pick-or-skip, loop + skip, stay/restart, fill the slots, cut, place-check-undo) and the start index or state of the next call.

| Problem | Template & next call |
|---|---|
| 1. Print decreasing then increasing (Pepcoding) | **Before/after:** print, `f(n − 1)`, print |
| 2. Zig-zag pre-in-post (Pepcoding) | **Before/between/after** two calls |
| 3. Tower of Hanoi (GFG) | **Trust the smaller call:** n − 1, move, n − 1 |
| 4. Pow(x, n) (LeetCode 50) | **Trust half:** `pow(x, n/2)` squared |
| 5. Reverse a stack / sort a stack using recursion (GFG) | **Trust + after:** pop, recurse, insert back |
| 6. Find the Winner of the Circular Game (LeetCode 1823) | **Index recurrence:** `J(n) = (J(n−1) + k) mod n` |
| 7. K-th Symbol in Grammar (LeetCode 779) | **Index recurrence** on the parent `⌈k/2⌉` |
| 8. Rat in a Maze (GFG) | **Grid walk:** checks at the top, mark, 4 moves, unmark |
| 9. Maze paths with jumps (Pepcoding) | **Grid walk,** moves `1..k` in each direction |
| 10. Word Search (LeetCode 79) | **Grid walk** with letter matching, restore the cell |
| 11. Subsets (LeetCode 78) / subsequences of a string (GFG) | **Pick or skip,** `go(i + 1)` both ways |
| 12. Subsets II (LeetCode 90) | **Loop + skip equal siblings,** record every node |
| 13. Combination Sum (LeetCode 39) | **Stay:** `go(i, rem − c[i])` |
| 14. Combination Sum II (LeetCode 40) | **Loop + skip,** `go(i + 1)` |
| 15. Combination Sum IV (LeetCode 377) | **Restart at 0** + memo: order matters |
| 16. Count Sorted Vowel Strings (LeetCode 1641) | **Stay:** vowels in non-decreasing order, `go(v)`; closed form `C(n + 4, 4)` |
| 17. Count All Possible Routes (LeetCode 1575) | **Restart at 0** over cities + memo `(city, fuel)` |
| 18. Maximum Length of a Concatenated String with Unique Characters (LeetCode 1239) | **Pick or skip** with a letter mask; explore skip even when pick is legal |
| 19. Permutations (LeetCode 46) / Permutations II (LeetCode 47) | **Fill the slots;** for duplicates skip when the left twin is unused |
| 20. Letter Combinations of a Phone Number (LeetCode 17) | **Fill the slots,** each slot its own pool |
| 21. Generate Parentheses (LeetCode 22) | **Fill the slots:** `(` while `open < n`, `)` while `close < open` |
| 22. Palindrome Partitioning (LeetCode 131) | **Try every cut** |
| 23. Restore IP Addresses (LeetCode 93) | **Try every cut,** 4 pieces, prune by remaining length |
| 24. Different Ways to Add Parentheses (LeetCode 241) | **Cut at every operator,** combine both sides |
| 25. Remove Invalid Parentheses (LeetCode 301) 🟡 | **Count the excess `(` and `)` first,** then remove exactly that many, skipping equal neighbours |
| 26. N-Queens (LeetCode 51) | **Place, check, undo** with column and diagonal sets |
| 27. Sudoku Solver (LeetCode 37) | **Place, check, undo** with row/column/box sets |
| 28. Partition to K Equal Sum Subsets (LeetCode 698) / Fair Distribution of Cookies (LeetCode 2305) | **Items into buckets,** biggest first, skip equal-sum buckets |
| 29. Largest number in K swaps (GFG) 🟡 | **Place, check, undo:** at each position swap in every larger digit to its right that equals the maximum, recurse with k − 1 |
| 30. Partition Array Into Two Arrays to Minimize Sum Difference, up to 30 numbers (LeetCode 2035) 🔴 | **Not plain backtracking:** 2³⁰ is too many; split in halves (meet in the middle, 19-09) |

### Score yourself

- **25–30:** you choose the start index of the next call before writing the loop
- **15–24:** reread 13-05 to 13-08; most misses are "once, reuse, or reorder?"
- **0–14:** go back to 13-01 and write the hypothesis for every drill before its code
