## Mixture of experts

- To make a model smarter you add parameters — but every extra parameter costs compute on every token. **Mixture of experts (MoE)** breaks that link: grow the parameters, keep the per-token compute flat.
- Replace the one feed-forward block (page 07-08) with **many** parallel FFNs called **experts**, plus a small **router** that, for each token, picks the top *k* experts (typically 2) to run. The rest stay asleep.

<svg viewBox="0 0 340 92" role="img" aria-label="A router sends each token to two of several experts, leaving the others inactive" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="38" width="46" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="35" y="51" text-anchor="middle">token</text>
  <rect x="76" y="36" width="44" height="22" rx="3" fill="#24405e"/><text x="98" y="50" text-anchor="middle" fill="#fff">router</text>
  <g><rect x="150" y="6" width="70" height="16" rx="2" fill="#1a3a2a"/><text x="185" y="18" text-anchor="middle" fill="#fff" font-size="7">expert 1 ✓</text>
     <rect x="150" y="26" width="70" height="16" rx="2" fill="#ddd"/><text x="185" y="38" text-anchor="middle" font-size="7">expert 2</text>
     <rect x="150" y="46" width="70" height="16" rx="2" fill="#1a3a2a"/><text x="185" y="58" text-anchor="middle" fill="#fff" font-size="7">expert 3 ✓</text>
     <rect x="150" y="66" width="70" height="16" rx="2" fill="#ddd"/><text x="185" y="78" text-anchor="middle" font-size="7">expert 4</text></g>
  <path d="M120 45 L148 14" stroke="#1a1a1a" marker-end="url(#mo)"/><path d="M120 47 L148 54" stroke="#1a1a1a" marker-end="url(#mo)"/>
  <text x="285" y="46" text-anchor="middle" fill="#6b6b6b">only 2 of 4 run</text>
  <defs><marker id="mo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Hence two numbers on every MoE model card: **total parameters** (all experts) and **active parameters** (only those that fire per token). Mixtral 8×7B has 46.7B total but activates ~12.9B per token — 70B-class quality at far lower inference cost.
- As of September 2026 MoE is the frontier default: DeepSeek-V3, Qwen3, Llama 4, and Mistral Large 3 are all sparse MoE models.

:::warn
MoE's costs are real. **All** experts must sit in GPU memory even though most are idle, so you need the memory of a huge model to run the compute of a small one. And the router can **collapse** — routing most tokens to a few favorite experts, leaving the rest untrained — so training needs a **load-balancing loss** to keep experts evenly used. MoE buys cheap inference with expensive memory and trickier training, not a free lunch.
:::
