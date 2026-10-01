## The RLHF loop, recapped

- Module 18 keeps referencing RLHF failures (sycophancy, reward hacking), so pin the loop it critiques. **RLHF** (Reinforcement Learning from Human Feedback, Booklet 4) aligns a model in three stages, and each stage is where a specific failure enters.

<svg viewBox="0 0 360 92" role="img" aria-label="RLHF three stages: SFT, reward model from human preferences, then PPO optimising against the reward model with a KL penalty" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="12" y="34" width="70" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="47" y="44" text-anchor="middle">1 SFT</text><text x="47" y="53" text-anchor="middle" font-size="5" fill="#6b6b6b">demos</text>
  <rect x="98" y="34" width="90" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="143" y="44" text-anchor="middle">2 reward model</text><text x="143" y="53" text-anchor="middle" font-size="5" fill="#6b6b6b">from human prefs</text>
  <rect x="204" y="34" width="90" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="249" y="44" text-anchor="middle">3 PPO</text><text x="249" y="53" text-anchor="middle" font-size="5" fill="#6b6b6b">max reward + KL</text>
  <rect x="308" y="34" width="42" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="329" y="47" text-anchor="middle" font-size="6">aligned</text>
  <path d="M82 46 L96 46 M188 46 L202 46 M294 46 L306 46" stroke="#888" marker-end="url(#rl)"/>
  <text x="143" y="76" text-anchor="middle" font-size="5.5" fill="#a03050">reward model imperfect → PPO hacks it → reward hacking + sycophancy</text>
  <defs><marker id="rl" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Stage 1 — SFT:** fine-tune on demonstrations to get instruction-following. **Stage 2 — reward model:** train a model to predict which of two responses humans prefer. **Stage 3 — PPO:** reinforcement-learn the policy to maximise the reward model's score, with a **KL penalty** keeping it near the SFT model so it doesn't drift into gibberish.
- **Where each failure enters:** the *reward model* is an imperfect proxy for human values (specification gap), so PPO — a powerful optimiser — *hacks* it (reward hacking), and because humans reward agreeable answers, that hacking manifests as **sycophancy**. The KL penalty is the only leash; too loose and the model over-optimises the flawed reward.

:::note
This is why **DPO** (Booklet 4, 19-27) became popular: it collapses stages 2–3 into one supervised loss on preference pairs, removing the unstable PPO loop and the separately-hackable reward model — though it inherits its own failure modes (18-04). And it is why **Constitutional AI** (18-06) replaces human preference labels with principle-based AI feedback: to make the reward signal more consistent and auditable than a rater pool. Every alignment method after RLHF is, in part, an attempt to fix one of these three stages' failure modes.
:::
