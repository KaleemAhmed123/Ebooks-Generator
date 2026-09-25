### Problem 2: Sliding Window Maximum (Deque elimination)

- **Problem:** Given an array and a window size k, return the maximum element in every window of size k
- **Why it is an elimination problem:** This looks like Locality (sliding window), but tracking the max inside a window is a bottleneck. If the window contains `[3, 1, 5]`, the `1` is permanently dominated by the `5`. `1` can never be the maximum in any window that contains `5`. We should eliminate it

**Derivation:**
1. **Brute force:** For every window, scan k elements to find the max. O(n × k)
2. **Elimination pattern:** Maintain a monotonic deque of candidate indices. When a new element arrives, pop all smaller elements from the back (they are dominated). Also, pop any elements from the front that have fallen out of the window bounds. The front of the deque is always the window's maximum

```ts
function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = [];
  const candidates: number[] = []; // Deque of indices

  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside the window (expired)
    if (candidates.length > 0 && candidates[0] === i - k) {
      candidates.shift(); 
    }
    // Remove dominated elements (smaller than incoming)
    while (candidates.length > 0 && nums[candidates[candidates.length - 1]] < nums[i]) {
      candidates.pop();
    }
    
    candidates.push(i);
    
    // Once the window reaches size k, record the answer
    if (i >= k - 1) {
      result.push(nums[candidates[0]]);
    }
  }
  return result;
}
```
