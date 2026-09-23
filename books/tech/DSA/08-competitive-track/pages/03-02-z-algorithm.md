## The Z-Algorithm 🔴

KMP is powerful, but its LPS array is sometimes unintuitive to bend for custom problems. 
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

### Implementation (C++)

The algorithm maintains a "Z-box" `[L, R]` which is the rightmost segment that matches the prefix. If our current index i is inside this box, we can copy the previously computed Z-value from the prefix to avoid redundant comparisons.

```cpp
vector<int> getZarr(string str) {
    int n = str.length();
    vector<int> Z(n, 0);
    int L = 0, R = 0; // The Z-box bounds
    
    for (int i = 1; i < n; ++i) {
        // If i is inside the box, we can copy the known value
        if (i <= R) {
            Z[i] = min(R - i + 1, Z[i - L]);
        }
        
        // Naive expansion past the box (if necessary)
        while (i + Z[i] < n && str[Z[i]] == str[i + Z[i]]) {
            Z[i]++;
        }
        
        // Update the Z-box if we expanded past the old R
        if (i + Z[i] - 1 > R) {
            L = i;
            R = i + Z[i] - 1;
        }
    }
    return Z;
}
```

### KMP vs Z-Algorithm

- KMP's `LPS[i]` tells you about the *suffix* ending at `i`.
- Z's `Z[i]` tells you about the *prefix* starting at `i`.

If a problem asks "Find the longest prefix of S that appears somewhere inside S", you run Z-algorithm and just find the `max(Z)`. (With KMP, it's harder to isolate this without doing a full secondary search).
