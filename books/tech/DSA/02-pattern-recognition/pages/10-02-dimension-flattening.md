# Dimension Flattening

## The Mental Model
Treating a 2D matrix like a 1D array to apply binary search or simple loops. Instead of nested `i` and `j` loops, you iterate from `0` to `m*n - 1` and calculate coordinates on the fly.

### The Formula
For a grid of `N` rows and `M` columns:
- `row = index / M`
- `col = index % M`

## Recognizing the Pattern
- "Search in a 2D matrix"
- "Matrix is sorted row-wise"
- "Given a grid, traverse it linearly"

## Why it works
It removes the mental overhead of boundary checks across dimensions. A 2D grid in memory is fundamentally 1D anyway.

## Canonical Problem: Search a 2D Matrix
**Problem:** Write an efficient algorithm that searches for a value in an `m x n` matrix. This matrix has the following properties:
1. Integers in each row are sorted from left to right.
2. The first integer of each row is greater than the last integer of the previous row.

**Implementation (TypeScript):**
```typescript
function searchMatrix(matrix: number[][], target: number): boolean {
    if (matrix.length === 0) return false;
    const m = matrix.length;
    const n = matrix[0].length;
    
    let left = 0;
    let right = m * n - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;
        
        if (matrix[row][col] === target) return true;
        if (matrix[row][col] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return false;
}
```

## Common Traps
- Using `N` instead of `M` for the modulo operator. Always divide/mod by the number of **columns**.
