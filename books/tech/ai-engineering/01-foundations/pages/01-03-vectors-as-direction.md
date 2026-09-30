## Direction is meaning

- In AI, the **direction** a vector points carries the meaning — not where it sits.
- Two embeddings that point the same way represent similar things, even if one is longer.
- This is why "similar" in AI is measured by angle, not distance. The next page makes that measurement exact.

### Two operations, and what they do to the arrow

- **Add** two vectors: line the arrows up head to tail. Add entry by entry.
- **Scale** a vector by a number: stretch or shrink the arrow. The direction is unchanged unless the number is negative (which flips it).

<svg viewBox="0 0 460 150" role="img" aria-label="Left: adding vectors [3,0] and [1,2] head to tail gives [4,2]. Right: scaling [2,1] by two gives [4,2], a longer arrow in the same direction" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <line x1="20" y1="120" x2="220" y2="120" stroke="#ccc"/>
  <line x1="20" y1="120" x2="20" y2="20" stroke="#ccc"/>
  <line x1="20" y1="120" x2="140" y2="120" stroke="#24405e" stroke-width="2" marker-end="url(#ad)"/>
  <line x1="140" y1="120" x2="180" y2="40" stroke="#6b6b6b" stroke-width="2" marker-end="url(#ad)"/>
  <line x1="20" y1="120" x2="180" y2="40" stroke="#1a3a2a" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#ad)"/>
  <text x="70" y="134" fill="#24405e">[3, 0]</text>
  <text x="165" y="85" fill="#6b6b6b">[1, 2]</text>
  <text x="70" y="70" fill="#1a3a2a">sum [4, 2]</text>
  <text x="120" y="16" text-anchor="middle" font-weight="bold">Add: head to tail</text>
  <line x1="250" y1="120" x2="450" y2="120" stroke="#ccc"/>
  <line x1="250" y1="120" x2="250" y2="20" stroke="#ccc"/>
  <line x1="250" y1="120" x2="330" y2="80" stroke="#24405e" stroke-width="2" marker-end="url(#ad)"/>
  <line x1="250" y1="120" x2="410" y2="40" stroke="#1a3a2a" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#ad)"/>
  <text x="300" y="112" fill="#24405e">[2, 1]</text>
  <text x="360" y="60" fill="#1a3a2a">2 x [2, 1] = [4, 2]</text>
  <text x="350" y="16" text-anchor="middle" font-weight="bold">Scale: same direction, longer</text>
  <defs><marker id="ad" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
</svg>

:::mint
```python
import numpy as np

a = np.array([3, 0])
b = np.array([1, 2])

a + b        # array([4, 2])  -> added entry by entry
2 * a        # array([6, 0])  -> each entry doubled
```
:::

:::warn
Adding vectors of different dimensions is meaningless, and NumPy will raise a `ValueError` — unless one is a single number, which it silently stretches to fit (**broadcasting**). Broadcasting is convenient and a common source of silent bugs; we cover its rules in the tensors page.
:::
