### Standard Modular Implementation (C++)

To avoid littering your code with `% MOD`, define a struct or a set of safe inline functions.

```cpp
const long long MOD = 1e9 + 7;

inline long long add(long long a, long long b) {
    return (a + b) % MOD;
}

inline long long sub(long long a, long long b) {
    return (a - b % MOD + MOD) % MOD;
}

inline long long mul(long long a, long long b) {
    // Note: If MOD is 1e9+7, a*b can reach 1e18, fitting in long long.
    // If MOD is larger, you may need __int128.
    return (a * b) % MOD;
}
```
