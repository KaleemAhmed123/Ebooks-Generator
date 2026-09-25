## Take Now, Regret Later <span class="lv lv2"></span> - continued

```ts
// Minimum Number of Refueling Stops (LeetCode 871); Heap: 15-04
function minRefuelStops(
  target: number, fuel: number, stations: number[][],
): number {
  // max-heap of fuel
  const passed = new Heap<number>((a, b) => a > b);
  let reach = fuel, stops = 0, i = 0;
  while (reach < target) {
    while (i < stations.length && stations[i][0] <= reach)
      // take now (maybe)
      passed.push(stations[i++][1]);
    // nothing to regret
    if (!passed.size()) return -1;
    // regret: stop there
    reach += passed.pop()!;
    stops++;
  }
  return stops;
}
```

### Variations

- **Course Schedule III (LeetCode 630):** sort courses by deadline; take each course, push its duration on a max-heap; if total time passes the deadline, drop the longest course taken so far
- **Furthest Building You Can Reach (LeetCode 1642):** use a ladder on every climb and push the climb onto a min-heap; when climbs exceed the ladders, pay the *smallest* one with bricks instead. Out of bricks → stop
- **Maximum Performance of a Team (LeetCode 1383):** sort engineers by efficiency descending; keep the k largest speeds in a min-heap, evicting the slowest when over k; the current efficiency is the team minimum
- **Job Sequencing (GFG) as regret:** sort by deadline, keep profits in a min-heap, drop the smallest whenever the heap is larger than the deadline (page 08-03)
- **Maximum Elegance of a K-Length Subsequence (LeetCode 2813) <span class="lv lv3"></span>:** take the k most profitable, then trade a duplicate-category item for a new category while that raises `profit + distinct²`
