## Transformation: Optimisation to Decision <span class="lv lv1"></span>

This is the mathematical core of **Binary Search on Answer**. It is one of the most frequently used transformations in algorithmic problem solving.

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
