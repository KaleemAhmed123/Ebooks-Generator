## Policy gradients and REINFORCE

- Instead of learning values and acting greedily, **learn the policy directly**. The network `π(a | s; θ)` outputs action probabilities; you nudge `θ` to make good actions more likely. This is the family RLHF belongs to.
- The rule is intuitive: **push up the probability of actions that led to high return, push down those that led to low return.** REINFORCE is the simplest version.

:::mint
```
∇θ J = E[ Gₜ · ∇θ log π(aₜ|sₜ) ]
       └ return ┘  └ "make this action more likely" direction ┘
```
Weight each action's log-prob gradient by the return that followed it.
:::

<svg viewBox="0 0 320 60" role="img" aria-label="Actions from a high-return trajectory get their probability raised, actions from a low-return one get lowered" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="60" y="14" text-anchor="middle">trajectory A · G=+9</text>
  <rect x="20" y="22" width="80" height="12" fill="#1a3a2a"/><text x="112" y="31" fill="#1a3a2a" font-size="7">↑ more likely</text>
  <text x="60" y="50" text-anchor="middle">trajectory B · G=−4</text>
  <rect x="20" y="40" width="40" height="8" fill="#c0392b"/><text x="112" y="47" fill="#c0392b" font-size="7">↓ less likely</text>
</svg>

- Policy methods handle **continuous and huge action spaces** naturally — the network just outputs a distribution, no `max` search needed. A language model *is* a policy: state = the prompt-so-far, action = the next token, `π` = the softmax over the vocabulary.

:::warn
Plain REINFORCE is **extremely high-variance**. It multiplies by the raw return `Gₜ`, which swings wildly between episodes, so gradients are noisy and training crawls. The fix — subtract a **baseline** so you weight by "better or worse than expected," not raw return — is the actor-critic method on the next page.
:::
