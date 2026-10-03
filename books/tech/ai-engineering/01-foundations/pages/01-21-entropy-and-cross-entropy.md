## Entropy and cross-entropy

- **Entropy** measures surprise. A predictable outcome (the sun rises) carries little information; a rare one (snow in July) carries a lot.
- A fair coin has more entropy than a biased one, because you are more uncertain about the result. Entropy peaks when every outcome is equally likely.


### Cross-entropy: the loss for classifiers

- **Cross-entropy** measures how far the model's predicted distribution is from the truth. It is *the* loss function for classification.
- The true label is certain — 100% "cat". Cross-entropy is small when the model puts high probability on the correct class, and it grows sharply as that probability falls toward zero.

<svg viewBox="0 0 300 100" role="img" aria-label="Cross-entropy loss curve: near zero when predicted probability of the true class is one, rising steeply toward infinity as it approaches zero" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <line x1="30" y1="82" x2="285" y2="82" stroke="#1a1a1a"/>
  <line x1="30" y1="82" x2="30" y2="10" stroke="#1a1a1a"/>
  <path d="M40 15 Q70 60 130 74 Q200 82 275 82" fill="none" stroke="#24405e" stroke-width="2"/>
  <text x="150" y="96" text-anchor="middle" fill="#6b6b6b">predicted prob. of true class →</text>
  <text x="60" y="30" fill="#c0392b">wrong+confident = huge loss</text>
  <text x="235" y="76" fill="#1a3a2a">right = ~0</text>
</svg>

:::note
The steep left side is the point. A model that is confidently wrong — 1% on the true class — is punished enormously. This is what pushes a network to become not just correct, but calibrated in its confidence.
:::

:::mint
```python
import numpy as np
p_true_class = 0.83
loss = -np.log(p_true_class)   # 0.186  -> small, because the model was mostly right
```
:::
