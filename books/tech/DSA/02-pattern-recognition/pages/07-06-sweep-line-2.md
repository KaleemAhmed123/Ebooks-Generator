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
