## The decoder and causal masking

- The **decoder** generates a sequence one token at a time, each new token conditioned on the ones already produced. It is built from the same blocks, with one crucial change to attention.
- **Causal masking**: a token may attend only to itself and tokens **before** it — never ahead. Position 5 sees positions 1–5; positions 6+ are hidden.

### Why the mask is non-negotiable

- Generation predicts the *next* token. If the model could peek at future tokens during training, it would just copy the answer — and learn nothing useful for inference, where the future does not exist yet.
- The mask sets the attention scores for all future positions to −∞ before the softmax, so their weights become exactly 0.

<svg viewBox="0 0 300 96" role="img" aria-label="A lower-triangular causal mask lets each token attend only to earlier tokens" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="150" y="12" text-anchor="middle" fill="#6b6b6b">causal mask: can attend where filled</text>
  <g fill="#24405e"><rect x="60" y="24" width="18" height="18"/>
     <rect x="60" y="44" width="18" height="18"/><rect x="80" y="44" width="18" height="18"/>
     <rect x="60" y="64" width="18" height="18"/><rect x="80" y="64" width="18" height="18"/><rect x="100" y="64" width="18" height="18"/></g>
  <g fill="none" stroke="#ccc"><rect x="80" y="24" width="18" height="18"/><rect x="100" y="24" width="18" height="18"/><rect x="100" y="44" width="18" height="18"/></g>
  <g font-size="7" fill="#6b6b6b" text-anchor="end"><text x="56" y="37">tok1</text><text x="56" y="57">tok2</text><text x="56" y="77">tok3</text></g>
  <text x="150" y="55" fill="#6b6b6b" font-size="7">grey = future,</text><text x="150" y="66" fill="#6b6b6b" font-size="7">masked to 0</text>
</svg>

:::note
This masked, one-directional decoder is the entire basis of **GPT and every generative LLM** — they are decoder-only stacks. The two halves split cleanly: **encoder = understand** (bidirectional, BERT), **decoder = generate** (causal, GPT). Keep both and you get an encoder–decoder model like T5 (page 07-15). These three wirings, from one block, are the whole family tree.
:::
