### The Template

```ts
function searchMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  
  let row = 0;
  let col = matrix[0].length - 1; // Top-Right
  
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return true;
    
    if (matrix[row][col] > target) {
      col--; // Move left to find smaller
    } else {
      row++; // Move down to find larger
    }
  }
  
  return false;
}
```

### The Complexity

- In the worst case, you travel from the top-right to the bottom-left.
- At most R − 1 moves down and C − 1 moves left happen inside the matrix before the last step exits: at most R + C − 1 comparisons.
- Total time: O(R + C).
- Total space: O(1).
- A naive full matrix search takes O(R · C). The structured search space allows us to eliminate entire rows or columns with a single check.

### Variations

- **Row with maximum 1s (GFG), each row sorted 0s then 1s:** start top-right. On a 1, step left and remember the row; on a 0, step down. The walk never goes right again, so it is O(R + C), not O(R log C)
- **Count Negative Numbers in a Sorted Matrix (LeetCode 1351):** start bottom-left. Every negative at `(r, c)` means the rest of row `r` is negative too: add `C − c` and step up
- **Kth Smallest Element in a Sorted Matrix (LeetCode 378):** the staircase counts how many cells are ≤ x in O(R + C). Binary search on x around that count (page 09-04)
