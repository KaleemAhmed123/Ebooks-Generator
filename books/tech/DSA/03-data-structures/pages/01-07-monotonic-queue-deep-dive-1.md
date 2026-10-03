## Monotonic Queue: Deep Dive <span class="lv lv2"></span>

- **What it is:** A Deque (Double-ended Queue) that maintains its elements in sorted order
- **The Contract:** O(N) time to find the Maximum (or Minimum) element inside a **Sliding Window**
- **Why it works:** Like a Monotonic Stack, it eliminates dominated candidates. But unlike a stack, it also needs to evict elements from the *front* when they expire (fall out of the window). This dual-action requires a Deque

### The Anatomy of the Monotonic Queue

A Monotonic Queue has two distinct responsibilities at every step:
1. **Maintain Monotonicity (The Stack part, at the Back):** When a new element arrives, it is the newest. If it is larger than the elements at the back of the queue, those older, smaller elements can *never* be the maximum again. They are permanently dominated. We `pop` them from the back.
2. **Evict Expired Elements (The Queue part, at the Front):** Even if the element at the front of the queue is the massive maximum, if it has fallen out of the sliding window, it is useless. We `shift` it from the front.
