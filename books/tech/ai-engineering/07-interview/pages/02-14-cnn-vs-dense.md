## Why use convolution instead of a fully-connected layer on images?

- A **dense layer** on a 224×224×3 image connects every pixel to every neuron — hundreds of millions of weights for one layer. It ignores that nearby pixels matter more than distant ones.
- **Convolution** slides a small filter across the image. Three wins:
  - **Parameter sharing** — the same filter is reused everywhere, so a tiny kernel (e.g. 3×3) replaces millions of weights.
  - **Locality** — each output depends only on a small neighbourhood, matching how image structure works.
  - **Translation invariance** — a feature (an edge, an eye) is detected wherever it appears, because the same filter scans the whole image.
- Pooling then downsamples, growing the **receptive field** so deeper layers see larger structures.

:::note
The same instinct — exploit the structure of the data to cut parameters — reappears in transformers (weight sharing across positions). The bias you build in is what lets the model learn from limited data.
:::

:::interview
What's really being tested:

the three inductive biases (sharing, locality, invariance) and that they're the reason a CNN learns vision from far less data than a dense net.
:::
