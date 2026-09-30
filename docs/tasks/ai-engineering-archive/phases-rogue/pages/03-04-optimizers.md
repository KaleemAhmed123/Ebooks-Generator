# AI Engineering: From Scratch

## Optimizers

Gradient descent tells you which direction to step. Optimizers tell you how far and how fast.

### Stochastic Gradient Descent (SGD)

Vanilla SGD computes the gradient on a mini-batch of data and steps: $w = w - \text{lr} \times \nabla$.
*Problem:* It oscillates wildly in narrow loss valleys and crawls through flat regions.

### Momentum

Instead of stepping purely based on the current gradient, Momentum maintains a running velocity (an exponential moving average of past gradients). This dampens oscillation across valleys and accelerates progress along them.

### Adam & AdamW (The Industry Default)

Adam combines Momentum (first moment, tracks mean direction) and RMSProp (second moment, tracks gradient variance). It computes an adaptive learning rate for *every single parameter*.
- Parameters with large, erratic gradients get their learning rates reduced.
- Parameters with small, consistent gradients get their learning rates boosted.

**AdamW** decouples weight decay (L2 regularization) from the adaptive gradient, applying it directly to the weights. AdamW with Cosine Learning Rate Decay is the universal standard for training Transformers.
