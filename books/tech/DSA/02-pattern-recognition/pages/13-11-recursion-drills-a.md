## Recognition drills: Recursion & Backtracking <span class="lv lv1"></span>

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
