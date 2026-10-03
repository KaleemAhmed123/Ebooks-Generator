### Complexity

- Finding the bound takes O(log K) steps, where K is the index of the target.
- The subsequent binary search takes O(log K) steps.
- **Total Time:** O(log K).
- Compare this to O(log N) for standard Binary Search. If N = 10⁹ but the target is at index 1000, Exponential Search takes sim 10 steps, while standard Binary Search takes sim 30 steps.

### The trap

- **Out of bounds:** When doubling the bound, you will eventually overshoot the array length.
- **The fix:** Always use `Math.min(bound, arr.length - 1)` when setting the right pointer for the binary search phase.
