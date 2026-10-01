## A user says the model is "too random." Which knob do you turn, and what are the failure modes at the extremes?

- First, **temperature**. High temperature flattens the distribution → more diverse but more incoherent, off-topic, and hallucinated. Lower it toward 0.2–0.7 for factual/structured tasks.
- Then **top-p** — tighten to ~0.8–0.9 to cut the junk tail even if temperature stays moderate.
- Extremes to warn about:
  - **T = 0 / greedy:** deterministic but repetitive, prone to loops and bland boilerplate; bad for creative work.
  - **T very high (>1.3):** incoherent, derailing, invented facts.
- Match to task: **extraction/classification/code → low T, often greedy**; **brainstorming/creative writing → higher T + top-p**. There's no universal "best" setting — it's a task decision.

:::warn
Don't fix "too random" by only lowering temperature to 0 — you'll trade randomness for repetition and loops. Combine a moderate temperature with top-p truncation.
:::

:::interview
What's really being tested:

practical tuning instinct — which knob for which symptom, the failure at each extreme, and that the right setting depends on the task.
:::
