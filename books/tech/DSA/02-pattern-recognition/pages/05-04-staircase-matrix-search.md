## Staircase Search <span class="lv lv1"></span>

- **What it is:** Searching for a target in a 2D matrix where every row is sorted left-to-right, and every column is sorted top-to-bottom
- **Signal:** "Search a 2D Matrix II" (LeetCode 240): rows and columns each sorted
- **Why it works:** If you start at the top-right corner, you have two choices. Moving left decreases the value. Moving down increases the value. From that corner the matrix behaves like a Binary Search Tree

### The visual mechanism

- Target: `16`

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Searching a row and column sorted matrix. Starting top-right, moving left decreases the value, moving down increases it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef476e"/>
    </marker>
  </defs>

  <!-- Row 0 -->
  <rect class="bx" x="20" y="20" width="30" height="20" rx="2" />
  <rect class="bx" x="50" y="20" width="30" height="20" rx="2" />
  <rect class="hi" x="80" y="20" width="30" height="20" rx="2" />
  <text x="35" y="34" class="lb" text-anchor="middle">1</text>
  <text x="65" y="34" class="lb" text-anchor="middle">4</text>
  <text x="95" y="34" class="lb" text-anchor="middle">7</text>
  
  <text x="130" y="34" class="sm" fill="#2d6a4f">Start (7 < 16, move DOWN)</text>

  <!-- Row 1 -->
  <rect class="bx" x="20" y="40" width="30" height="20" rx="2" />
  <rect class="bx" x="50" y="40" width="30" height="20" rx="2" />
  <rect class="hi" x="80" y="40" width="30" height="20" rx="2" />
  <text x="35" y="54" class="lb" text-anchor="middle">2</text>
  <text x="65" y="54" class="lb" text-anchor="middle">5</text>
  <text x="95" y="54" class="lb" text-anchor="middle">20</text>

  <text x="130" y="54" class="sm" fill="#2d6a4f">(20 > 16, move LEFT)</text>

  <!-- Row 2 -->
  <rect class="bx" x="20" y="60" width="30" height="20" rx="2" />
  <rect class="hi" x="50" y="60" width="30" height="20" rx="2" />
  <rect class="bx" x="80" y="60" width="30" height="20" rx="2" />
  <text x="35" y="74" class="lb" text-anchor="middle">3</text>
  <text x="65" y="74" class="lb" text-anchor="middle">16</text>
  <text x="95" y="74" class="lb" text-anchor="middle">22</text>
  
  <text x="130" y="74" class="sm" fill="#2d6a4f">Found it!</text>

  <path class="a" d="M 95 40 L 95 45" marker-end="url(#arrow)" />
  <path class="a" d="M 80 50 L 70 50" marker-end="url(#arrow)" />
  <path class="a" d="M 65 60 L 65 65" marker-end="url(#arrow)" />

</svg>
:::

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

### The failure

- **Starting at the top-left.** From `(0, 0)` both moves (right and down) *increase* the value, so a comparison never tells you which way to go. Only the top-right and bottom-left corners have one smaller and one larger neighbour

:::interview
"Why is staircase search O(R + C) and not O(R · C)?" — Every comparison removes a whole row (when the corner value is too small) or a whole column (when it is too large). There are only R rows and C columns to remove, so at most R + C steps happen before the pointer leaves the matrix.
:::
