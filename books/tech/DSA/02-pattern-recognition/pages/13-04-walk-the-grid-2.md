### Variations

- **Count maze paths, moves right and down only (Pepcoding / Unique Paths, LeetCode 62):** no marking needed, because right/down paths cannot loop. `count(r, c) = count(r+1, c) + count(r, c+1)`; memoise it (Chapter 17), or use `C(m + n − 2, m − 1)`
- **Maze path with obstacles (Unique Paths II, LeetCode 63):** the same count, returning 0 at a blocked cell
- **Maze path with jumps (Pepcoding):** the move set becomes "1..k cells right, 1..k down, 1..k diagonal": a loop inside the loop of directions
- **Word Search (LeetCode 79):** "usable" means the cell matches the next letter. Mark by overwriting the cell with `'#'`, restore it after the four calls
- **Longest possible route in a matrix with hurdles (GFG):** return `1 + max(child routes)` instead of collecting paths; `−∞` when the destination is unreachable
- **Shortest path in a grid:** *not* this pattern. Backtracking explores exponentially many paths; the shortest one needs BFS (Chapter 16)

### The failure

- **Checking validity before each call instead of at the top.** Four copies of the bounds-and-blocked test, one per direction, is where a `>=` becomes `>`. One check at the top of the function is written once
- **Forgetting to unmark.** Without `m[r][c] = 1` on the way out, every cell an earlier branch touched stays blocked, so "all paths" silently returns only some of them

:::interview
"How do you find all paths in a maze?" — Depth-first search over moves, with backtracking: at each cell I return early if it is outside, blocked or already on the current path; otherwise I mark it, recurse into every allowed move, and unmark it on the way out. If the question asks for the *shortest* path, I switch to BFS, because enumerating paths is exponential.
:::
