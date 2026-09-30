## Loss functions — what the model actually optimises

- The model optimises the **loss function**, not accuracy. If the loss does not capture what you care about, the model finds the cheapest way to satisfy it — which is almost never what you wanted
- **MSE** `(1/n)Σ(ŷ−y)²` — correct for regression; fails for classification. A model predicting 0.5 for every binary example gets MSE = 0.25 (the minimum without learning anything). MSE gradients also flatten at sigmoid saturation — doubly bad for classification
- **Cross-entropy** `−(y log p + (1−y) log(1−p))` — correct for classification. Penalises a confident wrong prediction of p=0.01 with loss 4.6; rewards a confident correct prediction of p=0.99 with loss 0.01. The **460× difference** is the learning signal

### Cross-entropy vs MSE — why the choice matters

<svg viewBox="0 0 460 72" role="img" aria-label="Loss comparison: predicting 0.5 with MSE gives 0.25 but cross-entropy gives 0.693 pushing model to commit; predicting 0.01 for true class gives MSE 0.81 but cross-entropy 2.3 imposing a huge penalty" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="130" y="12" text-anchor="middle" font-weight="bold">Prediction = 0.5 (true = 1)</text>
  <rect x="4" y="16" width="114" height="50" rx="2" fill="#fff0f0" stroke="#c04040"/>
  <text x="61" y="34" text-anchor="middle" font-size="8">MSE = 0.25</text>
  <text x="61" y="48" text-anchor="middle" font-size="8" fill="#c04040">looks OK → useless</text>
  <rect x="126" y="16" width="114" height="50" rx="2" fill="#e8f4fd" stroke="#24405e"/>
  <text x="183" y="34" text-anchor="middle" font-size="8">BCE = 0.693</text>
  <text x="183" y="48" text-anchor="middle" font-size="8" fill="#24405e">high → forces commitment</text>
  <text x="360" y="12" text-anchor="middle" font-weight="bold">Prediction = 0.01 (true = 1)</text>
  <rect x="250" y="16" width="100" height="50" rx="2" fill="#fff0f0" stroke="#c04040"/>
  <text x="300" y="34" text-anchor="middle" font-size="8">MSE = 0.97</text>
  <text x="300" y="48" text-anchor="middle" font-size="8" fill="#c04040">gradient weak near 0</text>
  <rect x="358" y="16" width="100" height="50" rx="2" fill="#e8f4fd" stroke="#24405e"/>
  <text x="408" y="34" text-anchor="middle" font-size="8">BCE = 4.6</text>
  <text x="408" y="48" text-anchor="middle" font-size="8" fill="#24405e">huge penalty ✓</text>
</svg>

### Loss function selection

| Task | Loss | Notes |
|---|---|---|
| Regression | MSE or MAE | MAE more robust to outliers |
| Binary classification | BCE | Use `BCEWithLogitsLoss` in PyTorch — includes stable sigmoid |
| Multi-class | Cross-entropy | PyTorch `CrossEntropyLoss` includes log-softmax |
| Embeddings / self-supervised | InfoNCE / contrastive | Pulls similar pairs close, pushes negatives apart |

:::mint
```python
import torch.nn as nn
# NEVER apply softmax then CrossEntropyLoss — double-applies it
loss_fn = nn.CrossEntropyLoss()      # includes log-softmax internally
loss = loss_fn(logits, targets)      # logits: (B, C), targets: (B,) integer class ids
```
:::

:::warn
`nn.CrossEntropyLoss` expects **raw logits**, not softmax probabilities. Applying softmax before passing to the loss function leads to `log(softmax(logits))` — numerically unstable and mathematically wrong (log of a probability less than 1 is always negative; the double application distorts the gradient). Pass logits directly.
:::
