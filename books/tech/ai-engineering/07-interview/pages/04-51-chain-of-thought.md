## When does chain-of-thought help, and when does it hurt?

- **Chain-of-thought (CoT)** prompts the model to produce intermediate reasoning steps before the answer ("think step by step"). It gives the model more token-space to compute, which measurably improves **multi-step** tasks: math, logic, planning.
- Why it works: each step conditions the next, so the model externalises a computation it can't do in one forward pass. More useful "scratch space" → better answers on hard problems.
- When it hurts or doesn't help:
  - **Simple/lookup tasks** — adds latency and cost for no gain, and can talk itself out of a correct instinct.
  - **Latency-critical paths** — all those reasoning tokens are generated serially.
  - **Faithfulness caveat** — the stated reasoning is **not guaranteed** to be the model's real process; it can rationalise a wrong answer convincingly.
- Modern reasoning models bake CoT in via RL; for others, reserve explicit CoT for genuinely multi-step problems, and hide/strip it from the user-facing output when needed.

:::warn
Don't trust CoT as an explanation of *why* the model answered. It improves accuracy on hard tasks but the written steps can be post-hoc rationalisation, not the actual computation.
:::

:::interview
What's really being tested: that CoT buys serial compute for multi-step problems (and costs latency/money otherwise), plus the maturity to flag that reasoning traces aren't faithful explanations.
:::
