### The failure

- **Deduping with a `Set` of joined strings.** It returns the right answer, but on 3,000 zeros it builds millions of equal keys and burns time and memory for nothing. Sorting already put duplicates next to each other; skip them in place
- **Skipping before using.** Put `while (nums[left] === nums[left + 1]) left++` *before* the sum check and `[0, 0, 0, −1, …]` loses `[0, 0, 0]`: the skip jumps `left` past the zeros it needed. Skip duplicates only *after* recording a match
- **Skipping against the wrong neighbour.** `if (nums[i] === nums[i + 1]) continue` looks symmetric but drops `[−1, −1, 2]` from `[3, −1, 3, 0, −1, 2]`: the first −1 is skipped and the second has no −1 left to its right. Compare the fixed value with its *previous* neighbour

:::interview
"Can 3Sum be done faster than O(n²)?" — Not meaningfully. The 3SUM conjecture says no algorithm runs in O(n^(2−ε)) for any ε > 0; the known improvements shave only logarithmic factors. The engineering choices are O(1) extra space, no hashing, and in-place duplicate skipping, which is why the sort-plus-collide version is preferred over the hash-set version.
:::
