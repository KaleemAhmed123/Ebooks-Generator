## GCD and LCM <span class="lv lv3"></span>

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
