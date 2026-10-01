## DPO vs PPO-based RLHF — when would you pick each?

- **DPO:** simpler, cheaper, stable. Pick it when you have a **fixed, high-quality preference dataset** and want a reliable alignment pass without RL infrastructure. It's the default for most teams and open models now.
- **PPO/RLHF:** more powerful ceiling because it's **on-policy** — it keeps sampling fresh responses and scoring them, so it can explore and improve beyond the static dataset. Pick it when you can afford the infrastructure and need the extra quality, or when reward comes from a **programmatic verifier** (code tests, math checkers) rather than human pairs.
- A common modern pattern: **DPO first** (cheap bulk alignment), then a targeted RL stage for the last mile, especially for reasoning (verifiable rewards). [VERIFY: current best-practice pipelines.]
- The honest answer in interviews: DPO for most cases on cost/stability; RL when you have a reliable reward signal and the budget.

:::interview
What's really being tested:

the on-policy (PPO) vs off-policy (DPO) distinction as the deciding axis, and practical judgment about cost vs ceiling.
:::
