## Regression Suite for Prompts

The set of cases that have already broken once. It is not designed up front. It
accretes from incidents — a malformed output, a wrong classification, a
jailbreak that worked — each reduced to a minimal reproduction and committed.

A golden set measures general quality. This measures the one thing a golden set
cannot: reintroduction. Fixing a prompt bug is easy. Keeping it fixed through
fifty later edits is what the suite does, and nothing else does it.

New engineers inherit the team's scar tissue automatically, because the suite
fails when they reintroduce a mistake nobody told them about.

**Tie every case to the incident it came from — a link, a date, one line.** Two
years on, someone will find a case asserting something that looks arbitrary and
will want to delete it. The link is what stops them, and the arbitrary-looking
case is usually the one guarding something subtle.

## Reranking

A second pass that rescores the candidates retrieval already returned, using a
model that reads the query and the document together.

An embedding model is a bi-encoder: query and document are encoded separately,
so documents can be indexed in advance and search over millions is cheap. A
reranker is a cross-encoder — one full model pass per pair, nothing
precomputable. Sentence-Transformers puts the gap concretely: scoring the pairs
among 10,000 sentences takes a cross-encoder roughly 65 hours and a bi-encoder
about 5 seconds.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Millions of documents narrowed by a cheap bi-encoder to fifty candidates, then reordered by an expensive cross-encoder into a final top five">
  <rect x="4" y="14" width="96" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="52" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">10M chunks</text>
  <path d="M100 29 H128" stroke="#1a1a1a" stroke-width="1.2"/><path d="M128 29 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="130" y="14" width="104" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="182" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">bi-encoder</text>
  <path d="M234 29 H262" stroke="#1a1a1a" stroke-width="1.2"/><path d="M262 29 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="264" y="14" width="88" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="308" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">50 candidates</text>
  <path d="M352 29 H376" stroke="#1a1a1a" stroke-width="1.2"/><path d="M376 29 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="378" y="14" width="78" height="30" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="417" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">cross-enc</text>
  <text x="4" y="66" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">separate encodings, indexed ahead of time</text>
  <text x="456" y="66" text-anchor="end" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">query and doc read together</text>
</svg>

**Better ranking earns its cost by letting you send fewer chunks.** Five
well-ranked ones instead of forty cuts prefill latency and token spend, and
sidesteps the lost-in-the-middle effect at the same time.
