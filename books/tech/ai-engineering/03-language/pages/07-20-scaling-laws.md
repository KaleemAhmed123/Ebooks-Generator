## Scaling laws

- **Scaling laws** are the empirical finding that a model's loss falls **predictably** as you increase three things: parameters, training data, and compute. Plot loss against any of them on a log scale and you get a straight line — so you can forecast a big model's quality from small experiments.
- This is why the field bet billions on scale: the curve told them, in advance, that bigger would be better, and by roughly how much.

### Chinchilla: the compute-optimal balance

- Early large models were **too big and under-trained**. The **Chinchilla** paper (DeepMind, 2022) showed that for a fixed compute budget, parameters and training tokens should grow **together** — about **20 tokens per parameter** is compute-optimal.
- A 70B model, by this rule, wants ~1.4 trillion training tokens. GPT-3 (175B on ~300B tokens) was badly under-trained by comparison.

<svg viewBox="0 0 340 72" role="img" aria-label="Loss falls along a straight line as compute grows on a log scale" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <line x1="34" y1="58" x2="330" y2="58" stroke="#1a1a1a"/><line x1="34" y1="58" x2="34" y2="10" stroke="#1a1a1a"/>
  <text x="20" y="14" fill="#6b6b6b" font-size="7">loss</text><text x="185" y="70" text-anchor="middle" fill="#6b6b6b">compute (log scale) →</text>
  <path d="M44 20 L322 52" stroke="#24405e" stroke-width="2"/>
  <text x="230" y="30" fill="#24405e" font-size="7">predictable straight line</text>
</svg>

:::note
Two 2026 refinements matter. The compute-optimal ratio is **not fixed** — newer work finds the best tokens-per-parameter *grows with compute*. And most shipped models are deliberately **over-trained** past the Chinchilla point: Llama 3 70B saw ~200 tokens/parameter, ~10× Chinchilla. Why? Chinchilla minimizes *training* cost, but a model is trained once and served billions of times, so it pays to train a *smaller* model *longer* to cut lifetime **inference** cost. The lesson: scaling laws guide the tradeoff, they do not dictate one answer.
:::
