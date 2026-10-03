## The Z-Algorithm <span class="lv lv3"></span>

KMP works, but its LPS array is sometimes unintuitive to bend for custom problems. 
The Z-Algorithm solves the exact same string matching problem in O(|T| + |P|) time, but produces an array that is often much easier to reason about.

### The Z-Array

Given a string S of length N, the Z-array `Z[i]` stores the length of the longest substring starting at S[i] which is also a **prefix** of S.
- `Z[0]` is undefined (or N).
- If `S = "aabcaabxaaaz"`
- `Z[4]` (starting at `"aabx..."`) is 3, because `"aab"` matches the prefix of S.

### The Search Trick

To find a Pattern P inside a Text T, you just concatenate them with a dummy character that doesn't exist in either string:
`S = P + "$" + T`

Compute the Z-array for S. Any index i where `Z[i] == P.length()` means the pattern exists at that position in the Text!
