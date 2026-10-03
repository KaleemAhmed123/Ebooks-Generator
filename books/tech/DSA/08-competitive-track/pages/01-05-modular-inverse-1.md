## Modular Inverse <span class="lv lv3"></span>

As established in the Modular Arithmetic section, you cannot divide under a modulo.
To calculate A/B pmod M, you must calculate A times B⁻¹ pmod M.

B⁻¹ is the **Modular Multiplicative Inverse**. It is an integer X such that (B times X) pmod M = 1.

There are two ways to find it, depending on whether M is prime.

### Method 1: Fermat's Little Theorem (When M is Prime)

If M is prime (like 10⁹ + 7), Fermat's Little Theorem states:
BM⁻¹ ≡ 1 pmod M

If we divide both sides by B, we get:
BM⁻² ≡ B⁻¹ pmod M

This means the inverse of B is simply B raised to the power of M-2.
Since we already have an O(log N) Fast Exponentiation function, calculating the inverse is trivial.

```cpp
long long modInversePrime(long long b, long long mod = 1e9 + 7) {
    // power() is the Fast Exponentiation function from the previous page
    return power(b, mod - 2, mod); 
}

// Example: (A / B) % MOD
long long modDivide(long long a, long long b, long long mod = 1e9 + 7) {
    long long inv = modInversePrime(b, mod);
    return (a % mod * inv) % mod;
}
```
