## Text summarization

- Summarization shortens a document while keeping its meaning. Two fundamentally different strategies.
- **Extractive** — pick the most important sentences from the source and stitch them together. The output is always real text from the input; it cannot invent anything.
- **Abstractive** — generate new sentences that capture the gist, the way a person would paraphrase. More fluent, but it *can* invent.

<svg viewBox="0 0 370 80" role="img" aria-label="Extractive picks existing sentences; abstractive writes new ones" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="14" y="26" width="60" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="44" y="46" text-anchor="middle">document</text>
  <path d="M76 34 L120 24" stroke="#24405e" marker-end="url(#u)"/><path d="M76 52 L120 62" stroke="#1a3a2a" marker-end="url(#u)"/>
  <rect x="124" y="12" width="110" height="22" rx="3" fill="#24405e"/><text x="179" y="26" text-anchor="middle" fill="#fff">extractive: copy sentences</text>
  <rect x="124" y="52" width="110" height="22" rx="3" fill="#1a3a2a"/><text x="179" y="66" text-anchor="middle" fill="#fff">abstractive: write new</text>
  <defs><marker id="u" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Pre-transformer summarizers were mostly extractive (rank sentences by TF-IDF or graph centrality). Modern LLMs are abstractive and far more readable.
- Quality is often scored with **ROUGE** — overlap between the summary and a human reference, the summarization cousin of BLEU.

:::warn
Abstractive summarizers **hallucinate** — they state facts, dates, or numbers the source never contained, phrased with total confidence. This is the defining risk of any generative summary: it reads perfectly and is quietly wrong. For anything factual (medical, legal, financial), either use extractive summarization or verify every claim against the source before trusting it.
:::
