## A matrix is a function

- Multiplying a vector by a matrix is not just arithmetic — it *moves* the vector to a new place.
- Read `M @ v` as "apply the transformation `M` to the point `v`." Input a vector, output a vector.
- Every operation a neural network performs on your data is one of these moves, stacked.

### The classic moves

<svg viewBox="0 0 460 120" role="img" aria-label="A unit square under three transformations: rotation, scaling, and projection onto a line" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g transform="translate(30,20)">
    <rect x="0" y="30" width="40" height="40" fill="#e8f4fd" stroke="#24405e"/>
    <g transform="translate(55,50) rotate(-30)"><rect x="0" y="-20" width="40" height="40" fill="none" stroke="#1a3a2a"/></g>
    <text x="45" y="95" text-anchor="middle" font-weight="bold">rotate</text>
    <text x="45" y="107" text-anchor="middle" fill="#6b6b6b">turn, keep size</text>
  </g>
  <g transform="translate(180,20)">
    <rect x="0" y="30" width="40" height="40" fill="#e8f4fd" stroke="#24405e"/>
    <rect x="45" y="30" width="70" height="40" fill="none" stroke="#1a3a2a"/>
    <text x="55" y="95" text-anchor="middle" font-weight="bold">scale</text>
    <text x="55" y="107" text-anchor="middle" fill="#6b6b6b">stretch an axis</text>
  </g>
  <g transform="translate(340,20)">
    <rect x="0" y="30" width="40" height="40" fill="#e8f4fd" stroke="#24405e"/>
    <line x1="45" y1="70" x2="105" y2="70" stroke="#1a3a2a" stroke-width="3"/>
    <text x="60" y="95" text-anchor="middle" font-weight="bold">project</text>
    <text x="60" y="107" text-anchor="middle" fill="#6b6b6b">flatten onto a line</text>
  </g>
</svg>

- **Rotation** turns without resizing. **Scaling** stretches along an axis. **Projection** drops a dimension — this is what a layer does when it maps 784 pixels to 128 features.

:::note
A neural network layer is a **learned** matrix transformation followed by a nonlinear function. Training is the search for the matrix entries that move the data into a shape where the answer is easy to read off.
:::

:::mint
```python
import numpy as np
theta = np.radians(90)
R = np.array([[np.cos(theta), -np.sin(theta)],
              [np.sin(theta),  np.cos(theta)]])
R @ np.array([1, 0])    # array([0, 1])  -> rotated 90°, length unchanged
```
:::
