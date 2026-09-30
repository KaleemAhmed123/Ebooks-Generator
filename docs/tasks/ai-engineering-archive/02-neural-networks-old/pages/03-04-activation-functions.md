## Activation functions — the nonlinearity that makes depth real

- Without activation functions, any stack of linear layers collapses to one linear layer: `W₂(W₁x + b₁) + b₂ = Ax + c`. Depth becomes meaningless. Activations break this by introducing nonlinearity between layers
- **Sigmoid** `σ(z) = 1/(1+e⁻ᶻ)` — range (0,1), max derivative 0.25. Vanishes in deep networks. Good only at output for binary classification
- **Tanh** — range (−1,1), zero-centred, max derivative 1.0. Better than sigmoid but still saturates and vanishes. Used in LSTM gates

### ReLU, GELU, and when to use each

<svg viewBox="0 0 460 80" role="img" aria-label="Four activation curves: sigmoid S-curve saturating, tanh wider S, ReLU hockey stick from zero, GELU smooth hockey stick with small dip below zero" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <text x="40" y="10" text-anchor="middle" fill="#c04040">Sigmoid</text>
  <path d="M4 72 Q16 70 30 58 Q40 46 52 36 Q64 26 76 20" fill="none" stroke="#c04040" stroke-width="1.5"/>
  <text x="140" y="10" text-anchor="middle" fill="#c08000">Tanh</text>
  <path d="M104 75 Q120 68 130 54 Q140 40 150 26 Q158 18 174 14" fill="none" stroke="#c08000" stroke-width="1.5"/>
  <text x="270" y="10" text-anchor="middle" fill="#1a3a2a">ReLU</text>
  <path d="M216 72 L264 72 L330 18" fill="none" stroke="#1a3a2a" stroke-width="2"/>
  <text x="390" y="10" text-anchor="middle" fill="#24405e">GELU</text>
  <path d="M334 72 L360 72 Q372 72 378 68 Q384 52 400 22" fill="none" stroke="#24405e" stroke-width="2"/>
  <path d="M334 72 Q338 74 344 76 Q352 78 360 72" fill="none" stroke="#24405e" stroke-width="1.5"/>
  <line x1="2" y1="72" x2="456" y2="72" stroke="#ddd" stroke-width="0.5"/>
</svg>

**ReLU** `max(0, x)` — derivative is 1 for x > 0, 0 otherwise. Gradient flows through unattenuated for positive activations; deep networks became trainable in 2012 largely because of ReLU. Problem: **dead neurons** — if a neuron's input is always negative, its gradient is always zero; it never recovers.

**GELU** `x·Φ(x)` — smooth, allows small negative outputs (~−0.17 minimum), no dead neurons. Default in BERT, GPT, LLaMA, and all modern transformer architectures as of September 2026. Better gradient flow than ReLU in attention-heavy models.

**Swish/SiLU** `x·σ(x)` — similar to GELU, used in EfficientNet and some vision models. Performance nearly identical to GELU; choice is mostly ecosystem convention.

### Which activation where

| Location | Use |
|---|---|
| Hidden layers, transformers | **GELU** |
| Hidden layers, CNNs | **ReLU** or GELU |
| LSTM/GRU gates | Sigmoid + tanh |
| Output, binary classification | Sigmoid |
| Output, multi-class | Softmax |

:::warn
**ReLU dead neurons.** A neuron dies when its pre-activation is always negative — typically from large negative biases after a bad gradient update. Once dead it stays dead: zero output, zero gradient, zero update. Use `leaky_relu(x) = max(0.01x, x)` or GELU as a drop-in fix. Monitor for dead neurons by checking `(activations == 0).mean()` per layer during training.
:::
