## Momentum and Adam

- Plain SGD zigzags in narrow valleys and crawls across flat ground. Two ideas fix this, and the second is the default optimizer today.

### Momentum: remember where you were going

- Instead of stepping on the current gradient alone, keep a running average of recent gradients — a **velocity** — and step on that.
- Consistent directions build up speed; random zigzags cancel out. Like a ball rolling downhill instead of a raindrop reacting to each bump.

### Adam: a personal step size per weight

- **Adam** (Adaptive Moment Estimation) adds a second idea: give **every weight its own learning rate**.
- It tracks two running averages per weight — the mean gradient (momentum) and the mean *squared* gradient (how noisy that weight is) — and divides one by the other.
- Weights that get rare, small signals take bigger steps; weights hit by large noisy gradients take smaller ones.

<svg viewBox="0 0 460 92" role="img" aria-label="Three optimizers in sequence: SGD zigzags, momentum smooths the path, Adam adapts each step" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="6" y="24" width="130" height="44" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="71" y="40" text-anchor="middle" font-weight="bold">SGD</text>
  <text x="71" y="56" text-anchor="middle" fill="#6b6b6b">zigzags in valleys</text>
  <path d="M136 46 L160 46" stroke="#1a1a1a" marker-end="url(#m)"/>
  <rect x="162" y="24" width="130" height="44" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="227" y="40" text-anchor="middle" font-weight="bold">+ Momentum</text>
  <text x="227" y="56" text-anchor="middle" fill="#6b6b6b">smooths the path</text>
  <path d="M292 46 L316 46" stroke="#1a1a1a" marker-end="url(#m)"/>
  <rect x="318" y="24" width="136" height="44" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="386" y="40" text-anchor="middle" font-weight="bold" fill="#24405e">Adam</text>
  <text x="386" y="56" text-anchor="middle" fill="#24405e">per-weight step size</text>
  <defs><marker id="m" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
Adam converges fast but sometimes lands in "sharp" minima that generalize worse than the "flat" ones plain SGD finds. For large language models and transformers, Adam (specifically AdamW) is standard. For image classifiers (CNNs), SGD with momentum still often wins on final accuracy. Match the optimizer to the domain, as of 2026.
:::
