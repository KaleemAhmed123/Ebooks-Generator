## RLHF: the full loop

- **RLHF (reinforcement learning from human feedback)** assembles every piece in this module into the recipe that turned a raw text predictor into a helpful assistant. Three stages.

<svg viewBox="0 0 340 96" role="img" aria-label="RLHF stages: supervised fine-tuning, then reward model from human preferences, then PPO optimizes the policy against the reward model with a KL penalty" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="14" width="90" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="53" y="25" text-anchor="middle" font-size="8" fill="#24405e">1 · SFT</text><text x="53" y="34" text-anchor="middle">demo answers</text>
  <rect x="124" y="14" width="90" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="169" y="25" text-anchor="middle" font-size="8" fill="#24405e">2 · reward model</text><text x="169" y="34" text-anchor="middle">preference pairs</text>
  <rect x="240" y="14" width="92" height="24" rx="3" fill="#24405e"/><text x="286" y="25" text-anchor="middle" font-size="8" fill="#fff">3 · PPO</text><text x="286" y="34" text-anchor="middle" fill="#fff">optimize policy</text>
  <path d="M98 26 L122 26" stroke="#1a1a1a" marker-end="url(#h)"/><path d="M214 26 L238 26" stroke="#1a1a1a" marker-end="url(#h)"/>
  <rect x="196" y="60" width="136" height="20" rx="3" fill="none" stroke="#c0392b"/><text x="264" y="73" text-anchor="middle" fill="#c0392b">− β·KL(policy ‖ SFT model)</text>
  <path d="M286 38 L286 58" stroke="#c0392b" marker-end="url(#h2)"/>
  <defs><marker id="h" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker><marker id="h2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

1. **SFT (supervised fine-tuning)** — fine-tune the base model on human-written example answers. Teaches the format of being helpful.
2. **Reward model** — collect preference pairs, train the RM (previous page).
3. **PPO** — the SFT model is the policy; the RM gives the reward; PPO improves the policy to earn more reward.

:::note
The **KL penalty** is the safety leash. `− β·KL(policy ‖ SFT)` subtracts reward whenever the policy drifts too far from the trusted SFT model. Without it, PPO chases the reward model straight into gibberish. β controls how tight the leash is.
:::

- OpenAI's InstructGPT (2022) showed a 1.3B RLHF model beat the 175B base GPT-3 on helpfulness — **alignment beat raw scale**. Every major chat model since uses a variant of this loop.

:::warn
RLHF is expensive and fragile: human labelling, a separate reward model, and unstable PPO with four models in memory at once (policy, reference, reward, critic). The next pages show **DPO** — a way to get the same alignment from preference pairs with **no RL loop at all**.
:::
