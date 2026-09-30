## The perceptron

- The **perceptron** is the smallest neural network: one neuron. Frank Rosenblatt built it in 1958; everything in this booklet descends from it.
- It weights each input, sums them, adds a **bias** (a constant that shifts the threshold), and fires `1` if the sum clears zero, else `0`.

<svg viewBox="0 0 360 130" role="img" aria-label="A single neuron: three inputs multiplied by weights, summed with a bias, passed through a step function to an output" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="18" y="33">x1</text><text x="18" y="68">x2</text><text x="18" y="103">x3</text>
  <circle cx="180" cy="65" r="26" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="62" text-anchor="middle">Σ w·x</text><text x="180" y="75" text-anchor="middle">+ b</text>
  <g stroke="#1a1a1a"><path d="M32 30 L156 58" marker-end="url(#p)"/><path d="M32 65 L154 65" marker-end="url(#p)"/><path d="M32 100 L156 72" marker-end="url(#p)"/></g>
  <text x="90" y="40" fill="#6b6b6b">w1</text><text x="90" y="60" fill="#6b6b6b">w2</text><text x="90" y="98" fill="#6b6b6b">w3</text>
  <path d="M206 65 L250 65" stroke="#1a1a1a" marker-end="url(#p)"/>
  <rect x="252" y="45" width="44" height="40" fill="none" stroke="#24405e"/><path d="M258 78 L276 78 L276 52 L290 52" stroke="#24405e" fill="none"/>
  <text x="318" y="68">out</text>
  <defs><marker id="p" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::mint
```python
import numpy as np
def perceptron(x, w, b):
    z = np.dot(w, x) + b        # weighted sum plus bias
    return 1 if z > 0 else 0    # step: fire or don't

perceptron(np.array([1., 0.]), w=np.array([0.6, 0.6]), b=-0.5)   # -> 1
```
:::

- The weights say how much each input matters; the bias sets how large the sum must be to fire. Training is just finding good values for both.
