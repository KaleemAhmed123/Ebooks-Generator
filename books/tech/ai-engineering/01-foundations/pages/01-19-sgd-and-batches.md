## Stochastic gradient descent and batches

- Computing the gradient on the **entire** dataset for every step is exact but ruinously slow — millions of examples per single move downhill.
- **Stochastic gradient descent (SGD)** uses a small random sample each step instead. Faster, and it works.
- The sample is a **batch** (or *mini-batch*), typically 32 to 256 examples.

### One pass over the data is an epoch

- The model steps once per batch. When it has seen every batch — the whole dataset once — that is one **epoch**.
- Training runs for many epochs, reshuffling the batches each time.

<svg viewBox="0 0 380 84" role="img" aria-label="A dataset split into batches, each batch producing one weight update, all batches together forming one epoch" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="10" y="20" font-weight="bold">dataset</text>
  <rect x="70" y="10" width="40" height="16" fill="#e8f4fd" stroke="#24405e"/>
  <rect x="115" y="10" width="40" height="16" fill="#e8f4fd" stroke="#24405e"/>
  <rect x="160" y="10" width="40" height="16" fill="#e8f4fd" stroke="#24405e"/>
  <rect x="205" y="10" width="40" height="16" fill="#e8f4fd" stroke="#24405e"/>
  <text x="290" y="22">… = 1 epoch</text>
  <path d="M90 26 L90 46" stroke="#1a3a2a" marker-end="url(#b)"/>
  <path d="M135 26 L135 46" stroke="#1a3a2a" marker-end="url(#b)"/>
  <path d="M180 26 L180 46" stroke="#1a3a2a" marker-end="url(#b)"/>
  <path d="M225 26 L225 46" stroke="#1a3a2a" marker-end="url(#b)"/>
  <text x="150" y="66" text-anchor="middle" fill="#1a3a2a">one weight update per batch</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a3a2a"/></marker></defs>
</svg>

:::note
The randomness is not just a speed hack — it helps. The noisy gradient from a small batch can bounce the model out of shallow bad valleys that a smooth full-dataset gradient would settle into. Faster *and* often a better final result.
:::

:::warn
Batch size interacts with learning rate. Double the batch and the gradient is smoother, so you can usually afford a larger step. Change one and you often have to retune the other.
:::
