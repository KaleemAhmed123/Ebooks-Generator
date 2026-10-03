## How do you evaluate a RAG system?

- Evaluate the two halves separately — a bad answer could be bad retrieval *or* bad generation, and you can't fix what you can't locate.
- **Retrieval metrics** (did we fetch the right context?): **recall@k**, **precision@k**, **MRR/nDCG** on a labelled set of question→relevant-chunk pairs.
- **Generation metrics** (given the context, was the answer good?):
  - **Faithfulness / groundedness** — is every claim supported by the retrieved context (no hallucination)?
  - **Answer relevance** — does it actually address the question?
  - **Context relevance / precision** — was the retrieved context on-topic, or padded with noise?
- These three (context relevance, faithfulness, answer relevance) are the **RAG triad**; frameworks like RAGAS automate them with an LLM judge.
- Build a **golden set** from real queries and score continuously; add human spot-checks for the judge's blind spots.

:::interview
What's really being tested: that you split retrieval vs generation evaluation, name the RAG triad (context relevance / faithfulness / answer relevance), and build a golden set rather than eyeballing.
:::
