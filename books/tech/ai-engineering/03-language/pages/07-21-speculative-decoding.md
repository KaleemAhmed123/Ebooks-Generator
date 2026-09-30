## Speculative decoding

- Generation is slow because it is **sequential** — one token at a time, each needing a full pass through a huge model. **Speculative decoding** breaks the sequence without changing the output.
- Use a small, fast **draft model** to guess the next few tokens cheaply. Then run the big **target model once, in parallel**, to *verify* all the guesses at the cost of a single step.

<svg viewBox="0 0 360 78" role="img" aria-label="A draft model proposes several tokens, the target model verifies them in one parallel pass, accepting the correct prefix" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="30" width="60" height="20" rx="3" fill="#6a9bd0"/><text x="40" y="43" text-anchor="middle" fill="#fff" font-size="7">draft (fast)</text>
  <g><rect x="90" y="30" width="24" height="20" fill="#1a3a2a"/><rect x="116" y="30" width="24" height="20" fill="#1a3a2a"/><rect x="142" y="30" width="24" height="20" fill="#1a3a2a"/><rect x="168" y="30" width="24" height="20" fill="#c0392b"/></g>
  <g fill="#fff" font-size="7" text-anchor="middle"><text x="102" y="43">✓</text><text x="128" y="43">✓</text><text x="154" y="43">✓</text><text x="180" y="43">✗</text></g>
  <text x="120" y="65" text-anchor="middle" font-size="7" fill="#6b6b6b">3 guesses accepted, 1 rejected</text>
  <path d="M70 40 L88 40" stroke="#1a1a1a" marker-end="url(#sp)"/>
  <rect x="215" y="30" width="130" height="20" rx="3" fill="#24405e"/><text x="280" y="43" text-anchor="middle" fill="#fff" font-size="7">target verifies all at once</text>
  <path d="M192 40 L213 40" stroke="#1a1a1a" marker-end="url(#sp)"/>
  <defs><marker id="sp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Accept every guessed token the target agrees with; stop at the first disagreement and take the target's own token there. The output is **provably identical** to normal decoding — this is a pure speedup, not an approximation.
- Typical gain: **2–3×** faster, and by 2026 it is a standard feature in vLLM and TensorRT-LLM. Variants like **Medusa** and **EAGLE** drop the separate draft model, adding lightweight prediction heads to the target itself.

:::warn
The win depends entirely on the **acceptance rate** — how often the draft guesses right. A draft model too weak or mismatched to the target gets its guesses rejected, and you pay for both models while gaining nothing. The draft must be fast *and* aligned with the target's distribution. On highly unpredictable text, speculative decoding can even run slightly slower than plain decoding.
:::
