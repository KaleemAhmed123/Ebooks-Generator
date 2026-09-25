### Variations

- **Permutations (LeetCode 46):** the same loop without the duplicate rule; or swap `a[k]` with each `a[i ≥ k]`, recurse on `k + 1`, swap back
- **Permutations of a given string, unique and sorted (GFG):** this template on characters. With the *swap* method, use a `Set` per level to skip repeated characters: the swaps break the sorted order that "equal to the previous" relies on
- **Letter Combinations of a Phone Number (LeetCode 17):** slot k takes any letter mapped to digit k; no `used[]`, because each slot has its own pool
- **Generate Parentheses (LeetCode 22):** 2n slots, each `(` or `)`. Place `(` while `open < n`, `)` while `close < open`; invalid prefixes are never built
- **Permutation Sequence (LeetCode 60):** do not enumerate. The first slot is decided by `⌊(k − 1) / (n − 1)!⌋`, then recurse on the remainder

### The failure

- **Swap plus "skip if equal to the previous element".** On `"abbcc"` the swap method with that skip emits 32 permutations; only 30 are distinct. After the first swap the suffix is no longer sorted, so equal letters are no longer neighbours
- **Deduplicating at the end with a set.** Correct but wasteful: `"aaaaaaab"` has 8 unique permutations and 8! = 40,320 generated ones

:::interview
"How do you generate unique permutations of an array with duplicates?" — Sort it, fill positions with any unused element, and skip an element equal to its left neighbour unless that neighbour is already placed. That forces identical values to appear in their original left-to-right order, so each distinct arrangement is produced exactly once. O(n · n!) in the worst case, which is the size of the output.
:::
