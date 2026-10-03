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
