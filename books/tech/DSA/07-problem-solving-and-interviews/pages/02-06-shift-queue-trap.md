## The Shift Queue Trap

This is the most common reason JavaScript and TypeScript developers fail BFS interviews. 

### The Problem

Breadth-First Search requires a Queue (First-In, First-Out).
JavaScript does not have a native `Queue` data structure. Most developers simply use an Array and call `.shift()` to remove the first element.

```ts
// THE WRONG APPROACH
const queue = [startNode];
while (queue.length > 0) {
  const curr = queue.shift(); // 🔴 O(N) OPERATION!
  // process curr and push neighbors
}
```

### Why It Fails

In JavaScript, arrays are essentially contiguous blocks of memory. When you call `.push()`, it adds an element to the end in O(1) time. 
But when you call `.shift()`, it removes the first element at index 0. To prevent a memory gap, the engine must shift *every single other element* in the array one position to the left.
- Shifting 1,000,000 elements takes time.
- If your BFS processes V vertices, and you call `.shift()` V times, the time complexity of your BFS silently degrades from O(V + E) to **O(V² + E)**.
- On LeetCode or HackerRank, this will result in a Time Limit Exceeded (TLE) error on large graphs.

### The Interview Fix

If you are writing on a whiteboard or a Google Doc, state out loud: *"I am using an array `.shift()` for simplicity, but in a real production system, I would use a proper Linked-List based Queue to ensure O(1) dequeues."* This shows you know the trap.

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
