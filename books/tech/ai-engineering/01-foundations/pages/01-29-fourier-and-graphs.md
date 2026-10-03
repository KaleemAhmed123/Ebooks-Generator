## Two more tools: Fourier and graphs

:::note
**Optional deep-dive — safe to skip on a first read.** These return when you reach audio models and graph-based retrieval; meet them then.
:::

Two mathematical ideas you will not use daily, but that underpin whole families of models. Know what they are and why they appear.

### The Fourier transform: any signal is a sum of waves

- The **Fourier transform** rewrites a signal as a set of simple waves of different frequencies — it moves you from "value over time" to "how much of each frequency is present".
- **Where it shows up:** audio models start here (a spectrogram is a Fourier transform over short windows). It also explains why some models struggle with high-frequency detail, and it powers fast convolution.

<svg viewBox="0 0 380 70" role="img" aria-label="A complex wave on the left decomposed into two pure frequency spikes on the right" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <path d="M15 35 Q30 10 45 35 Q60 60 75 35 Q90 12 105 35 Q120 58 135 35" fill="none" stroke="#24405e" stroke-width="1.5"/>
  <text x="75" y="66" text-anchor="middle" fill="#6b6b6b">signal in time</text>
  <text x="160" y="39" font-family="Georgia,serif">→</text>
  <line x1="200" y1="50" x2="360" y2="50" stroke="#1a1a1a"/>
  <line x1="240" y1="50" x2="240" y2="20" stroke="#1a3a2a" stroke-width="2"/>
  <line x1="300" y1="50" x2="300" y2="30" stroke="#1a3a2a" stroke-width="2"/>
  <text x="280" y="66" text-anchor="middle" fill="#6b6b6b">frequencies present</text>
</svg>

### Graph theory: things and their connections

- A **graph** is nodes joined by edges — the natural shape of social networks, molecules, knowledge bases, and road maps.
- **Where it shows up:** Graph Neural Networks learn over this structure, and — as of 2026 — GraphRAG (retrieval that walks a knowledge graph instead of a flat list) is a fast-growing pattern for grounding LLMs.

:::note
You will not implement a Fourier transform or a graph algorithm to start. The reason they are here: when you reach audio models or graph-based retrieval later in the series, you will recognize the machinery instead of meeting it cold.
:::
