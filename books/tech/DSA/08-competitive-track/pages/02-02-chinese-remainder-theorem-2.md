### Implementation (C++)

```cpp
// Returns the unique X modulo (product of m_i)
long long crt(const vector<long long>& a, const vector<long long>& m) {
    long long M = 1;
    for (long long mod : m) M *= mod;
    
    long long res = 0;
    for (int i = 0; i < a.size(); i++) {
        long long Mi = M / m[i];
        // modInverseComposite uses Extended Euclidean (see previous chapter)
        long long yi = modInverseComposite(Mi, m[i]); 
        
        // (a[i] * Mi * yi) % M
        long long term = (a[i] % M * Mi % M * yi % M) % M;
        res = (res + term) % M;
    }
    return res;
}
```

### Advanced Application: Breaking up a massive modulo

Sometimes a problem asks for an answer modulo M, but M is **not prime**. It might be a composite number like 10¹⁴. This breaks Fermat's Little Theorem and Lucas' Theorem for combinations.
**The Trick:** 
1. Prime-factorize the massive modulo M into p₁k_¹ times p₂k_² dots
2. Solve the problem separately for each prime-power modulo to get answers a₁, a₂ dots
3. Use CRT to merge the answers back together to get the final answer modulo M.
