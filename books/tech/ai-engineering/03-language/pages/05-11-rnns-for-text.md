## RNNs for text

- Embeddings give one vector per word. But a sentence is a *sequence*, and meaning depends on order. A **recurrent neural network (RNN)** was the first neural way to read a sequence one step at a time.
- The idea: keep a **hidden state** — a running memory vector. Read one word, update the memory, move on. The memory carries everything seen so far.

<svg viewBox="0 0 380 96" role="img" aria-label="An RNN unrolled: each word feeds a cell that passes a hidden state to the next cell" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g><rect x="20" y="34" width="46" height="26" rx="3" fill="#24405e"/><text x="43" y="51" text-anchor="middle" fill="#fff">RNN</text>
     <rect x="150" y="34" width="46" height="26" rx="3" fill="#24405e"/><text x="173" y="51" text-anchor="middle" fill="#fff">RNN</text>
     <rect x="280" y="34" width="46" height="26" rx="3" fill="#24405e"/><text x="303" y="51" text-anchor="middle" fill="#fff">RNN</text></g>
  <g stroke="#1a3a2a"><path d="M66 47 L148 47" marker-end="url(#r)"/><path d="M196 47 L278 47" marker-end="url(#r)"/></g>
  <text x="107" y="42" text-anchor="middle" font-size="8" fill="#1a3a2a">state</text><text x="237" y="42" text-anchor="middle" font-size="8" fill="#1a3a2a">state</text>
  <g text-anchor="middle" fill="#6b6b6b"><text x="43" y="82">"the"</text><text x="173" y="82">"cat"</text><text x="303" y="82">"sat"</text></g>
  <g stroke="#6b6b6b"><path d="M43 76 L43 62" marker-end="url(#r)"/><path d="M173 76 L173 62" marker-end="url(#r)"/><path d="M303 76 L303 62" marker-end="url(#r)"/></g>
  <defs><marker id="r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- It is the **same cell** reused at every step (shared weights) — the box above is one network drawn three times. That is what "recurrent" means.
- One equation: `hₜ = tanh(W·xₜ + U·hₜ₋₁ + b)`. New state = mix of current word `xₜ` and previous state `hₜ₋₁`.

:::warn
RNNs struggle to remember far back. Multiplying by the same weight matrix at every step makes the gradient either shrink to nothing or blow up over long sequences — the **vanishing / exploding gradient** problem. In practice a plain RNN forgets the start of a long sentence by the time it reaches the end. The next page's LSTM was built to fix exactly this.
:::
