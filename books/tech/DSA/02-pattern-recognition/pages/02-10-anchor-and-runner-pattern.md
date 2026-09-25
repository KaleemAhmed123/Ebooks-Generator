# The Anchor & Runner Pattern

## The Mental Model
One pointer stays put to mark a safe or sorted boundary (the Anchor), while the other pointer scouts ahead (the Runner).
This perfectly captures tags like `swap(last, first) till both doesn't cross` and `cycleSort`.

## Algorithm Derivation
**Brute force:** Create a new array, copy valid elements over, and return it.
**↓**
**Why is it too slow?** $O(N)$ space complexity. It fails the "in-place" requirement.
**↓**
**Can we remember it?** We can remember the next valid position using a single integer index.
**↓**
**Optimized Idea:** Let `i` (anchor) track the boundary of the processed array, and `j` (runner) find the next valid element to swap into `i`.

## Sub-Patterns Covered
*   **Cycle Sort (1 to N arrays):** The value itself dictates the target index (`arr[i] == i - 1`).
*   **In-Place Swaps:** Move all zeroes to the end, sort colors (0, 1, 2).
