## RAG evaluation

- "It seems to work" is not evaluation. A RAG system has two halves that fail differently — **retrieval** and **generation** — so you measure them separately, then together.
- Split the metrics:

<svg viewBox="0 0 322 70" role="img" aria-label="Retrieval measured by recall and precision at k; generation measured by faithfulness and answer relevance" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="144" height="46" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="80" y="26" text-anchor="middle" font-size="8" fill="#24405e">retrieval</text><text x="80" y="40" text-anchor="middle">recall@k · precision@k</text><text x="80" y="50" text-anchor="middle" fill="#6b6b6b">did we fetch the right chunks?</text>
  <rect x="170" y="12" width="144" height="46" rx="3" fill="#24405e"/><text x="242" y="26" text-anchor="middle" font-size="8" fill="#fff">generation</text><text x="242" y="40" text-anchor="middle" fill="#fff">faithfulness · relevance</text><text x="242" y="50" text-anchor="middle" fill="#ccd">did the answer use them?</text>
</svg>

- **Retrieval** — **recall@k** (is the right chunk in the top-k?) and **precision@k** (how much of the top-k is relevant?). If recall is low, fix retrieval, not the prompt.
- **Generation** — **faithfulness / groundedness** (is every claim in the answer supported by the retrieved context, not invented?) and **answer relevance** (does it actually address the question?).
- **Faithfulness** is the one that matters most: an answer can be fluent, relevant, and *still hallucinated* if it goes beyond the context. Frameworks like **RAGAS** and **TruLens** score it, usually with an LLM-as-a-judge checking each claim against the sources.

:::mint
```
faithfulness = (claims in answer supported by context) / (total claims in answer)
```
Break the answer into claims; check each against the retrieved chunks.
:::

:::warn
You cannot improve what you do not measure per-stage. A single end-to-end score hides *where* it broke — bad retrieval and bad generation look identical from the outside. Build a small **golden set** of question→answer→source examples early; without it, every "improvement" is a guess.
:::
