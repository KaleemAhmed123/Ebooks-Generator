## How do you actually choose a chunk size?

- There's no universal number — it depends on your content and your embedding model's max length. Decide empirically:
  - **Match the natural unit of meaning.** FAQ → one Q&A per chunk; code → one function; prose → a few paragraphs on one idea.
  - **Respect the embedding model's context** — don't exceed its max tokens, or the tail is truncated and silently lost.
  - **Build an eval set** of real questions with known answer locations, then sweep chunk sizes and measure **recall@k**. Pick the size that maximises it.
- Patterns that decouple the tension:
  - **Small-to-big / parent-document:** embed small chunks for precise matching but return the larger parent passage for context.
  - **Sentence-window:** retrieve on a sentence, expand to its neighbours for the LLM.
- Start around a few hundred tokens with ~10–20% overlap, then tune against your eval.

:::interview
What's really being tested: that you tune chunk size against a retrieval eval on real questions, and know the small-to-big trick that gets precise matching *and* enough context.
:::
