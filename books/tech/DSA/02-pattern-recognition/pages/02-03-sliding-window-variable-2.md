### Variations

- **Longest Substring Without Repeating Characters (LeetCode 3):** *longest* form: shrink while the window holds a repeat, then record
- **Fruit Into Baskets (LeetCode 904):** longest window with at most 2 distinct values; a count map, shrink while it has 3 keys
- **Longest Repeating Character Replacement (LeetCode 424):** valid while `length − maxCount ≤ k`; `maxCount` never needs to decrease
- **Max Consecutive Ones III (LeetCode 1004):** valid while the window holds at most k zeros
- **Minimum Window Substring (LeetCode 76):** shortest form with a "still needed" counter over t's letters

### The failure

- **Negative numbers.** Monotonicity is gone: adding an element can *lower* the sum. On `[−3, 4]` with target 4 the window never reaches 4 and returns 0; the answer is 1 (`[4]`). With negatives, count by equal prefixes (03-03) or use a deque of prefix sums (10-10)

:::interview
"In Minimum Window Substring, how do you test validity in O(1)?" — I keep `need[c]`, the copies of each letter of t still missing, and one counter `missing = t.length`. A letter entering on the right lowers `missing` only while its `need` is positive; a letter leaving on the left raises it only when its `need` turns positive again. The window is valid exactly when `missing === 0`, so no map comparison is needed. The O(n) bound itself is Module 01 (01-07).
:::
