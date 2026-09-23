## Modular Inverse 🔴

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

### Method 2: Extended Euclidean (When M is NOT Prime)

If M is not prime, Fermat's Little Theorem fails. We must use the Extended Euclidean Algorithm.
We are trying to solve (B times X) pmod M = 1, which can be rewritten as the Diophantine equation:
B times X + M times Y = 1

The Extended Euclidean algorithm solves exactly this.
*Warning: The inverse only exists if text{GCD}(B, M) = 1 (they are coprime).*

```cpp
long long modInverseComposite(long long b, long long m) {
    long long x, y;
    long long g = extended_gcd(b, m, x, y); // From the GCD page
    
    if (g != 1) {
        // Inverse doesn't exist!
        return -1; 
    } else {
        // x might be negative, so add m and modulo
        return (x % m + m) % m;
    }
}
```

### The Combinatorics Dependency

You will use Modular Inverse constantly in Combinatorics problems. Calculating "N choose K" (^N C _K) requires evaluating N!/K!(N-K)!. Because you must modulo 10⁹+7, you will compute the factorials, and then multiply by the modular inverse of the denominator.
