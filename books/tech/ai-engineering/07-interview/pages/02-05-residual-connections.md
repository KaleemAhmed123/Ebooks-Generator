## Why do residual (skip) connections let us train networks hundreds of layers deep?

- A **residual connection** adds a layer's input to its output: `y = x + F(x)`. The layer learns the *change* (residual) rather than the full transform.
- Before ResNets, adding layers past a point made accuracy **worse** on training data too — the **degradation problem**. The issue wasn't overfitting; deep plain nets were simply hard to optimise.
- The skip path gives gradients a direct route back: the derivative of `x + F(x)` carries a `+1` term, so the gradient can't fully vanish even if `F`'s gradient does. Deep nets suddenly became trainable.
- It also makes the identity function easy to represent (set `F(x)=0`), so adding layers can't hurt — worst case they pass the signal through.

<svg viewBox="0 0 260 64" role="img" aria-label="Input x flows through a block F and also skips directly to be added to F of x" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="26" width="26" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="23" y="36" text-anchor="middle">x</text>
  <rect x="80" y="26" width="40" height="14" rx="2" fill="#24405e"/><text x="100" y="36" text-anchor="middle" fill="#fff">F(x)</text>
  <circle cx="170" cy="33" r="9" fill="#fff" stroke="#24405e"/><text x="170" y="37" text-anchor="middle">+</text>
  <rect x="210" y="26" width="40" height="14" rx="2" fill="#1a3a2a"/><text x="230" y="36" text-anchor="middle" fill="#fff">y</text>
  <path d="M36 33 L78 33" stroke="#1a1a1a" marker-end="url(#a)"/><path d="M120 33 L160 33" stroke="#1a1a1a" marker-end="url(#a)"/><path d="M179 33 L208 33" stroke="#1a1a1a" marker-end="url(#a)"/>
  <path d="M36 33 C60 8, 150 8, 170 24" stroke="#c0392b" fill="none" marker-end="url(#a)"/><text x="95" y="14" fill="#c0392b">skip (identity)</text>
  <defs><marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::interview
What's really being tested:

that you name the *degradation problem* (not overfitting) and explain the `+1` gradient path — transformers are residual networks, so this underlies everything later.
:::
