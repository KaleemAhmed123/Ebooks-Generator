## Restart When You Go Broke <span class="lv lv1"></span>

- **What:** drive a circular route once. When the running tank goes negative at station `i`, restart at `i + 1` with an empty tank. If the total gain covers the total cost, the last restart is the answer
- **Spot it:** a circle where each stop adds fuel and each leg costs some; find the one start that completes the lap. A line where you choose refuelling stops → 15-06
- **Why:** if start `s` runs dry leaving `i`, every later start in `(s, i]` reaches `i` with less fuel, so all of `[s, i]` fail at once. A total ≥ 0 means some start works

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

- **Watch out:** skipping the total check. Gas `[2, 3, 4]`, cost `[3, 4, 3]` returns start 2, but the total is −1 and no start completes the lap
### Where it appears

| Problem | What triggers the restart |
|---|---|
| [Gas Station](https://leetcode.com/problems/gas-station/) (LeetCode 134) | running tank < 0 |
| [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) (LeetCode 53) | Kadane: prefix sum < 0 (→ 03-06) |

:::interview
"Why does the total check guarantee the last restart works?"

If `total ≥ 0`, enough fuel exists for one full lap. Every restart discards a range whose net fuel is negative. The last restart's range absorbs all those losses — the remaining portion from `start` to the end plus the wrap-around through the failed ranges nets to `total ≥ 0`. If no restart point worked, `total` would be negative.
:::
