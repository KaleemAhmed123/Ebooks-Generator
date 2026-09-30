## Debugging neural networks

- Neural nets fail silently. No crash, no stack trace — just a loss that will not fall. A fixed order of checks finds the cause fast.
- **First, overfit one batch.** Feed the model the *same* tiny batch over and over. If the loss cannot reach near-zero on that, the bug is in the model or the loss, not the data.

<svg viewBox="0 0 340 110" role="img" aria-label="A checklist ladder: overfit one batch, check shapes, check the learning rate, inspect gradients, check the data" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g fill="#e8f4fd" stroke="#24405e"><rect x="10" y="8" width="200" height="17" rx="2"/><rect x="10" y="30" width="200" height="17" rx="2"/><rect x="10" y="52" width="200" height="17" rx="2"/><rect x="10" y="74" width="200" height="17" rx="2"/></g>
  <text x="16" y="20">1. overfit a single batch → near 0?</text>
  <text x="16" y="42">2. shapes &amp; loss inputs correct?</text>
  <text x="16" y="64">3. learning rate too high / low?</text>
  <text x="16" y="86">4. gradients NaN or all zero?</text>
</svg>

- **Then check shapes** (a silent broadcast can average away your signal), the **learning rate** (loss to `NaN` = too high; loss flat = too low), and the **gradients** (all zero = a dead activation or a detached graph).

:::warn
The subtlest bug: labels misaligned with inputs. The model trains, the loss falls a little, and accuracy sticks near chance. Before tuning anything, print one batch and confirm each input sits next to its correct label.
:::
