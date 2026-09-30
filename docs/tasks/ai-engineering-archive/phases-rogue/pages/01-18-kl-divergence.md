# AI Engineering: From Scratch

## KL Divergence & Mutual Information

While cross-entropy measures the total cost of using an imperfect model, **Kullback-Leibler (KL) Divergence** isolates the *extra* penalty you pay for that imperfection.

### KL Divergence

$$ D_{KL}(P || Q) = \sum p(x) \log\left(\frac{p(x)}{q(x)}\right) $$

KL divergence measures the exact mathematical distance between the true distribution ($P$) and your model's distribution ($Q$). 
- It is strictly non-negative.
- It is **not symmetric** ($D_{KL}(P || Q) \neq D_{KL}(Q || P)$). 

Because the irreducible entropy of the ground-truth data ($H(P)$) is a fixed constant during training, minimizing Cross-Entropy perfectly minimizes KL Divergence. 

### Mutual Information

Mutual information ($I(X;Y)$) measures how much knowing one variable reduces your uncertainty about another.

$$ I(X;Y) = H(X) - H(X|Y) $$

If $X$ and $Y$ are independent, mutual information is zero. In applied machine learning, evaluating the mutual information between input features and the target variable is the most robust method for feature selection, as it detects both linear and highly non-linear dependencies completely invisibly to standard correlation metrics.
