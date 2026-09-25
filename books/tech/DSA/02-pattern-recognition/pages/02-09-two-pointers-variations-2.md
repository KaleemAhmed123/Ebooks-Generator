### Variations

- **Remove Duplicates from Sorted Array (LeetCode 26):** two regions; keep a value when it differs from the last kept one, `nums[w − 1]`
- **Remove Duplicates from Sorted Array II (LeetCode 80):** allow two copies: compare with `nums[w − 2]` instead
- **Move Zeroes (LeetCode 283):** write every non-zero forward, then fill the tail with zeros; order is kept
- **Three way partitioning around [a, b] (GFG):** the same three zones with "below a", "inside", "above b"
- **Fast/slow on linked lists:** the middle (12-03) and cycle detection (12-04)

### The failure

- **Advancing `mid` after swapping with `high`.** The value pulled in from the back has not been examined. On `[2, 1, 2]` the first 2 swaps with the last 2, the loop steps past the 2 it just received, and returns `[2, 1, 2]` unsorted

:::interview
"Why does Dutch flag partitioning run in one pass?" — Every step either settles the value at `mid` (a 0 or a 1, and `mid` moves on) or settles one value at the back (a 2, and `high` moves in). The unknown zone `[mid, high]` shrinks by one each time, so there are at most n steps, and swaps need no extra space.
:::
