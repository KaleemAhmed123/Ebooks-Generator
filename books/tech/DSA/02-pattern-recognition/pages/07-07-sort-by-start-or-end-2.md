### Which sort?

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Interval decision tree. The root asks what is asked. If the union or cover is asked, sort by start and merge: Merge Intervals 56 and Insert Interval 57. If the most intervals to keep, or the fewest points that stab them all, is asked, sort by end: Non-overlapping Intervals 435 and Minimum Number of Arrows 452. If how many are open at once is asked, sweep the events: page 07-06 and LeetCode 2406." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .ok { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>
  <defs><marker id="m0707" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <rect class="bx" x="8" y="38" width="92" height="28" rx="3"/><text x="54" y="56" class="lb" text-anchor="middle">what is asked?</text>
  <path class="a" d="M 102 46 L 128 20" marker-end="url(#m0707)"/>
  <path class="a" d="M 102 52 L 128 52" marker-end="url(#m0707)"/>
  <path class="a" d="M 102 58 L 128 84" marker-end="url(#m0707)"/>
  <text x="134" y="18" class="sm">the union, the cover</text>
  <text x="134" y="50" class="sm">most to keep, fewest stabbing points</text>
  <text x="134" y="82" class="sm">how many open at once</text>
  <rect class="ok" x="286" y="6" width="84" height="20" rx="3"/><text x="328" y="20" class="lb" text-anchor="middle">sort by start</text>
  <rect class="ok" x="286" y="38" width="84" height="20" rx="3"/><text x="328" y="52" class="lb" text-anchor="middle">sort by end</text>
  <rect class="ok" x="286" y="70" width="84" height="20" rx="3"/><text x="328" y="84" class="lb" text-anchor="middle">sweep events</text>
  <text x="378" y="20" class="lb">56 · 57</text>
  <text x="378" y="52" class="lb">435 · 452</text>
  <text x="378" y="84" class="lb">07-06 · 2406</text>
  <text x="134" y="100" class="sm">numbers are LeetCode problems</text>
</svg>
:::

### Variations

- **Insert Interval (LeetCode 57):** input is already sorted, so no sort: copy intervals ending before `new.start`, absorb every interval with `start ≤ new.end` into `new`, copy the rest. O(n)
- **Non-overlapping Intervals (LeetCode 435):** removals = `n − (maximum kept)`, and maximum kept is activity selection: sort by end, keep an interval when `start ≥ lastEnd`
- **Minimum Number of Arrows to Burst Balloons (LeetCode 452):** sort by end; shoot at the first end, skip every balloon whose start ≤ that point, shoot again at the next unburst end. Touching balloons share an arrow, so the test is `start > arrow`
- **Interval List Intersections (LeetCode 986):** both lists are sorted; two pointers. The overlap is `[max(starts), min(ends)]`; advance the pointer whose interval ends first

### The failure

- **Sorting by start for "remove the fewest".** Greedily keeping the earliest-starting interval can keep one long interval that blocks many short ones: `[1, 100], [2, 3], [4, 5]` keeps 1 interval by start and 2 by end
- **Comparing with the previous input interval instead of the merged one.** `[1, 10], [2, 3], [4, 8]` must merge into one; checking `[4, 8]` against `[2, 3]` (start 4 > end 3) splits it wrongly. Always compare with `out`'s last interval, whose end is a running maximum

:::interview
"How do you choose between sorting by start and sorting by end?" — If I am building the union, I sort by start, because then an interval can only touch the group that is still open. If I am choosing which intervals to keep, I sort by end, because the one that frees the timeline earliest can replace any other choice in an optimal answer without making it worse.
:::
