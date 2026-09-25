### Other codes, same loop

- **Continuous Subarray Sum (LeetCode 523):** "length ≥ 2, sum a multiple of k". Same remainder code, but store the **first index** and accept only `i − first ≥ 2`. Never overwrite a first index: a later one only shortens the subarray
- **Longest subarray with equal odd and even elements (GFG):** code = running `(+1 for odd, −1 for even)`. The 0/1 version is Contiguous Array (LeetCode 525); any two-class count works the same way
- **Find the Longest Substring Containing Vowels in Even Counts (LeetCode 1371):** code = a 5-bit mask, bit v flipped by each vowel v. Equal masks mean every vowel's count changed by an even number in between
- **Number of Wonderful Substrings (LeetCode 1915) <span class="lv lv2"></span>:** at most one letter odd. For each prefix mask `m`, count earlier masks equal to `m` *and* to `m ^ (1 << b)` for each of the 10 letters

### The failure

- **Negative remainders.** In JavaScript, Java and C++, `−2 % 5` is `−2`, not `3`. On `[−2, 5]` with k = 5 the prefixes are −2 and 3: they bracket `[5]`, but the map files them under different keys and returns 0 instead of 1. Normalise with `((s % k) + k) % k`. Python's `%` is already non-negative, which is why ported solutions break silently
- **Forgetting the empty prefix.** Seed the map with `{0: 1}` (for counting) or `{0: −1}` (for first index). Without it, every valid subarray that starts at index 0 is missed

:::interview
"How do you spot that a prefix map applies?" — I ask whether the property is preserved by *subtracting* two prefixes. Sums are, remainders mod k are, parities are under XOR. If yes, a valid subarray is a pair of equal codes, and one hash map turns the O(n²) pair search into O(n). If the property is a max or a min, subtraction does not work, and I look at windows or stacks instead.
:::
