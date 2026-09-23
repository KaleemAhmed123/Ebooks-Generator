## FFT and NTT (Concepts) 🔴

The Fast Fourier Transform (FFT) is the final boss of competitive programming math. If a problem reduces to polynomial multiplication, and the polynomials have degree N = 10⁵, standard multiplication takes O(N²). FFT does it in O(N log N).

### Polynomial Multiplication

In CP, you rarely see problems that explicitly say "Multiply these polynomials." Instead, you see combinatorics or probability problems that hide polynomial multiplication.

**Example Problem:** "You have two arrays A and B. Find the number of pairs (A_i, B_j) such that A_i + B_j = K, for all possible values of K."

**The Transformation:** 
Turn the arrays into polynomials where the exponents represent the numbers, and the coefficients represent the frequencies.
- If A = [1, 1, 2], Polynomial P_A = 2x¹ + 1x².
- If B = [2, 3], Polynomial P_B = 1x² + 1x³.

If we multiply P_A times P_B:
(2x¹ + 1x²)(1x² + 1x³) = 2x³ + 3x⁴ + 1x⁵
The coefficient of x^K in the result is exactly the number of ways to form sum K! 
Because A_i + B_j = K, xA_i times xB_j = xA_i ⁺ B_j = x^K.

### How FFT Works (High Level)

A polynomial of degree N is uniquely defined by evaluating it at N+1 distinct points.
FFT is an ingenious algorithm that evaluates a polynomial at N very specific points (the Complex Roots of Unity) in O(N log N) time instead of O(N²).

**The FFT Pipeline for Multiplication:**
1. Use FFT to evaluate P_A and P_B at N complex points (O(N log N)).
2. Multiply the evaluated points together in O(N). (Pointwise multiplication is trivial).
3. Use the Inverse FFT to convert those multiplied points back into polynomial coefficients (O(N log N)).

### Number Theoretic Transform (NTT)

FFT uses complex numbers and floating-point math, which can cause precision issues. 
In CP, we usually need the answer modulo a prime (like 998244353).
NTT is the exact same algorithm as FFT, but instead of Complex Roots of Unity, it uses **Primitive Roots** under a modulo. 

This keeps all math as precise integers. (The prime 998244353 is famous in CP specifically because it is "NTT-friendly": 998244353 = 119 times 2²³ + 1, which allows arrays of size up to 2²³).

### Implementation Note

You do not write FFT from scratch in a contest. It is a 100-line black-box template involving bit-reversal permutations. If you see a problem requiring it, you recognize the pattern, convert your data to polynomials, and call `multiply(poly1, poly2)`.
