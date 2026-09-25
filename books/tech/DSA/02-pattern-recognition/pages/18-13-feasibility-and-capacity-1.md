## Feasibility and Capacity <span class="lv lv2"></span>

- The most common application of Boundary Finding is converting a "Find the optimal value" problem into a "Can we do it with this value?" problem
- This is known as **Binary Search on Answer** or **Feasibility Search**

### The Feasibility Signature

You should immediately think of Feasibility Search if a problem asks:
1. **Minimise the maximum** (e.g., "split array into K parts to minimise the largest sum")
2. **Maximise the minimum** (e.g., "place K items such that the minimum distance between them is maximised")
3. **Find the smallest capacity that works** (e.g., "minimum ship capacity to transport cargo in D days")

### The structural transformation

- **The original problem:** "What is the minimum ship capacity to deliver all packages in D days?" This is hard because the capacity could be anything, and the greedy packing strategy depends on the capacity
- **The transformed problem:** "If the ship capacity is exactly C, can we deliver all packages in D days?" This is a linear check. Iterate through the packages, packing the ship until it's full, sending it, and counting how many days it took
- **The boundary:** If capacity C takes ≤ D days, then C+1, C+2 will also take ≤ D days. It's monotonic: `[F, F, F, T, T, T]`. We just binary search for the first C that returns True
