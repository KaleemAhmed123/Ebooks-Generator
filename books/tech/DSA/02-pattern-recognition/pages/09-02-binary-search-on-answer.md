## Binary Search on Answer <span class="lv lv1"></span>

- **What it is:** Guessing the answer, using a checker function to see if the guess is feasible, and using Binary Search to find the optimal guess
- **Signal:** The problem asks to "Minimise the maximum X" or "Maximise the minimum X". (e.g. Koko Eating Bananas, Allocate Pages, Minimum Capacity to Ship Packages)
- **Why it works:** Calculating the exact minimum capacity of a ship to transport packages within D days has no simple formula. But if I ask you, "Can a ship with capacity C transport them in D days?", you can simulate it easily with a simple O(N) loop. Since the answer domain is monotonic (if capacity 10 works, capacity 11 definitely works), we can binary search the capacity C

### The visual mechanism

- Problem: Koko can eat K bananas per hour. Find the minimum K to eat all piles within H hours.
- Possible values for K: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
- Feasibility `canEat(K)`: `[F, F, F, F, T, T, T, T, T, T]`
- Our goal is to find the *first* `True`. This is exactly lower bound (Module 04, 01-04).

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Binary Search on Answer. The domain of possible answers maps to a boolean array of False followed by True. Binary search finds the boundary." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .rej { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <text x="20" y="20" class="lb">Answer Domain (K)</text>
  <text x="75" y="20" class="sm">1</text><text x="105" y="20" class="sm">2</text>
  <text x="135" y="20" class="sm">3</text><text x="165" y="20" class="sm">4</text>
  <text x="195" y="20" class="sm">5</text><text x="225" y="20" class="sm">6</text>
  <text x="255" y="20" class="sm">7</text><text x="285" y="20" class="sm">8</text>

  <text x="20" y="45" class="lb">canEat(K)?</text>
  <rect class="rej" x="65" y="30" width="20" height="20" rx="2" />
  <rect class="rej" x="95" y="30" width="20" height="20" rx="2" />
  <rect class="rej" x="125" y="30" width="20" height="20" rx="2" />
  <rect class="rej" x="155" y="30" width="20" height="20" rx="2" />
  
  <rect class="hi" x="185" y="30" width="20" height="20" rx="2" />
  <rect class="hi" x="215" y="30" width="20" height="20" rx="2" />
  <rect class="hi" x="245" y="30" width="20" height="20" rx="2" />
  <rect class="hi" x="275" y="30" width="20" height="20" rx="2" />

  <text x="75" y="44" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="105" y="44" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="135" y="44" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="165" y="44" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  
  <text x="195" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="225" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="255" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="285" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>

  <path class="a" d="M 195 65 L 195 55" marker-end="url(#arrow)" />
  <text x="195" y="80" class="lb" text-anchor="middle">Optimal Answer (Minimum Valid K)</text>
</svg>
:::

### The checker is the problem

- The search loop is always the same (Module 04, 01-05). The work is the `feasible(guess)` check, usually one greedy pass

```ts
// Capacity To Ship Packages Within D Days (LeetCode 1011)
function shipWithinDays(weights: number[], days: number): number {
  const fits = (cap: number) => {   // greedy: fill each day
    let used = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) { used++; load = 0; }
      load += w;
    }
    return used <= days;
  };
  let lo = Math.max(...weights);
  let hi = weights.reduce((a, b) => a + b);
  while (lo < hi) {                 // first capacity that fits
    const mid = (lo + hi) >> 1;
    if (fits(mid)) hi = mid; else lo = mid + 1;
  }
  return lo;
}
```

### Variations

- **Koko Eating Bananas (LeetCode 875):** guess the speed; hours = Σ ⌈pile / speed⌉ (worked in Module 07, 01-04)
- **Split Array Largest Sum (LeetCode 410) / Allocate Minimum Pages (GFG):** the same checker as above, with "days" renamed to "parts"
- **Aggressive Cows (SPOJ AGGRCOW) / Magnetic Force Between Two Balls (LeetCode 1552):** *maximise the minimum*, so the pattern is `T…TF…F` and you want the **last** true
- **Minimize the Maximum Difference of Pairs (LeetCode 2616):** guess the difference; sort, then greedily pair neighbours within it

### The failure

- **Starting `lo` at 1 for shipping.** A capacity below the heaviest package can never fit it; the greedy check still puts the oversized package on a day of its own, so `[5, 1]` looks shippable in 3 days at capacity 3. Start at `max(weights)`, end at the total
- **A checker that is not monotonic.** If `feasible(x)` can be true, then false, then true again, the search returns an arbitrary boundary. Prove "x works ⇒ x + 1 works" before writing the loop

:::interview
"How do you spot binary search on the answer?" — The question asks for a minimum of a maximum (or the reverse), the answer lies in a known numeric range, and checking one candidate is easy even though computing the optimum directly is not. Then O(n log R): one linear check per halving of the range.
:::
