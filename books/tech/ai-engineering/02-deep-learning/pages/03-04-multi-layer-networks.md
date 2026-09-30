## Multi-layer networks

- Stack neurons into **layers**: an input layer, one or more **hidden layers** (layers between input and output), and an output layer. This is a **multi-layer perceptron (MLP)**.
- Each layer's outputs feed the next layer's inputs. One layer is a matrix multiply, plus a bias, plus an activation — nothing more.
- With a single hidden layer of enough neurons, an MLP can approximate **any** continuous function. This is the **universal approximation theorem** (Cybenko, 1989).

:::mint
```python
import numpy as np
def layer(X, W, b, act):
    return act(X @ W + b)      # matrix multiply, add bias, then bend

def relu(z): return np.maximum(0, z)
h = layer(X, W1, b1, relu)     # hidden layer
y = layer(h, W2, b2, relu)     # output layer reads the hidden layer
```
:::

- `X @ W` is the matrix multiply from Booklet 1: it mixes every input into every neuron in one operation.

:::note
"Enough neurons" for one layer can be astronomically large. Depth is cheaper than width: two moderate layers usually beat one giant layer at the same task. That is why the field went **deep** instead of just wide.
:::
