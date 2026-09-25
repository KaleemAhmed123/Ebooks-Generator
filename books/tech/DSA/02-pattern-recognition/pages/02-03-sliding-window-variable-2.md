### The two states of the window

- A variable window is always oscillating between two states:
  1. **Invalid:** The condition is not met. We must expand `right` to bring in new elements until it is met
  2. **Valid:** The condition is met. We record the answer, then shrink `left` to see if we can find a *better* (shorter) valid answer, or until it becomes invalid again
- If the problem asks for the **longest** window, the logic flips: you record the answer while valid, and shrink `left` only when the window becomes *invalid* (e.g. too many distinct characters)

### The constraint fingerprint

- You see an array of positive integers, n ≤ 10⁵, and you need a contiguous subarray. O(n²) will TLE.
- By never moving `left` backwards, both pointers traverse the array exactly once. Time is strictly O(n).

:::interview
"Why is a variable sliding window O(N) if there is a while loop inside a for loop?"

The outer loop moves the right pointer N times. The inner loop moves the left pointer. Because the left pointer never moves backward, it can move at most N times across the entire execution of the algorithm. N + N = 2N, which is strictly O(N).
:::
