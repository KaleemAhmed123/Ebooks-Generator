### Variations

- **Sort Integers by The Number of 1 Bits (LeetCode 1356) / Sort by set bit count (GFG):** two-level key: bit count, then value (LeetCode) or original index (GFG). `Array.prototype.sort` is stable since ES2019, so GFG's "keep input order on ties" needs only the bit-count comparison
- **Queue Reconstruction by Height (LeetCode 406):** sort by height descending, then `k` ascending; insert each person at index `k`. Taller people placed first are unaffected by shorter ones inserted later, so every `k` stays true
- **Custom Sort String (LeetCode 791):** the order *is* given: map each letter to its rank and sort by rank, or count letters and emit them in the given order in O(n)
- **Two City Scheduling (LeetCode 1029):** the pairwise rule "who should fly to A" reduces to one key, `costA − costB` (page 08-05). Try to collapse a pairwise rule into a key first; it is simpler and obviously consistent

### The failure

- **Returning a boolean from the comparator.** `sort((a, b) => a + b < b + a)` returns `true`/`false`, which JS converts to 1/0 and never to a negative number. The result depends on the engine's algorithm and is not the intended order
- **Comparing numerically.** Sorting `[3, 30, 34]` descending by value gives `"34303"`; by lexicographic string order, `["34", "30", "3"]` gives `"34303"` as well. Both lose to `"34330"`: only the concatenation test is right
- **Forgetting all zeros.** `[0, 0]` joins to `"00"`; the answer is `"0"`

:::interview
"How do you know the concatenation comparator is safe to sort with?" — `a` before `b` when `ab > ba` as strings. Reading the strings as numbers, `ab > ba` is equivalent to `a / (10^|a| − 1) > b / (10^|b| − 1)`, a comparison of one real number per item, so the order is transitive. Then an exchange argument shows any other order can be improved by adjacent swaps, so the sorted order is the largest.
:::
