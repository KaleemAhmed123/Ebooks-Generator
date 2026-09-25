## Elimination worked problems 🟡

### Problem 1: Daily Temperatures (1D elimination)

- **Problem:** Given an array of daily temperatures, return an array with the number of days you have to wait for a warmer temperature
- **Why it is an elimination problem:** You are looking for the "next greater element". A temperature of 75 permanently dominates a previous temperature of 70, because 75 answers 70's question. 70 is no longer unresolved

**Derivation:**
1. **Brute force:** For each day, scan forward until you find a warmer day. O(n²)
2. **What's repeated?** You are scanning past unresolved cool days multiple times
3. **Elimination pattern:** Maintain a stack of unresolved days (indices). When a new temperature arrives, if it is warmer than the stack top, it proves the top is dominated. Pop the top, calculate the distance (current day - popped day), and repeat

```ts
function dailyTemperatures(temps: number[]): number[] {
  const answer = new Array(temps.length).fill(0);
  const unresolved: number[] = []; // Stack of indices

  for (let i = 0; i < temps.length; i++) {
    // Current temp dominates the top of the stack?
    while (unresolved.length > 0 && temps[i] > temps[unresolved[unresolved.length - 1]]) {
      const dom = unresolved.pop()!;
      answer[dom] = i - dom;       // Distance to the warmer day
    }
    unresolved.push(i);
  }
  return answer;
}
```

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

- **Notice the skeleton:** Expire stale candidates → Eliminate dominated candidates → Add new candidate. This exact skeleton is used in the Convex Hull Trick to manage lines

### The pattern across both

- Both problems use a data structure (Stack or Deque) to hold a compressed set of candidates
- Both problems contain a `while` loop that tests the newest candidate against existing ones, popping those proven inferior
- Both algorithms are O(n), because every element is pushed exactly once and eliminated at most once

:::interview
"Can you solve Sliding Window Maximum in O(N)?"

Yes. I use a monotonic deque to track potential maximums. When a new element arrives, any smaller elements in the window can never be the maximum again because the new element is both larger and will stay in the window longer. I eliminate them. The front of the deque always holds the current maximum.
:::
