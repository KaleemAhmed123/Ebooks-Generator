## What's the difference between a base model and an instruct/chat model?

- A **base model** is the raw pretrained next-token predictor. It **completes** text. Prompt it with a question and it may continue with *more questions* — it has knowledge but no notion of "answer my request."
- An **instruct/chat model** is a base model after SFT + preference tuning. It follows instructions, holds a conversation using a **chat template** (special tokens marking system/user/assistant turns), and respects safety behaviour.
- Practical picks:
  - **Base model** — for further fine-tuning (you'll add your own behaviour), or research. Cheaper, no baked-in refusals or style.
  - **Instruct model** — for almost all applications; it's ready to take instructions and use the chat format APIs expect.
- Mismatches bite: feeding an instruct model without its chat template, or expecting a base model to follow instructions, both produce garbage.

:::interview
What's really being tested:

completion-vs-instruction behaviour, awareness of chat templates, and the right default (instruct for apps, base for fine-tuning).
:::
