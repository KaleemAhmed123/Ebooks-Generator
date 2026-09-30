## The feed-forward block

- Attention mixes information *across* tokens. But it does little *per* token — each output is just a weighted average of values, a linear blend. The transformer needs a place to actually **transform** each token's content. That is the **feed-forward network (FFN)**.
- After attention, every token passes independently through the same small two-layer network:

:::mint
```
FFN(x) = W₂ · activation( W₁ · x + b₁ ) + b₂
```
Expand up (e.g. 512 → 2048), apply a nonlinearity, project back down (2048 → 512).
:::

- The nonlinearity (ReLU in 2017; GELU or SwiGLU in modern models) is what lets the network learn shapes a linear blend never could (Booklet 2's "why nonlinearity").

<svg viewBox="0 0 340 66" role="img" aria-label="A token vector expands to a wide hidden layer, passes a nonlinearity, and projects back to its original width" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="30" width="30" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="27" y="42" text-anchor="middle" font-size="7">512</text>
  <path d="M44 38 L72 38" stroke="#1a1a1a" marker-end="url(#ff)"/>
  <rect x="76" y="18" width="40" height="40" rx="2" fill="#24405e"/><text x="96" y="42" text-anchor="middle" fill="#fff" font-size="7">2048</text>
  <path d="M118 38 L146 38" stroke="#1a1a1a" marker-end="url(#ff)"/><text x="132" y="30" text-anchor="middle" font-size="7" fill="#6b6b6b">GELU</text>
  <rect x="150" y="30" width="30" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="165" y="42" text-anchor="middle" font-size="7">512</text>
  <text x="255" y="42" text-anchor="middle" fill="#6b6b6b">same net, every token</text>
  <defs><marker id="ff" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
The FFN is where most of a transformer's **parameters and knowledge** live — typically two-thirds of the weights. A useful mental model: attention decides *what to look at*, the FFN decides *what to do with it* and stores the learned facts. This is also the block the Mixture-of-Experts trick (page 07-19) splits into many specialists to grow capacity without growing cost.
:::
