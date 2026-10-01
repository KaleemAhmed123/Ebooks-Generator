## What is the "alignment tax," and how do you keep it small?

- The **alignment tax** is the capability you lose when you align a model: after heavy RLHF/safety tuning, raw benchmark scores or creativity can dip versus the unaligned base. You traded some ability for helpfulness/safety.
- Causes: over-aggressive preference optimisation, catastrophic forgetting of pretrained skills, and reward models that penalise useful-but-blunt answers (leading to hedging and refusals).
- Keeping it small:
  - **KL penalty / low learning rate** — stay close to the capable base.
  - **Mix capability data into alignment** — include task-performance examples, not only safety.
  - **Targeted, not blanket, refusals** — over-refusal is a visible tax (the model declines safe requests).
  - **Track capability evals alongside safety evals** so you see the trade in real time.
- The frame interviewers want: alignment is a **trade-off to be minimised**, not a free lunch.

:::interview
What's really being tested:

that you know alignment can cost capability, can name over-refusal/hedging as symptoms, and measure both axes to manage the trade.
:::
