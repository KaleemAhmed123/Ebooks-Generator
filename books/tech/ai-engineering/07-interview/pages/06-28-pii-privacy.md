## How do you handle PII and data privacy in an LLM application?

- LLM apps leak personal data in ways normal apps don't: prompts/outputs get **logged**, sent to **third-party providers**, embedded into **vector stores**, and possibly used for **training**. Each is a privacy surface.
- Controls:
  - **Minimise & redact** — strip/mask PII before it reaches the model or logs (PII detection on input); only send what's needed.
  - **Provider data terms** — use zero-retention / no-train endpoints; know where data is processed (residency).
  - **Don't train on user data** without explicit consent; segregate if you do.
  - **Secure the vector store** — embeddings of personal text are personal data; apply access control and support **deletion** (right-to-be-forgotten means removing the vectors too).
  - **Scoped retrieval** — enforce per-user/tenant permissions at retrieval so one user can't surface another's data.
  - **Redact logs & limit retention**; encrypt in transit/at rest.
- Interview framing: map the **data flow** (prompt → provider → logs → vector store → training) and apply minimisation, consent, access control, and deletion at each hop.

:::interview
What's really being tested: that you trace PII through the whole LLM data flow (provider, logs, embeddings, training) and apply redaction, consent, scoped retrieval, and deletion — including that embeddings are personal data.
:::
