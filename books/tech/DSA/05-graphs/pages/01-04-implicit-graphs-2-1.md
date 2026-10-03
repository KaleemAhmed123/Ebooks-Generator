### The Grid Neighborhood Template

Instead of writing 4 massive `if` statements, use a `directions` array.

```ts
const directions = [
  [-1, 0], // Up
  [1, 0],  // Down
  [0, -1], // Left
  [0, 1]   // Right
];

// Inside your traversal loop, processing cell (r, c)
for (const [dr, dc] of directions) {
  const nextR = r + dr;
  const nextC = c + dc;
  
  // Boundary check
  if (nextR >= 0 && nextR < ROWS && nextC >= 0 && nextC < COLS) {
    // Check if cell is traversable/unvisited
    if (grid[nextR][nextC] !== 'BLOCKED' && !visited.has(`{nextR},{nextC}`)) {
      visited.add(`{nextR},{nextC}`);
      queue.push([nextR, nextC]);
    }
  }
}
```
