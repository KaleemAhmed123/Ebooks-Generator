### The failure

- **`i > 0` instead of `i > start`.** That skips every value equal to its left neighbour in the whole array, including legitimate children. `[1, 1, 2, 5, 6, 7, 10]` with target 8 loses `[1, 1, 6]`
- **Deduplicating with a set of joined strings.** It returns the right answer after generating every duplicate first. With many equal values that is exponentially more work than skipping at the source

:::interview
"How do you avoid duplicate combinations without a hash set?" — Sort, then in the loop over candidates for the next position, skip a value that equals its previous sibling at the same depth: `i > start && c[i] === c[i − 1]`. Equal siblings would generate identical subtrees; a child equal to its parent is still allowed, which is how combinations with repeated values are formed.
:::
