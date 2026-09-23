## Transformation: Optimisation to Decision

This is the mathematical core of **Binary Search on Answer**. It is one of the most powerful transformations in algorithmic problem solving.

### The Signal

- "Find the **minimum maximum**..." or "Find the **maximum minimum**..."
- "What is the smallest capacity needed to..."
- The problem asks for an optimal value, and simulating the exact construction of that value seems impossible or requires exponential time.

### The Mapping

We transform the problem from:
> *"What is the optimal X?"* (An optimisation problem)

Into:
> *"Given a specific value V, is it possible to achieve V?"* (A boolean decision problem)

If the problem space is **monotonic** (e.g., if a truck capacity of 50 works, then 51, 52, and 100 will also definitely work. If 49 fails, 48 and 1 will definitely fail), we can binary search the answer.

### Canonical Example: Koko Eating Bananas

- **Problem:** Koko has N piles of bananas. She has H hours to eat them all. Find the minimum integer eating speed K (bananas/hour) such that she finishes all bananas within H hours.
- **The Trap:** Trying to mathematically calculate the optimal speed based on averages and maximums. It requires messy edge cases and often fails.
- **The Transformation:**
  - Stop asking "What is the minimum speed?"
  - Start asking: "If Koko eats at exactly `V` bananas per hour, can she finish in `H` hours?"
- **The Execution:**
  - Write a simple `canFinish(speed)` function that iterates through the piles and calculates total hours required at that speed. This is a trivial O(N) boolean function.
  - Binary search the speed from `1` to `max(piles)`.
  - If `canFinish(mid)` is true, record it and try a slower speed (`right = mid - 1`).
  - If false, she needs to eat faster (`left = mid + 1`).
- **The Result:** We solved a complex optimisation problem with a trivial O(N log(text{Max Pile})) search.
