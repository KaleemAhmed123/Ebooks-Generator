# Module 2 — ML Fundamentals

## What machine learning actually is

- **Machine learning** — a program that learns its rules from data rather than having rules written by hand. Given labeled examples, the algorithm finds parameters (weights) that generalize to new examples
- **Model** — the learned rules, encoded as numbers. After training, the model accepts new inputs and produces predictions without accessing the training data again
- The shift from traditional programming: instead of `(rules + data) → output`, ML is `(data + output) → rules`

### Three learning paradigms

<svg viewBox="0 0 460 96" role="img" aria-label="Three ML paradigms: supervised with labeled pairs, unsupervised with unlabeled data only, reinforcement with reward signal from environment" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="4" y="8" width="138" height="80" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="73" y="26" text-anchor="middle" font-weight="bold">Supervised</text>
  <text x="73" y="42" text-anchor="middle" fill="#6b6b6b">Input + label pairs</text>
  <text x="73" y="56" text-anchor="middle" fill="#6b6b6b">→ predict labels</text>
  <text x="73" y="72" text-anchor="middle" fill="#6b6b6b">spam filter, pricing</text>
  <rect x="161" y="8" width="138" height="80" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="230" y="26" text-anchor="middle" font-weight="bold">Unsupervised</text>
  <text x="230" y="42" text-anchor="middle" fill="#6b6b6b">Inputs only, no labels</text>
  <text x="230" y="56" text-anchor="middle" fill="#6b6b6b">→ find structure</text>
  <text x="230" y="72" text-anchor="middle" fill="#6b6b6b">clustering, compression</text>
  <rect x="318" y="8" width="138" height="80" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="387" y="26" text-anchor="middle" font-weight="bold">Reinforcement</text>
  <text x="387" y="42" text-anchor="middle" fill="#6b6b6b">Actions + rewards</text>
  <text x="387" y="56" text-anchor="middle" fill="#6b6b6b">→ learn policy</text>
  <text x="387" y="72" text-anchor="middle" fill="#6b6b6b">games, robotics, RLHF</text>
</svg>

### Supervised vs self-supervised — the line is blurring

**Self-supervised learning** — a special case of unsupervised learning where the labels are derived from the data itself. No human annotation needed:
- **Masked language modelling** (BERT): hide 15% of tokens, predict them — the labels come from the original text
- **Next-token prediction** (GPT): predict the next word from all prior words — every document becomes training signal
- **Contrastive learning** (SimCLR): two augmentations of the same image should produce similar embeddings

As of September 2026, self-supervised pretraining is the dominant paradigm for foundation models in both vision and language.
