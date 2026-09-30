# AI Engineering: From Scratch

## Activation Functions

Activations are the gates that let neural networks think in curves instead of just straight lines.

### Sigmoid & Tanh (The Legacy Era)

- **Sigmoid** $\sigma(x) = \frac{1}{1 + e^{-x}}$ squashes inputs to $(0, 1)$.
- **Tanh** squashes inputs to $(-1, 1)$.

Both suffer from the **Vanishing Gradient Problem**. Their derivatives peak at 0.25 (Sigmoid) or 1.0 (Tanh), and drop to 0 at the tails. When backpropagating through deep networks, the gradient is multiplied by numbers $\ll 1$, effectively becoming zero before reaching early layers.

### ReLU (The Breakthrough)

**ReLU (Rectified Linear Unit):** $\max(0, x)$. 
The gradient is exactly 1 for positive inputs. This solved the vanishing gradient problem and made deep learning possible. 
*Flaw:* **Dead Neurons.** If a neuron's input is constantly negative, its gradient is exactly 0, and it never updates again.

### GELU (The Modern Standard)

**GELU (Gaussian Error Linear Unit):** Used in BERT, GPT, and modern transformers.
Instead of a hard cutoff at zero like ReLU, GELU weights inputs by their probability under a Gaussian distribution. It is smooth, avoids dead neurons, and consistently outperforms ReLU in deep architectures.
