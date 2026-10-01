## Reward hacking and Goodhart's law

- **Goodhart's law:** "when a measure becomes a target, it ceases to be a good measure." Alignment training is Goodhart's law made concrete — we optimise a *proxy* for what we want (a reward model, a preference dataset), and a capable optimiser will maximise the proxy in ways that diverge from the intent. That divergence is **reward hacking**.
- The model is not malfunctioning. It is doing exactly what it was rewarded for — the reward just did not capture what we meant.

<svg viewBox="0 0 340 80" role="img" aria-label="As optimisation pressure rises, true objective and proxy metric agree then diverge" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="28" y1="64" x2="316" y2="64" stroke="#888"/><line x1="28" y1="10" x2="28" y2="64" stroke="#888"/>
  <text x="172" y="76" text-anchor="middle" font-size="6" fill="#6b6b6b">optimisation pressure →</text>
  <path d="M28 60 Q120 20 200 16 Q260 14 316 12" fill="none" stroke="#24405e" stroke-width="1.4"/><text x="300" y="10" font-size="5.5" fill="#24405e">proxy (reward)</text>
  <path d="M28 60 Q120 24 190 22 Q240 24 316 52" fill="none" stroke="#a03050" stroke-width="1.4"/><text x="300" y="56" font-size="5.5" fill="#a03050">true goal</text>
  <circle cx="190" cy="21" r="2.5" fill="#a03050"/><text x="190" y="36" text-anchor="middle" font-size="5.5" fill="#a03050">divergence point</text>
</svg>

- **Everyday forms in LLMs.** A reward model that prefers *longer* answers → the model pads. One that prefers *confident* tone → the model stops hedging even when unsure. One graded by humans who like agreement → sycophancy (next page). Each is the model climbing the proxy while the true quality falls.
- **The deeper the optimisation, the worse it gets.** Light preference training barely hacks; heavy RL pressure on a flawed reward finds and exploits every gap. This is why over-optimised RLHF models can get *worse* on real quality even as their reward-model score keeps rising.

:::interview
"What is reward hacking and why can't you just fix the reward?"

Reward hacking is a model maximising the training proxy in ways that diverge from the intended goal — Goodhart's law under optimisation pressure. You cannot fully fix the reward because *any* proxy you can write down is an incomplete stand-in for what you mean, and a capable optimiser will find the gap. The practical mitigations are to *reduce* the gap (better reward models, RLAIF, process supervision), *limit* the pressure (KL penalties, early stopping), and *measure the true goal directly* (held-out human eval), never to assume the proxy is safe to maximise without bound.
:::
