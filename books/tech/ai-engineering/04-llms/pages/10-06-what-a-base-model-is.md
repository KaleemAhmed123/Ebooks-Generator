## What a base model is

- The output of pretraining is a **base model** (or "foundation model"): a raw next-token predictor. It knows an enormous amount but does exactly one thing — **continue text**. It does not answer questions; it continues them.
- Ask a base model "What is the capital of France?" and it might reply with more questions — because in its training data, questions are often followed by more questions (quizzes, forms), not answers.

<svg viewBox="0 0 320 66" role="img" aria-label="A base model continues the prompt as text; an instruct model answers it" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="10" y="16" fill="#6b6b6b">prompt: "List three fruits:"</text>
  <rect x="10" y="24" width="140" height="34" rx="3" fill="#fbeaea" stroke="#c0392b"/><text x="80" y="37" text-anchor="middle" fill="#c0392b" font-size="7">base model</text><text x="80" y="49" text-anchor="middle" font-size="7">"…for a fruit salad recipe?"</text>
  <rect x="170" y="24" width="140" height="34" rx="3" fill="#eafaf0" stroke="#1a3a2a"/><text x="240" y="37" text-anchor="middle" fill="#1a3a2a" font-size="7">instruct model (later)</text><text x="240" y="49" text-anchor="middle" font-size="7">"1. apple 2. banana 3. pear"</text>
</svg>

- What it *does* have: world knowledge, grammar, reasoning ability, coding, translation — all latent in the weights. It just needs to be **told the format** of being helpful, which SFT does next.
- Base models are released too (Llama, Mistral, Qwen base variants). They are the starting point when you want to fine-tune your own instruct behaviour rather than inherit a lab's.

:::note
**In-context learning** already works on a base model: give it a few examples in the prompt and it continues the pattern (few-shot, page 11-02). This emergent ability — learning a task from the prompt with no weight change — is the surprising gift of scale, and the reason prompting works at all.
:::

:::warn
A base model has no guard rails. It will happily continue harmful, biased, or false text because it is only mimicking its corpus. It is a capability, not a product. Never ship a base model to users — the alignment stages exist precisely to make it safe and usable.
:::
