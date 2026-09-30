# Natural Language Processing

## What NLP is

- **Natural language processing (NLP)** is getting a computer to work with human language — text or speech — as data.
- The catch: a computer stores numbers, not words. Every NLP system does the same two things in order: **turn language into numbers**, then **compute on those numbers**.
- Everything in this booklet is a variation on that one move. Bag-of-words, embeddings, attention — each is a smarter way to turn "the cat sat" into a vector a model can use.

### The pipeline, start to finish

<svg viewBox="0 0 400 70" role="img" aria-label="Raw text flows into tokens, tokens into vectors, vectors into a model, the model into an answer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="8" y="24" width="66" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="41" y="41" text-anchor="middle">raw text</text>
  <rect x="98" y="24" width="66" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="131" y="41" text-anchor="middle">tokens</text>
  <rect x="188" y="24" width="66" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="221" y="41" text-anchor="middle">vectors</text>
  <rect x="278" y="24" width="52" height="26" rx="3" fill="#24405e"/><text x="304" y="41" text-anchor="middle" fill="#fff">model</text>
  <rect x="352" y="24" width="42" height="26" rx="3" fill="#1a3a2a"/><text x="373" y="41" text-anchor="middle" fill="#fff">answer</text>
  <g stroke="#1a1a1a"><path d="M74 37 L96 37" marker-end="url(#n)"/><path d="M164 37 L186 37" marker-end="url(#n)"/><path d="M254 37 L276 37" marker-end="url(#n)"/><path d="M330 37 L350 37" marker-end="url(#n)"/></g>
  <defs><marker id="n" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Tokens** — the pieces we cut text into (words, or parts of words). Covered next.
- **Vectors** — lists of numbers standing in for those pieces (Booklet 1).
- The model can be anything from a word counter to a 400-billion-parameter transformer. The front of the pipeline is the same.

:::note
NLP is not one task. It is a family: translation, search, summarization, sentiment, chat. They share the pipeline above and differ only in what the model at the end is trained to output. Learn the pipeline once; the tasks are variations.
:::
