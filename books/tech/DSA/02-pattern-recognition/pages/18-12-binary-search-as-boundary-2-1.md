## Binary Search as Boundary Finding <span class="lv lv2"></span> - continued

#### Shape 2: Find the last True in `[T, T, T, F, F, F]`
- **Condition:** `isPossible(x)` flips from True to False
- **Goal:** Find the last True (the maximum value that satisfies the condition)
- **Action on True:** The current `mid` works, but there might be a larger one. Search right, keeping `mid` as a candidate
- **Action on False:** The current `mid` fails. The answer must be strictly smaller. Search left
- **The Trap:** When keeping `mid` on the right side (`low = mid`), you must bias the midpoint calculation up (`mid = low + (high - low + 1) / 2`), or you will infinite loop when `low + 1 == high`

```ts
function findLastTrue(low: number, high: number): number {
  while (low < high) {
    // Bias mid UP to avoid infinite loop when high - low == 1
    const mid = low + Math.floor((high - low + 1) / 2);
    if (isPossible(mid)) {
      low = mid;       // mid is a candidate, search right
    } else {
      high = mid - 1;  // mid failed, search left
    }
  }
  return low;
}
```
