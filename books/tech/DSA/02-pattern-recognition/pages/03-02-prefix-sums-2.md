### Variations

- **Range Sum Query 2D – Immutable (LeetCode 304):** `P[r][c]` holds the rectangle from the origin; a query adds two corners and subtracts two, inclusion–exclusion
- **Find Pivot Index (LeetCode 724):** left sum is `P[i]`, right sum is `total − P[i] − a[i]`; no array needed, one running variable
- **XOR Queries of a Subarray (LeetCode 1310):** XOR also undoes itself, so `P[R + 1] ^ P[L]`
- **Counting subarrays with a given sum:** store the prefixes in a map instead of an array (03-03)
- **Queries between updates:** a prefix array must be rebuilt after every change; switch structure (19-01)

### The failure

- **`prefix[R] − prefix[L − 1]` with an n-sized array.** At L = 0 it reads `prefix[−1]`, which is `undefined` in JS, and the answer becomes `NaN`. Size the array n + 1 as above

:::interview
"Why not a segment tree for range sums?" — Only if the array changes between queries. On static data the prefix array answers in O(1) after an O(n) build, with three lines of code; a segment tree costs O(log n) per query and far more code for no gain.
:::
