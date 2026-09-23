## Sieve of Eratosthenes 🔴

Number theory in competitive programming almost always starts with primes. If a problem involves divisors, factorization, or coprimes for numbers up to 10⁷, you need the Sieve.

### The Algorithm

The Sieve of Eratosthenes finds all prime numbers up to N in O(N log log N) time.
1. Create a boolean array `isPrime` of size N+1, initialized to `true`.
2. 0 and 1 are not prime. Set them to `false`.
3. Iterate `p` from 2 up to √N.
4. If `isPrime[p]` is true, it is a prime.
5. Iterate through all multiples of `p` (starting from p²) and mark them as `false`.

### The Implementation

```cpp
// C++ is preferred for CP math due to strict performance limits on 10^7 arrays
vector<bool> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            // Start crossing out multiples from p^2
            // (multiples smaller than p^2 were crossed out by smaller primes)
            for (int i = p * p; i <= n; i += p) {
                isPrime[i] = false;
            }
        }
    }
    return isPrime;
}
```

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
