### The Template

```ts
function fixedSlidingWindow(arr: number[], k: number): number {
  if (arr.length < k) return 0;
  
  let currentSum = 0;
  // 1. Initialise the first window
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }
  
  let maxSum = currentSum;
  
  // 2. Slide the window
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}
```

### The Variation: Maps instead of Sums

- If the problem asks for "anagrams of size k", `currentSum` becomes a Hash Map of character frequencies
- When sliding, you decrement the count of `char[i-k]` and increment the count of `char[i]`
