# Consistency and CAP

## The consistency ladder

- "Consistency" isn't one thing — it's a **spectrum** of guarantees about what a read may see, from strongest (and most expensive) to weakest (and cheapest). Knowing the rungs lets you buy exactly the guarantee a feature needs and no more, because each step up costs coordination and latency.

<svg viewBox="0 0 360 100" role="img" aria-label="Consistency ladder from strongest to weakest: linearizable, sequential, causal, eventual; stronger costs more coordination" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="40" y="10" width="220" height="18" rx="2" fill="#d8e3f2" stroke="#1f487e"/><text x="150" y="22" text-anchor="middle" font-size="6.3">linearizable — reads see the latest write, one global order</text>
  <rect x="60" y="32" width="200" height="18" rx="2" fill="#e2eaf5" stroke="#1f487e"/><text x="160" y="44" text-anchor="middle" font-size="6.3">sequential — a total order, not real-time</text>
  <rect x="80" y="54" width="180" height="18" rx="2" fill="#ebf0f8" stroke="#1f487e"/><text x="170" y="66" text-anchor="middle" font-size="6.3">causal — related ops ordered for all</text>
  <rect x="100" y="76" width="160" height="18" rx="2" fill="#f4f7fb" stroke="#1f487e"/><text x="180" y="88" text-anchor="middle" font-size="6.3">eventual — converges if writes stop</text>
  <text x="300" y="22" font-size="6" fill="#c0392b">costly</text>
  <text x="300" y="88" font-size="6" fill="#2f7d4f">cheap</text>
  <path d="M320 30 L320 78" stroke="#999" marker-end="url(#cl)"/>
  <defs><marker id="cl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Linearizable** (strongest): every operation appears to take effect **instantaneously** at a single point between its call and return, so there's one global order and a read **always sees the most recent completed write**. The system behaves like a single machine — which is exactly why it's expensive: it needs coordination (consensus, Module 6) on every operation.
- **Sequential**: all nodes agree on *some* total order that respects each process's own order, but it needn't match real time. **Causal**: anything causally related (a reply after a post) is seen in that order by everyone, while truly concurrent operations may be seen in different orders — cheap and often "consistent enough." **Eventual** (weakest): make no promise about *when*, only that replicas **converge** if writes stop.

:::note
Don't confuse **linearizability** with **serializability** — interviews love this. *Linearizability* is about **recency** of a single object in real time ("my read sees the latest write"). *Serializability* is a **transaction-isolation** property: multi-object transactions appear to run in *some* serial order (Module 7), with no real-time claim. The gold standard, **strict serializability** (Spanner), is both at once. One is about *when*; the other is about *isolation*.
:::
