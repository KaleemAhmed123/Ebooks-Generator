# AI Engineering: From Scratch

## Backpropagation

Neural networks learn by taking the derivative of the loss function with respect to every single weight in the network. Backpropagation is the algorithm that computes these millions of derivatives efficiently.

### The Forward Pass

Data flows from input to output. We compute the pre-activation $z = Wx + b$, the activation $a = \text{ACT}(z)$, and finally the loss $\mathcal{L}$. We save all intermediate values ($z$ and $a$) because we need them for the backward pass.

### The Backward Pass (Chain Rule)

Calculus tells us how to find the derivative of nested functions using the chain rule.
To find how a weight in the first layer affects the final loss, we multiply the local gradients backwards:

$\frac{\partial \mathcal{L}}{\partial W_1} = \frac{\partial \mathcal{L}}{\partial a_2} \times \frac{\partial a_2}{\partial z_2} \times \frac{\partial z_2}{\partial a_1} \times \frac{\partial a_1}{\partial z_1} \times \frac{\partial z_1}{\partial W_1}$

### Vectorization

Instead of computing derivatives for one weight at a time, we use matrix calculus. We compute the gradient of the loss with respect to an entire layer's weight matrix simultaneously. This is why GPUs (which excel at matrix multiplication) are required for deep learning.
