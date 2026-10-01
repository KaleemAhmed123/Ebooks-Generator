## How do modern reasoning models get trained with RL, and what is GRPO?

- For tasks with a **checkable answer** (math, code), you don't need a human reward model — a **verifier** (did the tests pass? is the answer correct?) gives a clean, un-gameable reward. This is "RL with verifiable rewards."
- **GRPO (group relative policy optimization)** is a PPO variant that **drops the value/critic network**. For each prompt it samples a **group** of responses, scores them, and uses the group's mean as the baseline — the advantage is "how much better than my other attempts was this one?" [VERIFY: GRPO/DeepSeek-R1 details on fact pass.]
- Why it matters: cheaper (no critic), and it powered reasoning models that learn long chain-of-thought by being rewarded purely for correct final answers — reasoning *emerged* from the reward, not from demonstrations.
- Caveat: works best where correctness is **programmatically verifiable**; open-ended tasks still lean on preference-based methods.

:::interview
What's really being tested:

the shift to verifiable rewards, GRPO's group-baseline trick (no critic), and the insight that long reasoning can emerge from outcome-only rewards.
:::
