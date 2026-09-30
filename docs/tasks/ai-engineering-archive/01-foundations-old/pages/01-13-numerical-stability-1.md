## Floating point, overflow, underflow, and log-sum-exp

- **Float32** stores ~7 significant decimal digits; range ≈ ±3.4×10³⁸. **Float16** stores ~3 digits; maximum representable value = 65,504. **bfloat16** — Google's 16-bit format with the same 8-bit exponent as float32 (same range) but only 7 mantissa bits; preferred for training on TPUs and NVIDIA Ampere+ GPUs
- **Overflow** — a result too large to represent, returned as `inf`. `exp(89)` overflows float32 (e⁸⁹ ≈ 4.5×10³⁸, just at the edge; `exp(90)` returns inf)
- **Underflow** — a result too small, rounded to zero. `exp(−90)` underflows to 0.0 in float32. Feeding zero into `log()` then returns `-inf`
- **Catastrophic cancellation** — subtracting two nearly equal floating-point numbers leaves only rounding noise in the significant digits. `1.0000001 − 1.0000000` in float32 has ~19% relative error

### The log-sum-exp trick — the fix for softmax overflow

<svg viewBox="0 0 460 76" role="img" aria-label="Softmax with large logits: exp overflows to inf. The fix: subtract the max logit before exponentiation, then add it back in log space" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="4" y="8" width="200" height="60" rx="3" fill="#fff0f0" stroke="#c04040"/>
  <text x="104" y="26" text-anchor="middle" font-weight="bold" fill="#c04040">Naive softmax — breaks</text>
  <text x="104" y="44" text-anchor="middle">exp([100, 101, 102])</text>
  <text x="104" y="60" text-anchor="middle" fill="#c04040">→ [inf, inf, inf] / inf = NaN</text>
  <rect x="256" y="8" width="200" height="60" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="356" y="26" text-anchor="middle" font-weight="bold" fill="#24405e">Stable softmax — correct</text>
  <text x="356" y="44" text-anchor="middle">subtract max → [0, 1, 2]</text>
  <text x="356" y="60" text-anchor="middle" fill="#24405e">exp([0,1,2]) → finite ✓</text>
</svg>

:::mint
```python
import numpy as np
def stable_softmax(x):
    e = np.exp(x - x.max())   # shift by max — doesn't change probabilities
    return e / e.sum()

def log_sum_exp(x):
    m = x.max()
    return m + np.log(np.exp(x - m).sum())   # numerically safe log of sum of exp
```
:::
