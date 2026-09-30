# AI Engineering: From Scratch

## MAP Estimation & Regularization

How do algorithms learn probabilities from training data? 

### Maximum Likelihood Estimation (MLE)

MLE selects parameters that maximize the probability of the observed data ($P(Data | Params)$). It trusts the training data completely. If a word never appears in spam during training, MLE assigns it a zero probability, instantly breaking the model in production when that word inevitably appears.

### Maximum A Posteriori (MAP)

MAP selects parameters that maximize the probability of the parameters themselves ($P(Params | Data)$). 

By Bayes' theorem, this is proportional to:
$$ P(Data | Params) \times P(Params) $$

### The L2 Connection

The $P(Params)$ term acts as a **Prior**. If you assume the prior distribution of your neural network weights is a zero-centered Gaussian, the math perfectly simplifies into **L2 Regularization** (Weight Decay). 

Adding an L2 penalty to a loss function is literally equivalent to making a Bayesian statement: *"I expect my weights to be small."* Regularization is just Bayesian inference in disguise.
