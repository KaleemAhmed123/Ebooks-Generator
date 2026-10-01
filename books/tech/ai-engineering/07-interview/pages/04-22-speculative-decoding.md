## What is speculative decoding, and why is the speedup "lossless"?

- Decoding is **memory-bound**: generating one token reads the whole model from memory, so the GPU is underused. Speculative decoding exploits the spare compute.
- A small, fast **draft model** proposes several tokens ahead. The big **target model** then verifies all of them in **one parallel forward pass** (it can score many positions at once cheaply). Accepted drafts are kept; at the first rejection it falls back to the target's own token.
- **Lossless:** a rejection-sampling check guarantees the accepted tokens follow **exactly** the target model's distribution — the output is identical in distribution to normal decoding. You only gain speed, not different text.
- Speedup depends on the **acceptance rate** (how often the draft agrees). Variants: self-speculation (early-exit layers), Medusa/EAGLE (extra prediction heads instead of a separate draft model). [VERIFY: EAGLE/Medusa current.]

<svg viewBox="0 0 290 56" role="img" aria-label="Draft model proposes several tokens; target model verifies them in one pass, accepting a prefix" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="6" y="14" fill="#6b6b6b">draft proposes:</text>
  <g><rect x="88" y="6" width="22" height="12" fill="#e8f4ec" stroke="#24405e"/><rect x="112" y="6" width="22" height="12" fill="#e8f4ec" stroke="#24405e"/><rect x="136" y="6" width="22" height="12" fill="#e8f4ec" stroke="#24405e"/><rect x="160" y="6" width="22" height="12" fill="#fbeaea" stroke="#c0392b"/></g>
  <text x="6" y="36" fill="#6b6b6b">target verifies:</text>
  <g><rect x="88" y="28" width="22" height="12" fill="#24405e"/><rect x="112" y="28" width="22" height="12" fill="#24405e"/><rect x="136" y="28" width="22" height="12" fill="#24405e"/><rect x="160" y="28" width="22" height="12" fill="#fff" stroke="#c0392b"/></g>
  <text x="196" y="24">✓✓✓ accept 3,</text><text x="196" y="36">✗ reject 4th</text>
</svg>

:::interview
What's really being tested:

draft-then-verify, that verification is one parallel pass exploiting memory-bound decode, and that rejection sampling makes it distribution-identical (lossless).
:::
