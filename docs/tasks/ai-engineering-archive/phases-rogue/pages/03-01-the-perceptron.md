# AI Engineering: From Scratch

## The Perceptron & MLPs

The perceptron is the fundamental building block of neural networks. It mirrors biological neurons: it takes multiple inputs, multiplies them by weights (synaptic strength), sums them, and applies a threshold.

### The Linear Problem

A single perceptron computes: $y = \text{step}(\sum w_i x_i + b)$. 
This is a linear classifier. It draws a single hyperplane in space. If the data is not linearly separable (like the famous XOR problem), a single perceptron fails completely.

### Multi-Layer Perceptrons (MLPs)

To solve non-linear problems, we stack perceptrons into layers:
1. **Input Layer:** Raw features.
2. **Hidden Layers:** Where representation learning happens. Each layer bends the feature space.
3. **Output Layer:** The final prediction.

Crucially, you cannot just stack linear layers. $W_2(W_1x) = (W_2W_1)x = W_3x$. Without non-linear activation functions between the layers, a 100-layer network collapses mathematically into a single linear layer. Depth is an illusion without non-linearity.
