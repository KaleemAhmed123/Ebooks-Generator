## Why do LLMs struggle to spell words or do arithmetic with long numbers?

- The model never sees letters or digits individually — it sees **tokens**. "strawberry" may be 2–3 tokens, so "how many r's?" asks about structure the model has no direct access to.
- Same for math: a number like 12345 might tokenize into irregular chunks, so digit-by-digit arithmetic doesn't line up with the token boundaries. The model is reasoning over opaque chunks, not digits.
- Fixes you'll see: tokenizers that **split digits individually** (helps arithmetic), tool use (hand math to a calculator), and chain-of-thought that forces the model to write out intermediate digits as separate tokens.
- It's a representation problem, not a reasoning-capacity problem — the information was destroyed at the tokenizer before the model ever ran.

:::interview
What's really being tested:

that you trace "can't spell / bad at arithmetic" to tokenization (not raw stupidity), and know the mitigations (digit splitting, tools, CoT).
:::
