## Why is PPO used in RLHF, and what makes it hard to run?

- **PPO (proximal policy optimization)** is the RL algorithm that updates the LLM (the "policy") to produce responses the reward model scores highly.
- The key safeguard is the **KL penalty**: a term that punishes drifting too far from the original SFT model. Without it, the policy chases the reward model into gibberish that scores high but reads terribly (reward hacking).
- Why it's painful operationally:
  - **Four models in memory at once** — policy, reference (frozen SFT), reward model, and a value/critic network. Expensive and fiddly.
  - **Unstable** — sensitive to learning rate, KL coefficient, reward scaling; easy to collapse.
  - **Slow** — on-policy sampling every step.
- This operational pain is exactly why **DPO** (which needs no reward model, critic, or sampling loop) became popular.

:::interview
What's really being tested:

the role of the KL penalty (leash against reward hacking) and that PPO's 4-model, unstable setup is the reason simpler methods like DPO took off.
:::
