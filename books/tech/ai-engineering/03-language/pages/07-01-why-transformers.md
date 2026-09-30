# Transformers

## Why transformers

- The **transformer** (Vaswani et al., "Attention Is All You Need", 2017) is the architecture behind every large language model, most modern vision models, and much of speech. Learn this one design and the rest of AI stops being a list of unrelated tricks.
- It exists to fix the one flaw RNNs and LSTMs could not shake: they read **strictly left to right**, one step at a time.

### The problem it solved

- **RNNs can't be parallelized across a sequence.** Step 100 needs step 99's output, which needs step 98's. Training on long text is unavoidably sequential — and slow.
- **Long-range memory decays.** Even an LSTM's gated memory fades over hundreds of steps.
- The transformer's answer: drop recurrence entirely. Let **every token look at every other token at once**, in one parallel operation — **attention** (the pre-transformer seed, page 05-15, now the whole engine).

<svg viewBox="0 0 370 82" role="img" aria-label="RNN processes tokens in a sequential chain; transformer connects all tokens to all tokens at once" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="70" y="12" text-anchor="middle" fill="#6b6b6b">RNN: sequential</text>
  <g fill="#24405e"><circle cx="20" cy="40" r="7"/><circle cx="60" cy="40" r="7"/><circle cx="100" cy="40" r="7"/><circle cx="140" cy="40" r="7"/></g>
  <g stroke="#24405e"><path d="M27 40 L53 40" marker-end="url(#w7)"/><path d="M67 40 L93 40" marker-end="url(#w7)"/><path d="M107 40 L133 40" marker-end="url(#w7)"/></g>
  <text x="290" y="12" text-anchor="middle" fill="#6b6b6b">transformer: all-to-all</text>
  <g fill="#1a3a2a"><circle cx="240" cy="30" r="7"/><circle cx="300" cy="30" r="7"/><circle cx="240" cy="60" r="7"/><circle cx="300" cy="60" r="7"/></g>
  <g stroke="#1a3a2a" stroke-width="0.6"><path d="M240 30 L300 30"/><path d="M240 30 L240 60"/><path d="M240 30 L300 60"/><path d="M300 30 L240 60"/><path d="M300 30 L300 60"/><path d="M240 60 L300 60"/></g>
  <defs><marker id="w7" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#24405e"/></marker></defs>
</svg>

:::note
Two wins fall out of "all tokens at once." Training **parallelizes** across the whole sequence, so you can throw far more compute and data at it — the precondition for models with hundreds of billions of parameters. And every token reaches every other in **one step**, so distance no longer decays memory. This section builds the transformer piece by piece, from a single attention score to a working model.
:::
