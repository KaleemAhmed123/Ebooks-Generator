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
