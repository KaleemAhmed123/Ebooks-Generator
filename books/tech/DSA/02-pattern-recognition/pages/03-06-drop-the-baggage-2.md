### Variations

- **Maximum Subarray Sum with One Deletion (LeetCode 1186):** two states per index: `keep` (no deletion yet) and `del` (one element deleted). `del = max(del + x, keep_prev)`, `keep = max(x, keep_prev + x)`. The extra flag is the whole trick
- **Maximize sum by flipping the sign of one subarray (GFG):** flipping `[l, r]` changes the total by `−2 · sum(l..r)`. Run plain Kadane on `−2 · a[i]` to find the best gain; answer = `total + max(0, gain)`
- **Maximum Sum Circular Subarray (LeetCode 918):** carry the worst subarray too, and flip the target (page 02-06)
- **Substring with Largest Variance (LeetCode 2272) 🟡:** for each ordered pair of letters (`hi`, `lo`), map `hi → +1`, `lo → −1`, others → 0, and run Kadane. The catch: a window must contain at least one `lo`, so carry a "seen `lo`" flag and allow a restart only when a later `lo` can still arrive. 26 × 25 pairs × n steps

### The failure

- **Resetting on zero or negative for products.** Sum-Kadane resets when the running sum drops below 0. Copying that rule for products throws away `−2`, which later pairs with `−1` to win. Products need the minimum carried, not a reset rule
- **Using sum-Kadane on "variance".** Variance is `count(hi) − count(lo)` and needs at least one `lo`. Plain Kadane returns windows made only of `hi`, whose "variance" the problem does not allow, and over-reports the answer

:::interview
"Why does maximum product need two variables when maximum sum needs one?" — For sums, the best extension of the past is always the largest past value. For products, multiplying by a negative number turns the smallest past value into the largest. So the minimum ending at `i − 1` is also a candidate, and I carry both: still O(n) time, O(1) space.
:::
