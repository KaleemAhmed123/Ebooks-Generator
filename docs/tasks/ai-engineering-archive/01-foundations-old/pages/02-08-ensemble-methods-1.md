## Ensemble methods — bagging, boosting, and gradient boosting

- **Bagging** (Bootstrap Aggregating) — trains N models on N bootstrap samples (60–63% of data each, drawn with replacement), then averages their predictions. Each model independently overfits; averaging cancels out the errors. **Target: reduces variance**
- **Boosting** — trains models sequentially; each new model focuses on the examples where the ensemble so far was wrong. Errors correct errors. **Target: reduces bias**
- **Gradient boosting** (XGBoost, LightGBM, CatBoost) — fits each new tree to the **residuals** (negative gradients of the loss) of the current ensemble. Combines the power of boosting with the flexibility of any differentiable loss function

### What each ensemble method fixes

<svg viewBox="0 0 460 80" role="img" aria-label="Three ensemble types: bagging reduces variance by averaging independent models, boosting reduces bias by sequential correction, stacking combines both by learning which models to trust" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="8" width="140" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="74" y="26" text-anchor="middle" font-weight="bold">Bagging</text>
  <text x="74" y="40" text-anchor="middle" fill="#6b6b6b">Parallel, independent</text>
  <text x="74" y="52" text-anchor="middle" fill="#6b6b6b">Average / majority vote</text>
  <text x="74" y="64" text-anchor="middle" fill="#24405e">↓ Variance</text>
  <rect x="162" y="8" width="140" height="64" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="232" y="26" text-anchor="middle" font-weight="bold">Boosting</text>
  <text x="232" y="40" text-anchor="middle" fill="#6b6b6b">Sequential, weighted</text>
  <text x="232" y="52" text-anchor="middle" fill="#6b6b6b">Error on residuals</text>
  <text x="232" y="64" text-anchor="middle" fill="#24405e">↓ Bias</text>
  <rect x="320" y="8" width="136" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="388" y="26" text-anchor="middle" font-weight="bold">Stacking</text>
  <text x="388" y="40" text-anchor="middle" fill="#6b6b6b">Meta-learner combines</text>
  <text x="388" y="52" text-anchor="middle" fill="#6b6b6b">diverse model outputs</text>
  <text x="388" y="64" text-anchor="middle" fill="#24405e">↓ Both</text>
</svg>

### Gradient boosting in one equation

At step m, fit a new tree h_m to the negative gradient of the loss:

:::mint
```
r_i = −∂L(y_i, F_{m-1}(x_i)) / ∂F_{m-1}(x_i)   # residuals
F_m(x) = F_{m-1}(x) + η · h_m(x)                # update with step η
```
:::

For MSE loss, the residuals are just `y − ŷ` — each tree fits the prediction errors of the previous ensemble. For log-loss or other losses, the residuals are the loss gradients.
