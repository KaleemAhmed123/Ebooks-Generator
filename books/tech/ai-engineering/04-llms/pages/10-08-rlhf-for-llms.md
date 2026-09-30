## The alignment stage

- SFT taught the model *a* good answer. **Alignment** teaches it which of several answers humans actually prefer — tone, honesty, harmlessness, format. This is the stage that separates a demo from a product.
- The mechanics of the RL route — reward modelling, PPO, the KL leash — are in Module 9 (pages 09-11, 09-12). Here is where that route sits in the LLM pipeline, and the fork the field took.

<svg viewBox="0 0 328 78" role="img" aria-label="From SFT plus preference pairs, two roads: RLHF via a reward model and PPO, or DPO which optimizes the pairs directly" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="30" width="86" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="51" y="43" text-anchor="middle">SFT + pref pairs</text>
  <rect x="180" y="6" width="140" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="250" y="19" text-anchor="middle">RLHF: reward model → PPO</text>
  <rect x="180" y="52" width="140" height="20" rx="3" fill="#24405e"/><text x="250" y="65" text-anchor="middle" fill="#fff">DPO: optimize pairs directly</text>
  <path d="M94 36 C140 22, 150 18, 178 16" stroke="#1a1a1a" fill="none" marker-end="url(#al)"/>
  <path d="M94 44 C140 58, 150 60, 178 62" stroke="#1a1a1a" fill="none" marker-end="url(#al)"/>
  <defs><marker id="al" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Both roads start from the same data**: preference pairs (prompt, chosen answer, rejected answer). They differ only in how they turn those pairs into weight updates.
- **RLHF** trains a separate reward model, then runs PPO against it — powerful, flexible, but four models in memory and fragile to tune.
- **DPO** skips the reward model and the RL loop entirely, optimising the preference pairs with one supervised-style loss (next page). It is now the default for most open models because it is far simpler.

:::note
When to use which: **RLHF/GRPO** when you want online improvement and a reusable reward signal (reasoning models, iterated training). **DPO** when you have a fixed set of preference pairs and want a stable, cheap run. Most teams start with DPO.
:::

:::warn
Alignment can **tax capability**: pushing hard on "safe and polite" can make a model refuse reasonable requests or lose sharpness on hard tasks — the "alignment tax." Good alignment data balances helpfulness against harmlessness; one-sided data yields a model that is either reckless or uselessly cautious.
:::
