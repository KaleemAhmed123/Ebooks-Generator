- **Notice the skeleton:** Expire stale candidates → Eliminate dominated candidates → Add new candidate. This exact skeleton is used in the Convex Hull Trick to manage lines

### The pattern across both

- Both problems use a data structure (Stack or Deque) to hold a compressed set of candidates
- Both problems contain a `while` loop that tests the newest candidate against existing ones, popping those proven inferior
- Both algorithms are O(n), because every element is pushed exactly once and eliminated at most once

:::interview
"Can you solve Sliding Window Maximum in O(N)?"

Yes. I use a monotonic deque to track potential maximums. When a new element arrives, any smaller elements in the window can never be the maximum again because the new element is both larger and will stay in the window longer. I eliminate them. The front of the deque always holds the current maximum.
:::
