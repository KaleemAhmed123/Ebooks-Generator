## Queues and Deques <span class="lv lv1"></span>

- **What it is:** A First-In, First-Out (FIFO) interface
- **The Contract:** O(1) to add to the back, O(1) to remove from the front
- **Why it works:** Queues model fairness and sequential processing. The element waiting the longest gets processed first

### The array trap

- The biggest mistake beginners make in JavaScript/Python is using an array as a queue
- `queue.push(val)` (add to back) is O(1)
- `queue.shift()` (remove from front) is **O(N)**. It forces the array to physically shift every remaining element left by one slot
- If you process 10,000 items through an array-based queue, you are doing 100,000,000 operations. It will Time Limit Exceed (TLE) in interviews
