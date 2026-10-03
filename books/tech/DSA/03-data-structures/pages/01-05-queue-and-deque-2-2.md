### The Deque (Double-Ended Queue)

- A Deque allows O(1) insertion and deletion at **both** ends (front and back)
- It is essentially a combination of a Stack and a Queue
- Under the hood, a Deque is usually implemented as a Doubly Linked List, or a "Ring Buffer" (an array with wrapping pointers)
- You reach for a Deque primarily for the **Monotonic Queue** pattern (e.g. Sliding Window Maximum), where you need to push to the back, but pop from BOTH the back (to maintain monotonicity) and the front (to evict elements out of the window)

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/) (LeetCode 232) | FIFO from two LIFO stacks, amortised O(1) |
| [Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/) (LeetCode 225) | LIFO from FIFO, tests structural understanding |
| [Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/) (LeetCode 933) | Queue evicts expired timestamps from the front |
| [Design Circular Deque](https://leetcode.com/problems/design-circular-deque/) (LeetCode 641) | Ring buffer with front and back operations |

:::interview
"Can you implement a Queue using two Stacks?"

Yes, the classic interview question. Push everything onto `Stack1`. When a dequeue is requested, pop everything from `Stack1` and push it onto `Stack2` (this reverses the LIFO to FIFO). Then pop from `Stack2`. Subsequent dequeues just pop from `Stack2` until it's empty. It gives Amortised O(1) dequeue time.
:::
