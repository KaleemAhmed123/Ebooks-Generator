## Implicit Graphs

- An **Implicit Graph** is a graph that is too large or too infinite to store in memory.
- Instead of building an `adjList`, you calculate a node's neighbors *on the fly*.

### The 2D Grid

- The most common implicit graph in interviews is the 2D Grid (e.g., a maze, a map of islands).
- You do not need to build an adjacency list for a grid. Every cell `(r, c)` is a node. Its neighbors are mathematically defined as `(r+1, c)`, `(r-1, c)`, `(r, c+1)`, and `(r, c-1)`.

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Implicit graph on a 2D grid">
  <!-- Grid -->
  <rect x="150" y="20" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  <rect x="180" y="20" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  <rect x="210" y="20" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  
  <rect x="150" y="50" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  <rect x="180" y="50" width="30" height="30" fill="#1d4e89" stroke="#12121a" stroke-width="2" />
  <rect x="210" y="50" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  
  <rect x="150" y="80" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  <rect x="180" y="80" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  <rect x="210" y="80" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  
  <text x="190" y="70" class="s" fill="#ffffff">u</text>
  
  <!-- Arrows -->
  <path d="M195 50 L195 35" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M195 80 L195 95" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M180 65 L165 65" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M210 65 L225 65" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
</svg>
:::

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

### The trap

- **Stringified Sets:** In JavaScript/TypeScript, you cannot use a tuple or array `[r, c]` as a key in a `Set` or `Map`, because `[1, 2] !== [1, 2]` by reference.
- **The fix:** Always serialize the coordinates into a string like `"{r},{c}"`. (Or, if constraints permit, use a 2D boolean array `visited[r][c]` which is far faster than a Hash Set).
