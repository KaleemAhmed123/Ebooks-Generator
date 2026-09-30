## Numerical stability

- Computers store numbers with limited precision (**floating point**). Push past the range and math silently breaks.
- **Overflow**: a number too large becomes `inf`. **Underflow**: a number too small becomes `0`. Either poisons everything downstream, usually surfacing as `nan` (not-a-number).
- Probabilities are the danger zone: multiply many small ones and you underflow to zero fast.

### The fixes you will reach for constantly

- **Work in log space.** Multiplying probabilities becomes *adding* their logs — no underflow. This is why loss functions use `log`.
- **The log-sum-exp trick.** Softmax exponentiates scores, which overflows for large ones. Subtract the maximum score first: the result is identical, but nothing overflows.

<svg viewBox="0 0 380 60" role="img" aria-label="Subtracting the max before exponentiating keeps softmax from overflowing while giving the same result" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="10" fill="#1a1a1a">
  <rect x="8" y="16" width="150" height="28" fill="#fdecea" stroke="#c0392b"/><text x="83" y="34" text-anchor="middle">exp(1000) → inf</text>
  <text x="166" y="34" font-family="Georgia,serif">→ subtract max →</text>
  <rect x="255" y="16" width="118" height="28" fill="#eafaf0" stroke="#1a3a2a"/><text x="314" y="34" text-anchor="middle">exp(0) = 1</text>
</svg>

:::mint
```python
import numpy as np
def stable_softmax(x):
    x = x - np.max(x)          # shift so the largest is 0 — no overflow
    e = np.exp(x)
    return e / e.sum()
```
:::

:::warn
`nan` propagates: any arithmetic touching one `nan` becomes `nan`, so a single bad value silently corrupts an entire batch. When a loss suddenly reads `nan` mid-training, suspect a `log(0)`, a divide-by-zero, or a learning rate large enough to overflow.
:::
