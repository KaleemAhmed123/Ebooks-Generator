## ML pipelines

- A model is a small part of a working ML system. The **pipeline** is the whole path: raw data → cleaning → features → training → evaluation → a deployed model.
- Treating it as one repeatable artifact — not a notebook run by hand — is the difference between a demo and a product.

<svg viewBox="0 0 400 60" role="img" aria-label="A pipeline: ingest, clean, features, train, evaluate, deploy, connected in sequence" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <g>
    <rect x="6" y="20" width="52" height="22" fill="#e8f4fd" stroke="#24405e"/><text x="32" y="34" text-anchor="middle">ingest</text>
    <rect x="70" y="20" width="52" height="22" fill="#e8f4fd" stroke="#24405e"/><text x="96" y="34" text-anchor="middle">clean</text>
    <rect x="134" y="20" width="56" height="22" fill="#e8f4fd" stroke="#24405e"/><text x="162" y="34" text-anchor="middle">features</text>
    <rect x="202" y="20" width="52" height="22" fill="#e8f4fd" stroke="#24405e"/><text x="228" y="34" text-anchor="middle">train</text>
    <rect x="266" y="20" width="60" height="22" fill="#e8f4fd" stroke="#24405e"/><text x="296" y="34" text-anchor="middle">evaluate</text>
    <rect x="338" y="20" width="56" height="22" fill="#1a3a2a"/><text x="366" y="34" text-anchor="middle" fill="#fff">deploy</text>
  </g>
</svg>

### Why it must be reproducible

- **Track experiments.** Tools like **MLflow** record which data, code, and settings produced which score — so a good result can be found again.
- **Version the data**, not just the code. The same script on different data is a different model.
- **Same transforms in training and serving.** If features are computed one way offline and another way live, the model sees inputs it never trained on — **training–serving skew**, a top cause of models that ace tests and fail in production.

:::note
This is the doorway to **MLOps** — the engineering discipline of shipping and maintaining models. The later Production booklet builds on exactly this pipeline view. For now: if you cannot rerun it and get the same result, it is not done.
:::
