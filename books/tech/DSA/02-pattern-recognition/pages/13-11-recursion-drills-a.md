## Recognition drills: Recursion & Backtracking <span class="lv lv1"></span>

Hide the right column. Name the template (trust, before/after, index recurrence, grid walk, pick-or-skip, loop + skip, stay/restart, fill the slots, cut, place-check-undo) and the start index or state of the next call.

| Problem | Template & next call |
|---|---|
| 1. [Tower Of Hanoi](https://www.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1) (GFG) | **Trust the smaller call:** n − 1, move, n − 1 |
| 2. [Pow(x, n)](https://leetcode.com/problems/powx-n/) (LeetCode 50) | **Trust half:** `pow(x, n/2)` squared |
| 3. [Rat in a Maze](https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1) (GFG) | **Grid walk:** checks at the top, mark, 4 moves, unmark |
| 4. [Word Search](https://leetcode.com/problems/word-search/) (LeetCode 79) | **Grid walk** with letter matching, restore the cell |
| 5. [Subsets](https://leetcode.com/problems/subsets/) (LeetCode 78) | **Pick or skip,** `go(i + 1)` both ways |
| 6. [Subsets II](https://leetcode.com/problems/subsets-ii/) (LeetCode 90) | **Loop + skip equal siblings,** record every node |
| 7. [Combination Sum](https://leetcode.com/problems/combination-sum/) (LeetCode 39) | **Stay:** `go(i, rem − c[i])` |
| 8. [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/) (LeetCode 40) | **Loop + skip,** `go(i + 1)` |
| 9. [Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/) (LeetCode 377) | **Restart at 0** + memo: order matters |
| 10. [Permutations](https://leetcode.com/problems/permutations/) (LeetCode 46) / [Permutations II](https://leetcode.com/problems/permutations-ii/) (LeetCode 47) | **Fill the slots;** for duplicates skip when the left twin is unused |
| 11. [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) (LeetCode 17) | **Fill the slots,** each slot its own pool |
