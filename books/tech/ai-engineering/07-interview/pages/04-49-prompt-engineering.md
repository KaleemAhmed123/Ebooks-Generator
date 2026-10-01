## What are the principles of good prompt engineering?

- Prompting is programming in natural language — the goal is to **remove ambiguity** so the model's most-likely continuation is the one you want.
- Principles that actually move quality:
  - **Be specific about the task, format, and constraints** — show the exact output shape; don't make the model guess.
  - **Give role/context** — who it's for, what it's doing, what "good" looks like.
  - **Show, don't just tell** — a couple of examples (few-shot) beat paragraphs of instructions.
  - **Decompose** — break a complex task into steps or separate calls rather than one mega-prompt.
  - **Put instructions and key data at the start/end** (lost-in-the-middle), and delimit inputs clearly (tags, fences).
  - **Give an out** — tell it what to do when unsure ("say 'I don't know'") to cut hallucination.
- Then **iterate against an eval set**, not vibes — prompt changes must be measured, since they interact unpredictably.

:::interview
What's really being tested: that you treat prompting as reducing ambiguity + measured iteration, and can name high-leverage moves (format examples, decomposition, an explicit "unsure" path) rather than vague "be clear."
:::
