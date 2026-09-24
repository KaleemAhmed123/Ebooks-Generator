## Sliding Window (Variable Length)

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

### The two states of the window

- A variable window is always oscillating between two states:
  1. **Invalid:** The condition is not met. We must expand `right` to bring in new elements until it is met
  2. **Valid:** The condition is met. We record the answer, then shrink `left` to see if we can find a *better* (shorter) valid answer, or until it becomes invalid again
- If the problem asks for the **longest** window, the logic flips: you record the answer while valid, and shrink `left` only when the window becomes *invalid* (e.g. too many distinct characters)

### The constraint fingerprint

- You see an array of positive integers, n ≤ 10⁵, and you need a contiguous subarray. O(n²) will TLE.
- By never moving `left` backwards, both pointers traverse the array exactly once. Time is strictly O(n).

:::interview
"Why is a variable sliding window O(N) if there is a while loop inside a for loop?"

The outer loop moves the right pointer N times. The inner loop moves the left pointer. Because the left pointer never moves backward, it can move at most N times across the entire execution of the algorithm. N + N = 2N, which is strictly O(N).
:::
