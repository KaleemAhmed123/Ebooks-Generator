## Negotiation and bargaining

- When agents have *different goals* — not just different answers to one shared question — they must **negotiate**: reach a deal both accept. This is central to cross-org agents (16-16) and agent economies (16-30), and it borrows a clean concept from human negotiation theory: the **ZOPA**. **[VERIFY]**

<svg viewBox="0 0 360 84" role="img" aria-label="The zone of possible agreement between a buyer's maximum and a seller's minimum" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="20" y1="44" x2="340" y2="44" stroke="#888"/>
  <line x1="230" y1="30" x2="230" y2="58" stroke="#24405e"/><text x="230" y="24" text-anchor="middle" font-size="5.5" fill="#24405e">buyer max $8</text>
  <line x1="120" y1="30" x2="120" y2="58" stroke="#a03050"/><text x="120" y="24" text-anchor="middle" font-size="5.5" fill="#a03050">seller min $5</text>
  <rect x="120" y="38" width="110" height="12" fill="#eaf6ea" stroke="#1a3a2a"/><text x="175" y="70" text-anchor="middle" font-size="6" fill="#1a3a2a">ZOPA — a deal is possible here ($5–$8)</text>
</svg>

- **ZOPA — Zone of Possible Agreement:** the overlap between what each party will accept. A buyer willing to pay up to $8 and a seller willing to accept down to $5 have a ZOPA of $5–$8 — any price there is a deal both prefer to no deal. If the ranges do *not* overlap (buyer max $4, seller min $5), there is **no ZOPA** and no agreement is possible — a crucial thing for an agent to *recognize* so it stops negotiating instead of looping.
- **How agents negotiate:** exchange proposals and counter-proposals (the ACL performatives *propose*/*counter*/*accept*/*reject*, 16-03), each revealing information and moving within its acceptable range, converging on a point in the ZOPA. An LLM agent can reason about offers, infer the counterparty's likely range, and make concessions — negotiation is a natural language task it can do.
- **The engineering concerns:** give each agent a clear **objective and limits** (its ZOPA boundary — the max it will pay/min it will accept) so it does not agree to a bad deal or negotiate forever; a **termination rule** (walk away if no ZOPA, or after N rounds); and, in adversarial settings, awareness that the counterparty may bluff or manipulate (and may be prompt-injecting, 14-128).

:::interview
**"How do agents with conflicting goals reach a deal, and what's the ZOPA?"** They negotiate — exchange proposals and counter-proposals, each moving within its acceptable range until they converge. The ZOPA (Zone of Possible Agreement) is the overlap between what each will accept: if a buyer will pay up to $8 and a seller down to $5, any price in $5–$8 is a deal both prefer to none; if the ranges don't overlap, there's *no* ZOPA and no agreement is possible — which the agent must recognize to stop instead of looping. Engineering-wise you give each agent a clear objective and hard limits (its ZOPA boundary), a walk-away/termination rule, and, in adversarial settings, defenses against bluffing and prompt injection.
:::
