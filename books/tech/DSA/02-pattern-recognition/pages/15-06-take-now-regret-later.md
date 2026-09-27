## Take Now, Regret Later <span class="lv lv2"></span>

- **What:** a greedy that may change its mind. Accept every option you pass and push it on a heap; when a constraint breaks, undo the *worst* accepted choice, the heap's top
- **Spot it:** "fewest refuelling stops", "most courses before their deadlines", "furthest building with bricks and ladders". Jobs with fixed start and end times → 17-03
- **Why:** the right choice is known only later, but it can be made *retroactively*: when you run dry, you wanted the best station already passed, and the heap holds exactly those

:::mint
<svg viewBox="0 0 470 112" role="img" aria-label="Minimum refuelling stops with target 100, start fuel 10, stations at 10 with 60 fuel, 20 with 30, 30 with 30, 60 with 40. Drive to 10, remember 60. Cannot reach 20 without fuel beyond 10, so refuel retroactively with the best passed, 60: reach 70. Pass 20, 30 and 60, remembering 30, 30, 40. Short of 100: take 40, reach 110. Two stops." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .st { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .ax { stroke: #1a1a1a; stroke-width: 1.2; }
  </style>
  <line class="ax" x1="20" y1="40" x2="420" y2="40"/>
  <circle cx="20" cy="40" r="4" fill="#1a1a1a"/><text x="14" y="30" class="sm">0</text>
  <rect class="st" x="54" y="32" width="12" height="16"/><text x="60" y="62" class="sm" text-anchor="middle">10:+60</text>
  <rect class="st" x="94" y="32" width="12" height="16"/><text x="100" y="74" class="sm" text-anchor="middle">20:+30</text>
  <rect class="st" x="134" y="32" width="12" height="16"/><text x="140" y="62" class="sm" text-anchor="middle">30:+30</text>
  <rect class="st" x="254" y="32" width="12" height="16"/><text x="260" y="62" class="sm" text-anchor="middle">60:+40</text>
  <circle cx="420" cy="40" r="4" fill="#2d6a4f"/><text x="408" y="30" class="sm">100</text>
  <text x="20" y="92" class="lb">reach 10 → stuck before 20 → pop 60 → reach 70</text>
  <text x="20" y="106" class="lb">pass 20, 30, 60 → short of 100 → pop 40 → reach 110 ✓  stops: 2</text>
</svg>
:::

```ts
// Minimum Number of Refueling Stops (LeetCode 871); Heap: 15-11
function minRefuelStops(
  target: number, fuel: number, stations: number[][],
): number {
  // max-heap of fuel
  const passed = new Heap<number>((a, b) => a > b);
  let reach = fuel, stops = 0, i = 0;
  while (reach < target) {
    while (i < stations.length && stations[i][0] <= reach)
      passed.push(stations[i++][1]);           // take now (maybe)
    if (!passed.size()) return -1;            // nothing to regret
    reach += passed.pop()!;                  // regret: stop there
    stops++;
  }
  return stops;
}
```

- **Watch out:** committing early. "Refuel at the first station" or "whenever fuel is low" cannot know a bigger station is coming; only the heap at the moment you are stuck does
### Where it appears

| Problem | What you take now and might regret |
|---|---|
| [Minimum Number of Refueling Stops](https://leetcode.com/problems/minimum-number-of-refueling-stops/) (LeetCode 871) | fuel from passed stations — take the biggest when stuck |
| [Course Schedule III](https://leetcode.com/problems/course-schedule-iii/) (LeetCode 630) | the longest course taken — drop it if a shorter one fits |
| [Furthest Building You Can Reach](https://leetcode.com/problems/furthest-building-you-can-reach/) (LeetCode 1642) | a ladder per climb — trade the smallest for bricks |
| [Maximum Performance of a Team](https://leetcode.com/problems/maximum-performance-of-a-team/) (LeetCode 1383) | the weakest member — drop when team grows past k |

:::interview
"Why is this greedy and not DP? You are making retroactive choices."

The heap makes the optimal swap provably — replacing the worst past choice with the current one never makes the answer worse. There is no branching: at each step, either the current item fits and you take it, or you swap the worst. No overlapping subproblems, no state space to explore. The heap just lets you "undo" the single worst decision efficiently.
:::
