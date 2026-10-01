## What is perplexity, and what does it fail to tell you?

- **Perplexity** is the exponential of the average per-token cross-entropy — intuitively, "how many equally-likely choices is the model effectively choosing among at each step." Lower is better; a perplexity of 10 means it's as uncertain as a fair 10-way guess.
- It's a clean **intrinsic** measure of language-modelling quality and great for tracking pretraining progress.
- What it does **not** tell you:
  - It's **not comparable across tokenizers** — different vocabularies change the per-token math, so two models' perplexities aren't directly comparable.
  - It doesn't measure **usefulness**: instruction-following, factuality, reasoning, safety. A model can have great perplexity and be a bad assistant.
  - It rewards predicting likely text, which isn't the same as being correct or helpful.
- So it's a training-time health metric, not a product-quality metric — for that you need task evals and human/LLM judging.

:::interview
What's really being tested:

a correct definition plus the maturity to say perplexity ≠ quality and isn't comparable across tokenizers.
:::
