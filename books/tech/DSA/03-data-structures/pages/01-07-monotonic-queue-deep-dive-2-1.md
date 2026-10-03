### The Algorithm (Sliding Window Maximum)

```ts
function maxSlidingWindow(nums: number[], k: number): number[] {
  const ans: number[] = [];
  const deque: number[] = []; // Stores INDICES, strictly decreasing by value
  
  for (let i = 0; i < nums.length; i++) {
    // 1. Evict expired elements from the front
    // The window bounds are [i - k + 1, i]. So index i - k is expired.
    if (deque.length > 0 && deque[0] === i - k) {
      deque.shift(); // O(N) in JS arrays, but assume O(1) for a real Deque
    }
    
    // 2. Maintain monotonicity from the back
    // If new element is >= the back of deque, the back is dominated.
    while (deque.length > 0 && nums[i] >= nums[deque[deque.length - 1]]) {
      deque.pop();
    }
    
    // 3. Add current element's index
    deque.push(i);
    
    // 4. Record the answer (the front of the deque is always the max)
    if (i >= k - 1) {
      ans.push(nums[deque[0]]);
    }
  }
  
  return ans;
}
```

### The Domination Principle

- The beauty of the Monotonic Queue lies in its ruthlessness
- If the current window is `[10, 5, 2]` and we slide to add `8`, the window is now `[5, 2, 8]`. The `8` dominates both `5` and `2`. They are older (will expire sooner) AND smaller (less valuable). They serve no purpose.
- The queue throws them away, becoming just `[8]`.
- Note that in JavaScript, using `shift()` on an array makes the above code O(N×K). In an interview, explicitly state: *"I am using a JS array for the deque. `shift()` is O(K), but I am assuming a true Deque where this is O(1)."*
