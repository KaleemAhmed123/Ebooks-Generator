## Difference Array 🟢

- **What it is:** The inverse of a prefix sum. An array where the value at index i stores `arr[i] - arr[i-1]`
- **When to reach for it:** You need to apply many updates of the form "Add X to all elements from L to R", and you only need to read the final array values *after* all updates are done
- **Why it works:** To add X to `[L, R]`, you only add X to `diff[L]`, and subtract X from `diff[R+1]`. This takes O(1) time. When all updates are done, you calculate the prefix sum of the difference array to recover the final values

### The visual mechanism

- We want to add 10 to range `[1, 3]` in an array of 5 zeroes.
- Updates: `diff[1] += 10`, `diff[4] -= 10`.

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Difference array processing. Adding 10 at the left boundary and subtracting 10 just after the right boundary. Running a prefix sum perfectly reconstructs the range addition." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>

  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="20" y="20" class="lb">1. Difference Array Updates</text>
  <rect class="bx" x="20" y="30" width="30" height="20" rx="2" />
  <rect class="hi" x="60" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="100" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="140" y="30" width="30" height="20" rx="2" />
  <rect class="hi" x="180" y="30" width="30" height="20" rx="2" />
  
  <text x="35" y="44" class="lb" text-anchor="middle">0</text>
  <text x="75" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">+10</text>
  <text x="115" y="44" class="lb" text-anchor="middle">0</text>
  <text x="155" y="44" class="lb" text-anchor="middle">0</text>
  <text x="195" y="44" class="lb" text-anchor="middle" fill="#2d6a4f">-10</text>
  
  <text x="75" y="65" class="sm" text-anchor="middle">L=1</text>
  <text x="195" y="65" class="sm" text-anchor="middle">R+1=4</text>

  <text x="20" y="90" class="lb">2. Recover via Prefix Sum</text>
  <rect class="bx" x="20" y="100" width="30" height="20" rx="2" />
  <rect class="bx" x="60" y="100" width="30" height="20" rx="2" />
  <rect class="bx" x="100" y="100" width="30" height="20" rx="2" />
  <rect class="bx" x="140" y="100" width="30" height="20" rx="2" />
  <rect class="bx" x="180" y="100" width="30" height="20" rx="2" />
  
  <text x="35" y="114" class="lb" text-anchor="middle">0</text>
  <text x="75" y="114" class="lb" text-anchor="middle">10</text>
  <text x="115" y="114" class="lb" text-anchor="middle">10</text>
  <text x="155" y="114" class="lb" text-anchor="middle">10</text>
  <text x="195" y="114" class="lb" text-anchor="middle">0</text>
  
  <!-- Flow arrows -->
  <path class="a" d="M 45 110 L 55 110" marker-end="url(#arrow)" />
  <path class="a" d="M 85 110 L 95 110" marker-end="url(#arrow)" />
  <path class="a" d="M 125 110 L 135 110" marker-end="url(#arrow)" />
  <path class="a" d="M 165 110 L 175 110" marker-end="url(#arrow)" />
</svg>
:::

### The Template

```ts
function applyUpdates(length: number, updates: [number, number, number][]): number[] {
  // We use length + 1 so that R + 1 is always in bounds
  const diff = new Array(length + 1).fill(0);
  
  for (const [L, R, val] of updates) {
    diff[L] += val;
    diff[R + 1] -= val;
  }
  
  const result = new Array(length);
  let currentSum = 0;
  
  for (let i = 0; i < length; i++) {
    currentSum += diff[i];
    result[i] = currentSum;
  }
  
  return result;
}
```

### Difference Array vs Sweep Line

- You might notice that adding a value at L and subtracting it at R+1 sounds exactly like **Sweep Line** (adding +1 for start, -1 for end).
- **They are the same underlying mathematics.**
- Use **Sweep Line** when the domain is massive (e.g. coordinates up to 10⁹) or continuous (floating point). You store the events in an array and sort them.
- Use **Difference Array** when the domain is small and dense (e.g. array indices 0 to 10⁵). You map the events directly to indices. It avoids the O(n log n) sort entirely, functioning as an O(n) bucket sort of the sweep line events.
