### The structural parallel

| Concept | Monotonic Stack | Convex Hull Trick |
|---|---|---|
| Candidate | Array element (value) | Linear function (slope, intercept) |
| Container | Stack (1D) | Deque (2D geometry) |
| Domination condition | `arr[i] > arr[top]` | `intersection(L3, L1) < intersection(L2, L1)` |
| Processing cost | O(1) amortised | O(1) amortised |

- Notice how this is literally the monotonic stack algorithm, just with a more complex `while` loop condition
- You maintain a deque of active candidates. When a new candidate arrives, you `while` loop to pop dominated candidates from the back, then push the new candidate
- The geometry is just the domination check. The algorithmic skeleton is identical

:::interview
"How would you optimize this O(n²) DP?"

The inner loop searches for the minimum value of a linear function `mx + c`. We can optimize this by maintaining a set of lines. As we add new lines, we check if they render any previous lines strictly suboptimal (they never form the lower envelope). We pop those dominated lines. We can then binary search the remaining lines, reducing O(n²) to O(n log n).
:::
