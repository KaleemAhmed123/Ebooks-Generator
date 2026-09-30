# AI Engineering: From Scratch

## Convolutions

A fully connected layer on a 224x224 RGB image requires over 150,000 weights per neuron. Worse, it destroys the spatial structure of the image. A dog in the top-left is treated entirely differently than a dog in the bottom-right. 

Convolutions solve this using two priors:
1. **Translation Equivariance:** If the input shifts, the output shifts.
2. **Parameter Sharing:** The same feature detector runs everywhere.

### The Convolution Operation

A small weight matrix (the **kernel**) slides across the image. At each step, we compute the sum of element-wise products between the kernel and the image patch.

```
Input (5x5)       Kernel (3x3)      Output (3x3)
1 2 0 1 2         1  0 -1           ...
0 1 3 1 0    *    2  0 -2      ->   ...
...               1  0 -1           ...
```
This single kernel might learn to detect a vertical edge, a curve, or a specific texture. 

### The Shape Formula

Given Input Height $H$, Kernel size $K$, Padding $P$, and Stride $S$:
$$H_{\text{out}} = \lfloor \frac{H - K + 2P}{S} \rfloor + 1$$

### Im2Col (The Performance Trick)

Nested loops are too slow. GPUs accelerate convolutions using `im2col`, which extracts every patch of the image into a single large column, turning the sliding window operation into a single massive matrix multiplication.
