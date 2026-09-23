## Multi-Source BFS

- **The Problem:** You have a grid with multiple zombies and multiple humans. You want to find the time it takes for all humans to be infected, assuming zombies infect adjacent cells every minute.
- **Naive approach:** Run a standard BFS starting from Zombie 1. Then run a completely new BFS from Zombie 2. Take the minimum distance at each human. If there are Z zombies and N cells, this takes O(Z times N) time, which will TLE.
- **Optimal approach:** Multi-Source BFS.

### The Insight

Instead of starting the BFS with a single node in the queue, you push **all** source nodes into the queue at distance 0 *before* the `while` loop starts.

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Multi-source BFS spreading simultaneously">
  <circle cx="80" cy="70" r="10" fill="#ef476e" />
  <circle cx="80" cy="70" r="30" fill="none" stroke="#ef476e" stroke-width="2" stroke-dasharray="4" />
  <text x="75" y="65" class="s" fill="#ffffff">Z</text>
  
  <circle cx="390" cy="70" r="10" fill="#ef476e" />
  <circle cx="390" cy="70" r="30" fill="none" stroke="#ef476e" stroke-width="2" stroke-dasharray="4" />
  <text x="385" y="65" class="s" fill="#ffffff">Z</text>
  
  <circle cx="235" cy="70" r="10" fill="#1d4e89" />
  <text x="230" y="65" class="s" fill="#ffffff">H</text>
  
  <path d="M120 70 L210 70" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M350 70 L260 70" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  
  <text x="140" y="55" class="s">Expands</text>
  <text x="290" y="55" class="s">Expands</text>
</svg>
:::

Because the queue processes layer by layer, all zombies will infect distance `1` simultaneously, then distance `2` simultaneously. The first time a human is reached, it is guaranteed to be reached by the *closest* zombie.

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

### The trap

- **Matrix 01 (Distance to nearest zero):** Multi-source BFS is perfectly built for this. Instead of starting from the 1s and looking for 0s (which requires launching a BFS from every 1), you enqueue all the `0`s as your sources, and let them simultaneously ripple outwards to "claim" the nearest `1`s.
