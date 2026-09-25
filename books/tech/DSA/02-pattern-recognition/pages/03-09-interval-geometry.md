# Interval Geometry

## The Mental Model
Sorting by start time and seeing where lines overlap on an axis. This covers `Arrangements` and `merge (intervals)`.

## Algorithm Derivation
**Brute force:** For every interval, check if it overlaps with every other interval. $O(N^2)$.
**↓**
**Why is it too slow?** We check pairs that are nowhere near each other on the number line.
**↓**
**Can we reorder operations?** Sort the intervals by their start time.
**↓**
**Optimized Idea:** If sorted by start time, interval $A$ can only overlap with interval $B$ if $B_{start} \le A_{end}$. We only need to check adjacent intervals in $O(N \log N)$ time.

## Sub-Patterns
*   **Merge Intervals:** `prev[1] = max(prev[1], curr[1])`
*   **Meeting Rooms / Platforms:** Separate arrays for arrival and departure, sort both, and use Two Pointers.
