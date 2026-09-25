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

### Variation: maps instead of sums

- For "anagrams of size k" the running sum becomes a letter-count map; worked in Module 03 (02-03)
