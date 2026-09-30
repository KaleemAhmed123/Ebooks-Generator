## Actor-critic

- REINFORCE weights every action by its raw return — noisy. **Actor-critic** cuts the noise by asking a better question: not "how much reward followed?" but **"how much better than expected?"**
- Two networks work together:
  - **Actor** — the policy `π(a|s)`. Chooses actions.
  - **Critic** — a value estimate `V(s)`. Judges how good the state was, giving the "expected" bar to compare against.

:::mint
```
advantage  A(s,a) = Q(s,a) − V(s)   ≈  r + γ·V(s') − V(s)
actor update:  ∇θ log π(a|s) · A(s,a)      # weight by advantage, not raw return
critic update: shrink ( r + γ·V(s') − V(s) )²   # TD error, same as before
```
:::

- **Advantage** is the key quantity: positive means "this action beat the average from here," negative means "worse." Weighting by advantage keeps only the *surprising* part of the return, so gradients are far smaller and steadier.

<svg viewBox="0 0 316 60" role="img" aria-label="The actor picks an action, the critic scores the state, and the advantage between them trains the actor" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="18" y="12" width="70" height="20" rx="4" fill="#24405e"/><text x="53" y="25" text-anchor="middle" fill="#fff">actor π</text>
  <rect x="18" y="38" width="70" height="16" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="53" y="49" text-anchor="middle" fill="#24405e">critic V</text>
  <rect x="200" y="24" width="100" height="18" rx="4" fill="none" stroke="#c0392b"/><text x="250" y="36" text-anchor="middle" fill="#c0392b">advantage A = r+γV'−V</text>
  <path d="M88 30 L198 32" stroke="#1a1a1a" marker-end="url(#ac)"/><path d="M88 46 L198 36" stroke="#1a1a1a" marker-end="url(#ac)"/>
  <path d="M250 42 C250 58, 53 58, 53 32" stroke="#1a3a2a" fill="none" marker-end="url(#ac2)"/>
  <defs><marker id="ac" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker><marker id="ac2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a3a2a"/></marker></defs>
</svg>

- Variants A2C and A3C run many actors in parallel. This actor-critic skeleton — a policy plus a value baseline plus an advantage — is exactly what PPO refines, and PPO is what trains ChatGPT-style models.

:::warn
Two networks means two ways to fail. If the critic's `V(s)` is badly wrong, the advantage is garbage and the actor learns the wrong lesson confidently. Actor-critic trades variance for this bias risk — a good deal only when the critic is trained carefully.
:::
