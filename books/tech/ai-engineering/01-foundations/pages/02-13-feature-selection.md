## Feature selection

- More features is not better. Irrelevant ones add noise, slow training, and give the model more ways to overfit.
- **Feature selection** keeps the inputs that carry signal and drops the rest. Fewer, better features often beat many mediocre ones.

### Three ways to choose

- **Filter** — score each feature on its own (correlation with the target, variance) and keep the top ones. Fast, model-agnostic, but blind to feature interactions.
- **Wrapper** — try subsets, train the model, keep what improves it. Accurate but expensive.
- **Embedded** — let the model select as it trains. This is what **L1 (Lasso)** regularization does — it drives useless weights exactly to zero.

<svg viewBox="0 0 320 66" role="img" aria-label="Ten input features filtered down to three that carry signal" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g>
    <rect x="10" y="20" width="14" height="14" fill="#e8f4fd" stroke="#24405e"/><rect x="27" y="20" width="14" height="14" fill="#eee" stroke="#ccc"/><rect x="44" y="20" width="14" height="14" fill="#e8f4fd" stroke="#24405e"/><rect x="61" y="20" width="14" height="14" fill="#eee" stroke="#ccc"/><rect x="78" y="20" width="14" height="14" fill="#eee" stroke="#ccc"/><rect x="95" y="20" width="14" height="14" fill="#e8f4fd" stroke="#24405e"/><rect x="112" y="20" width="14" height="14" fill="#eee" stroke="#ccc"/>
  </g>
  <path d="M140 27 L175 27" stroke="#1a1a1a" marker-end="url(#f)"/><text x="157" y="18" text-anchor="middle" fill="#6b6b6b">select</text>
  <rect x="185" y="20" width="14" height="14" fill="#1a3a2a"/><rect x="202" y="20" width="14" height="14" fill="#1a3a2a"/><rect x="219" y="20" width="14" height="14" fill="#1a3a2a"/>
  <text x="250" y="31" fill="#1a3a2a">3 that matter</text>
  <defs><marker id="f" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
L1 regularization is the practitioner's favourite because selection happens automatically during training — no separate step. It is covered again with regularization later in this module.
:::
