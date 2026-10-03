## Convex vs non-convex, and why training works anyway

:::note
**Optional deep-dive — safe to skip on a first read.** The one thing to keep: training a deep network has no guarantee of finding the best answer, yet it works well in practice.
:::

- A function is **convex** if it has a single bowl shape — one bottom, and downhill always leads to it. Gradient descent on a convex loss is guaranteed to find the best answer.
- Classical models (linear and logistic regression) have convex losses. That is why they train reliably to the true optimum.
- Neural networks are **non-convex**: their loss surface is a wild landscape of many valleys. There is no guarantee gradient descent finds the deepest one.

<svg viewBox="0 0 380 96" role="img" aria-label="A single-bowl convex curve on the left versus a bumpy non-convex curve with many valleys on the right" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <path d="M20 20 Q90 100 160 20" fill="none" stroke="#1a3a2a" stroke-width="2"/>
  <text x="90" y="92" text-anchor="middle" font-weight="bold">convex</text>
  <text x="90" y="14" text-anchor="middle" fill="#6b6b6b">one minimum</text>
  <path d="M215 30 Q240 70 265 45 Q290 20 315 60 Q335 88 360 40" fill="none" stroke="#24405e" stroke-width="2"/>
  <text x="288" y="92" text-anchor="middle" font-weight="bold">non-convex</text>
  <text x="288" y="14" text-anchor="middle" fill="#6b6b6b">many valleys</text>
</svg>

### The surprise

- It should not work — and yet training huge networks does. Why?
- In very high dimensions, most points where the gradient is zero are **saddle points** (down in some directions, up in others), not traps. And the many local minima turn out to be nearly as good as each other.
- So you do not need *the* best minimum. Almost any deep valley gives a model that works.

:::note
This is one of deep learning's central empirical facts: the theory offers no guarantee, but in practice the loss landscape of a large network is forgiving. More parameters, counterintuitively, often makes the landscape *easier* to descend.
:::
