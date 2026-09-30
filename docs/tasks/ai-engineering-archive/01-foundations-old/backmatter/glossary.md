# Glossary — Booklet 1: Foundations

---

**Anomaly detection** — finding data points that deviate from the learnt distribution of normal data; framed as density estimation rather than classification.

**Apache Arrow** — a columnar in-memory data format; the internal storage format of the HuggingFace `datasets` library. Zero-copy, cache-friendly.

**Autograd** — a system (built into PyTorch, TensorFlow, JAX) that automatically computes exact derivatives of any computation expressed as code, using reverse-mode automatic differentiation.

**Backpropagation** — the algorithm for computing gradients through a neural network by applying the chain rule in reverse through the computation graph. Equivalent to reverse-mode autodiff.

**Bagging** (Bootstrap Aggregating) — an ensemble technique that trains N models on N bootstrap samples and averages their predictions to reduce variance.

**Bayes' theorem** — `P(H|E) = P(E|H)·P(H) / P(E)`. Updates a prior belief P(H) to a posterior P(H|E) after observing evidence E.

**bfloat16** — a 16-bit floating-point format with the same 8-bit exponent as float32 (same range, ±3.4×10³⁸) but fewer mantissa bits. Preferred over float16 for training because it avoids the 65,504 overflow limit.

**Bias (model)** — systematic prediction error from a model too simple to capture the true pattern. High bias = underfitting.

**Binary cross-entropy** — the loss function for binary classification: `−(y log p + (1−y) log(1−p))`. Convex when combined with a sigmoid; produces a single global minimum.

**Broadcasting** — NumPy/PyTorch's rule for operating on tensors of different shapes by implicitly expanding size-1 dimensions to match their counterpart.

**Chain rule** — the calculus identity `d(f∘g)/dx = f'(g(x))·g'(x)`. The mathematical basis of backpropagation through composed functions.

**Computational graph** — a directed acyclic graph where each node is an operation; forward pass computes values, backward pass propagates gradients.

**Container** — a process running in an isolated namespace (filesystem, network, process tree) sharing the host OS kernel. Docker images are read-only templates; containers are running instances.

**Cosine similarity** — `(a·b) / (|a|·|b|)` — measures vector alignment on a scale from −1 (opposite) to 1 (identical). Used in semantic search and recommendation.

**Cross-entropy** — `H(P,Q) = −Σ p(x) log q(x)` — measures how surprised you are on average when using model distribution Q to encode data from true distribution P. Equals `H(P) + D_KL(P‖Q)`.

**Curse of dimensionality** — as dimensions grow, distances between random points converge, volume concentrates in corners, and exponentially more data is needed to maintain density.

**Data leakage** — information from test data or future data contaminating the training signal, causing optimistically biased performance estimates.

**Decision tree** — a model that recursively partitions feature space using threshold tests, chosen greedily to maximise information gain.

**Derivative** — `f'(x)` — the slope of `f` at point `x`; how much the output changes per infinitesimal change in input.

**Dot product** — `a·b = Σ aᵢbᵢ` — a scalar measuring alignment between two vectors. Positive = same direction, zero = perpendicular, negative = opposing.

**Dropout** — a regularisation technique that randomly sets activations to zero during training, preventing co-adaptation and reducing variance.

**Eigenvalue / eigenvector** — for matrix A, `Av = λv`: v is the eigenvector (direction unchanged by A), λ is the eigenvalue (scaling factor). Eigenvectors define PCA principal components; eigenvalue magnitudes govern RNN stability.

**Einsum** — Einstein summation notation; a single expression that covers dot products, matmuls, transposes, outer products, and batched operations by labelling axes.

**Entropy** — `H(P) = −Σ p(x) log p(x)` — the expected surprise of a distribution. Maximum entropy = maximum uncertainty. Lower bound on compression.

**Feature engineering** — transforming raw data into representations that reveal patterns more clearly for a model.

**Float16** — 16-bit floating-point; maximum representable value 65,504. Too small for training activations; used for inference.

**Float32** — 32-bit floating-point; ~7 significant decimal digits; standard training precision.

**Gini impurity** — `1 − Σpₖ²` — the probability that a randomly chosen sample would be misclassified given the class distribution at a tree node. Used as the split criterion in scikit-learn decision trees.

**Gradient** — `∇f` — the vector of all partial derivatives; points in the direction of steepest ascent. Gradient descent moves opposite to it.

**Gradient boosting** — a boosting algorithm that fits each new tree to the negative gradient (residuals) of the current ensemble's loss.

**Information gain** — reduction in impurity after a split; used to select the best feature and threshold at each decision tree node.

**Isolation Forest** — an anomaly detection algorithm that builds random trees and uses average path length to isolate outliers; shorter paths = more anomalous.

**K-fold cross-validation** — splitting data into K folds; training on K−1 folds and validating on the remaining fold, repeated K times. Gives a more stable estimate than a single split.

**KL divergence** — `D_KL(P‖Q) = Σ p(x) log(p(x)/q(x))` — measures how much extra surprise you get from using Q instead of P. Not symmetric. Cross-entropy = entropy + KL divergence.

**Learning rate (η)** — the scalar multiplier on the gradient update: `w ← w − η·∇L`. The single most important hyperparameter.

**Linear independence** — a set of vectors is linearly independent if none can be written as a combination of the others. The rank of a matrix equals the number of linearly independent columns.

**Log-sum-exp trick** — `log Σ exp(xᵢ) = m + log Σ exp(xᵢ − m)` where `m = max(xᵢ`. Prevents overflow in softmax computation.

**Mean Squared Error (MSE)** — `(1/n)Σ(ŷ−y)²` — the regression loss function. Differentiable everywhere; penalises large errors quadratically.

**Momentum** — a velocity term added to gradient descent: `v ← βv + g; w ← w − η·v`. Accumulates past gradients to smooth zigzagging updates.

**Normal equation** — `w = (XᵀX)⁻¹Xᵀy` — the closed-form solution for linear regression. Exact but O(n³); gradient descent preferred for large n.

**Overfitting** — a model that fits training noise rather than signal; low training error, high test error.

**PCA** (Principal Component Analysis) — projects data onto the eigenvectors of its covariance matrix, ordered by variance captured. Reduces dimensions while retaining maximum information.

**Perplexity** — `exp(H(P,Q))` — the effective vocabulary size a language model is choosing from. Lower = better.

**Pipeline** — an ordered sequence of transformers + a final model, packaged as one object. Fitted on training data only; prevents data leakage.

**Prior / Posterior / Likelihood** — Bayesian terms. Prior: belief before evidence. Likelihood: how probable the evidence is given the hypothesis. Posterior: updated belief after evidence, via Bayes' theorem.

**Rank (matrix)** — number of linearly independent columns = linearly independent rows. A rank-deficient matrix has no unique inverse.

**Regularisation** — adding a penalty term to the loss that constrains weight magnitude, increasing bias to reduce variance. L1 sparsifies; L2 shrinks.

**Reverse-mode autodiff** — starts at the loss (`dL/dL = 1`) and propagates gradients backward through the computation graph. Computes all weight gradients in a single pass; used by all deep learning frameworks.

**Ridge regression** — linear regression with L2 regularisation: `L = MSE + λ‖w‖²`. Shrinks all weights toward zero; prevents any feature from dominating.

**Sigmoid** — `σ(z) = 1/(1 + e⁻ᶻ)` — maps any real number to (0, 1). Derivative: `σ'(z) = σ(z)·(1−σ(z))`. Used in binary classification and LSTM gates.

**Softmax** — converts a vector of logits to a probability distribution: `softmaxᵢ = exp(zᵢ) / Σ exp(zⱼ)`. Apply the subtract-max trick for numerical stability.

**SVD** (Singular Value Decomposition) — `A = UΣVᵀ`. Any matrix factors into two rotations and a scaling. Singular values measure amplification; truncated SVD gives the best low-rank approximation (Eckart-Young theorem).

**t-SNE** — a non-linear dimensionality reduction algorithm that preserves neighbourhood structure for 2D visualisation. Stochastic, slow, not usable as input features.

**Tensor** — a multi-dimensional array with a fixed dtype and a shape tuple. The fundamental data type in deep learning frameworks.

**TF-IDF** — Term Frequency × Inverse Document Frequency; weights words by how frequently they appear in a document relative to how rare they are across all documents. Downweights stop words.

**Underfitting** — a model too simple to capture the signal; high training error and high test error.

**uv** — a Python package manager (by Astral, written in Rust) that replaces pip + venv + pyenv in one tool; 10–100× faster installs.

**Variance (model)** — sensitivity of predictions to the specific training set. High variance = overfitting.

**Virtual environment** — an isolated directory with its own Python interpreter and packages, separate from the system Python. Every AI project should have one.

**VRAM** — GPU memory, physically separate from system RAM. Model weights must fit in VRAM during inference. Training requires additional space for gradients and optimiser states.

**XGBoost / LightGBM / CatBoost** — production-grade gradient boosting libraries. Dominant on tabular data as of September 2026; use second-order (Newton) updates for faster convergence than vanilla gradient boosting.
