## Binary Search on Answer <span class="lv lv1"></span>

- **What it is:** Guessing the answer, using a checker function to see if the guess is feasible, and using Binary Search to find the optimal guess
- **When to reach for it:** The problem asks to "Minimise the maximum X" or "Maximise the minimum X". (e.g. Koko Eating Bananas, Allocate Pages, Minimum Capacity to Ship Packages)
- **Why it works:** Calculating the exact minimum capacity of a ship to transport packages within D days has no simple formula. But if I ask you, "Can a ship with capacity C transport them in D days?", you can simulate it easily with a simple O(N) loop. Since the answer domain is monotonic (if capacity 10 works, capacity 11 definitely works), we can binary search the capacity C

### The visual mechanism

- Problem: Koko can eat K bananas per hour. Find the minimum K to eat all piles within H hours.
- Possible values for K: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
- Feasibility `canEat(K)`: `[F, F, F, F, T, T, T, T, T, T]`
- Our goal is to find the *first* `True`. This is exactly the `lowerBound` algorithm we learned in Chapter 7.

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
