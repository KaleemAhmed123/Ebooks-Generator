# Local Optima Tracking (Kadane's)

## The Mental Model
The decision to drop negative baggage and start fresh. Covers the `kadanes` tag.

## Algorithm Derivation
**Brute force:** Check all subarrays for the maximum sum. $O(N^2)$.
**↓**
**What is being repeated?** If subarray `[i, j]` is heavily negative, extending it to `j+1` is strictly worse than just starting fresh at `j+1`.
**↓**
**Can we exploit monotonicity?** Yes. A negative prefix sum is "baggage".
**↓**
**Optimized Idea:** Keep a running sum. If `sum < 0`, reset it to `0`. Track the `max_sum` at every step. $O(N)$ time.

## Pattern Coverage
*   **Maximum Subarray Sum**
*   **Maximum Product Subarray:** Same concept, but track *both* min and max because two negatives make a positive.
