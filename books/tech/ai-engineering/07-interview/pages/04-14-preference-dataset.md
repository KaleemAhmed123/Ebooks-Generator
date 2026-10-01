## How would you build a good preference dataset for DPO/RLHF?

- Structure: for each prompt, two (or more) responses with a label of which is **preferred**. Quality and coverage of these pairs cap the whole alignment.
- What to get right:
  - **Prompt coverage** — sample prompts that mirror real production traffic, including hard and adversarial ones, not just easy demos.
  - **Meaningful pairs** — the two responses should differ in a way you care about; near-identical pairs teach nothing, and a trivially-bad vs good pair is too easy.
  - **Clear rubric** — labellers need explicit criteria (helpfulness, correctness, safety) or labels are noisy and contradictory.
  - **Inter-annotator agreement** — measure it; low agreement means the task is under-specified.
  - **De-bias** — watch for length, formatting, and position preferences leaking in; balance or normalise them.
- Scale cheaply with **AI feedback** for bulk, reserve humans for hard/safety-critical slices, and keep a **held-out** human set for honest evaluation.

:::interview
What's really being tested:

that you treat data quality (coverage, rubric, agreement, de-biasing) as the lever, since preference methods can't exceed their dataset.
:::
