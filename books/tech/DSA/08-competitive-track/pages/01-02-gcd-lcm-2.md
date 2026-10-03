### Extended Euclidean Algorithm

Sometimes you don't just need the GCD. You need to solve the Diophantine equation:
$ Ax + By = text{GCD}(A, B) $
You need to find the specific integer coefficients x and y. This is required for finding Modular Multiplicative Inverses when the modulo is not prime.

```cpp
// Returns gcd, and updates x and y by reference
long long extended_gcd(long long a, long long b, long long& x, long long& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long d = extended_gcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - y1 * (a / b);
    return d;
}
```

### Properties to Memorize
- text{GCD}(A, B) = text{GCD}(A-B, B)
- A fraction A/B is reduced to its simplest form by dividing both by text{GCD}(A, B). This is how you hash fractions/slopes in geometry problems to avoid floating-point inaccuracies.
