## Monotonic Queue: Deep Dive

- **What it is:** A Deque (Double-ended Queue) that maintains its elements in sorted order
- **The Contract:** O(N) time to find the Maximum (or Minimum) element inside a **Sliding Window**
- **Why it works:** Like a Monotonic Stack, it eliminates dominated candidates. But unlike a stack, it also needs to evict elements from the *front* when they expire (fall out of the window). This dual-action requires a Deque

### The Anatomy of the Monotonic Queue

A Monotonic Queue has two distinct responsibilities at every step:
1. **Maintain Monotonicity (The Stack part, at the Back):** When a new element arrives, it is the newest. If it is larger than the elements at the back of the queue, those older, smaller elements can *never* be the maximum again. They are permanently dominated. We `pop` them from the back.
2. **Evict Expired Elements (The Queue part, at the Front):** Even if the element at the front of the queue is the massive maximum, if it has fallen out of the sliding window, it is useless. We `shift` it from the front.

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

:::interview
"Why use a Monotonic Queue instead of a Max-Heap for the Sliding Window Maximum?" — A Max-Heap can find the maximum in O(1) and add elements in O(log K). But *removing* an expired element from the middle of a Heap takes O(K). Lazy removal (waiting until the expired element reaches the top) works, but a Monotonic Queue is strictly O(N) overall (amortised O(1) per element) and is conceptually cleaner once mastered.
:::
