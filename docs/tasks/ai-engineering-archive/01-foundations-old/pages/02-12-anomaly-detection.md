## Anomaly detection — modelling what is normal

- **Anomaly detection** — the task of identifying data points that deviate from the learnt distribution of normal data. Framed as density estimation, not classification; you fit on normal data, then flag low-density observations
- Three anomaly types: **point** (a single outlier value), **contextual** (normal in one context, abnormal in another), **collective** (a sequence of normal values that form an abnormal pattern together)
- **Why unsupervised?** Anomalies are rare and diverse. A supervised classifier trained on known fraud will miss entirely new fraud strategies. Modelling normal and flagging deviations catches novel anomaly types automatically

### Three detection methods

<svg viewBox="0 0 460 80" role="img" aria-label="Three anomaly detection methods: Z-score flags statistical outliers, IQR uses percentiles for robustness, Isolation Forest partitions data to isolate outliers" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="8" width="140" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="74" y="26" text-anchor="middle" font-weight="bold">Z-score</text>
  <text x="74" y="40" text-anchor="middle" fill="#6b6b6b">|x − μ| / σ > 3</text>
  <text x="74" y="52" text-anchor="middle" fill="#6b6b6b">Fast, interpretable</text>
  <text x="74" y="64" text-anchor="middle" fill="#6b6b6b">Assumes Gaussian</text>
  <rect x="162" y="8" width="140" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="232" y="26" text-anchor="middle" font-weight="bold">IQR method</text>
  <text x="232" y="40" text-anchor="middle" fill="#6b6b6b">x < Q1 − 1.5·IQR</text>
  <text x="232" y="52" text-anchor="middle" fill="#6b6b6b">or x > Q3 + 1.5·IQR</text>
  <text x="232" y="64" text-anchor="middle" fill="#6b6b6b">Robust to skew</text>
  <rect x="320" y="8" width="136" height="64" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="388" y="26" text-anchor="middle" font-weight="bold">Isolation Forest</text>
  <text x="388" y="40" text-anchor="middle" fill="#6b6b6b">Random trees isolate</text>
  <text x="388" y="52" text-anchor="middle" fill="#6b6b6b">outliers in fewer cuts</text>
  <text x="388" y="64" text-anchor="middle" fill="#24405e">High-dimensional ✓</text>
</svg>

### Isolation Forest — the production-ready baseline

An Isolation Forest builds random trees that randomly partition the feature space. Points that are easy to isolate (anomalies) have short average path lengths to a leaf. Points deep in the tree are normal.

:::mint
```python
from sklearn.ensemble import IsolationForest
iso = IsolationForest(contamination=0.01, random_state=42)
iso.fit(X_train)                        # train on normal data
scores = iso.decision_function(X_new)  # negative = more anomalous
labels = iso.predict(X_new)            # −1 = anomaly, 1 = normal
```
:::

`contamination` — the expected fraction of outliers. Set this to the estimated anomaly rate in production. Getting it right matters: too low misses anomalies; too high creates false-alarm fatigue.

:::note
The best anomaly detection systems are **hybrid**: Isolation Forest for broad, novel-anomaly coverage; a supervised classifier for high-precision detection of known anomaly types (fraud patterns you have seen before); and human review for the borderline cases. Neither pure-supervised nor pure-unsupervised alone covers the space well.
:::
