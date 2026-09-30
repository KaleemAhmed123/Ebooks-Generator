## Topic modeling

- **Topic modeling** discovers the hidden themes running through a collection of documents — with no labels. It is unsupervised: you get topics no one wrote down.
- The classic method, **LDA (Latent Dirichlet Allocation, 2003)**, assumes each document is a *mixture* of topics, and each topic is a *distribution over words*.
- A "topic" is just a word cluster the model finds — e.g. `{game, team, score, player}` — that you, the human, name "sports."

<svg viewBox="0 0 360 78" role="img" aria-label="A document is a mix of topics, each topic a set of weighted words" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="28" width="60" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="42" y="43" text-anchor="middle">document</text>
  <path d="M74 34 L112 20" stroke="#1a1a1a" marker-end="url(#t)"/><path d="M74 46 L112 60" stroke="#1a1a1a" marker-end="url(#t)"/>
  <text x="90" y="16" font-size="7" fill="#6b6b6b">70%</text><text x="90" y="72" font-size="7" fill="#6b6b6b">30%</text>
  <rect x="116" y="8" width="120" height="20" rx="3" fill="#24405e"/><text x="176" y="21" text-anchor="middle" fill="#fff">topic A: game team score</text>
  <rect x="116" y="50" width="120" height="20" rx="3" fill="#1a3a2a"/><text x="176" y="63" text-anchor="middle" fill="#fff">topic B: market stock price</text>
  <defs><marker id="t" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Uses: exploring a huge unlabeled corpus, tagging documents, tracking how themes shift over time.

:::warn
Topics are **statistical, not semantic** — LDA counts word co-occurrence and has no idea what the words mean. The topics it returns are often incoherent, and *you* must eyeball each word cluster and decide if it means anything. As of September 2026, embedding-based methods (cluster document embeddings, e.g. BERTopic) usually give cleaner topics than LDA. Treat any topic model's output as a starting hypothesis, not an answer.
:::
