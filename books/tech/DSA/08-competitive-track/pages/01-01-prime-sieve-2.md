### The O(1) Factorization Trick

The standard sieve just tells you *if* a number is prime. By modifying the sieve slightly, we can compute the **Smallest Prime Factor (SPF)** for every number. This allows us to prime-factorize any number up to N in O(log (text{value})) time.

```cpp
vector<int> buildSPF(int n) {
    vector<int> spf(n + 1);
    // Initially, assume every number is its own smallest prime factor
    for (int i = 1; i <= n; i++) spf[i] = i;
    
    for (int p = 2; p * p <= n; p++) {
        if (spf[p] == p) { // p is prime
            for (int i = p * p; i <= n; i += p) {
                // Only update if it hasn't been marked by a smaller prime
                if (spf[i] == i) {
                    spf[i] = p;
                }
            }
        }
    }
    return spf;
}

// O(log X) factorization query
vector<int> factorize(int x, const vector<int>& spf) {
    vector<int> factors;
    while (x != 1) {
        factors.push_back(spf[x]);
        x /= spf[x];
    }
    return factors;
}
```

### When to use it
- "Find the number of pairs with GCD > 1" (Factorize all numbers in O(log X), use a hash map on the factors).
- "Find the sum of divisors for all numbers from 1 to N".
