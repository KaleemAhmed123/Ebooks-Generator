## Take the Latest Free Slot 🟡

- **What it is:** Unit-time jobs, each with a deadline and a profit. Take jobs from most to least profitable; put each one in the *latest* free time slot that still meets its deadline. If no such slot is free, skip it
- **Signal:** "job sequencing with deadlines", "each job takes one unit of time", "maximise total profit", "only one job at a time"
- **Why it works:** Profit order means a job is only ever skipped for more valuable ones. Placing a job as *late* as its deadline allows keeps the early slots open, and early slots are the only ones that jobs with tight deadlines can use. Exchange argument: any optimal schedule can be rearranged to use these slots without losing profit

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Jobs a with deadline 4 profit 20, b with deadline 1 profit 10, c with deadline 1 profit 40, d with deadline 1 profit 30. By profit: c goes to slot 1, a goes to the latest free slot 4, d and b need slot 1 which is taken, so they are skipped. Profit 60." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .s { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .t { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="18" class="sm">sorted by profit: c 40 (dl 1), d 30 (dl 1), a 20 (dl 4), b 10 (dl 1)</text>
  <text x="20" y="44" class="sm">slot</text>
  <rect class="t" x="60" y="30" width="46" height="24"/><text x="83" y="46" class="lb" text-anchor="middle">c</text>
  <rect class="s" x="106" y="30" width="46" height="24"/>
  <rect class="s" x="152" y="30" width="46" height="24"/>
  <rect class="t" x="198" y="30" width="46" height="24"/><text x="221" y="46" class="lb" text-anchor="middle">a</text>
  <text x="83" y="66" class="sm" text-anchor="middle">1</text><text x="129" y="66" class="sm" text-anchor="middle">2</text><text x="175" y="66" class="sm" text-anchor="middle">3</text><text x="221" y="66" class="sm" text-anchor="middle">4</text>
  <text x="20" y="86" class="lb">c → slot 1 · d → slot 1 taken, skip · a → slot 4 · b → skip</text>
  <text x="20" y="102" class="lb" fill="#2d6a4f">jobs 2, profit 60</text>
  <text x="270" y="44" class="sm">a placed at 4, not 2:</text>
  <text x="270" y="56" class="sm">slots 1–3 stay open for tighter jobs</text>
</svg>
:::

```ts
// Job Sequencing (GFG): count of jobs done and total profit
function jobSequencing(
  deadline: number[], profit: number[],
): number[] {
  const order = profit.map((_, i) => i)
    .sort((a, b) => profit[b] - profit[a]);
  const maxD = Math.max(...deadline);
  const used = new Array(maxD + 1).fill(false);     // slots 1..maxD
  let count = 0, total = 0;
  for (const i of order) {
    for (let t = Math.min(deadline[i], maxD); t >= 1; t--) {
      // latest free slot
      if (!used[t]) {
        used[t] = true; count++; total += profit[i];
        break;
      }
    }
  }
  return [count, total];
}
```

### Variations

- **Faster slot search:** the inner loop is O(maxD) per job. A union-find over slots, where `parent[t]` points to the latest free slot at or before `t`, makes each lookup nearly O(1)
- **Same problem, other engine:** sort jobs by deadline and push profits into a min-heap; whenever the heap holds more jobs than the current deadline, drop the cheapest. That is "take now, regret later" (page 15-06), and it gives the same total
- **Course Schedule III (LeetCode 630):** jobs have *lengths*, not unit time. The slot trick no longer applies; the regret heap does (page 15-06)
- **Maximum Profit in Job Scheduling (LeetCode 1235):** jobs are weighted *intervals*, not unit tasks with deadlines. Greedy fails; it is DP with binary search (Chapter 17)

### The failure

- **Earliest free slot.** Put a job in the first free slot and a loose job steals a slot a tight job needed. Jobs `x (deadline 2, profit 100)` and `y (deadline 1, profit 50)`: earliest-slot puts `x` in slot 1 and loses `y`; latest-slot puts `x` in slot 2 and keeps both, 150
- **Sorting by deadline alone.** Early deadlines first ignores profit: a worthless job with deadline 1 takes the only slot a valuable deadline-1 job needed

:::interview
"Why place each job as late as possible?" — The jobs are processed in profit order, so every job already placed is at least as valuable as the ones still to come. A job's deadline says it may use any slot up to `d`; using the latest one takes away the fewest options from the remaining jobs, whose deadlines might be earlier. An exchange argument turns any optimal schedule into this one without lowering profit.
:::
