## Rolling Hash (Rabin-Karp) 🔴

Sometimes you need to compare two strings of length 10⁵ for equality. Doing it character-by-character takes O(N). 
What if you need to compare 10⁵ pairs of substrings? That's O(N²).
Rolling Hash reduces string comparison to O(1) by converting the string into a single integer.

### The Polynomial Hash

We treat the string as a polynomial. For a string S and a prime base P and a modulo M:
text{Hash}(S) = (S₀ times P⁰ + S₁ times P¹ + S₂ times P² dots) pmod M

Usually, we choose P = 31 (for lowercase English letters) and M = 10⁹ + 9.

### The Rolling Property

If you know the hash of the substring S[0 dots 4], how do you get the hash of S[1 dots 5]? (A Sliding Window).
Instead of recalculating from scratch, you:
1. Subtract the first character.
2. Divide by P (or multiply by the Modular Inverse of P).
3. Add the new character multiplied by P⁴.

This updates the hash in O(1) time!

### Prefix Hashes (O(1) Substring Hashing)

By precomputing the hash of every prefix of a string, we can extract the hash of *any arbitrary substring* S[L dots R] in O(1) time.

Let H[i] be the hash of the prefix S[0 dots i].
To get the hash of S[L dots R], we take H[R] and "chop off" H[L-1]. But we must shift H[L-1] by multiplying it by P(R ⁻ L ⁺ ¹) before subtracting.

```cpp
const long long MOD = 1e9 + 9;
const long long P = 31;

vector<long long> H; // Prefix hashes
vector<long long> p_pow; // Precomputed powers of P

void buildHashes(string s) {
    int n = s.length();
    H.assign(n, 0);
    p_pow.assign(n, 1);
    
    // Precompute powers of P
    for (int i = 1; i < n; i++) 
        p_pow[i] = (p_pow[i-1] * P) % MOD;
        
    // Precompute prefix hashes
    H[0] = (s[0] - 'a' + 1);
    for (int i = 1; i < n; i++) {
        H[i] = (H[i-1] + (s[i] - 'a' + 1) * p_pow[i]) % MOD;
    }
}

// O(1) query for hash of S[L...R]
long long getSubHash(int L, int R) {
    if (L == 0) return H[R];
    long long hash = (H[R] - H[L-1] + MOD) % MOD;
    
    // Because we defined our hash with P^0 at index 0,
    // a substring starting at L has its values multiplied by P^L.
    // We must multiply the other string by P^L to compare them, 
    // or multiply this by the modular inverse of P^L. 
    // Usually, we just multiply the smaller hash by the power difference to compare.
    return hash; 
}
```

### The Collision Trap

Hash functions can collide (two different strings mapping to the same integer). 
To prevent "Hacks" in competitive programming (where opponents submit test cases specifically designed to collide your M = 10⁹+7), always use **Double Hashing**: Compute the hash using two different Modulos (e.g., 10⁹+7 and 10⁹+9). Only declare a match if both hashes match. The collision probability drops to 1 / 10¹⁸.
