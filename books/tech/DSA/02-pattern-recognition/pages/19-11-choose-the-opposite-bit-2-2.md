### Variations

- **Maximum subarray XOR (GFG):** XOR of `a[i..j]` = `P[j+1] ^ P[i]` over prefix XORs; insert 0 first, then query each prefix before inserting it (the prefix-difference move of 03-02, with XOR)
- **Maximum XOR With an Element From Array (LeetCode 1707):** offline. Sort queries by the limit m and nums ascending; insert every num ≤ m, then query. An empty trie answers −1
- **Count Pairs With XOR in a Range (LeetCode 1803):** store a count at each node; `count(< high + 1) − count(< low)`. At a 1-bit of the bound, every pair on the matching-bit branch is below it: add that subtree's count and continue down the other branch
- **Minimum XOR pair (GFG):** no trie needed. After sorting, the minimum XOR is always between two adjacent values

### The failure

- **Pairing the largest values.** On `[3, 10, 5, 25, 2, 8]` the two largest give 25 XOR 10 = 19; the answer is 5 XOR 25 = 28. XOR rewards differing high bits, not large numbers
- **Starting at bit 31 in JavaScript.** `1 << 31` is −2147483648, a negative 32-bit integer. Values below 2³¹ need bits 30 … 0 only; wider values need `BigInt` or a split into two halves

:::interview
"Max XOR of two numbers?" — I insert each number's bits, highest first, into a binary trie, and for each number walk the trie taking the opposite bit whenever it exists. Winning a higher bit beats every lower bit combined, so the greedy walk is optimal. O(n · 31) time and at most 31 · n + 1 trie nodes.
:::
