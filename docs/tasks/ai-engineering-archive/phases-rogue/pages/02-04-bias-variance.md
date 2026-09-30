# AI Engineering: From Scratch

## The Bias-Variance Tradeoff

Every error your model makes comes from one of three sources: bias, variance, or irreducible noise.

### Bias (Underfitting)

Bias is systematic error. The model is too rigid to capture the true underlying pattern (e.g., fitting a straight line to a curve). 
**Symptoms:** Both Training Error and Test Error are high.

### Variance (Overfitting)

Variance is sensitivity to training data. The model is so flexible it fits the literal noise in the dataset, completely failing to generalize.
**Symptoms:** Training Error is near zero, but Test Error is high.

### The Tradeoff & Regularization

As you increase model complexity, bias drops and variance rises. Your job is to find the sweet spot in the U-shaped curve. 

**Regularization** trades variance for bias. Techniques like L2 weight decay, dropout, or limiting tree depth intentionally cripple the model's capacity to memorize noise.

### Double Descent

Classical theory states that pushing complexity past the sweet spot guarantees catastrophic overfitting. 

Modern deep learning violates this. In massively overparameterized regimes (where parameters vastly outnumber data points), implicit regularization kicks in. The test error spikes at the interpolation threshold, but then mysteriously drops back down as complexity increases further. This is known as **Double Descent**.
