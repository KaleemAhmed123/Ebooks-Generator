## Why can one frozen LLM perform tasks it was never explicitly trained on?

- **In-context learning (ICL)** is the ability to learn a task from examples placed in the prompt, with **no weight updates**. Show three sentiment examples, and the model classifies the fourth.
- It's an emergent property of large-scale next-token pretraining: to predict text well, the model implicitly learned to recognise and continue patterns, which includes "here are input→output pairs, continue the pattern."
- Mechanistically (still partly open), attention appears to form **induction-like** circuits that copy and complete patterns seen earlier in the context.
- Practical consequence: prompting *is* programming. Few-shot examples, format, and ordering change behaviour because the model is inferring the task from the context, not recalling a trained procedure.

:::interview
What's really being tested:

that ICL is pattern completion learned from pretraining (no gradient updates at inference), which is why prompt design has such leverage.
:::
