### The Template

```ts
function solve(arr: number[], limit: number): number {
  let left = 1; // Minimum possible answer
  let right = 1000000000; // Maximum possible answer
  let best = -1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (isValid(arr, mid, limit)) {
      best = mid;      // This works, record it
      right = mid - 1; // try to find a smaller one
    } else {
      left = mid + 1;  // Too small, must increase
    }
  }
  return best;
}

// A greedy O(N) simulation
function isValid(arr: number[], guess: number, limit: number): boolean {
  // simulate using the guess, return true if successful
  return true; 
}
```

### The Complexity

- The range of possible answers is R. Binary searching it takes O(log R).
- For every guess, we run `isValid()`, which usually takes O(N).
- Total time: O(N log R). Since log₂(10⁹) ≈ 30, this is effectively 30 · O(N), a few million steps.
