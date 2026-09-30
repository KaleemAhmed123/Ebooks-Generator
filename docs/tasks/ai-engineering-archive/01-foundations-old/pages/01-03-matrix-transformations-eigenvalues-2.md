### Why eigenvalues govern model stability

- In RNNs: if any eigenvalue of the recurrent weight matrix has magnitude > 1, gradients explode during training. If all eigenvalues < 1 in magnitude, gradients vanish. Stable training requires eigenvalues near 1
- In LoRA (Low-Rank Adaptation): fine-tuning updates a weight matrix W as `W + AB` where A is `(d×r)` and B is `(r×d)`, rank r ≪ d. This assumes the update lives in a low-rank subspace — a claim about the eigenvalue spectrum of the update matrix

:::note
The characteristic equation for 2×2: det(A − λI) = 0. For A = [[a,b],[c,d]], eigenvalues are `λ = ((a+d) ± √((a−d)²+4bc)) / 2`. NumPy's `eigh` is numerically preferred over `eig` for symmetric matrices like covariance matrices.
:::
