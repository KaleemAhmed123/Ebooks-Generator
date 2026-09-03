## Contextual Retrieval

Prepending a short generated description of where a chunk sits in its document
before embedding it, so isolated chunks stop being ambiguous.

"The rate increased by 3%" is meaningless alone. Prefixed with "from Acme's Q3
2025 report, discussing interest rates", it both retrieves and reads correctly.

### How it works

A chunk loses its context the moment it is separated from its document, and that
loss shows up later as a retrieval failure nobody attributes to chunking.

"The rate increased by 3% in the second half" is perfectly clear inside a
report. As an isolated chunk it is close to unretrievable — which rate, whose
report, which year. The embedding cannot encode any of that, because none of it
is in the text.

<svg viewBox="0 0 460 74" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bare chunk is ambiguous; prefixing it with a generated description of its document and section makes the embedding retrievable">
  <rect x="4" y="10" width="200" height="24" fill="none" stroke="#b32d2b" stroke-width="1.2"/>
  <text x="14" y="26" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">"the rate increased by 3%"</text>
  <text x="14" y="48" font-family="Georgia,serif" font-size="9" fill="#b32d2b">which rate? whose report? which year?</text>
  <path d="M212 22 H244" stroke="#1a1a1a" stroke-width="1.2"/><path d="M244 22 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="250" y="4" width="206" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.2"/>
  <text x="258" y="17" font-family="Georgia,serif" font-size="8.5" fill="#c25a35">Acme Q3 2025 report, interest rates</text>
  <rect x="250" y="24" width="206" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="258" y="37" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">"the rate increased by 3%"</text>
  <text x="250" y="58" font-family="Georgia,serif" font-size="9" fill="#c25a35">one embedding, now carrying both</text>
</svg>

Contextual retrieval repairs the text before embedding. For each chunk a model
generates a sentence or two situating it, and that preamble is prepended.

### In practice

The cost is one model call per chunk at ingest. That sounds expensive until you
notice it is paid once per document rather than once per query, and that prompt
caching makes it cheap when the document itself is the stable prefix.

Store the generated context **separately** from the original text. You will want
to regenerate it — after a prompt change, or a model change — and doing that
without reparsing every source document is the difference between an afternoon
and a week.
