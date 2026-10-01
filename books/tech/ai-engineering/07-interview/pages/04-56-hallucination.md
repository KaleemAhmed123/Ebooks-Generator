## Why do LLMs hallucinate, and how do you reduce it?

- A **hallucination** is confident, fluent text that is factually wrong or unsupported. Root cause: the model is trained to produce **plausible** next tokens, not **true** ones — it has no built-in notion of "I don't know," and its knowledge is lossy and stale.
- It's worse for rare facts, recent events, specific numbers/citations, and when the prompt pressures a confident answer.
- Reduction, layered:
  - **Ground it** — RAG with citations so answers come from retrieved text; instruct "use only the context."
  - **Give an out** — explicitly allow "I don't know / not in the sources."
  - **Lower temperature** for factual tasks.
  - **Verify** — check claims against sources/tools; use a second model or rules to flag unsupported statements.
  - **Constrain scope** — narrow tasks hallucinate less than open-ended ones.
- You **manage** it, not eliminate it — a residual rate remains, so critical paths need verification or human review.

:::interview
What's really being tested: that hallucination stems from plausibility-not-truth training, and that you layer grounding + an "unsure" path + verification, while accepting it can't hit zero.
:::
