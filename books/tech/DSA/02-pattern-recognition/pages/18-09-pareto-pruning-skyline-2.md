### The structural parallel

- Whether you are sorting items by weight/value (Knapsack bounding) or tracking the maximum height in a sweep-line (Skyline), the core action is the same:
- **Discard the strictly inferior.** Do not let it enter your data structure. Do not evaluate it in your DP
- The data structure used to maintain the Pareto frontier is usually a **binary search tree (e.g. `std::set` in C++, `TreeMap` in Java)**, which allows you to quickly query "is there any point up and to the right of me?"

### The trap

- **Checking all pairs.** To eliminate dominated candidates, beginners often check every new candidate against *every* existing candidate, creating an O(n²) bottleneck. By sorting the data first (e.g., by the X dimension), you only need to check the Y dimension against the *current best* Y dimension seen so far. Sorting turns 2D elimination into 1D monotonic tracking
