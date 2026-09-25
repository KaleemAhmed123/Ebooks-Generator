## Binary Search as Boundary Finding 🟡

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
