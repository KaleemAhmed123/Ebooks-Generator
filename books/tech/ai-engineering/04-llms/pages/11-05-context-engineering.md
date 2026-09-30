## Context engineering

- **Context engineering** is deciding what goes into the context window, in what order, at what cost — the discipline that grew out of prompt engineering once prompts started carrying retrieved documents, tool outputs, and history.
- The context window is **finite and not free**. Every token costs money and latency, and models attend unevenly across it.

<svg viewBox="0 0 316 60" role="img" aria-label="A U-shaped curve: models recall the start and end of a long context well but neglect the middle" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <line x1="20" y1="48" x2="300" y2="48" stroke="#1a1a1a"/><text x="160" y="58" text-anchor="middle" fill="#6b6b6b">position in context</text>
  <path d="M28 16 C90 16, 90 42, 160 42 C230 42, 230 16, 292 16" stroke="#24405e" fill="none" stroke-width="1.5"/>
  <text x="40" y="12" font-size="7" fill="#1a3a2a">recalled</text><text x="160" y="38" text-anchor="middle" font-size="7" fill="#c0392b">"lost in the middle"</text><text x="280" y="12" font-size="7" fill="#1a3a2a" text-anchor="end">recalled</text>
</svg>

- The **"lost in the middle"** effect: models recall information at the **start and end** of a long context far better than the middle. So place the most important material there, not buried halfway.
- Core moves:
  - **Prioritise** — most relevant content first/last; drop the rest.
  - **Compress** — summarise old turns or long docs instead of pasting them whole.
  - **Structure** — clear delimiters and sections so the model can find each part.
  - **Budget** — track the token count against the window and cost.

:::note
Bigger context windows (100k–1M+ tokens) do not remove the discipline — they raise the stakes. More room means more tokens to pay for, more chance to bury the key fact, and slower responses. A focused 4k-token context often beats a bloated 200k one.
:::

:::warn
Stuffing everything "just in case" is the classic failure. Irrelevant context is not harmless padding — it distracts the model, dilutes attention on what matters, and can pull the answer toward a tangent. Curate the context; do not hoard it.
:::
