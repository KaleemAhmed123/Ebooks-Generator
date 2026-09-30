## Dropout

- **Dropout** fights overfitting by randomly switching off a fraction of neurons on each training step.
- Each step trains a slightly different, smaller network. No single neuron can become a crutch, so the network learns redundant, sturdier features.
- At test time nothing is dropped; the full network runs. Frameworks scale the activations so the maths stays consistent between the two modes.

<svg viewBox="0 0 320 120" role="img" aria-label="A layer of neurons with two of them crossed out, showing dropout switching some off during a training step" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g fill="#24405e"><circle cx="60" cy="30" r="11"/><circle cx="60" cy="90" r="11"/></g>
  <g fill="#3d6ea5"><circle cx="160" cy="20" r="11"/><circle cx="160" cy="100" r="11"/></g>
  <g fill="#d9d9d9"><circle cx="160" cy="60" r="11"/></g>
  <text x="160" y="64" text-anchor="middle" fill="#c0392b" font-size="13">✕</text>
  <circle cx="260" cy="60" r="11" fill="#1a3a2a"/>
  <g stroke="#c9d6e5"><path d="M71 30 L149 20M71 30 L149 100M71 90 L149 20M71 90 L149 100M171 20 L249 60M171 100 L249 60"/></g>
  <text x="160" y="118" text-anchor="middle" fill="#6b6b6b">one neuron dropped this step</text>
</svg>

:::mint
```python
import torch.nn as nn
net = nn.Sequential(nn.Linear(512, 512), nn.ReLU(), nn.Dropout(0.5))
net.train()   # dropout ON
net.eval()    # dropout OFF — full network for inference
```
:::

:::warn
Forgetting `net.eval()` at inference leaves dropout on, so predictions become random and change every call. The mirror bug: leaving `net.train()` off during training means no dropout ever happens. The mode switch is not optional.
:::
