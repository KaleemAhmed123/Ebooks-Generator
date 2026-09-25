### The failure

- Counting only maximal windows. `[5, 2, 6]` is one window, but it adds three answers at its right end. Summing lengths of maximal windows double-counts overlaps, and counting windows undercounts. Count at the right end and both errors vanish
- Forgetting the `k ≤ 1` guard. With `k = 0` the `while` loop pops past `right`, `left` exceeds `right`, and the count goes negative

:::interview
"Why is the answer not just the number of windows you see?" — Each position of `right` owns all valid subarrays ending there. The window tells you the smallest valid start; every later start is also valid because the condition is monotone under shrinking. So one window at `right` stands for `right − left + 1` subarrays, and the total is O(n).
:::
