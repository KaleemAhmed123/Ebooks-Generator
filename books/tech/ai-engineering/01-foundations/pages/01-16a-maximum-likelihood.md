## Maximum likelihood

- Where do loss functions come from? Most are not arbitrary — they fall out of one principle. **Maximum likelihood estimation (MLE)** says: pick the model parameters that make the **observed data most probable**.
- The **likelihood** is the probability of your data given the parameters, `P(data | θ)`. MLE turns the knob `θ` until that number is as large as possible.

:::mint
```
θ* = argmax  P(data | θ)
   = argmax  Σ log P(xᵢ | θ)      # log turns the product into a sum
   = argmin  −Σ log P(xᵢ | θ)     # the negative log-likelihood = a loss
```
:::

- We take the **log** because probabilities of many independent points multiply into a vanishingly small number; logs turn that product into a stable sum. Flipping the sign turns "maximise probability" into "minimise a loss" — exactly the form an optimizer wants.

<svg viewBox="0 0 300 60" role="img" aria-label="The likelihood curve peaks at the parameter value that best explains the data" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <line x1="20" y1="48" x2="284" y2="48" stroke="#1a1a1a"/><text x="284" y="58" text-anchor="end" fill="#6b6b6b">θ</text>
  <path d="M30 46 C110 46, 130 10, 152 10 C174 10, 194 46, 274 46" stroke="#24405e" fill="none" stroke-width="1.5"/>
  <line x1="152" y1="10" x2="152" y2="48" stroke="#c0392b" stroke-dasharray="2 2"/><text x="152" y="8" text-anchor="middle" fill="#c0392b" font-size="7">θ* = best fit</text>
</svg>

- This is not a niche trick — it is the origin of the losses you already use. **Cross-entropy** (classification) is the negative log-likelihood of a categorical model; **mean squared error** (regression) is the negative log-likelihood under Gaussian noise. Minimising them *is* doing MLE.

:::warn
MLE trusts the data completely, so on little data it **overfits** — it will happily explain noise. The Bayesian fix (page 01-16) adds a prior belief, pulling estimates toward something sensible; in ML that reappears as **regularization** (Booklet, classical-ML pages), which is MLE plus a penalty that keeps parameters small.
:::
