### Implementation Concept

```ts
function multiSourceBFS(grid: string[][]): number {
  const queue: [number, number][] = [];
  const visited = new Set<string>();
  
  // 1. Enqueue all sources first
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 'ZOMBIE') {
        queue.push([r, c]);
        visited.add(`{r},{c}`);
      }
    }
  }

  // 2. Run standard layer-by-layer BFS
  let time = 0;
  let head = 0;
  while (head < queue.length) {
    const size = queue.length - head;
    // ... normal BFS expansion logic ...
    time++;
  }
  
  // time - 1 because the last iteration processes the final humans
  // but doesn't actually infect anything new
  return time - 1; 
}
```
