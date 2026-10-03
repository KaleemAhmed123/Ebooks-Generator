### The Code Fix

If you are in a coding environment and getting TLE, you must implement a real Queue. Do not write a massive Linked List class. Just use the "Two Pointer Queue" trick.

```ts
// THE FIX
const queue = [startNode];
let head = 0; // Pointer to the front of the queue

// Instead of queue.length > 0, check if head has caught up to the end
while (head < queue.length) {
  const curr = queue[head];
  head++; // O(1) Dequeue!

  // process curr...
  queue.push(neighbor); // O(1) Enqueue
}
```

This trick allows the array to grow indefinitely while we just move our reading pointer forward. It is blazing fast, strictly O(1), and requires exactly one extra line of code. (Note: In a long-running production server, this leaks memory because the array never shrinks. But for a 2-second interview test case, it is perfect).
