## Canaries and gradual rollout

- You never trust a new or changed autonomous agent at full scale on day one. **Canary deployment** and **gradual rollout** limit the blast radius of a bad agent by exposing it to a little traffic first and widening only as it proves safe. Borrowed straight from software deployment, essential for agents because their failures are non-deterministic.

<svg viewBox="0 0 360 84" role="img" aria-label="A new agent version serves 1 percent, then 10, then 100 percent as metrics stay healthy" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="34" width="60" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="44" y="45" text-anchor="middle" font-size="6">1% canary</text><text x="44" y="54" text-anchor="middle" font-size="5.5" fill="#6b6b6b">watch metrics</text>
  <rect x="110" y="34" width="60" height="24" rx="3" fill="#d5e8fb" stroke="#24405e"/><text x="140" y="49" text-anchor="middle" font-size="6">10%</text>
  <rect x="206" y="34" width="60" height="24" rx="3" fill="#6a9bd0"/><text x="236" y="49" text-anchor="middle" fill="#fff" font-size="6">50%</text>
  <rect x="302" y="34" width="48" height="24" rx="3" fill="#24405e"/><text x="326" y="49" text-anchor="middle" fill="#fff" font-size="6">100%</text>
  <path d="M74 46 L108 46" stroke="#888" marker-end="url(#cn2)"/><path d="M170 46 L204 46" stroke="#888" marker-end="url(#cn2)"/><path d="M266 46 L300 46" stroke="#888" marker-end="url(#cn2)"/>
  <text x="180" y="76" text-anchor="middle" font-size="5.5" fill="#a03050">metrics dip at any stage → auto-rollback</text>
  <defs><marker id="cn2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The canary:** route a small fraction (say 1%) of traffic to the new agent version while the rest stays on the trusted one. Watch its metrics — success rate, cost, latency, error rate, user feedback (14-114) — against the baseline. If it holds up, widen to 10%, 50%, 100%; if anything degrades, **roll back** automatically before most users are affected.
- **Why agents especially need this:** an agent's behavior is non-deterministic and emergent — offline evals (14-116) catch a lot but not everything, and a change that scored well in testing can misbehave on real traffic in ways you did not anticipate. A canary is the *production* safety net that catches what offline testing missed, at 1% blast radius instead of 100%.
- **Pair with online evaluation** (14-118a): the canary is only as good as the metrics you watch. Automated graders and quality signals on the canary traffic are what tell you, quickly, whether to promote or roll back.

:::note
Canaries encode humility: *you will ship a bad agent change sometimes, and you cannot fully predict its behavior before real traffic sees it.* Rather than pretend testing is perfect, you limit the damage of the inevitable bad release to a tiny slice and catch it fast. Combined with kill switches (stop a bad agent) and cost governors (bound a runaway one), gradual rollout completes the operational safety stack: you deploy changes in a way where the worst case is small and reversible, never large and sudden.
:::
