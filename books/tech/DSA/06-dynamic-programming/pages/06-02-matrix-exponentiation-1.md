## Matrix Exponentiation <span class="lv lv3"></span>

This is an advanced mathematical optimization used specifically when N is absurdly large (e.g., N = 10¹⁸). 

- **The Problem:** Find the Nth Fibonacci number, modulo 10⁹ + 7.
- If N = 10¹⁸, even the O(N) O(1)-space DP will take decades to run. We need an O(log N) algorithm.

### The Linear Recurrence

Fibonacci is a linear recurrence: `F(N) = 1 * F(N-1) + 1 * F(N-2)`.
This relationship can be perfectly modeled as Matrix Multiplication.

```
| Fn   |   | 1  1 |   | Fn-₁ |
|      | = |      | × |      |
| Fn-₁ |   | 1  0 |   | Fn-₂ |
```

Apply recursively down to base cases F₁ and F₀:

**[Fn, Fn-₁]ᵀ = T^(n-1) × [F₁, F₀]ᵀ** where T = `[[1,1],[1,0]]`

### The O(log N) Speedup

Calculating A^N (where A is a matrix) does not require N multiplications. We can use **Binary Exponentiation** (Fast Power).
To calculate A¹⁶, you don't do A times A dots 16 times.
You calculate A². Then square it to get A⁴. Square it for A⁸. Square it for A¹⁶.
That's 4 matrix multiplications instead of 16. This drops the time complexity to O(log N).
