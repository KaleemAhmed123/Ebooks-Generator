## The learning loop and the three kinds of learning

- Every supervised model is trained by the same loop: predict, measure the error, adjust, repeat. You met the machinery in Module 1 — this is where it comes together.

<svg viewBox="0 0 400 92" role="img" aria-label="The training loop: data to model to prediction to loss, with the loss feeding an update back into the model" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="10" y="34" width="56" height="22" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="49" text-anchor="middle">data</text>
  <path d="M66 45 L88 45" stroke="#1a1a1a" marker-end="url(#l)"/>
  <rect x="90" y="34" width="56" height="22" fill="#e8f4fd" stroke="#24405e"/><text x="118" y="49" text-anchor="middle">model</text>
  <path d="M146 45 L168 45" stroke="#1a1a1a" marker-end="url(#l)"/>
  <rect x="170" y="34" width="66" height="22" fill="#e8f4fd" stroke="#24405e"/><text x="203" y="49" text-anchor="middle">prediction</text>
  <path d="M236 45 L258 45" stroke="#1a1a1a" marker-end="url(#l)"/>
  <rect x="260" y="34" width="56" height="22" fill="#1a3a2a"/><text x="288" y="49" text-anchor="middle" fill="#fff">loss</text>
  <path d="M288 34 Q288 8 118 8 Q118 8 118 32" fill="none" stroke="#c0392b" stroke-dasharray="3 2" marker-end="url(#l)"/>
  <text x="200" y="20" text-anchor="middle" fill="#c0392b">update the model (gradient step)</text>
  <defs><marker id="l" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
</svg>

### The three paradigms

- **Supervised** — learn from labelled pairs (input → correct answer). Spam detection, pricing, image labels. Most of this module.
- **Unsupervised** — no labels; find structure on your own. Clustering, compression.
- **Reinforcement** — no labels, only rewards; learn by trial and error. Games, robotics, and the alignment of chat models (RLHF).

:::note
The loop is the same idea as gradient descent from Module 1, now with a name for each part. "Training a model" and "minimizing a loss by gradient descent" describe the same activity.
:::
