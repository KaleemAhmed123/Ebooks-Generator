## LSTM and GRU

- The **LSTM (long short-term memory)** fixes the RNN's forgetting by adding a separate **cell state** — a memory conveyor belt that runs straight through the sequence, changed only by small, controlled edits.
- Three **gates** (each a little neural layer outputting 0–1) decide what happens to that memory:
  - **Forget gate** — how much of the old memory to erase.
  - **Input gate** — how much of the new word to write.
  - **Output gate** — how much of the memory to reveal as this step's output.

<svg viewBox="0 0 370 90" role="img" aria-label="LSTM cell state flows across the top, edited by forget, input, and output gates" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <line x1="20" y1="24" x2="350" y2="24" stroke="#1a3a2a" stroke-width="2" marker-end="url(#g)"/>
  <text x="185" y="16" text-anchor="middle" fill="#1a3a2a">cell state (memory belt)</text>
  <g fill="#e8f4fd" stroke="#24405e"><circle cx="90" cy="24" r="10"/><circle cx="185" cy="24" r="10"/><circle cx="300" cy="55" r="10"/></g>
  <text x="90" y="48" text-anchor="middle">forget</text><text x="185" y="48" text-anchor="middle">input</text><text x="300" y="80" text-anchor="middle">output</text>
  <path d="M300 45 L300 34" stroke="#24405e" marker-end="url(#g)"/>
  <defs><marker id="g" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a3a2a"/></marker></defs>
</svg>

- Because memory now flows along an additive path, the gradient survives across long sequences. The LSTM can hold a fact for hundreds of steps.
- The **GRU (gated recurrent unit)** is a simpler cousin: two gates, no separate cell state. Fewer parameters, trains faster, usually about as accurate. A common default when an LSTM feels heavy.

:::note
From roughly 2015 to 2017, LSTMs were state of the art for translation, speech, and text generation. They still power plenty of production systems where sequences are short and latency is tight. The transformer displaced them for one reason (next section): the LSTM must read **strictly left to right**, so it cannot be parallelized across the sequence — a fatal limit at large scale.
:::
