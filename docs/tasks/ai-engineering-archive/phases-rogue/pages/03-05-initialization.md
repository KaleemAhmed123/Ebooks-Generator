# AI Engineering: From Scratch

## Weight Initialization

If you initialize weights to zero, every neuron computes the exact same thing, gets the exact same gradient, and stays identical forever (The Symmetry Problem).
If you initialize weights too large, activations explode to infinity. If too small, they vanish to zero.

### Variance Propagation

The goal of initialization is to keep the variance of the signal constant as it passes through dozens of layers.

### Xavier (Glorot) Initialization

Designed for **Sigmoid** and **Tanh**. 
It sets the variance of the weights to $2 / (\text{fan\_in} + \text{fan\_out})$. This perfectly stabilizes the signal in networks where the activation function is roughly linear near zero.

### Kaiming (He) Initialization

Designed for **ReLU** and **GELU**. 
Because ReLU zeroes out exactly half of the activations (all negative values), the signal loses half its variance at every layer. Kaiming init compensates by setting the variance to $2 / \text{fan\_in}$. The factor of 2 exactly offsets the 50% loss from the ReLU cutoff.

*Rule of Thumb:* If using GELU/ReLU, use Kaiming. If building a Transformer, follow GPT-2's rule and scale residual blocks by $1 / \sqrt{2N}$.
