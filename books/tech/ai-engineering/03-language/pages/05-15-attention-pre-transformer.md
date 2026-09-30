## Attention, before the transformer

- **Attention** (Bahdanau et al., 2014) removed the seq2seq bottleneck. Instead of forcing the whole input through one context vector, let the decoder **look back at every input word** at each output step — and weight them by relevance.
- When translating and about to produce the French word for "cat", the decoder computes a score for each source word, softmaxes the scores into weights, and builds a **custom context vector** — mostly the English "cat", a little of its neighbors.

<svg viewBox="0 0 370 100" role="img" aria-label="Decoder step attends over all encoder states with different weights, summing them into one context" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g fill="#24405e"><rect x="20" y="14" width="30" height="20" rx="2"/><rect x="60" y="14" width="30" height="20" rx="2"/><rect x="100" y="14" width="30" height="20" rx="2"/><rect x="140" y="14" width="30" height="20" rx="2"/></g>
  <text x="95" y="10" text-anchor="middle" fill="#6b6b6b">encoder states (all source words)</text>
  <circle cx="270" cy="70" r="15" fill="#1a3a2a"/><text x="270" y="73" text-anchor="middle" fill="#fff" font-size="7">decoder</text>
  <path d="M35 34 L258 62" stroke="#c0392b" stroke-width="2.5"/><path d="M75 34 L260 60" stroke="#c0392b" stroke-width="0.8"/><path d="M115 34 L262 60" stroke="#c0392b" stroke-width="0.5"/><path d="M155 34 L264 60" stroke="#c0392b" stroke-width="0.5"/>
  <text x="150" y="52" fill="#c0392b" font-size="7">thick = high weight</text>
</svg>

- The weights are **learned and dynamic** — a different mix for every output word. The model decides where to look.

:::note
This is the seed of the entire transformer. Three moves define attention and never change: **score** each source item against the current query, **softmax** the scores into weights that sum to 1, **sum** the items by those weights. The 2017 transformer's leap was to drop the RNN entirely and build a whole network out of *only* this operation — which is the next section.
:::
