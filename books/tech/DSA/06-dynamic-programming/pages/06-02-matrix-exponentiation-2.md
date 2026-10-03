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
