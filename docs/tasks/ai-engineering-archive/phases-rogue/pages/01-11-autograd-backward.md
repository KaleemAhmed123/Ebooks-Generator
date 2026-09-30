# AI Engineering: From Scratch

## Topological Execution

When `loss.backward()` is called, the computation graph must be executed in reverse. We use a topological sort to ensure a parent node's gradient is fully accumulated from all branches before triggering its own child derivative computations.

```python
    def backward(self):
        topo = []
        visited = set()
        
        # Build the directed acyclic graph topologically
        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)
                
        build_topo(self)

        # Seed the backward pass (dL/dL = 1)
        self.grad = 1.0 
        
        # Execute chain rule computations in exact reverse order
        for v in reversed(topo):
            v._backward()
```
