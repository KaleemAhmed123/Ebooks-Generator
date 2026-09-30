# AI Engineering: From Scratch

## Log Probabilities & Softmax

Raw probabilities cause immediate numerical underflow in floating-point systems. Multiplying many small probabilities (e.g., generating a 50-word sentence) instantly evaluates to exactly zero. Working in log space converts unstable multiplication into stable addition.

### The Softmax Function

Neural networks output unconstrained raw scores (logits). Softmax converts these logits into a valid, normalized probability distribution.

```python
import numpy as np

def stable_softmax(logits):
    # Subtracting the max logit prevents exponent overflow.
    # The output distribution remains mathematically identical.
    shifted = logits - np.max(logits)
    exps = np.exp(shifted)
    return exps / np.sum(exps)
```

### Cross-Entropy Loss

Cross-entropy calculates the negative log probability of the correct class. If the correct class receives a probability of 1.0, the loss is $-log(1.0) = 0$. If it receives 0.01, the loss is $-log(0.01) = 4.6$. By minimizing this expected loss, the network forces the correct logit higher and pushes all competing logits lower.
