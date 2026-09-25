## Difference Array <span class="lv lv1"></span>

- **What it is:** The inverse of a prefix sum. To add x to every element in `[L, R]`, write only two numbers: `d[L] += x` and `d[R + 1] −= x`. After all updates, one running sum over `d` rebuilds the final array
- **Signal:** "add x to every element from L to R", many range updates followed by reading the result once, "bookings", "passengers picked up and dropped off", "how many intervals cover each point"
- **Why it works:** A running sum carries a change forward until something cancels it. `+x` at L switches the update on; `−x` just after R switches it off. So q range updates cost O(q), and reading the whole array costs one O(n) pass

:::mint
<svg viewBox="0 0 470 138" role="img" aria-label="Adding 10 to indices 1 through 3 in an array of length 5. The difference array gets plus 10 at index 1 and minus 10 at index 4. The running sum of the difference array is 0, 10, 10, 10, 0: a plateau exactly over the range." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .on { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
    .off { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.3; }
    .pl { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
  </style>
  <text x="10" y="26" class="sm">d</text>
  <rect class="bx" x="40" y="12" width="44" height="22"/><rect class="on" x="84" y="12" width="44" height="22"/><rect class="bx" x="128" y="12" width="44" height="22"/><rect class="bx" x="172" y="12" width="44" height="22"/><rect class="off" x="216" y="12" width="44" height="22"/><rect class="bx" x="260" y="12" width="44" height="22"/>
  <text x="62" y="27" class="lb" text-anchor="middle">0</text><text x="106" y="27" class="lb" text-anchor="middle">+10</text><text x="150" y="27" class="lb" text-anchor="middle">0</text><text x="194" y="27" class="lb" text-anchor="middle">0</text><text x="238" y="27" class="lb" text-anchor="middle">−10</text><text x="282" y="27" class="lb" text-anchor="middle">·</text>
  <text x="62" y="46" class="sm" text-anchor="middle">0</text><text x="106" y="46" class="sm" text-anchor="middle">1 = L</text><text x="150" y="46" class="sm" text-anchor="middle">2</text><text x="194" y="46" class="sm" text-anchor="middle">3 = R</text><text x="238" y="46" class="sm" text-anchor="middle">R + 1</text><text x="282" y="46" class="sm" text-anchor="middle">spare</text>
  <text x="10" y="84" class="sm">run</text>
  <line x1="40" y1="110" x2="304" y2="110" stroke="#6b6b6b" stroke-width="0.8"/>
  <rect class="pl" x="84" y="72" width="132" height="38"/>
  <text x="62" y="104" class="lb" text-anchor="middle">0</text><text x="106" y="92" class="lb" text-anchor="middle">10</text><text x="150" y="92" class="lb" text-anchor="middle">10</text><text x="194" y="92" class="lb" text-anchor="middle">10</text><text x="238" y="104" class="lb" text-anchor="middle">0</text>
  <text x="40" y="128" class="sm">the running sum turns two writes into a plateau over [L, R]</text>
  <text x="330" y="26" class="lb">update: O(1)</text>
  <text x="330" y="42" class="sm">two writes, any range width</text>
  <text x="330" y="84" class="lb">read all: O(n)</text>
  <text x="330" y="100" class="sm">one running sum at the end</text>
</svg>
:::

```ts
// Corporate Flight Bookings (LeetCode 1109)
// bookings[i] = [first, last, seats]
function corpFlightBookings(bookings: number[][], n: number) {
  const d = new Array(n + 1).fill(0);        // flights are 1..n
  for (const [first, last, seats] of bookings) {
    d[first - 1] += seats;                   // switch on
    // switch off after `last`
    d[last] -= seats;
  }
  const out = new Array(n);
  for (let i = 0, run = 0; i < n; i++) out[i] = run += d[i];
  return out;
}
```
