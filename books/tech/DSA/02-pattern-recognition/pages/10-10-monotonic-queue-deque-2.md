### The Template

```ts
function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = []; // Stores INDICES; live part is deque[head..]
  let head = 0;               // front pointer instead of shift()
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    // 1. Remove elements that are out of the current window
    if (head < deque.length && deque[head] === i - k) {
      head++; // Remove from FRONT in O(1)
    }

    // 2. Remove elements that are dominated by the incoming element
    while (deque.length > head && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop(); // Remove from BACK
    }

    // 3. Add the incoming element's index
    deque.push(i);

    // 4. Record the result if the window has reached size k
    if (i >= k - 1) {
      result.push(nums[deque[head]]); // The FRONT is always the max
    }
  }
  return result;
}
```

### The trap

- **Using a standard array for `shift()` in JavaScript/TypeScript.** In JS, `array.shift()` takes O(n) time. If you use it inside the loop, the algorithm silently degrades from O(n) to O(n²). The template above keeps a `head` index instead: the front moves forward in O(1), and the dead prefix is never touched again.
