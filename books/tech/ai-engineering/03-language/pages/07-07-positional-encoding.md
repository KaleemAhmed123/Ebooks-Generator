## Positional encoding

- Attention has a blind spot: it treats the input as a **set**, not a sequence. Swap two words and the attention scores are unchanged — *"dog bites man"* and *"man bites dog"* look identical.
- The fix: add **position information** to each token's embedding before attention sees it. Now token 1 and token 5 carry a marker of where they sit.

### The original recipe: sinusoids

- The 2017 paper added a fixed pattern of **sines and cosines** of different frequencies to each position. Each position gets a unique fingerprint, and the pattern lets the model compute *relative* distances ("3 tokens apart") from simple arithmetic on the encodings.

<svg viewBox="0 0 360 66" role="img" aria-label="A word embedding is added to a positional pattern to produce a position-aware embedding" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="26" width="70" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="47" y="39" text-anchor="middle">word emb</text>
  <text x="92" y="39" font-size="12">+</text>
  <rect x="104" y="26" width="70" height="18" rx="3" fill="#6a9bd0"/><text x="139" y="39" text-anchor="middle" fill="#fff">position</text>
  <path d="M178 35 L214 35" stroke="#1a1a1a" marker-end="url(#pe)"/>
  <rect x="218" y="26" width="130" height="18" rx="3" fill="#1a3a2a"/><text x="283" y="39" text-anchor="middle" fill="#fff">position-aware embedding</text>
  <defs><marker id="pe" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Modern models mostly use learned or **rotary** position encodings (**RoPE**), which rotate the query and key vectors by an angle set by position. RoPE handles longer sequences more gracefully and is standard in Llama, Qwen, and most 2026 LLMs.

:::note
Position encoding is where a model's **context length** is really decided. A model trained on 4,000-token positions has never seen position 40,000, so it extrapolates badly — the root cause of quality collapse past the trained window (page 07-22). Extending context (RoPE scaling, interpolation) is mostly the art of stretching positional encodings without breaking what the model already learned.
:::
