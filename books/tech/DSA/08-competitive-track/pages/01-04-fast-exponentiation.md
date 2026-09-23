## Fast Exponentiation (Binary Exponentiation) 🔴

How do you calculate A^B pmod M when B = 10¹⁸?
A standard `for` loop taking O(B) time will result in a Time Limit Exceeded (TLE). We need to calculate it in O(log B) time.

### The Algorithm

Binary Exponentiation exploits the binary representation of the exponent B.
Instead of multiplying by A repeatedly, we repeatedly square the base.

Consider 3¹³. In binary, 13 is `1101`.
13 = 8 + 4 + 1
Therefore, 3¹³ = 3⁸ times 3⁴ times 3¹.

We can generate 3¹, 3², 3⁴, 3⁸ simply by taking the previous number and multiplying it by itself (squaring it).

### Implementation (Iterative)

The iterative approach is universally preferred in CP because it is faster and uses strictly O(1) memory (no recursion stack).

```cpp
long long power(long long base, long long exp, long long mod = 1e9 + 7) {
    long long res = 1;
    base %= mod;
    
    while (exp > 0) {
        // If the lowest bit of exp is 1, multiply the current base into the result
        if (exp % 2 == 1) {
            res = (res * base) % mod;
        }
        // Square the base for the next bit
        base = (base * base) % mod;
        // Shift exp right by 1
        exp /= 2;
    }
    return res;
}
```

### Why it matters

1. **Modular Inverse:** As we will see on the next page, Fast Exponentiation is the primary way to calculate the modular inverse (using Fermat's Little Theorem).
2. **Matrix Exponentiation:** The exact same algorithm applies to Matrices. If you replace `long long` with a 2D Matrix class, you can calculate Matrix powers in O(log N), which solves massive linear recurrence DP problems.
3. **Geometry and Graphs:** Counting paths of length exactly K in an unweighted graph is equal to raising the Adjacency Matrix to the power of K.
