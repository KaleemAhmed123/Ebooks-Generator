## GCD and LCM 🔴

The Greatest Common Divisor (GCD) and Least Common Multiple (LCM) are the duct tape of competitive programming math.

### Euclidean Algorithm (GCD)

The Euclidean algorithm finds the GCD of two numbers in O(log(min(A, B))) time.
It is based on the principle that the GCD of two numbers also divides their difference: `gcd(a, b) = gcd(b, a % b)`.

```cpp
// Recursive C++
long long gcd(long long a, long long b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// Iterative C++ (Slightly faster, avoids recursion limit)
long long gcd_iter(long long a, long long b) {
    while (b != 0) {
        a %= b;
        swap(a, b);
    }
    return a;
}
```
*(Note: C++17 includes `std::gcd` in `<numeric>`. Always use the standard library if available).*

### Least Common Multiple (LCM)

The LCM is directly derived from the GCD using the formula:
$ A times B = text{GCD}(A, B) times text{LCM}(A, B) $

**The Overflow Trap:**
If you write `lcm = (a * b) / gcd(a, b)`, the multiplication `a * b` might overflow a 64-bit integer before the division happens.
**The Fix:** Always divide first.

```cpp
long long lcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    return (a / gcd(a, b)) * b;
}
```

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
