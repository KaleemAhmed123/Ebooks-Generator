## Chinese Remainder Theorem (CRT) 🔴

The Chinese Remainder Theorem is a powerful tool used when a problem gives you a series of remainders and asks you to find the original number.

### The Core Problem

"Find a number X such that:
X ≡ 2 pmod 3
X ≡ 3 pmod 5
X ≡ 2 pmod 7"

CRT guarantees that if the moduli (3, 5, 7) are pairwise coprime (meaning the GCD of any pair is 1), there exists a unique solution for X modulo the product of all moduli (3 times 5 times 7 = 105).

### The Construction Algorithm

Let the equations be X ≡ a_i pmod{m_i}.
Let M = m₁ times m₂ times dots times m_k.

For each equation i:
1. Let M_i = M / m_i (the product of all *other* moduli).
2. Find y_i, which is the modular multiplicative inverse of M_i modulo m_i. (So, M_i times y_i ≡ 1 pmod{m_i}).
3. The answer X is the sum of (a_i times M_i times y_i) for all i, modulo M.

**Why it works:**
Look at (a₁ times M₁ times y₁). 
If we take this modulo m₁, since M₁ times y₁ ≡ 1 pmod{m₁}, it reduces to just a₁.
If we take this modulo m₂, since M₁ contains m₂ as a factor, it becomes 0. 
Thus, each term perfectly isolates its own remainder without interfering with the others!

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
