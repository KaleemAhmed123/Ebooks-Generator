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
