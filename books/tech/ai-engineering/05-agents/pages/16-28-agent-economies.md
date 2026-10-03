## Agent economies

- When many agents with resources and goals interact, an **economy** emerges — agents that hold budgets, pay each other for services, and allocate scarce resources through market mechanisms. It is a frontier vision of multi-agent systems and a live research area as agents begin to transact.

<svg viewBox="0 0 360 88" role="img" aria-label="Agents with budgets pay each other for services, allocating resources through a market" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <circle cx="70" cy="44" r="18" fill="#24405e"/><text x="70" y="41" text-anchor="middle" fill="#fff" font-size="5.5">agent A</text><text x="70" y="51" text-anchor="middle" fill="#cdd" font-size="5">budget $</text>
  <circle cx="290" cy="44" r="18" fill="#6a9bd0"/><text x="290" y="41" text-anchor="middle" fill="#fff" font-size="5.5">agent B</text><text x="290" y="51" text-anchor="middle" fill="#eef" font-size="5">sells service</text>
  <path d="M90 38 L268 38" stroke="#1a3a2a" marker-end="url(#ae2)"/><text x="180" y="32" text-anchor="middle" font-size="5.5" fill="#1a3a2a">pays $ →</text>
  <path d="M268 50 L90 50" stroke="#888" marker-end="url(#ae2)"/><text x="180" y="64" text-anchor="middle" font-size="5.5">← delivers service</text>
  <defs><marker id="ae2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The idea:** give agents *budgets* and let them *buy and sell* — an orchestrator pays specialist agents for sub-tasks, agents bid for compute, a data-provider agent charges for queries. Prices and allocation emerge from the market rather than central planning, which can allocate scarce resources (compute, API budget, attention) efficiently without a planner deciding everything.
- **Why markets, not central control:** markets are a *decentralized* way to allocate resources to their highest-value use — the price signal aggregates information no central allocator has (which agent values the resource most). The contract-net protocol (16-05) is a micro-market; a full agent economy generalizes it to standing budgets and prices.
- **Where it is heading:** as A2A (16-16) enables cross-org agent transactions and agents get payment capabilities, agents *purchasing services from each other* — an agent hiring another agent's specialized skill, paying per task — becomes real. This is early, speculative, and raises hard questions (accountability, fraud, market manipulation by agents), but it is a plausible future structure for large agent ecosystems.

:::note
Agent economies apply a deep idea — markets as decentralized information-processing and resource-allocation systems — to multi-agent AI. It is largely forward-looking as of 2026, but the *principle* is immediately useful even in-house: pricing scarce resources (compute, budget, tokens) and letting agents "bid" allocates them to the highest-value work better than a central planner guessing. Whether full agent economies with real money materialize, thinking in terms of incentives, prices, and market allocation is a powerful lens for designing large multi-agent systems — and for anticipating how they might be gamed.
:::
