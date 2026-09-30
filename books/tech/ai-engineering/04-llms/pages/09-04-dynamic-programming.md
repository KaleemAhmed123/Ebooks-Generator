## Dynamic programming

- If you **know the MDP** — every transition `P(s'|s,a)` and reward — you can compute the optimal policy exactly, no trial and error. This is **dynamic programming (DP)**: solve the whole problem by solving smaller overlapping pieces.
- Everything rests on the **Bellman equation** — value defined in terms of itself, one step out:

:::mint
```
V(s) = max over a of  [ R(s,a) + γ · Σ P(s'|s,a) · V(s') ]
       └─ best action ┘ └ reward now ┘ └ discounted value of where you land ┘
```
:::

- **Value iteration**: start with random `V`, apply the Bellman update to every state, repeat. `V` provably converges to the true optimal values. Then read off the greedy policy.

<svg viewBox="0 0 320 60" role="img" aria-label="Value iteration sweeps all states repeatedly until values stop changing, then extracts the policy" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="22" width="70" height="22" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="45" y="36" text-anchor="middle">init V</text>
  <rect x="110" y="22" width="100" height="22" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="160" y="36" text-anchor="middle">Bellman sweep</text>
  <rect x="240" y="22" width="70" height="22" rx="4" fill="#24405e"/><text x="275" y="36" text-anchor="middle" fill="#fff">policy</text>
  <path d="M80 33 L108 33" stroke="#1a1a1a" marker-end="url(#d)"/><path d="M210 33 L238 33" stroke="#1a1a1a" marker-end="url(#d)"/>
  <path d="M160 44 C160 58, 130 58, 130 44" stroke="#c0392b" fill="none" marker-end="url(#d2)"/><text x="185" y="56" fill="#c0392b" font-size="7">until stable</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker><marker id="d2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

- DP is the theoretical backbone. Every later method is DP with one thing removed — the known model. When you don't know `P`, you **sample** experience instead (next page).

:::warn
DP needs the full model and one update per state. Chess has ~10⁴⁰ states; you cannot even list them, let alone sweep them. DP is exact and useless at scale — its value is the Bellman equation, which every scalable method approximates.
:::
