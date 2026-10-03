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
