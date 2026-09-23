## Modular Arithmetic 🔴

In competitive programming, the answer is often astronomically large. Problems will ask you to "return the answer modulo 10⁹ + 7". 

If you just calculate the massive answer using BigInt and apply the modulo at the very end, you will get a Time Limit Exceeded (TLE) because arbitrary-precision arithmetic is slow. 
You must apply the modulo at **every single step** of your calculation.

### The Core Properties

Modulo distributes perfectly over Addition, Subtraction, and Multiplication.

1. **Addition:**
   (A + B) pmod M = ((A pmod M) + (B pmod M)) pmod M

2. **Multiplication:**
   (A times B) pmod M = ((A pmod M) times (B pmod M)) pmod M

3. **Subtraction (The Negative Trap):**
   (A - B) pmod M = ((A pmod M) - (B pmod M)) pmod M
   - **The Trap:** In C++ and Java, the `%` operator is a *remainder*, not a true mathematical modulo. `-5 % 3` returns `-2`, not `1`. 
   - If B > A, the result of (A - B) pmod M will be negative. If you use this as an array index, your program will crash.
   - **The Fix:** Always add M before applying the final modulo.
   - `safe_sub = (A - B % M + M) % M;`

### Division (The Fatal Trap)

Modulo **does not** distribute over division!
$ ≤ft(A/Bright) pmod M ≠ A pmod M/B pmod M $

If the mathematical formula requires you to divide by B, you cannot just divide. You must multiply by the **Modular Multiplicative Inverse** of B. 
A / B pmod M ≡ A times B⁻¹ pmod M.
*(The next chapters explain how to find B⁻¹).*

### Standard Modular Implementation (C++)

To avoid littering your code with `% MOD`, define a struct or a set of safe inline functions.

```cpp
const long long MOD = 1e9 + 7;

inline long long add(long long a, long long b) {
    return (a + b) % MOD;
}

inline long long sub(long long a, long long b) {
    return (a - b % MOD + MOD) % MOD;
}

inline long long mul(long long a, long long b) {
    // Note: If MOD is 1e9+7, a*b can reach 1e18, fitting in long long.
    // If MOD is larger, you may need __int128.
    return (a * b) % MOD;
}
```
