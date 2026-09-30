## Why RL for LLMs

- Pretraining and SFT can only imitate — they copy text that exists. Some things you cannot teach by imitation because there is no single right answer to copy, only a **judgment of better or worse**. That is exactly what RL optimises.
- Three jobs RL does that supervised learning cannot:

<svg viewBox="0 0 322 78" role="img" aria-label="RL handles preference, verifiable rewards, and multi-step outcomes that imitation cannot" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="12" width="98" height="52" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="57" y="27" text-anchor="middle" font-size="8" fill="#24405e">preference</text><text x="57" y="42" text-anchor="middle">helpful, harmless,</text><text x="57" y="52" text-anchor="middle">honest — RLHF</text>
  <rect x="112" y="12" width="98" height="52" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="161" y="27" text-anchor="middle" font-size="8" fill="#24405e">verifiable</text><text x="161" y="42" text-anchor="middle">math, code: reward =</text><text x="161" y="52" text-anchor="middle">"is it correct?"</text>
  <rect x="216" y="12" width="98" height="52" rx="3" fill="#24405e"/><text x="265" y="27" text-anchor="middle" font-size="8" fill="#fff">multi-step</text><text x="265" y="42" text-anchor="middle" fill="#fff">reasoning, tools:</text><text x="265" y="52" text-anchor="middle" fill="#fff">reward the outcome</text>
</svg>

- **Preference** — "helpful, harmless, honest" is a ranking, not a label. RLHF (previous pages) optimises it directly.
- **Verifiable rewards (RLVR)** — for math and code, correctness is cheap to check and hard to fake. Reward = "did it pass the tests / get the right answer?" This trained the 2025 reasoning models (DeepSeek-R1, and OpenAI's o-series style training) with GRPO.
- **Multi-step outcomes** — an agent that browses, calls tools, and writes code succeeds or fails only at the *end*. RL's whole purpose is assigning credit to the steps that earned a late reward.

:::note
The 2024–2025 shift: RL moved from a final polish (RLHF for tone) to the **main driver of capability**. "Reasoning models" are largely models trained with RL on verifiable rewards to think in long chains before answering.
:::

:::warn
RL amplifies whatever you reward, including flaws. Reward only final-answer correctness and the model may reach right answers via wrong reasoning (unfaithful chains). Reward style and it games style. The reward *is* the specification — and specifying human intent as a number is the unsolved hard part.
:::
