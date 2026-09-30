## The full transformer block

- Every piece is now on the table. A **transformer block** stacks them in a fixed order, and the model is just this block repeated N times.
- The order inside one block (pre-norm form, standard in 2026):
  1. LayerNorm → **multi-head attention** → add residual. *(mix across tokens)*
  2. LayerNorm → **feed-forward network** → add residual. *(transform each token)*

<svg viewBox="0 0 300 118" role="img" aria-label="One transformer block: norm, attention, residual, then norm, feed-forward, residual, repeated N times" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="70" y="6" width="160" height="108" rx="5" fill="none" stroke="#6b6b6b" stroke-dasharray="4 3"/><text x="150" y="17" text-anchor="middle" fill="#6b6b6b">× N blocks</text>
  <rect x="100" y="24" width="100" height="14" rx="2" fill="#6a9bd0"/><text x="150" y="34" text-anchor="middle" fill="#fff">LayerNorm</text>
  <rect x="100" y="42" width="100" height="15" rx="2" fill="#24405e"/><text x="150" y="53" text-anchor="middle" fill="#fff">multi-head attention</text>
  <circle cx="150" cy="65" r="6" fill="#c0392b"/><text x="150" y="68" text-anchor="middle" fill="#fff">+</text>
  <rect x="100" y="76" width="100" height="14" rx="2" fill="#6a9bd0"/><text x="150" y="86" text-anchor="middle" fill="#fff">LayerNorm</text>
  <rect x="100" y="94" width="100" height="15" rx="2" fill="#1a3a2a"/><text x="150" y="105" text-anchor="middle" fill="#fff">feed-forward + residual</text>
</svg>

- A token vector goes in the top, gets contextualized by attention, transformed by the FFN, and comes out the bottom — same shape it entered, ready for the next identical block.
- Model size is mostly **depth** (how many blocks) and **width** (each vector's size). GPT-3 stacked 96 blocks at width 12,288.

:::note
This single repeated block is the whole architecture. What changes between BERT, GPT, and T5 is not the block — it is **how you wire the stack and what you train it to predict** (the next pages). Master this one diagram and every large model becomes a variation you can reason about.
:::
