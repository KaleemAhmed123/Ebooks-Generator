# AI Engineering: From Scratch

## Information & Entropy

Information theory measures surprise. When a highly probable event occurs, it carries zero information. When a rare event occurs, it yields massive information.

### Entropy (Average Surprise)

Entropy ($H(P)$) measures the expected baseline surprise across all possible outcomes of a distribution $P$. A fair coin has maximum entropy (complete uncertainty). A highly biased coin has near-zero entropy (you already know what will happen).

$$ H(P) = - \sum p(x) \log(p(x)) $$

### Cross-Entropy

Cross-entropy measures the average surprise when you use a model's predicted distribution ($Q$) to encode events that actually occurred under the true distribution ($P$). 

$$ H(P, Q) = - \sum p(x) \log(q(x)) $$

In classification, the true label $P$ is a one-hot vector, immediately collapsing the sum into a single term:

$$ Loss = - \log(q_{true\_class}) $$

Minimizing Cross-Entropy loss is mathematically identical to maximizing the log-likelihood of the training data. You are forcing the model to assign all its probability mass to reality.

### Perplexity

Perplexity is simply the exponential of cross-entropy. It represents the "effective vocabulary size" a language model is choosing from. A model with a perplexity of 50 is, on average, just as confused as if it were choosing blindly between 50 equally probable tokens.
