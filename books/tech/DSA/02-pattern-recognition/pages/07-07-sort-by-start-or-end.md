## Sort by Start to Merge, by End to Keep <span class="lv lv1"></span>

- **What it is:** Interval problems split into two families, and the family decides the sort key. **Merge / cover / union** questions sort by *start*. **Keep the most / remove the fewest / fewest points to stab** questions sort by *end*
- **Signal:** "merge overlapping intervals", "insert an interval", "minimum intervals to remove so the rest don't overlap", "minimum arrows to burst all balloons", "intersection of two interval lists"
- **Why it works:** Sorted by start, an interval can only overlap the group that is currently open, so one running `end` decides merge-or-close. Sorted by end, the interval that finishes first leaves the most room for everything after it, which is the exchange argument behind activity selection (Module 04, 03-04)

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Intervals 1 to 3, 2 to 6, 8 to 10, 15 to 18 sorted by start. The first two overlap because 2 is at most the current end 3, so they merge into 1 to 6. The next interval 8 to 10 starts after 6 and opens a new group. Result 1 to 6, 8 to 10, 15 to 18." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .iv { stroke: #1a1a1a; stroke-width: 3; }
    .mg { stroke: #2d6a4f; stroke-width: 5; }
    .ax { stroke: #9a9a9a; stroke-width: 1; }
  </style>
  <line class="ax" x1="20" y1="92" x2="300" y2="92"/>
  <text x="34" y="104" class="sm">1</text><text x="89" y="104" class="sm">5</text><text x="159" y="104" class="sm">10</text><text x="229" y="104" class="sm">15</text><text x="271" y="104" class="sm">18</text>
  <line class="iv" x1="36" y1="18" x2="64" y2="18"/><text x="70" y="21" class="sm">[1, 3]</text>
  <line class="iv" x1="50" y1="32" x2="106" y2="32"/><text x="112" y="35" class="sm">[2, 6] start 2 ≤ end 3 → merge</text>
  <line class="iv" x1="148" y1="46" x2="176" y2="46"/><text x="182" y="49" class="sm">[8, 10] start 8 &gt; end 6 → new group</text>
  <line class="iv" x1="232" y1="60" x2="274" y2="60"/><text x="232" y="73" class="sm">[15, 18]</text>
  <line class="mg" x1="36" y1="84" x2="106" y2="84"/><line class="mg" x1="148" y1="84" x2="176" y2="84"/><line class="mg" x1="232" y1="84" x2="274" y2="84"/>
  <text x="320" y="30" class="lb">merge / cover</text>
  <text x="320" y="44" class="sm">→ sort by start</text>
  <text x="320" y="70" class="lb">keep max / remove min</text>
  <text x="320" y="84" class="sm">→ sort by end</text>
</svg>
:::

```ts
// Merge Intervals (LeetCode 56)
function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const out: number[][] = [];
  for (const [s, e] of intervals) {
    const last = out[out.length - 1];
    // extend
    if (last && s <= last[1]) last[1] = Math.max(last[1], e);
    // close, open new
    else out.push([s, e]);
  }
  return out;
}
```

### Variations

- **Insert Interval (LeetCode 57):** input is already sorted, so no sort: copy intervals ending before `new.start`, absorb every interval with `start ≤ new.end` into `new`, copy the rest. O(n)
- **Non-overlapping Intervals (LeetCode 435):** removals = `n − (maximum kept)`, and maximum kept is activity selection: sort by end, keep an interval when `start ≥ lastEnd`
- **Minimum Number of Arrows to Burst Balloons (LeetCode 452):** sort by end; shoot at the first end, skip every balloon whose start ≤ that point, shoot again at the next unburst end. Touching balloons share an arrow, so the test is `start > arrow`
- **Interval List Intersections (LeetCode 986):** both lists are sorted; two pointers. The overlap is `[max(starts), min(ends)]`; advance the pointer whose interval ends first
- **Meeting Rooms II (LeetCode 253) / Minimum Platforms (GFG):** a *count of simultaneous* intervals, not a merge; use the sweep line on page 07-06

### The failure

- **Sorting by start for "remove the fewest".** Greedily keeping the earliest-starting interval can keep one long interval that blocks many short ones: `[1, 100], [2, 3], [4, 5]` keeps 1 interval by start and 2 by end
- **Comparing with the previous input interval instead of the merged one.** `[1, 10], [2, 3], [4, 8]` must merge into one; checking `[4, 8]` against `[2, 3]` (start 4 > end 3) splits it wrongly. Always compare with `out`'s last interval, whose end is a running maximum

:::interview
"How do you choose between sorting by start and sorting by end?" — If I am building the union, I sort by start, because then an interval can only touch the group that is still open. If I am choosing which intervals to keep, I sort by end, because the one that frees the timeline earliest can replace any other choice in an optimal answer without making it worse.
:::
