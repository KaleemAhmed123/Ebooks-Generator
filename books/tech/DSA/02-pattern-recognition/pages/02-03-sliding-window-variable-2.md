### Variations

- **Longest Substring Without Repeating Characters (LeetCode 3):** *longest* form: shrink while the window holds a repeat, then record
- **Fruit Into Baskets (LeetCode 904):** longest window with at most 2 distinct values; a count map, shrink while it has 3 keys
- **Longest Repeating Character Replacement (LeetCode 424):** valid while `length − maxCount ≤ k`; `maxCount` never needs to decrease
- **Max Consecutive Ones III (LeetCode 1004):** valid while the window holds at most k zeros
- **Minimum Window Substring (LeetCode 76):** shortest form with a "still needed" counter over t's letters

### The failure

- **Negative numbers.** Monotonicity is gone: adding an element can *lower* the sum. On `[−3, 4]` with target 4 the window never reaches 4 and returns 0; the answer is 1 (`[4]`). With negatives, count by equal prefixes (03-03) or use a deque of prefix sums (10-10)

:::interview
"Longest or shortest window: where do you record the answer?" — For the longest, shrink while the window is invalid, then record: it is valid again. For the shortest, shrink while the window is valid and record inside that loop, before each shrink. Swapping the two records invalid windows or misses the minimum. The O(n) bound itself is Module 01 (01-07).
:::
