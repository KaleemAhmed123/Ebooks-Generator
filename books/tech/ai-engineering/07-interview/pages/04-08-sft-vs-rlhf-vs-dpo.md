## SFT, RLHF, and DPO all "align" a model. How do they differ in what they teach?

- **SFT (supervised fine-tuning):** imitate demonstrations. Teaches *format and basic instruction-following* — "answer questions like these examples." It can only imitate what's shown; it can't learn what to **avoid**.
- **RLHF / DPO (preference optimisation):** learn from comparisons. Teaches *relative preference* — produce the response humans would pick over others, including steering away from bad outputs the SFT data never contained.
- The usual pipeline is **stacked**: pretrain → SFT (teach the task shape) → preference optimisation (refine toward human taste and safety). Each stage assumes the previous one.
- One-line routing: new **format/behaviour** → SFT; **subtle quality, tone, safety, "pick the better of two"** → RLHF/DPO.

:::warn
Preference methods assume a competent SFT starting point. Running DPO on a weak base amplifies noise; the chosen/rejected signal is only as good as the responses being compared.
:::

:::interview
What's really being tested:

that SFT imitates while preference methods rank (and can teach avoidance), and that they're sequential stages, not competitors.
:::
