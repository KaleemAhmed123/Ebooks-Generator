## Ternary Search 🟡

- Binary search works when the function is monotonic (always increasing or always decreasing).
- **Ternary Search** is used when the function is **unimodal**—it strictly decreases to a single minimum, and then strictly increases (a V-shape), or strictly increases to a maximum and decreases (an A-shape).

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ternary Search cutting function into thirds">
  <!-- Parabola -->
  <path d="M50 20 Q 235 180 420 20" fill="none" stroke="#12121a" stroke-width="2" />
  
  <line x1="173" y1="120" x2="173" y2="83" stroke="#ef476e" stroke-width="2" stroke-dasharray="4" />
  <line x1="296" y1="120" x2="296" y2="83" stroke="#ef476e" stroke-width="2" stroke-dasharray="4" />
  
  <text x="165" y="135" class="l">m1</text>
  <text x="285" y="135" class="l">m2</text>
  <text x="235" y="135" class="s">Min</text>
</svg>
:::

- Instead of cutting the search space in half with one `mid`, we cut it into thirds with `m1` and `m2`.
- If we are looking for a minimum:
  - If `f(m1) < f(m2)`, the minimum cannot be to the right of `m2`. We discard `[m2, right]`.
  - If `f(m1) > f(m2)`, the minimum cannot be to the left of `m1`. We discard `[left, m1]`.

### Implementation (Continuous Space)

Ternary search is often used on floating-point numbers rather than integers.

```ts
function ternarySearchMin(left: number, right: number): number {
  // precision threshold
  while (right - left > 1e-9) {
    const m1 = left + (right - left) / 3;
    const m2 = right - (right - left) / 3;

    if (f(m1) < f(m2)) {
      right = m2; // Min is to the left of m2
    } else {
      left = m1;  // Min is to the right of m1
    }
  }
  return left; 
}
```

### The trap

- **Flat regions:** Ternary search completely breaks if the function has flat regions (plateaus). If `f(m1) === f(m2)`, you don't know which side contains the absolute extremum. The function *must* be strictly increasing and strictly decreasing.
- **The alternative:** If the function is a discrete array of integers, you can often just use Binary Search on the derivative (checking if `arr[mid] < arr[mid+1]`).
