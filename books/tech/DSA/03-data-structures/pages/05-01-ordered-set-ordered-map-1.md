## Ordered Set / Ordered Map <span class="lv lv2"></span>

- **What it is:** A Set or Map that maintains its keys in sorted order dynamically
- **The Contract:** O(log N) for insertion, deletion, exact lookup, AND order-based queries (e.g., lower bound, upper bound)
- **Why it matters:** A standard Hash Set gives O(1) lookups, but zero order. A BST gives order, but devolves to O(N) if unbalanced. The Ordered Set is a guaranteed, balanced O(log N) structure

### The Missing Piece in JavaScript/Python

- **C++** has `std::set` and `std::map` (implemented as Red-Black Trees).
- **Java** has `TreeSet` and `TreeMap`.
- **Python** does not have this natively (you must use `bisect` on arrays, or external libraries).
- **JavaScript/TypeScript** does not have this natively. `Set` and `Map` are Hash-based.

This is a massive hurdle in coding interviews. If a problem requires an Ordered Set, C++/Java developers can write one line of code. JS/Python developers must either implement a balanced tree from scratch (impossible in 40 minutes) or use array-insertion hacks.

### When is it absolutely required?

You need an Ordered Set when a problem demands **dynamic, order-aware queries**.

- **Example 1 (Sliding Window Median):** You have a sliding window of size K. As the window moves, one number enters, one exits. You must find the median.
  - A Hash Map can't find the median.
  - A sorted array takes O(K) to insert/delete per step.
  - Two Heaps work, but deleting the expired element from the middle of the Heap is O(K).
  - An Ordered Set allows O(log K) insertion, O(log K) deletion, and O(1) pointer shifts to track the median.

- **Example 2 (My Calendar I):** You need to book meetings `[start, end]`. You must reject overlapping meetings.
  - When you receive `[10, 20]`, you need to find the meeting that starts immediately *before* 10, and the meeting that starts immediately *after* 10, to check for overlap.
  - This is a `lower_bound` query. An Ordered Map does this in O(log N).
