## Binary Search Mechanics

- Binary Search drops time complexity from O(N) to O(log N) by halving the search space at every step.
- It absolutely requires the input to be **sorted**, or at least monotonic (e.g., `FFFFFTTTTT`).
- The fundamental mechanic: maintain a `left` and `right` boundary, guess the `mid` point, and if the guess is wrong, mathematically eliminate half of the remaining candidates.

:::mint
<svg viewBox="0 0 470 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Binary search eliminating half the array">
  <!-- Array boxes -->
  <rect x="20" y="40" width="40" height="40" class="b" fill="#e2fcf3" />
  <rect x="60" y="40" width="40" height="40" class="b" fill="#e2fcf3" />
  <rect x="100" y="40" width="40" height="40" class="b" fill="#e2fcf3" />
  <rect x="140" y="40" width="40" height="40" class="b" stroke="#1d4e89" stroke-width="2" />
  <rect x="180" y="40" width="40" height="40" class="b" fill="#f4f4f4" />
  <rect x="220" y="40" width="40" height="40" class="b" fill="#f4f4f4" />
  <rect x="260" y="40" width="40" height="40" class="b" fill="#f4f4f4" />
  
  <text x="35" y="65" class="l">1</text>
  <text x="75" y="65" class="l">3</text>
  <text x="115" y="65" class="l">4</text>
  <text x="155" y="65" class="l">7</text>
  <text x="195" y="65" class="l">9</text>
  <text x="235" y="65" class="l">12</text>
  <text x="275" y="65" class="l">15</text>
  
  <!-- Pointers -->
  <text x="35" y="100" class="s" fill="#1d4e89">L</text>
  <text x="155" y="100" class="s" fill="#ef476e">M</text>
  <text x="275" y="100" class="s" fill="#1d4e89">R</text>
  
  <!-- Elimination cross -->
  <line x1="185" y1="45" x2="215" y2="75" stroke="#ef476e" stroke-width="2" />
  <line x1="225" y1="45" x2="255" y2="75" stroke="#ef476e" stroke-width="2" />
  <line x1="265" y1="45" x2="295" y2="75" stroke="#ef476e" stroke-width="2" />
  
  <text x="320" y="65" class="l">Target: 7</text>
  <text x="320" y="80" class="s">15 > 7, discard right</text>
</svg>
:::

- The power of O(log N) is staggering. If N = 1,000,000, Linear Search takes 1,000,000 steps. Binary Search takes exactly 20.
- Calculating `mid` properly is critical. Instead of `(left + right) / 2`, which can integer overflow in typed languages when indices are massive, we use `left + Math.floor((right - left) / 2)`.

### The Core Loop

```ts
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found it
    } else if (arr[mid] < target) {
      left = mid + 1; // Discard left half
    } else {
      right = mid - 1; // Discard right half
    }
  }
  
  return -1; // Not found
}
```

### The trap

- **Infinite loops:** The single most common implementation error in interviews is a Binary Search that never terminates because `left` and `right` do not cross.
- **The fix:** Ensure the `while` condition is `left <= right`, and ensure that you are strictly moving the boundaries past the `mid` point (`left = mid + 1`, not `left = mid`). If you set `left = mid`, and `left` and `right` are adjacent, `mid` will equal `left` (due to integer truncation), and the loop will spin forever.

:::interview
"Why did you write `left <= right` instead of `left < right`?" — Because if the target is exactly at the final remaining element where `left === right`, we still need to evaluate that one element. If we use strict inequality, we skip checking the final candidate.
:::
