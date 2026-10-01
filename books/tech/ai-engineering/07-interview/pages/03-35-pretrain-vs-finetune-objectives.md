## Pretraining, continued pretraining, and fine-tuning — how do the objectives differ?

- **Pretraining:** self-supervised next-token (or masked-token) prediction on a huge general corpus. Builds broad language/world knowledge from scratch. Enormously expensive; done once.
- **Continued (domain) pretraining:** keep the *same* self-supervised objective but on **domain text** (legal, medical, code). Injects domain knowledge/vocabulary without changing the task format. Used when the base model lacks exposure to your domain.
- **Fine-tuning (SFT):** switch to **supervised** learning on input→output pairs (instructions, demonstrations). Teaches *behaviour and format* — following instructions, answering in a style — not primarily new knowledge.
- Rule of thumb: need new **knowledge/jargon** → continued pretraining or RAG; need new **behaviour/format** → SFT; need **preferences/values** → RLHF/DPO on top.

:::interview
What's really being tested:

that you separate the *objective* (self-supervised vs supervised) from the *goal* (knowledge vs behaviour), and route a real need to the right stage.
:::
