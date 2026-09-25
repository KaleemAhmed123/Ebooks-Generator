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
