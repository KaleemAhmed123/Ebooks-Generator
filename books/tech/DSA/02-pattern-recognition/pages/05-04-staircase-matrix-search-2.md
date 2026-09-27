```ts
// Search a 2D Matrix II (LeetCode 240)
function searchMatrix(m: number[][], target: number): boolean {
  let r = 0, c = m[0].length - 1;          // top-right corner
  while (r < m.length && c >= 0) {
    if (m[r][c] === target) return true;
    // column c below r is all larger
    if (m[r][c] > target) c--;
    // row r left of c is all smaller
    else r++;
  }
  return false;
}
```

### Variations

- **Row with maximum 1s (GFG), each row sorted 0s then 1s:** start top-right. On a 1, step left and remember the row; on a 0, step down. The walk never goes right again, so it is O(m + n), not O(m log n)
- **Count Negative Numbers in a Sorted Matrix (LeetCode 1351):** start bottom-left. Every negative at `(r, c)` means the rest of row `r` is negative too: add `n − c` and step up
- **Kth Smallest Element in a Sorted Matrix (LeetCode 378):** the staircase counts how many cells are ≤ x in O(m + n). Binary search on x around that count (page 09-04)

### The failure

- **Starting at the top-left.** From `(0, 0)` both moves, right and down, *increase* the value, so a comparison never says which way to go. Only the top-right and bottom-left corners have one smaller and one larger neighbour

:::interview
"Why is staircase search O(m + n) and not O(m · n)?" — Every comparison removes a whole row (the corner is too small) or a whole column (the corner is too large). There are m rows and n columns to remove, so at most m + n − 1 comparisons happen before the pointer leaves the matrix, with O(1) extra space. A full scan is O(m · n); the sorted rows and columns are what make each comparison worth a line.
:::
