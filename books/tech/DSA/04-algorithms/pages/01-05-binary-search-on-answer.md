## Binary Search on Answer

- This is one of the most powerful and frequently tested patterns in top-tier interviews.
- **The Signal:** The problem asks for the "minimum maximum", the "maximum minimum", or the "smallest capacity" required to achieve something.
- **The Insight:** Instead of trying to construct the optimal answer, you guess an answer, and check if it is feasible. If it is feasible, try a smaller guess. If not, try a larger guess.

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Binary search on answer boolean space">
  <!-- Concept of mapping numbers to booleans -->
  <line x1="20" y1="50" x2="450" y2="50" stroke="#12121a" stroke-width="2" />
  
  <text x="20" y="40" class="s">Capacity = 1</text>
  <text x="400" y="40" class="s">Capacity = 100</text>
  
  <text x="30" y="80" class="l" fill="#ef476e">FALSE</text>
  <text x="130" y="80" class="l" fill="#ef476e">FALSE</text>
  <text x="230" y="80" class="l" fill="#1d4e89">TRUE</text>
  <text x="330" y="80" class="l" fill="#1d4e89">TRUE</text>
  <text x="430" y="80" class="l" fill="#1d4e89">TRUE</text>
  
  <!-- Boundary marker -->
  <path d="M220 100 L220 55" stroke="#1d4e89" stroke-width="3" stroke-dasharray="4" />
  <text x="170" y="120" class="s">Boundary: Smallest valid capacity</text>
</svg>
:::

- The search space is no longer an array of items. It is the range of *possible answers*.
- The array itself does **not** need to be sorted. Only the *feasibility function* must be monotonic. As capacity increases, feasibility must go from `F` to `T`.

### The Core Template

```ts
function minCapacity(arr: number[], limit: number): number {
  let left = 1; // Absolute minimum possible answer
  let right = 1000000000; // Absolute maximum possible answer
  let best = right;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    // isValid takes O(N) time to simulate the process with capacity `mid`
    if (isValid(arr, limit, mid)) {
      best = mid;      // Feasible, but can we do it with less?
      right = mid - 1; // Squeeze left
    } else {
      left = mid + 1;  // Not feasible, we need more capacity
    }
  }
  return best;
}
```

### The trap

- **Overthinking the bounds:** Candidates waste 10 minutes trying to perfectly calculate the exact `right` bound. 
- **The fix:** It's binary search. The difference between 10⁹ and 10¹⁴ is just 15 extra iterations. If you aren't sure, set `right` to an outrageously large number (like `Number.MAX_SAFE_INTEGER`). Let the O(log N) math do the heavy lifting.
