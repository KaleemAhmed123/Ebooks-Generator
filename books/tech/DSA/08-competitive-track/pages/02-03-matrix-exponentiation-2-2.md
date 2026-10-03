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
