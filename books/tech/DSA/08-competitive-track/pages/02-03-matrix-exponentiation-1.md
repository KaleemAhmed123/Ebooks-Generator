## Matrix Exponentiation <span class="lv lv3"></span>

When a DP problem asks for the N-th term of a sequence, and N is massive (like 10¹⁸), an O(N) linear loop will TLE. 
If the DP transitions are strictly linear (addition and multiplication by constants, no `max()` or `min()`), you can reduce the time complexity to O(log N) using Matrix Exponentiation.

### The Transformation

Consider the Fibonacci sequence: Fn = Fn-₁ + Fn-₂. We can represent this as matrix multiplication:

```
| Fn   |   | 1  1 |   | Fn-₁ |
|      | = |      | × |      |
| Fn-₁ |   | 1  0 |   | Fn-₂ |
```

Let the transition matrix be T = `[[1,1],[1,0]]`. Applying it recursively:

**State(N) = T^(N-1) × State(1)**

Matrix multiplication is associative, so T^(N-1) can be computed with **Fast Exponentiation** in O(log N) matrix multiplications instead of O(N).
