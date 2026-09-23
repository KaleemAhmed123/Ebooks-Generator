## Binary Search Templates

- Memorizing a dozen different variations of Binary Search is a waste of time. You only need two templates.
- **Template 1: Exact Match.** Used when you are looking for a specific target, and the search can terminate early if found.
- **Template 2: Boundary Finding (The `true/false` split).** Used when you want to find the *first* or *last* occurrence of a condition, or when binary searching on an answer.

### Template 1: Exact Match

```ts
function searchExact(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  // We use <= because the final remaining element could be the target
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      return mid; // Found it!
    } else if (arr[mid] < target) {
      left = mid + 1; // Discard left half (including mid)
    } else {
      right = mid - 1; // Discard right half (including mid)
    }
  }
  return -1;
}
```

### Template 2: Boundary Finding

Instead of looking for a specific number, imagine the array is mapped to a boolean function `isConditionMet(x)`. If the array looks like `[F, F, F, T, T, T, T]`, we want to find the **first** `T`.

```ts
function searchBoundary(arr: number[]): number {
  let left = 0;
  let right = arr.length - 1;
  let boundaryIndex = -1; // Keep track of the best valid answer so far

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (isConditionMet(arr[mid])) {
      // It's valid. But is it the *first* valid one?
      boundaryIndex = mid; // Remember it
      right = mid - 1;     // Try to find an earlier one on the left
    } else {
      // It's invalid. The boundary must be to the right.
      left = mid + 1;
    }
  }
  
  return boundaryIndex;
}
```

### The trap

- **Mixing the templates:** If you try to write an Exact Match search but don't `return mid` immediately when found, and instead update a variable and continue, you are accidentally writing a Boundary search without adjusting the pointer logic. You will likely hit an infinite loop.
- **The fix:** If you want an exact match, `return` inside the loop. If you want a boundary, save the `mid` in a variable, move the boundary to keep searching, and return the variable *after* the loop.
