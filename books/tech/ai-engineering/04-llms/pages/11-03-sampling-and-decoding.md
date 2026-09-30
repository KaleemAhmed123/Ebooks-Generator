## Sampling and decoding

- The model outputs a probability over the whole vocabulary at each step (page 08-03). **Decoding** is how you pick a token from that distribution. It is a knob you control at request time, no retraining.

<svg viewBox="0 0 320 60" role="img" aria-label="Greedy always takes the top token; sampling with temperature and top-p picks from the plausible set" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="60" y="12" text-anchor="middle" fill="#24405e">greedy: always the peak</text>
  <g fill="#24405e"><rect x="20" y="40" width="12" height="6"/><rect x="36" y="20" width="12" height="26"/><rect x="52" y="42" width="12" height="4"/><rect x="68" y="44" width="12" height="2"/></g>
  <text x="230" y="12" text-anchor="middle" fill="#1a3a2a">sample: from the top slice</text>
  <g fill="#1a3a2a"><rect x="180" y="34" width="12" height="12"/><rect x="196" y="22" width="12" height="24"/><rect x="212" y="30" width="12" height="16"/></g>
  <g fill="#ddd"><rect x="228" y="43" width="12" height="3"/><rect x="244" y="44" width="12" height="2"/></g>
  <text x="222" y="58" font-size="6.5" fill="#c0392b">top-p keeps this slice</text>
</svg>

- **Temperature** — divides the logits before softmax. `T<1` sharpens (safer, more repetitive); `T>1` flattens (more random, more creative); `T=0` = greedy, always the top token.
- **Top-k** — sample only from the k highest-probability tokens.
- **Top-p (nucleus)** — sample from the smallest set of tokens whose probabilities sum to p (e.g. 0.9). Adapts the cutoff to how confident the model is.

:::mint
```python
logits = logits / temperature          # T<1 sharpen, T>1 flatten
probs  = softmax(logits)
probs  = keep_top_p(probs, p=0.9)       # drop the long tail
next   = sample(probs)                  # draw one token
```
:::

- Rules of thumb: **T≈0** for extraction, code, and factual answers (you want determinism); **T≈0.7–1.0** for brainstorming and creative writing.

:::warn
High temperature is the most common cause of "the model made something up." Turning it up to seem "smarter" just raises the chance of sampling an unlikely, wrong token. And **even T=0 is rarely fully deterministic** in production — batching and floating-point order across GPUs cause tiny variations. Do not rely on identical outputs.
:::
