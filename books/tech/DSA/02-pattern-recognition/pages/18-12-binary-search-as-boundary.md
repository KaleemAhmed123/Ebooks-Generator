## Binary Search as Boundary Finding

- Binary Search is often taught as "look in the middle, if it's too big, look left, else look right." This is mechanically true but conceptually weak
- The stronger mental model is: **Binary Search finds the boundary between two states in a monotonic sequence**

### The two fundamental templates

Every binary search problem reduces to one of two shapes. 

#### Shape 1: Find the first True in `[F, F, F, T, T, T]`
- **Condition:** `isPossible(x)` flips from False to True
- **Goal:** Find the first True (the minimum value that satisfies the condition)
- **Action on True:** The current `mid` works, but there might be a smaller one. Search left, keeping `mid` as a candidate
- **Action on False:** The current `mid` fails. The answer must be strictly greater. Search right

```ts
function findFirstTrue(low: number, high: number): number {
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isPossible(mid)) {
      high = mid;      // mid is a candidate, search left
    } else {
      low = mid + 1;   // mid failed, search right
    }
  }
  return low;          // low === high points to the boundary
}
```

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

### Why this framing prevents off-by-one errors

- When you memorize `<` vs `<=`, `mid - 1` vs `mid + 1`, you will make mistakes under pressure
- When you think in boundaries, the logic writes itself:
  - Did this `mid` evaluate to True? Yes. Do I want a True? Yes. Then `mid` is a valid candidate. I cannot throw it away (`high = mid` or `low = mid`)
  - Did this `mid` evaluate to False? Yes. Is False the answer? No. Then I can throw it away safely (`low = mid + 1` or `high = mid - 1`)

:::interview
"Why did your binary search infinite loop?"

Because I used the standard floor midpoint calculation `(low + high) / 2` while trying to find the last True (`low = mid`). When `low` and `high` are adjacent, `mid` rounds down to `low`. Since it evaluated to True, I set `low = mid`, meaning nothing changed. To fix it, I must bias the midpoint up: `(low + high + 1) / 2`.
:::
