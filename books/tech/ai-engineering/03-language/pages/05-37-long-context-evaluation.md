## Evaluating long context

- Models now advertise context windows of hundreds of thousands or millions of tokens. The obvious question — *can it actually use all of them?* — has a non-obvious answer: **the advertised length is not the usable length.**
- The popular test is **needle in a haystack (NIAH)**: hide one sentence (the "needle") in a huge document and ask the model to find it. Most models ace it.

### Why passing NIAH is not enough

- NIAH tests **retrieval of one exact fact**, the easiest possible use of long context. Real tasks need **reasoning across many scattered facts**.
- **RULER** (NVIDIA, COLM 2024) makes the test honest: multi-hop tracing, aggregation, and multi-needle retrieval at growing lengths. The finding is stark — models that score 100% on NIAH **fall apart** on RULER well before their claimed maximum length.

<svg viewBox="0 0 360 78" role="img" aria-label="Accuracy stays flat for simple needle retrieval but drops sharply for reasoning as context grows" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <line x1="34" y1="60" x2="340" y2="60" stroke="#1a1a1a"/><line x1="34" y1="60" x2="34" y2="12" stroke="#1a1a1a"/>
  <text x="20" y="16" fill="#6b6b6b" font-size="7">acc</text><text x="185" y="74" text-anchor="middle" fill="#6b6b6b">context length →</text>
  <path d="M40 22 L330 26" fill="none" stroke="#24405e" stroke-width="2"/><text x="300" y="20" fill="#24405e" font-size="7">NIAH (retrieval)</text>
  <path d="M40 24 Q160 30 330 56" fill="none" stroke="#c0392b" stroke-width="2"/><text x="250" y="52" fill="#c0392b" font-size="7">RULER (reasoning)</text>
</svg>

:::warn
Two failure modes appear as context fills. **Distractors** — with more text, the model grabs a plausible-looking wrong passage instead of the right one. **Lost in the middle** — facts near the start or end are used well; facts buried in the middle are quietly ignored. The practical lesson for building RAG (Booklet 4): a huge context window is **not** a substitute for good retrieval. Feed the model a few relevant chunks, not everything you have — measure your real usable length with RULER-style tasks, not the spec sheet.
:::
