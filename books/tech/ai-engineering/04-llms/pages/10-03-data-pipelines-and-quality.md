## Data pipelines and quality

- Model quality is set more by **data** than by architecture. Two models of the same size trained on different data are not close. The pretraining pipeline is mostly a **cleaning** pipeline.
- Raw web text (Common Crawl) is ~99% junk: boilerplate, spam, near-duplicates, broken markup. The pipeline turns terabytes of raw text into a smaller, cleaner corpus.

<svg viewBox="0 0 340 58" role="img" aria-label="Raw web to filtered to deduplicated to decontaminated to a smaller clean corpus" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="4" y="20" width="56" height="20" rx="3" fill="#eee" stroke="#999"/><text x="32" y="33" text-anchor="middle">raw web</text>
  <rect x="72" y="20" width="56" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="100" y="33" text-anchor="middle">filter</text>
  <rect x="140" y="20" width="56" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="168" y="33" text-anchor="middle">dedup</text>
  <rect x="208" y="20" width="66" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="241" y="33" text-anchor="middle">decontaminate</text>
  <rect x="286" y="20" width="50" height="20" rx="3" fill="#24405e"/><text x="311" y="33" text-anchor="middle" fill="#fff">clean</text>
  <path d="M60 30 L70 30" stroke="#1a1a1a" marker-end="url(#p)"/><path d="M128 30 L138 30" stroke="#1a1a1a" marker-end="url(#p)"/><path d="M196 30 L206 30" stroke="#1a1a1a" marker-end="url(#p)"/><path d="M274 30 L284 30" stroke="#1a1a1a" marker-end="url(#p)"/>
  <defs><marker id="p" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Filter** — drop low-quality text by heuristics (too short, too many symbols) and increasingly by a small **quality classifier** that scores how "textbook-like" a page is.
- **Deduplicate** — remove near-identical documents. Duplicates waste compute and make the model memorise instead of generalise.
- **Decontaminate** — remove any text that overlaps your **evaluation benchmarks**, or your scores are cheating.

:::note
The 2024–2025 lesson (FineWeb, phi models): **aggressive filtering beats raw volume.** A smaller, cleaner corpus trains a better model than a larger dirty one. "More data" quietly became "better data."
:::

:::warn
Data leakage is the silent killer of trust. If benchmark questions leak into training, the model looks brilliant and fails in production. And copyrighted or private text in the corpus is a legal and safety liability that no later stage can remove. Get the data right or nothing downstream matters.
:::
