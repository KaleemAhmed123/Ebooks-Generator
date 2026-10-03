### Implementation (C++)

```cpp
const int MAXN = 2e5 + 5;
const long long MOD = 1e9 + 7;

long long fact[MAXN];
long long invFact[MAXN];

// Assuming power() is already defined (Fast Exponentiation)
long long power(long long base, long long exp) { /* ... */ }

void precompute() {
    fact[0] = 1;
    invFact[0] = 1;
    
    // 1. Compute all factorials
    for (int i = 1; i < MAXN; i++) {
        fact[i] = (fact[i - 1] * i) % MOD;
    }
    
    // 2. Compute the inverse of the largest factorial
    invFact[MAXN - 1] = power(fact[MAXN - 1], MOD - 2);
    
    // 3. Work backwards to compute all other inverses in O(1) each
    for (int i = MAXN - 2; i >= 1; i--) {
        invFact[i] = (invFact[i + 1] * (i + 1)) % MOD;
    }
}

// O(1) query
long long nCr(int n, int k) {
    if (k < 0 || k > n) return 0;
    long long num = fact[n];
    long long den = (invFact[k] * invFact[n - k]) % MOD;
    return (num * den) % MOD;
}
```

### When to use it
- "Find the number of paths on a grid from (0,0) to (N,M) moving right and down." The answer is exactly (N⁺M) C _N.
- Anytime you are picking subsets of elements.
