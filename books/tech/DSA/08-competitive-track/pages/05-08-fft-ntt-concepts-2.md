### Number Theoretic Transform (NTT)

FFT uses complex numbers and floating-point math, which can cause precision issues. 
In CP, we usually need the answer modulo a prime (like 998244353).
NTT is the exact same algorithm as FFT, but instead of Complex Roots of Unity, it uses **Primitive Roots** under a modulo. 

This keeps all math as precise integers. (The prime 998244353 is famous in CP specifically because it is "NTT-friendly": 998244353 = 119 times 2²³ + 1, which allows arrays of size up to 2²³).

### Implementation Note

You do not write FFT from scratch in a contest. It is a 100-line black-box template involving bit-reversal permutations. If you see a problem requiring it, you recognize the pattern, convert your data to polynomials, and call `multiply(poly1, poly2)`.
