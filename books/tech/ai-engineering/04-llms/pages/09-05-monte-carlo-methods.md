## Monte-Carlo methods

- Drop the known model. Now you learn value the only way left: **play episodes and average what actually happened.** This is the **Monte-Carlo (MC)** approach — estimate by sampling, not by formula.
- Run a full episode to the end. For each state you visited, record the **return** — the total discounted reward that followed. Average returns over many episodes and you get `V(s)`.

:::mint
```python
# after an episode ends, walk backward summing discounted reward
G = 0
for s, r in reversed(episode):          # episode = list of (state, reward)
    G = r + gamma * G                    # return from this state onward
    V[s] += alpha * (G - V[s])           # nudge estimate toward observed return
```
:::

<svg viewBox="0 0 322 58" role="img" aria-label="Three episodes each end in a reward; averaging their returns estimates the value of the start state" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <circle cx="24" cy="29" r="12" fill="#24405e"/><text x="24" y="32" text-anchor="middle" fill="#fff" font-size="7">s₀</text>
  <path d="M36 24 L150 12" stroke="#bbb"/><path d="M36 29 L150 29" stroke="#bbb"/><path d="M36 34 L150 46" stroke="#bbb"/>
  <text x="170" y="15" fill="#1a3a2a">G=+8</text><text x="170" y="32" fill="#1a3a2a">G=+3</text><text x="170" y="49" fill="#c0392b">G=−2</text>
  <text x="270" y="32" text-anchor="middle">V(s₀) ≈ avg = 3</text>
</svg>

- **Learning rate α** controls how far each new return moves the estimate. It is a running average that slowly forgets old, worse estimates.
- MC is **model-free** — it never needs `P(s'|s,a)`. It just needs to reach the end of episodes.

:::warn
MC must wait for an episode to **finish** before it can learn anything — useless for tasks with no end, or very long ones. And returns are **high-variance**: one lucky episode swings the estimate hard. The next method fixes both by learning after every single step.
:::
