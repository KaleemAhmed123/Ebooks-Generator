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

### The Base Matrix Class (C++)

```cpp
const long long MOD = 1e9 + 7;

struct Matrix {
    vector<vector<long long>> mat;
    int size;

    Matrix(int n) : size(n) {
        mat.assign(n, vector<long long>(n, 0));
    }

    // Initialize as Identity Matrix
    void makeIdentity() {
        for (int i = 0; i < size; i++) mat[i][i] = 1;
    }

    // Matrix Multiplication Operator
    Matrix operator*(const Matrix& other) const {
        Matrix res(size);
        for (int i = 0; i < size; i++) {
            for (int k = 0; k < size; k++) {
                for (int j = 0; j < size; j++) {
                    res.mat[i][j] = (res.mat[i][j] + mat[i][k] * other.mat[k][j]) % MOD;
                }
            }
        }
        return res;
    }
};
```

### The O(log N) Exponentiation

This is identical to the Fast Exponentiation code for integers, just using the `Matrix` class.

```cpp
Matrix power(Matrix base, long long exp) {
    Matrix res(base.size);
    res.makeIdentity(); // Start with Identity matrix (the equivalent of 1)
    
    while (exp > 0) {
        if (exp % 2 == 1) res = res * base;
        base = base * base;
        exp /= 2;
    }
    return res;
}
```

### Handling Constants in Transitions

What if the recurrence is Fn = 2 Fn-₁ + 3 Fn-₂ + 5? 
That +5 constant prevents a standard 2x2 matrix. 
**The Trick:** Add a dummy state variable that is always 1.

```
| Fn   |   | 2  3  5 |   | Fn-₁ |
| Fn-₁ | = | 1  0  0 | × | Fn-₂ |
| 1    |   | 0  0  1 |   | 1    |
```

By tracking a constant `1` in the state vector, the matrix can multiply it by `5` and add it to the next term, perfectly embedding constants into the linear transformation.
