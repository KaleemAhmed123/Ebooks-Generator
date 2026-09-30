## Autoregressive generation

- **Autoregressive** means each output depends on the outputs before it. An LLM writes text one token at a time, feeding every token it just wrote back in as input for the next.
- The math is the **chain rule of probability** — any sequence's probability factorises into a product of next-token probabilities:

:::mint
```
P(w₁ w₂ … wₙ) = P(w₁) · P(w₂|w₁) · P(w₃|w₁w₂) · … · P(wₙ|w₁…wₙ₋₁)
```
The model only ever learns one factor: P(next token | everything so far).
:::

<svg viewBox="0 0 344 74" role="img" aria-label="The model reads The cat sat on the, predicts mat, appends it, and repeats" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="8" y="28" width="150" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="83" y="40" text-anchor="middle">The cat sat on the</text>
  <rect x="170" y="26" width="44" height="22" rx="3" fill="#24405e"/><text x="192" y="40" text-anchor="middle" fill="#fff">LLM</text>
  <rect x="228" y="28" width="40" height="18" rx="3" fill="#1a3a2a"/><text x="248" y="40" text-anchor="middle" fill="#fff">mat</text>
  <path d="M158 37 L168 37" stroke="#1a1a1a" marker-end="url(#a)"/><path d="M214 37 L226 37" stroke="#1a1a1a" marker-end="url(#a)"/>
  <path d="M248 48 C248 66, 60 66, 60 48" stroke="#c0392b" fill="none" marker-end="url(#b)"/>
  <text x="150" y="70" text-anchor="middle" fill="#c0392b" font-size="7">append, feed back, repeat</text>
  <defs><marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

- One forward pass produces a **probability over the whole vocabulary** (~50k–200k tokens). Pick one token, append it, run again. The loop stops at a special end-of-text token or a length limit.
- The model itself is fixed once trained. The only choice at generation time is **how you pick** from that probability distribution — covered in Module 11 (sampling and decoding).

:::warn
Errors compound. A bad token early poisons every token after it, because each one conditions on the mistake. This is why a model can start a wrong answer confidently and never recover — it is faithfully continuing its own error.
:::
