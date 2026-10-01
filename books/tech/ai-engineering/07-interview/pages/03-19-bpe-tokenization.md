## What is BPE tokenization, and why does an engineer care about it?

- A **tokenizer** chops text into the units a model actually reads. **Byte-pair encoding (BPE)** starts from bytes/characters and greedily merges the most frequent adjacent pairs until it has a fixed vocabulary (e.g. 100k tokens).
- Result: common words become one token, rare words split into sub-word pieces. "tokenization" might be `token` + `ization`; a rare name splits into several pieces.
- Why you care:
  - **Cost and latency are per token**, not per word. Verbose or non-English text uses more tokens → more money and slower responses.
  - **Context limits are in tokens** — "8k tokens" is roughly 6k English words, far fewer for code or other scripts.
  - **Behaviour quirks** (spelling, arithmetic) trace back to how text was split.
- Byte-level BPE guarantees any string is encodable (no unknown-token failures), which is why modern models use it.

:::interview
What's really being tested:

that tokens — not words or characters — are the unit of cost, context, and billing, and that BPE merges frequent pairs to build the vocabulary.
:::
