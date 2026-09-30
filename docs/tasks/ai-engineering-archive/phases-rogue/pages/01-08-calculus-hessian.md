# AI Engineering: From Scratch

## The Hessian & Curvature

While the gradient indicates the slope of the loss landscape, the **Hessian matrix** ($\mathbf{H}$) captures its curvature via second-order partial derivatives. 

$$ \mathbf{H}_{i,j} = \frac{\partial^2 L}{\partial w_i \partial w_j} $$

### Newton's Method vs Gradient Descent

Gradient descent assumes the local landscape is flat and simply follows the slope. Newton's method utilizes the full Hessian to reshape the descent path: steep directions take smaller steps, and flat valleys take massive leaps. 

```python
# First-order optimization (Gradient Descent)
w_new = w_old - learning_rate * grad

# Second-order optimization (Newton's Method)
w_new = w_old - inverse(Hessian) @ grad
```

In deep learning, $\mathbf{H}$ for a 1-billion parameter model requires $10^{18}$ entries, making exact inversion computationally impossible. Modern optimizers like **Adam** bypass this by tracking running gradient variances, implicitly approximating a diagonal Hessian in $O(N)$ time.

### Taylor Series Foundations

All gradient-based learning relies on Taylor series local approximations. First-order Taylor expansions yield gradient descent. Second-order expansions yield Newton's method. Smooth, differentiable loss functions like Cross-Entropy are explicitly chosen because they produce predictable, well-behaved Taylor expansions.
