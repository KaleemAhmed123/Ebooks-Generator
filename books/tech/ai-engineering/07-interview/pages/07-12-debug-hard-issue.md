## "Tell me about a hard AI bug you debugged."

- **What they're screening for:** systematic debugging of non-deterministic systems, where "it's just wrong sometimes" is the starting point, not an answer.
- **A strong answer shows:**
  - **A clear symptom and hypothesis-driven process** — you narrowed it methodically, not by random prompt-tweaking.
  - **Localisation** — isolated *where* it broke: data? retrieval? prompt? model version? a silent provider update? For RAG, "was the right chunk retrieved?"; for training, "can it overfit a tiny batch?"
  - **Used the traces/logs** — reproduced with the exact inputs/config, inspected intermediate state.
  - **Root cause + fix + prevention** — found the real cause (not a symptom patch) and added an eval/test so it couldn't silently return.
- Specificity sells it: a concrete bug, the dead ends, the insight that cracked it.

:::warn
Weak: "The model gave wrong answers so I changed the prompt until it worked." Strong: a traced, hypothesis-driven hunt that localised the real cause (e.g. a chunking bug or a silent model update) and added a regression test.
:::

:::interview
What's really being tested: a disciplined debugging method for probabilistic systems — localise, reproduce from traces, fix the root cause, prevent recurrence — not trial-and-error.
:::
