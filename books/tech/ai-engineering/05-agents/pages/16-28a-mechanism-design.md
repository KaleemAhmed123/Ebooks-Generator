## Mechanism design and auctions

- If agent economies (16-28) let agents transact, **mechanism design** is the engineering of the *rules* so that self-interested agents, each pursuing its own goal, collectively produce a good outcome. It is "economics in reverse" — design the game so rational play yields what you want. **[VERIFY]**

<svg viewBox="0 0 360 80" role="img" aria-label="A well-designed mechanism makes self-interested bids produce an efficient, truthful allocation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="28" width="90" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="55" y="37" text-anchor="middle">self-interested</text><text x="55" y="47" text-anchor="middle" font-size="5.5" fill="#6b6b6b">agents bid</text>
  <rect x="135" y="24" width="90" height="32" rx="4" fill="#a03050"/><text x="180" y="38" text-anchor="middle" fill="#fff" font-size="6">mechanism</text><text x="180" y="48" text-anchor="middle" fill="#fc8" font-size="5.5">the rules</text>
  <rect x="260" y="28" width="90" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="305" y="37" text-anchor="middle">good outcome</text><text x="305" y="47" text-anchor="middle" font-size="5.5" fill="#6b6b6b">efficient + fair</text>
  <path d="M100 40 L133 40" stroke="#888" marker-end="url(#md)"/><path d="M225 40 L258 40" stroke="#888" marker-end="url(#md)"/>
  <defs><marker id="md" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The problem it solves:** self-interested agents may *lie* (overstate their value, underbid strategically) if lying helps them. A good mechanism makes **honesty the best policy** — designs the rules so an agent's best move is to report its true preferences, which lets the system allocate efficiently.
- **The classic example — the second-price (Vickrey) auction:** bidders submit sealed bids; the highest bidder wins but pays the *second*-highest price. The surprising property: your best strategy is to bid *exactly your true value* — overbidding risks overpaying, underbidding risks losing a good deal, so truth is optimal. The mechanism *elicits honesty* by construction. (This is the logic behind many ad auctions.)
- **Why it matters for agent systems:** when you allocate scarce resources among agents (compute, budget, tasks) via a market (16-05, 16-28), a *naive* mechanism invites gaming — agents learn to manipulate it (the emergent-collusion risk, 16-34). A well-designed mechanism is *robust to strategic agents*: it produces good allocations even when every agent optimizes selfishly. As agents become more capable strategizers, mechanism design becomes essential to keep agent markets efficient and manipulation-resistant.

:::interview
**"Why does mechanism design matter for multi-agent systems?"** Because self-interested agents will game a naive allocation scheme — overstating value, bidding strategically, even colluding. Mechanism design engineers the *rules* so that rational, selfish play produces a good collective outcome, ideally making honesty the optimal strategy. The canonical example is the second-price (Vickrey) auction: highest bidder wins but pays the second price, which makes bidding your true value optimal — the mechanism elicits truth by construction. As you allocate scarce resources (compute, budget, tasks) among increasingly capable strategizing agents, a manipulation-resistant mechanism is what keeps the system efficient rather than gamed.
:::
