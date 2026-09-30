# AI Engineering: From Scratch

## Building an Autograd Engine

To compute gradients dynamically, we must wrap every tensor in a tracking class that records the operations applied to it. This forms a define-by-run computational graph, identical to PyTorch's architectural internals.

### The Value Node

```python
class Value:
    def __init__(self, data, _children=(), _op=''):
        self.data = data
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)
        self._op = _op

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), '*')

        def _backward():
            # Chain rule: local gradient * upstream gradient
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
            
        out._backward = _backward
        return out
```
