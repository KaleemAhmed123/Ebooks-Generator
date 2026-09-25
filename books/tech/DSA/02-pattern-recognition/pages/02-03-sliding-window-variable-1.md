## Sliding Window (Variable Length) 🟢

- **What it is:** A window that expands and shrinks dynamically to find the longest or shortest contiguous sequence that satisfies a condition
- **When to reach for it:** "Longest substring without repeating characters", "Smallest subarray with sum ≥ S"
- **Why it works:** It exploits **monotonicity**. If a window `[L, R]` has a sum of 10, then `[L, R+1]` *must* have a sum ≥ 10 (assuming all positive numbers). Because it only moves in one direction, we never have to re-evaluate smaller windows that we know will fail

### The Template

```ts
function variableSlidingWindow(arr: number[], target: number): number {
  let left = 0;
  let currentSum = 0;
  let minLength = Infinity;
  
  // Right pointer always expands the window
  for (let right = 0; right < arr.length; right++) {
    currentSum += arr[right];
    
    // Left pointer shrinks the window while the condition is met
    while (currentSum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      currentSum -= arr[left];
      left++;
    }
  }
  
  return minLength === Infinity ? 0 : minLength;
}
```
