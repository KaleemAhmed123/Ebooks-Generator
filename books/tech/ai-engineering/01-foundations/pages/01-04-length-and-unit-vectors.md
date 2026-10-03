## Length, and stripping it away

- A vector's **length** (its *magnitude* or *norm*) is how long the arrow is. Written `||v||`.
- Compute it with the Pythagorean theorem: square every entry, add, take the square root.
- `[3, 4]` has length `√(9 + 16) = 5`.


### A unit vector keeps the direction, drops the size

- A **unit vector** has length exactly 1. You make one by dividing a vector by its own length — this is **normalizing**.
- Normalizing throws away *how big* and keeps only *which way*.
- This is the setup for measuring meaning. Two embeddings might have different sizes for uninteresting reasons (a longer document, a louder sound). Normalize first, and only the direction — the meaning — remains.

:::mint
```python
import numpy as np
v = np.array([3.0, 4.0])

np.linalg.norm(v)        # 5.0  -> the length
v / np.linalg.norm(v)    # array([0.6, 0.8])  -> same direction, length 1
```
:::

:::warn
Never divide by the norm without checking it is non-zero. The zero vector `[0, 0]` has length 0, and normalizing it gives `nan` (not-a-number), which then silently poisons every later calculation.
:::
