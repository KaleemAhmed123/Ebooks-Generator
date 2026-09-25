### The Template

```ts
function maxActivities(start: number[], end: number[]): number {
  // Combine and sort by END time
  const activities = start.map((s, i) => ({ s, e: end[i] }));
  activities.sort((a, b) => a.e - b.e);
  
  let count = 0;
  let lastEndTime = -1;
  
  for (const act of activities) {
    if (act.s >= lastEndTime) { // valid choice
      count++;
      lastEndTime = act.e;
    }
  }
  return count;
}
```

### The trap

- **Sorting by the wrong metric.** In activity selection, beginners often sort by *start* time or by *duration*. Sorting by start time fails if the first activity lasts all day, blocking everything else. Sorting by duration fails if a short activity overlaps two non-overlapping long ones. You must sort by what actually constrains the future: the end time
