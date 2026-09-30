## Markov decision processes

- RL problems are written as a **Markov decision process (MDP)** — the formal box every RL algorithm plugs into. Five parts:

:::mint
```
States S      — every situation the agent can be in
Actions A     — every move it can make
Transition P  — P(s' | s, a): where action a from state s lands you
Reward R      — R(s, a): the number you get for that move
Discount γ    — 0<γ≤1: how much future reward is worth now
```
:::

- The **Markov property** is the key assumption: the next state depends **only on the current state and action**, not the full history. The present is a sufficient summary of the past.
- **Discount γ (gamma)** shrinks far-off rewards. A reward `t` steps away is worth `γᵗ` of its face value. With γ = 0.9, a reward 10 steps out counts for ~0.35. This keeps infinite-horizon sums finite and encodes "sooner is better".

<svg viewBox="0 0 330 66" role="img" aria-label="From a state the agent picks an action, gets a reward, and moves to the next state" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <circle cx="34" cy="34" r="18" fill="#e8f4fd" stroke="#24405e"/><text x="34" y="37" text-anchor="middle">s</text>
  <circle cx="230" cy="34" r="18" fill="#e8f4fd" stroke="#24405e"/><text x="230" y="37" text-anchor="middle">s'</text>
  <path d="M52 34 L212 34" stroke="#1a1a1a" marker-end="url(#m)"/>
  <text x="132" y="26" text-anchor="middle" fill="#1a3a2a">action a</text>
  <text x="132" y="48" text-anchor="middle" fill="#c0392b">reward R(s,a)</text>
  <text x="300" y="37" text-anchor="middle" fill="#6b6b6b">…repeat</text>
  <defs><marker id="m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
The Markov property is often a lie you accept on purpose. Real problems have hidden state — a poker hand, a half-read document. When the current observation is not enough, you either stuff history into the state (bigger state space) or move to a POMDP (partially observed MDP), which is much harder.
:::
