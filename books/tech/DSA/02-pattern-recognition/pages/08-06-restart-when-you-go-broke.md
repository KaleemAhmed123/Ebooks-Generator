## Restart When You Go Broke <span class="lv lv2"></span>

- **What it is:** For a circular route with gains and costs, drive once. Whenever the running tank goes negative at station `i`, no start at or before `i` can work, so restart at `i + 1` with an empty tank. If the total gain covers the total cost, the last restart point is the answer
- **Signal:** "gas station", "circular tour that visits all petrol pumps", "find the starting index", "each step adds `gas[i] − cost[i]`"
- **Why it works:** Say a start `s` first runs dry on the way out of station `i`. Any later start `s' ∈ (s, i]` would reach `i` with *less* fuel, because it skips the stretch `[s, s')`, whose running sum was never negative. So all of `[s, i]` fail at once. Separately, if the total is ≥ 0, some start must succeed, and it can only be a restart point

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Gas minus cost per station: minus 2, minus 2, minus 2, 3, 3. The running tank from station 0 drops below zero at once, restart at 1, drops again, restart at 2, drops again, restart at 3. From 3 the tank goes 3, 6. The total is 0, not negative, so station 3 is the answer." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .no { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
    .ok { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="14" y="28" class="sm">gas − cost</text>
  <rect class="no" x="80" y="14" width="40" height="22"/><text x="100" y="29" class="lb" text-anchor="middle">−2</text>
  <rect class="no" x="120" y="14" width="40" height="22"/><text x="140" y="29" class="lb" text-anchor="middle">−2</text>
  <rect class="no" x="160" y="14" width="40" height="22"/><text x="180" y="29" class="lb" text-anchor="middle">−2</text>
  <rect class="ok" x="200" y="14" width="40" height="22"/><text x="220" y="29" class="lb" text-anchor="middle">3</text>
  <rect class="ok" x="240" y="14" width="40" height="22"/><text x="260" y="29" class="lb" text-anchor="middle">3</text>
  <text x="14" y="54" class="sm">tank</text>
  <text x="100" y="54" class="lb" text-anchor="middle">−2↺</text><text x="140" y="54" class="lb" text-anchor="middle">−2↺</text><text x="180" y="54" class="lb" text-anchor="middle">−2↺</text><text x="220" y="54" class="lb" text-anchor="middle">3</text><text x="260" y="54" class="lb" text-anchor="middle">6</text>
  <text x="14" y="76" class="sm">start</text>
  <text x="100" y="76" class="lb" text-anchor="middle">0</text><text x="140" y="76" class="lb" text-anchor="middle">1</text><text x="180" y="76" class="lb" text-anchor="middle">2</text><text x="220" y="76" class="lb" text-anchor="middle" fill="#2d6a4f">3</text>
  <text x="14" y="100" class="lb">total = −2 −2 −2 +3 +3 = 0 ≥ 0 → answer = last restart = 3</text>
  <text x="300" y="30" class="sm">↺ tank &lt; 0: every start up to</text>
  <text x="300" y="42" class="sm">here fails, restart after it</text>
</svg>
:::

```ts
// Gas Station (LeetCode 134)
function canCompleteCircuit(gas: number[], cost: number[]): number {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const d = gas[i] - cost[i];
    total += d;
    tank += d;
    if (tank < 0) {          // [start, i] all fail
      start = i + 1;
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
}
```

### Variations

- **Circular tour (GFG):** the same problem with `petrol` and `distance`; return the first pump index or −1
- **Minimum Number of Refueling Stops (LeetCode 871):** the route is a line and you choose where to stop. Restarting does not apply; take fuel "retroactively" from a max-heap of passed stations (page 15-06)
- **The same reset in another form:** Kadane's algorithm (page 03-06) drops a prefix whose sum is negative for exactly this reason: a prefix that only hurts cannot be part of the best continuation

### The failure

- **Trying every start.** Simulating a full lap from each station is O(n²): 10¹⁰ steps at n = 10⁵, LeetCode 134's limit
- **Skipping the total check.** The single pass never wraps around. Without `total ≥ 0`, gas `[2, 3, 4]` and cost `[3, 4, 3]` return start 2, but the total is −1 and no start completes the lap

:::interview
"Why don't you need to go around the circle twice?" — Two facts. If the total gas covers the total cost, a valid start exists. And if a start fails at station `i`, every start between it and `i` fails too, so the only surviving candidate is the station after the last failure. One pass computes both: O(n) time, O(1) space.
:::
