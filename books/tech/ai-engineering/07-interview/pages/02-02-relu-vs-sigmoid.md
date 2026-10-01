## Why did ReLU replace sigmoid/tanh as the default activation?

- **Sigmoid/tanh saturate:** for large positive or negative inputs their gradient is near zero. Stack a few layers and the backpropagated gradient shrinks toward nothing — the **vanishing gradient** that stalled deep nets for years.
- **ReLU** (`max(0, x)`) has gradient exactly 1 for positive inputs — no saturation on that side, so gradients flow through many layers. It's also cheap (a compare) and induces useful sparsity.
- Cost: **dead ReLUs** — a neuron stuck at negative input outputs 0 forever, gradient 0, never recovers. Leaky ReLU, GELU, and SiLU/Swish fix this with a small negative slope or a smooth curve; modern transformers use **GELU/SiLU**.

:::warn
"ReLU has no vanishing gradient" is half-true — it avoids saturation on the positive side but dies on the negative side. The real modern default is a smooth variant (GELU), not raw ReLU.
:::

:::interview
What's really being tested:

that you know the specific failure each activation has — saturation (sigmoid) vs dying units (ReLU) — and why GELU/SiLU won in transformers.
:::
