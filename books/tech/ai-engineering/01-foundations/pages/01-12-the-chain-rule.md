## The chain rule: slopes through a pipeline

- A neural network is functions nested inside functions: the output of one layer is the input to the next.
- To find how an early weight affects the final error, you need the slope through *all* the layers in between.
- The **chain rule** does this: to differentiate nested functions, multiply the slopes together.


### Read it as a rate of rates

- If `y` changes 2× as fast as `x`, and `z` changes 3× as fast as `y`, then `z` changes 6× as fast as `x`. You multiply: `3 × 2 = 6`.
- Stack fifty layers and you multiply fifty slopes. That single chain is how the error at the output reaches back to a weight in the first layer.

<svg viewBox="0 0 440 70" role="img" aria-label="A pipeline x to y to z, with local slopes dy/dx and dz/dy multiplied to give the overall slope dz/dx" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">
  <circle cx="40" cy="30" r="16" fill="#e8f4fd" stroke="#24405e"/><text x="40" y="34" text-anchor="middle">x</text>
  <path d="M56 30 L120 30" stroke="#1a1a1a" marker-end="url(#c)"/><text x="88" y="22" text-anchor="middle" fill="#6b6b6b">dy/dx</text>
  <circle cx="140" cy="30" r="16" fill="#e8f4fd" stroke="#24405e"/><text x="140" y="34" text-anchor="middle">y</text>
  <path d="M156 30 L220 30" stroke="#1a1a1a" marker-end="url(#c)"/><text x="188" y="22" text-anchor="middle" fill="#6b6b6b">dz/dy</text>
  <circle cx="240" cy="30" r="16" fill="#1a3a2a" stroke="#1a3a2a"/><text x="240" y="34" text-anchor="middle" fill="#fff">z</text>
  <text x="360" y="34" fill="#24405e">dz/dx = dz/dy · dy/dx</text>
  <defs><marker id="c" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
Multiplying many slopes has a dark side. If each is smaller than 1, the product shrinks toward zero — the **vanishing gradient**, where early layers stop learning. If each is above 1, it explodes. Deep learning spends much of its effort keeping this product near 1.
:::
