# AI Engineering: From Scratch

## Common Distributions

Three distributions dictate the vast majority of AI architectures:

### 1. Categorical Distribution
Models a single trial with $k$ discrete outcomes. This is the mathematical framework for multi-class classification. The neural network outputs a vector of $k$ probabilities summing to 1.

### 2. Bernoulli Distribution
A specialized categorical distribution where $k=2$. Models binary classification (e.g., Spam vs Not Spam). Parameterized by a single probability $p$.

### 3. Normal (Gaussian) Distribution
The bell curve. Parameterized by a mean ($\mu$) and variance ($\sigma^2$). 

Why is it ubiquitous in AI? Because of the **Central Limit Theorem**: the sum of many independent random variables naturally converges to a normal distribution, regardless of their original distributions.
- Weight initialization is sampled from a normal distribution.
- Gradient noise in Stochastic Gradient Descent acts normally.
- It is the maximum entropy distribution for a known mean and variance.
