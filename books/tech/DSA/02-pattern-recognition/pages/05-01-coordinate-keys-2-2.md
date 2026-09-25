### Variations

- **Search a 2D Matrix (LeetCode 74):** rows are sorted and each row starts above the previous row's end, so the matrix *is* one sorted list. Binary search `k` in `[0, m·n − 1]` and read `mat[⌊k/n⌋][k % n]`. No nested search, no copy
- **Reshape the Matrix (LeetCode 566):** read with the old column count, write with the new one; the flat index `k` is the only thing both shapes share
- **Diagonal Traverse (LeetCode 498):** group by `r + c`; reverse every other group to get the zig-zag
- **Valid Sudoku (LeetCode 36):** one pass, three sets per digit: row `r`, column `c`, box `⌊r/3⌋·3 + ⌊c/3⌋`
- **Four directions without four `if`s:** `const dirs = [[0,1],[1,0],[0,−1],[−1,0]]`; a spiral turns right with `d = (d + 1) % 4` (page 05-02)

### The failure

- **Dividing by rows instead of columns.** `r = ⌊k / cols⌋`, never `⌊k / rows⌋`. On a square matrix both give the same answer, so the bug passes every square test case and fails the first 2×3 one
- **Walking diagonals with boundary loops.** Starting a walk from every cell in the first row and first column works, but it is four loop bounds to get right. The key `r − c` needs none of them

:::interview
"How would you validate a Sudoku in one pass?" — Each cell belongs to exactly one row, one column and one box, and the box id is `⌊r/3⌋ · 3 + ⌊c/3⌋`. I keep a set per row, per column and per box, and a digit seen twice in any of the three sets fails the board. 81 cells, constant work each.
:::
