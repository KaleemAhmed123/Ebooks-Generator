# AI Engineering: From Scratch

## The Attention Mechanism

Recurrent Neural Networks (RNNs) failed at long sequences because they compressed past information into a fixed-size state bottleneck. The Attention Mechanism solved this by letting the model look back at *everything*.

### The Database Lookup Analogy

Standard Attention is a soft database lookup. Every token in a sequence generates three vectors:
1. **Query (Q):** What am I looking for?
2. **Key (K):** What information do I contain?
3. **Value (V):** What data will I provide if selected?

The model computes the dot product between a token's **Query** and every other token's **Key**. A high score means a strong match. These scores are pushed through a Softmax function, creating a probability distribution (Attention Weights) that sum to 1.0. 
The token then creates a weighted sum of the **Values** using these weights.

### The Equation

$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$

We divide by $\sqrt{d_k}$ (the dimension size) to prevent the dot products from growing too large, which would cause the softmax gradients to vanish.
