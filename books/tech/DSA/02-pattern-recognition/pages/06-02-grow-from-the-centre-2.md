### Variations

- **Palindromic Substrings (LeetCode 647):** count instead of keep: every successful expansion step is one more palindrome
- **Valid Palindrome II (LeetCode 680):** two pointers from the ends; at the first mismatch, try skipping the left or the right character once and check the rest directly
- **Break a Palindrome (LeetCode 1328):** change the first non-`'a'` in the first half to `'a'`; if the first half is all `'a'`, change the last character to `'b'`. A length-1 string cannot be broken
- **Minimum characters to add at the front to make a palindrome (GFG):** the answer is `n − (longest palindromic prefix)`. Centres give O(n²); the O(n) way runs KMP's failure function on `s + '#' + reverse(s)` (KMP, Module 08)
- **Longest Palindromic Subsequence:** *not* this pattern. Subsequences may skip characters, so centres do not apply; it is a range DP (the `f(i, j)` shape of 17-02), or LCS of the string and its reverse (Module 06, 03-01)

### The failure

- **Checking only odd centres.** `"cbbd"` has no odd palindrome longer than 1, and the answer `"bb"` is found only from the gap between the b's
- **Checking every substring.** O(n²) substrings × O(n) check each is O(n³): 10⁹ steps at n = 1,000, which is LeetCode 5's limit

:::interview
"Is there a faster way than O(n²)?" — Manacher's algorithm finds every centre's radius in O(n) by reusing mirrored radii inside the rightmost palindrome found so far. In an interview I state it, then write expand-around-centre: O(n²) time, O(1) space, and hard to get wrong.
:::
