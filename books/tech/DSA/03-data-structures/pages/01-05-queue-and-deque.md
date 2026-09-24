## Queues and Deques

- **What it is:** A First-In, First-Out (FIFO) interface
- **The Contract:** O(1) to add to the back, O(1) to remove from the front
- **Why it works:** Queues model fairness and sequential processing. The element waiting the longest gets processed first

### The array trap

- The biggest mistake beginners make in JavaScript/Python is using an array as a queue
- `queue.push(val)` (add to back) is O(1)
- `queue.shift()` (remove from front) is **O(N)**. It forces the array to physically shift every remaining element left by one slot
- If you process 10,000 items through an array-based queue, you are doing 100,000,000 operations. It will Time Limit Exceed (TLE) in interviews

### The true Queue (Linked List)

- To achieve true O(1) enqueue and dequeue, a Queue must be implemented as a Linked List with both a `head` and `tail` pointer
- Enqueue: Create node, `tail.next = node`, update `tail`
- Dequeue: Read `head.val`, `head = head.next`
- Because we only interact with the absolute ends, we never traverse, keeping everything O(1)

```ts
// A true O(1) Queue
class Node {
  constructor(public val: number, public next: Node | null = null) {}
}

class Queue {
  private head: Node | null = null;
  private tail: Node | null = null;

  enqueue(val: number) {
    const node = new Node(val);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  dequeue(): number | null {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // Queue became empty
    return val;
  }
}
```

### The Deque (Double-Ended Queue)

- A Deque allows O(1) insertion and deletion at **both** ends (front and back)
- It is essentially a combination of a Stack and a Queue
- Under the hood, a Deque is usually implemented as a Doubly Linked List, or a "Ring Buffer" (an array with wrapping pointers)
- You reach for a Deque primarily for the **Monotonic Queue** pattern (e.g. Sliding Window Maximum), where you need to push to the back, but pop from BOTH the back (to maintain monotonicity) and the front (to evict elements out of the window)

:::interview
"Can you implement a Queue using two Stacks?"

Yes, the classic interview question. Push everything onto `Stack1`. When a dequeue is requested, pop everything from `Stack1` and push it onto `Stack2` (this reverses the LIFO to FIFO). Then pop from `Stack2`. Subsequent dequeues just pop from `Stack2` until it's empty. It gives Amortised O(1) dequeue time.
:::
