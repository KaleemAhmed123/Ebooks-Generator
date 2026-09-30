## Automatic differentiation

- Nobody computes the gradient of a million-weight model by hand. **Automatic differentiation (autodiff)** does it for you, exactly.
- The trick: record every operation as it runs, building a **computational graph** — a record of what fed into what. Then walk the graph backward, applying the chain rule at each step.
- This backward walk through a network is called **backpropagation**. It is autodiff applied to a loss function.

### Forward mode vs reverse mode

- **Forward mode** — track slopes as you go from input to output. Cheap when there are few inputs.
- **Reverse mode** — run the function first, then propagate slopes from output back to inputs. Cheap when there are few *outputs*.
- A model has millions of inputs (weights) but **one** output (the loss). So reverse mode wins overwhelmingly — one backward pass gets every gradient at once.

:::mint
```python
import torch
w = torch.tensor([2.0], requires_grad=True)   # track this weight
loss = (w ** 2) + (3 * w)                      # some computation
loss.backward()                                # walk the graph backward
w.grad     # tensor([7.])  ->  d/dw (w²+3w) = 2w+3 = 7 at w=2
```
:::

:::note
This is why frameworks like PyTorch and JAX exist. You write the forward computation in plain code; the framework records the graph and hands you exact gradients. You will almost never write a derivative yourself again.
:::
