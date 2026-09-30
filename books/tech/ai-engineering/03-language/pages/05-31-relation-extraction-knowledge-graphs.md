## Relation extraction and knowledge graphs

- **Relation extraction** pulls structured facts out of prose: not just "this text mentions Tim Cook and Apple", but the **relationship** — `(Tim Cook, is-CEO-of, Apple)`.
- Each fact is a **triple**: *(subject, relation, object)*. Stack millions of triples and you get a **knowledge graph** — a network where entities are nodes and relations are labelled edges.

<svg viewBox="0 0 360 84" role="img" aria-label="A small knowledge graph with Tim Cook, Apple, and Cupertino connected by labelled edges" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <circle cx="60" cy="42" r="22" fill="#24405e"/><text x="60" y="45" text-anchor="middle" fill="#fff" font-size="7">Tim Cook</text>
  <circle cx="200" cy="42" r="20" fill="#1a3a2a"/><text x="200" y="45" text-anchor="middle" fill="#fff">Apple</text>
  <circle cx="320" cy="42" r="24" fill="#3d6ea5"/><text x="320" y="45" text-anchor="middle" fill="#fff" font-size="7">Cupertino</text>
  <path d="M82 42 L178 42" stroke="#1a1a1a" marker-end="url(#k)"/><text x="130" y="36" text-anchor="middle" font-size="7">CEO-of</text>
  <path d="M220 42 L294 42" stroke="#1a1a1a" marker-end="url(#k)"/><text x="257" y="36" text-anchor="middle" font-size="7">based-in</text>
  <defs><marker id="k" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Knowledge graphs power search rich-results, recommendation, and fraud detection. In 2026 they are also a favored **grounding source for LLMs**: retrieve exact facts (dates, org charts, drug interactions) as triples instead of hoping the model remembers them — the "GraphRAG" idea.

:::warn
Relation extraction compounds errors. It usually runs *after* NER and entity linking, so a wrong entity boundary or a wrong link poisons every triple built on it. And prose is slippery — *"Apple, once led by Jobs, ..."* can produce the stale triple `(Jobs, CEO-of, Apple)` if the extractor ignores tense. Every automatically built knowledge graph needs confidence scores and a validation pass; a graph of confident wrong facts is worse than no graph.
:::
