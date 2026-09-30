## The Contract Net Protocol

- How does a task get assigned to the *right* agent when you do not know in advance who is best? The **Contract Net Protocol** (Smith, 1980) — a classical MAS staple — solves it with a market-like bidding process. It is the canonical task-allocation pattern, and it maps cleanly onto LLM agents. **[VERIFY]**

<svg viewBox="0 0 360 100" role="img" aria-label="A manager announces a task, agents bid, the manager awards it to the best bidder, who reports back" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="140" y="10" width="80" height="18" rx="3" fill="#a03050"/><text x="180" y="22" text-anchor="middle" fill="#fff">manager</text>
  <circle cx="60" cy="60" r="14" fill="#24405e"/><circle cx="180" cy="66" r="14" fill="#6a9bd0"/><circle cx="300" cy="60" r="14" fill="#24405e"/>
  <text x="60" y="63" text-anchor="middle" fill="#fff" font-size="5">bid 5</text><text x="180" y="69" text-anchor="middle" fill="#fff" font-size="5">bid 2 ✓</text><text x="300" y="63" text-anchor="middle" fill="#fff" font-size="5">bid 8</text>
  <path d="M160 28 L66 48" stroke="#888" stroke-dasharray="2,2"/><path d="M180 28 L180 50" stroke="#888" stroke-dasharray="2,2"/><path d="M200 28 L294 48" stroke="#888" stroke-dasharray="2,2"/>
  <text x="120" y="40" font-size="5" fill="#6b6b6b">1 announce →</text>
  <path d="M180 52 L180 30" stroke="#1a3a2a" marker-end="url(#cnp)"/><text x="210" y="44" font-size="5" fill="#1a3a2a">2 bids ↑ 3 award</text>
  <defs><marker id="cnp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a3a2a"/></marker></defs>
</svg>

- **The four steps:**
  1. **Announce** — a manager broadcasts a task and its requirements to available agents ("who can do X?").
  2. **Bid** — each capable agent responds with a bid: its estimated cost, time, confidence, or fitness for the task.
  3. **Award** — the manager picks the best bid and awards the contract to that agent.
  4. **Report** — the winning agent does the work and returns the result.
- **Why it is elegant:** allocation is **decentralized and adaptive** — you do not hard-code who does what; agents self-select based on their own assessment of fit, and the system routes work to whoever is best *right now*. It handles dynamic teams (agents join/leave) and load balancing (busy agents bid high or not at all) naturally.
- **For LLM agents:** the manager is a supervisor (16-07); bids are agents self-assessing ("I'm well-suited because…"); the award is routing. It is a principled alternative to a supervisor *guessing* who should handle a task — let the candidates make the case.

:::interview
**"How would you allocate tasks among agents when you don't know upfront who's best?"** The Contract Net Protocol. A manager announces the task and its requirements; capable agents *bid* with their estimated fit (cost, confidence, capability); the manager awards it to the best bid; the winner does the work and reports back. It's decentralized and adaptive — work routes to whoever is best-suited right now, it handles dynamic teams and load balancing (busy agents bid low or abstain), and for LLM agents the 'bid' is each agent self-assessing its suitability. It beats a supervisor blindly guessing the assignment by letting candidates make their own case.
:::
