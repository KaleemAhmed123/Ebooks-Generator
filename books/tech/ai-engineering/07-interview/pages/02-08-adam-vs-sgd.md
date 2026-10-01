## Why does Adam usually train faster than plain SGD, and when does SGD+momentum still win?

- **Adam** keeps a per-parameter running average of the gradient (momentum) and of its squared magnitude (variance), then scales each step by `1/√variance`. Effect: every parameter gets its own adaptive learning rate.
- That adaptivity makes Adam robust to bad learning-rate choices and fast on sparse, noisy, or ill-scaled gradients — which is why it's the default for transformers and most NLP.
- **SGD + momentum** often **generalises better** on vision/CNNs: it tends to find flatter minima, while Adam can converge to sharper ones. Many image models still train with SGD+momentum + a good schedule.
- Practical default for LLMs: **AdamW** (Adam with *decoupled* weight decay) — plain Adam applies weight decay incorrectly through the adaptive term.

:::interview
What's really being tested:

that you know Adam's per-parameter adaptive step, the generalisation gap vs SGD, and the AdamW weight-decay fix — the detail that separates "I've read about Adam" from "I've trained with it."
:::
