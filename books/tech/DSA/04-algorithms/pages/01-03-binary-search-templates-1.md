## Binary Search Templates <span class="lv lv1"></span>

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
