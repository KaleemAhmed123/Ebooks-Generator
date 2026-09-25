# The Expansion & Contraction Method

## The Mental Model
How to stretch a window to meet a condition, and shrink it when the condition breaks. This directly encompasses the `slidingWindow`, `TwoPointers`, and `maxMin Len` tags you identified.

## Algorithm Derivation
Instead of just jumping to the solution, let's derive it.

**Brute force:** Check every possible subarray/window using nested loops (i to N, j from i to N).
**↓**
**Why is it too slow?** $O(N^2)$ time. We are recalculating the sum/condition for heavily overlapping subarrays.
**↓**
**What is being repeated?** If window `[i, j]` is valid, window `[i, j-1]` was already calculated.
**↓**
**Can we exploit monotonicity?** Yes! If adding an element makes the sum *too large*, adding more elements will only make it worse. We don't need to check them.
**↓**
**Optimized Idea:** Expand the right edge until the condition breaks. Then contract the left edge until it becomes valid again. $O(N)$ time.

## Pattern Coverage
*   **slidingWindow:** Keep track of the current state.
*   **TwoPointers:** `left` and `right` boundaries.
*   **maxMin Len:** Update the global max/min only when the window is in a valid state.

## Implementation Structure
```typescript
let left = 0, right = 0;
while (right < n) {
    // 1. Expand
    add(nums[right]);
    
    // 2. Contract (while invalid)
    while (isInvalid()) {
        remove(nums[left]);
        left++;
    }
    
    // 3. Update Result
    ans = Math.max(ans, right - left + 1);
    right++;
}
```
