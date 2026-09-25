## Sweep Line <span class="lv lv1"></span>

- **What it is:** Processing spatial or temporal events in chronological order
- **When to reach for it:** "Merge overlapping intervals", "Maximum CPU load at any time", "Skyline problem", "Find intersections of rectangles"
- **Why it works:** Instead of comparing every interval against every other interval (O(n²)), you sort the start and end points as independent "events". As you sweep through time from left to right, you maintain an active state

### The visual mechanism

- Given intervals `[1, 5]`, `[2, 4]`, `[6, 8]`. We decompose them into events:
- Time 1: `+1` (start)
- Time 2: `+1` (start)
- Time 4: `-1` (end)
- Time 5: `-1` (end)
- Time 6: `+1` (start)
- Time 8: `-1` (end)

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Sweep line processing events chronologically. The running sum tracks the exact number of overlapping intervals at any given moment." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .hot { stroke: #ef476e; stroke-width: 1.1; fill: none; stroke-dasharray: 2 2;}
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <path class="a" d="M 40 40 L 420 40" />
  
  <text x="80" y="30" class="lb">+1</text>
  <text x="140" y="30" class="lb">+1</text>
  <text x="260" y="30" class="lb">-1</text>
  <text x="320" y="30" class="lb">-1</text>
  
  <text x="80" y="55" class="sm">T=1</text>
  <text x="140" y="55" class="sm">T=2</text>
  <text x="260" y="55" class="sm">T=4</text>
  <text x="320" y="55" class="sm">T=5</text>
  
  <path class="hot" d="M 40 80 L 420 80" />
  <text x="40" y="75" class="sm" fill="#ef476e">Active count (overlap)</text>

  <text x="80" y="95" class="lb">1</text>
  <text x="140" y="95" class="lb">2 (Max)</text>
  <text x="260" y="95" class="lb">1</text>
  <text x="320" y="95" class="lb">0</text>
  
  <!-- Sweeping line -->
  <path class="a" d="M 140 10 L 140 120" marker-end="url(#arrow)" stroke-dasharray="2 2" />
</svg>
:::

### The Template

```ts
function maxOverlap(intervals: number[][]): number {
  const events: { time: number, type: number }[] = [];
  
  for (const [start, end] of intervals) {
    events.push({ time: start, type: 1 }); // 1 for start
    events.push({ time: end, type: -1 });  // -1 for end
  }
  
  // Sort by time. If times tie, process END (-1) before START (1)
  events.sort((a, b) => {
    if (a.time !== b.time) return a.time - b.time;
    return a.type - b.type;
  });
  
  let active = 0;
  let maxActive = 0;
  
  for (const event of events) {
    active += event.type;
    maxActive = Math.max(maxActive, active);
  }
  
  return maxActive;
}
```

### The trap

- **Handling ties incorrectly.** If one interval ends at time T and another starts at time T, do they overlap? The problem description will tell you. If they do *not* overlap, you must process the END event before the START event when sorting ties (as done in the template). If you process START first, the active count will artificially inflate
