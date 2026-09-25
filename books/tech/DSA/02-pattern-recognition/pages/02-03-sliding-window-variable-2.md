### The two states of the window

- A variable window is always oscillating between two states:
  1. **Invalid:** The condition is not met. We must expand `right` to bring in new elements until it is met
  2. **Valid:** The condition is met. We record the answer, then shrink `left` to see if we can find a *better* (shorter) valid answer, or until it becomes invalid again
- If the problem asks for the **longest** window, the logic flips: you record the answer while valid, and shrink `left` only when the window becomes *invalid* (e.g. too many distinct characters)

### The constraint fingerprint

- You see an array of positive integers, n ≤ 10⁵, and you need a contiguous subarray. O(n²) will TLE.

:::interview
"Longest or shortest window: where do you record the answer?" — For the longest, shrink while the window is invalid, then record: it is valid again. For the shortest, shrink while the window is valid and record inside that loop, before each shrink. Swapping the two records invalid windows or misses the minimum. The O(n) bound itself is Module 01 (01-07).
:::
