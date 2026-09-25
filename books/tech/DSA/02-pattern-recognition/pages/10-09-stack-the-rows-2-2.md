### Variations

- **Largest Rectangle in Histogram (LeetCode 84) / Maximum Rectangular Area in a Histogram (GFG):** the helper alone. When a bar is popped, the bar that popped it is the first shorter one to the right, and the new top is the first shorter one to the left
- **Max rectangle (GFG):** the same problem as LeetCode 85 with a 0/1 integer matrix
- **Count Submatrices With All Ones (LeetCode 1504) 🔴:** same heights, but *count* rectangles ending at each cell instead of the largest: a stack that keeps running sums of counts
- **Maximal Square (LeetCode 221):** looks similar, is simpler: `dp[r][c] = 1 + min(up, left, diagonal)` (Chapter 17). A square needs no histogram

### The failure

- **Checking every pair of columns per row.** O(rows · cols²) with a running minimum is fine for small grids, but a 10³ × 10³ grid costs 10⁹ steps. The stack makes each row O(cols)
- **Forgetting the sentinel.** Without the final height 0, bars that never meet a shorter bar stay on the stack, and an all-increasing histogram like `[1, 2, 3]` reports 0 instead of 4

:::interview
"How do you reduce Maximal Rectangle to something you know?" — Every rectangle has a bottom row. If I fix that row and replace each column by the count of consecutive 1s above it, the question becomes the largest rectangle in a histogram, which a monotonic stack solves in O(cols). Doing it for every row gives O(rows · cols) overall.
:::
