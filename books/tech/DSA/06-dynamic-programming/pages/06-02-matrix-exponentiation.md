## Matrix Exponentiation 🔴

This is an advanced mathematical optimization used specifically when N is absurdly large (e.g., N = 10¹⁸). 

- **The Problem:** Find the Nth Fibonacci number, modulo 10⁹ + 7.
- If N = 10¹⁸, even the O(N) O(1)-space DP will take decades to run. We need an O(log N) algorithm.

### The Linear Recurrence

Fibonacci is a linear recurrence: `F(N) = 1 * F(N-1) + 1 * F(N-2)`.
This relationship can be perfectly modeled as Matrix Multiplication.

$$
\begin{bmatrix} F_n \\ F_{n-1} \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} F_{n-1} \\ F_{n-2} \end{bmatrix}
$$

If we apply this recursively all the way down to the base cases F₁ and F₀:

$$
\begin{bmatrix} F_n \\ F_{n-1} \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}^{n-1} \begin{bmatrix} F_1 \\ F_0 \end{bmatrix}
$$

### The O(log N) Speedup

The magic here is that calculating A^N (where A is a matrix) does not require N multiplications. We can use **Binary Exponentiation** (Fast Power).
To calculate A¹⁶, you don't do A times A dots 16 times.
You calculate A². Then square it to get A⁴. Square it for A⁸. Square it for A¹⁶.
That's 4 matrix multiplications instead of 16. This drops the time complexity to O(log N).

### Implementation Concept

```ts
// Helper function to multiply two 2x2 matrices modulo M
function multiplyMatrix(A: number[][], B: number[][]): number[][] {
  const MOD = 1e9 + 7;
  const C = [[0, 0], [0, 0]];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        // Use BigInt if JS precision becomes an issue with massive numbers
        C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
      }
    }
  }
  return C;
}

// Binary Exponentiation for Matrices
function powerMatrix(A: number[][], p: number): number[][] {
  let res = [[1, 0], [0, 1]]; // Identity Matrix
  let base = A;
  
  while (p > 0) {
    if (p % 2 === 1) res = multiplyMatrix(res, base);
    base = multiplyMatrix(base, base);
    p = Math.floor(p / 2);
  }
  return res;
}
```

### When to use it

If a DP problem has a state that only depends on a fixed, small number of previous states (e.g., i-1, i-2, i-3), and the transition is purely addition/multiplication by constants, **AND** N ≥ 10⁹, it is a Matrix Exponentiation problem.
