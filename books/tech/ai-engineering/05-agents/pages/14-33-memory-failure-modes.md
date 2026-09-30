## Memory failure modes

- Memory systems fail in specific, recurring ways. Knowing them is what separates a demo from a product.

<svg viewBox="0 0 360 100" role="img" aria-label="Five memory failure modes: stale facts, wrong retrieval, bloat, contradictions, and privacy leaks" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="8" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="62" y="31" text-anchor="middle">stale / never-updated facts</text>
  <rect x="126" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="31" text-anchor="middle">wrong retrieval</text>
  <rect x="244" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="298" y="31" text-anchor="middle">memory bloat</text>
  <rect x="66" y="46" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="120" y="61" text-anchor="middle">contradictions</text>
  <rect x="186" y="46" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="240" y="61" text-anchor="middle">privacy leaks</text>
  <rect x="80" y="78" width="200" height="18" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="180" y="90" text-anchor="middle" font-size="6.5">all erode trust silently</text>
</svg>

- **Stale facts.** The agent remembers Sam prefers Python long after Sam switched to Rust, because nothing updates old memories. Fix: update-on-conflict (rewrite blocks), decay, and re-confirming facts.
- **Wrong retrieval.** Vector search surfaces a *similar-looking but irrelevant* memory and the agent acts on it — recalling the wrong past bug. Fix: better retrieval (rerank, filter by recency/entity), and keep retrieved memories clearly separated so the model can disregard bad ones.
- **Memory bloat.** Storing everything makes retrieval noisy and slow, and bloats cost. Fix: extract *durable* facts only, deduplicate, and forget the trivial.
- **Contradictions.** Two stored facts conflict ("prefers dark mode" / "prefers light mode") and the agent picks arbitrarily. Fix: conflict resolution at write time, timestamps to prefer recent.
- **Privacy leaks.** Memory persists sensitive data (a password mentioned once) and later surfaces it — or leaks one user's memory into another's session. Fix: scope memory per user, filter secrets on write, honor deletion.

:::warn
The most damaging memory failure is the **confident stale fact**. An agent that insists you live in your old city, or keeps using a preference you abandoned, feels broken in a way a forgetful agent does not — bad memory is worse than no memory. Design for *updating and forgetting* as deliberately as you design for storing. A memory you cannot correct or delete is a liability, not a feature.
:::
