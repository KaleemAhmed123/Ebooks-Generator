## What is a receptive field, and why does it matter?

- The **receptive field** of a neuron is the region of the *input* that can influence its value. A neuron in layer 1 sees only a 3×3 patch; stack layers and pooling, and deep neurons see most of the image.
- It matters because a model can only recognise a pattern that fits inside its receptive field. To detect a large object or a long-range dependency, the field must be big enough to span it.
- Levers that grow it: more layers, larger kernels, pooling/striding, and **dilated** convolutions (holes in the kernel that widen reach without adding parameters).
- The analogue in transformers is the **context window** — attention gives a global receptive field in one layer, which is exactly why transformers capture long-range dependencies that CNNs/RNNs struggle with.

:::interview
What's really being tested:

that you connect "field must cover the pattern" to design choices (depth, dilation) and see attention's global field as the transformer's structural advantage.
:::
