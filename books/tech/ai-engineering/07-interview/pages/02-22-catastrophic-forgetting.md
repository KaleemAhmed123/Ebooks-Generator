## What is catastrophic forgetting, and how do you mitigate it?

- **Catastrophic forgetting** is when training a model on new data erases what it learned before — the weights that encoded old knowledge get overwritten by the new objective.
- It bites in **fine-tuning** (a chat model fine-tuned hard on one domain loses general ability) and **continual learning** (training on task B wrecks task A).
- Mitigations:
  - **Lower learning rate + fewer epochs** — move the weights less.
  - **Parameter-efficient tuning (LoRA/adapters)** — freeze the base weights entirely, so original knowledge is untouched.
  - **Mix in replay data** — keep some original/general examples in the fine-tuning set.
  - **Regularise toward the old weights** (EWC penalises changing important parameters).
- For most AI engineering today, **LoRA + a little replay** is the practical answer.

:::interview
What's really being tested:

that you recognise aggressive fine-tuning as the usual cause and reach for freeze-the-base (LoRA) + replay rather than just "train less."
:::
