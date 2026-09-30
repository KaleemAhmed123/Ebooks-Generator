## Value and policy

- Two objects run through all of RL. Get them straight now and every algorithm reads as a way to compute one from the other.
- **Policy π** — the agent's behaviour. `π(a | s)` = the probability of taking action `a` in state `s`. This is what you actually deploy.
- **Value V** — how good a state is. `V(s)` = the total discounted reward you expect if you start in `s` and follow policy π forever.

:::mint
```
Vπ(s) = E[ R₀ + γR₁ + γ²R₂ + … ]   starting from s, acting by π
Qπ(s,a) = same, but you take action a first, then follow π
```
Q is value with the first move pinned. V is the average of Q over π.
:::

- **Q-value** `Q(s, a)` is the workhorse. If you know Q for every action, acting well is trivial: **pick the action with the highest Q**. That greedy rule turns a value function into a policy.

<svg viewBox="0 0 320 70" role="img" aria-label="Value estimates feed a greedy choice that becomes the policy, which generates experience that updates the values" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="18" y="26" width="80" height="22" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="58" y="40" text-anchor="middle">value Q(s,a)</text>
  <rect x="220" y="26" width="80" height="22" rx="4" fill="#24405e"/><text x="260" y="40" text-anchor="middle" fill="#fff">policy π</text>
  <path d="M98 32 C160 14, 160 14, 220 32" stroke="#1a3a2a" fill="none" marker-end="url(#v)"/><text x="159" y="14" text-anchor="middle" fill="#1a3a2a">act greedily</text>
  <path d="M220 42 C160 60, 160 60, 98 42" stroke="#c0392b" fill="none" marker-end="url(#v)"/><text x="159" y="66" text-anchor="middle" fill="#c0392b">experience updates value</text>
  <defs><marker id="v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Two great families follow from this: **value-based** methods (learn Q, act greedily — Q-learning, DQN) and **policy-based** methods (learn π directly — REINFORCE, PPO). RLHF uses the policy-based kind.

:::warn
A greedy policy that always picks the current-best action never discovers a better one it hasn't tried. This is the **exploration–exploitation** trade-off — the next pages keep returning to it.
:::
