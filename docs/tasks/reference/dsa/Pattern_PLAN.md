# Pattern Recognition Mastery (Layer 3)

This section maps out the comprehensive Pattern Recognition architecture. We have carefully preserved all standard categorical patterns and "Unnamed Patterns" from the original foundations, while chronologically weaving in the 14 new Actionable Mental Models discovered from our custom analysis.

The chronological order is designed for progressive difficulty: starting with linear arrays (pointers, intervals), moving to ranges and transformations, then trees/recursion, graphs, and finally dynamic programming and advanced structures.

## 1. Locality & Pointers (Linear Traversal)
*The answer depends on a small moving portion of the input.*
* **Sliding Window**
* **Two Pointers**
* **The Expansion & Contraction Method** *(New Actionable Model)*: How to stretch a window to meet a condition, and shrink it when the condition breaks.
* **The Anchor & Runner** *(New Actionable Model)*: Slow and fast pointers for cycle detection and in-place array manipulation (e.g. `cycleSort`, `swap(last, first)`).
* **The "Look Ahead" Predictor** *(New Actionable Model)*: Checking the `i+1` or `i+2` state before committing to a move.
* **Deque**

## 2. Order, Ranking & Intervals
*Ordering the data exposes useful structure.*
* **Sorting**
* **Greedy**
* **Interval Geometry** *(New Actionable Model)*: Sorting by start time and seeing where lines overlap on an axis (Arrangements, Merge Intervals).
* **Coordinate Compression**
* **Ordered Sets**

## 3. Range Interaction & Checkpoints
*Expensive repeated queries become cheap through precomputation.*
* **Prefix Sum**
* **State & Prefix Checkpoints** *(New Actionable Model)*: Using past states (prefixes, hashing) to instantly answer questions about the present (e.g., the `+1 -1` trick, Subarray with sum K).
* **Local Optima Tracking** *(New Actionable Model)*: The decision to drop negative baggage and start fresh (Kadane's algorithm and local greedy resets).
* **Difference Array**
* **Accumulate information so queries become cheap** *(Unnamed Pattern)*

## 4. Dimension & Geometry
*Mental models for reshaping how we view data structures.*
* **Dimension Flattening** *(New Actionable Model)*: Treating a 2D matrix like a 1D array (using `i/m` and `i%m`) to apply binary search or simple loops (`hypothetical 2D_to_1D`).
* **Visual Slicing** *(New Actionable Model)*: Projecting a 3D tree onto a 2D plane (Top View, Left View, Boundary Traversal, grid views).

## 5. Search Space Reduction
*Disproving candidates efficiently.*
* **Binary Search**
* **Boundary Finding** *(Unnamed Pattern)*: `FFFFFFFFTTTTTTTT` — Finding the exact threshold of feasibility.
* **Divide, Conquer & Merge** *(New Actionable Model)*: Breaking an array down to a single element and building it back up (Merge Sort, Partitioning).
* **Ternary Search**
* **Meet in the Middle**
* **Branch & Bound / Pruning**
* **Bitmasking**

## 6. Simulation & Tracking
*Using memory to track unresolved history.*
* **Simulation & Tracking** *(New Actionable Model)*: Utilizing structures to resolve delayed actions (e.g., `Stack`, calculating number of operations, index games).
* **Monotonic Stack & Monotonic Queue**
* **Maintain the frontier** *(Unnamed Pattern)*: Expand frontier → Discard dominated states → Continue.

## 7. Trees & Recursion
*Breaking problems into sub-problems via natural hierarchy.*
* **Delegation to Children** *(New Actionable Model)*: The realization that the root rarely does the work. It asks its left and right children for their results, combines them, and passes them up (`handleRoot CallChild`, `PostOrder`).
* **The Choice Tree (Pick / Non-Pick)** *(New Actionable Model)*: The foundational way to think about Backtracking—at every step, you either include the item or you don't.

## 8. Connectivity & Graphs
*Understanding relationships and radiation.*
* **DFS & BFS**
* **The Horizon Search** *(New Actionable Model)*: Radiating outward from one or multiple sources simultaneously (`minDist to 1's Multisource BFS`).
* **The Cycle of Trust** *(New Actionable Model)*: Mental models for graph anatomy—who comes first, who is in a loop, and who hates who (Bipartite, CycleDetection).
* **Union Find (DSU)**
* **MST, SCC, Bridges, Articulation Points**

## 9. Dependency
*Resolving prerequisites.*
* **Topological Sort**
* **DAG DP**
* **Critical Path & Prerequisite Propagation**

## 10. Repeated State (Dynamic Programming)
*The same subproblem appears again.*
* **Memoization & DP**
* **Dominated Candidate Elimination** *(Unnamed Pattern)*: A candidate can never become optimal again, so throw it away permanently.
* **State Compression, Bitmask DP, Digit DP, Tree DP, Interval DP**

## 11. Repeated Extremum (Advanced DS)
*We repeatedly need min/max/closest/best candidate dynamically.*
* **Heap**
* **Segment Tree**
* **Fenwick Tree / Lazy Propagation**
* **Sparse Table**
* **Sweep Line**
