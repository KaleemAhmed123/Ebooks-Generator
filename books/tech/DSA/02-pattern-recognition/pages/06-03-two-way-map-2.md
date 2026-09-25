### Variations

- **Isomorphic Strings (LeetCode 205):** the same loop with characters on both sides. Equivalent one-map trick: compare the *shape* signatures `0,1,1` of both strings (page 06-01)
- **Find and Replace Pattern (LeetCode 890) / Match specific pattern (GFG):** run the two-way check of each word against the pattern, or compare shape signatures, which lets you precompute the pattern's once
- **Word Pattern II (LeetCode 291):** no spaces, so the split is unknown. The two maps stay; the split becomes a backtracking choice (try every cut, 13-09), with the maps undone on the way back

### The failure

- **One map only.** `"abba"` against `"dog dog dog dog"` passes a forward-only check: a→dog and b→dog each look consistent. The reverse map is what rejects it
- **Forgetting the length check.** `"aaa"` against `"dog dog"` has no conflict in either map for the first two symbols; without comparing lengths the function returns `true`

:::interview
"Why do you need two hash maps?" — A pattern match is a bijection. The forward map enforces "each symbol has one image", the reverse map enforces "no two symbols share an image". Either alone accepts wrong inputs: forward-only accepts `abba` ↔ `dog dog dog dog`, reverse-only accepts `aaaa` ↔ `dog cat cat dog`. Two maps, one pass, O(n).
:::
