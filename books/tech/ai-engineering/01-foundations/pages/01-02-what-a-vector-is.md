## What a vector is

- A **vector** is an ordered list of numbers. That is the whole definition.
- "Ordered" matters: `[2, 1]` and `[1, 2]` are different vectors. Position carries meaning.
- The number of entries is the vector's **dimension**. `[2, 1]` is 2-dimensional; a word embedding might be 1,536-dimensional.

### Why AI lives on vectors

- A computer stores numbers, not "the word cat" or "this photo". So every input is turned into a vector first.
- That conversion is an **embedding** — a list of numbers that stands in for a thing. Once everything is a vector, one set of rules handles text, images, and audio alike.

:::mint
```python
import numpy as np
v = np.array([2.0, 1.0, 5.0])   # a 3-dimensional vector
v.shape    # (3,)  -> one axis, three entries
v[0]       # 2.0   -> position 0, order matters
```
:::

### A vector is a point *and* an arrow

The same list `[2, 1]` can be read two ways. Both are correct; you pick whichever helps.

<svg viewBox="0 0 300 150" role="img" aria-label="The vector [2,1] shown as a point at coordinates 2,1 and as an arrow from the origin to that point" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">
  <line x1="30" y1="120" x2="280" y2="120" stroke="#1a1a1a"/>
  <line x1="30" y1="120" x2="30" y2="15" stroke="#1a1a1a"/>
  <text x="272" y="134" fill="#6b6b6b">x</text>
  <text x="16" y="20" fill="#6b6b6b">y</text>
  <line x1="30" y1="120" x2="190" y2="60" stroke="#24405e" stroke-width="2" marker-end="url(#av)"/>
  <circle cx="190" cy="60" r="3.5" fill="#1a3a2a"/>
  <text x="198" y="58" fill="#1a3a2a">point (2, 1)</text>
  <text x="95" y="82" fill="#24405e">arrow from origin</text>
  <text x="150" y="140" text-anchor="middle" fill="#6b6b6b">1 unit right = 80px, drawn to scale</text>
  <defs><marker id="av" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#24405e"/></marker></defs>
</svg>

- **As a point** — a location in space. Useful when you ask "how close are these two things?"
- **As an arrow** — a direction and a length, starting from zero. Useful when you add or scale vectors.
