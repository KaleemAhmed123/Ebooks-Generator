## Multi-region and KV locality

- Global products serve users far from the GPUs. Physics sets a floor: a round trip from Sydney to us-east adds ~200 ms before the model does anything, which alone can blow a TTFT SLO. So you run GPUs in multiple regions — and inherit a new problem: **where does a user's KV cache live?**
- A conversation's KV cache is warm only on the GPU (or region) that built it. Route the next turn elsewhere and you cold-prefill the whole history again.

<svg viewBox="0 0 360 92" role="img" aria-label="Users routed to nearest region; sticky routing keeps a conversation on the region holding its warm KV cache" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="20" width="90" height="26" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="59" y="32" text-anchor="middle" font-size="6">region: us-east</text><text x="59" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">warm KV for conv-A</text>
  <rect x="14" y="56" width="90" height="26" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="59" y="68" text-anchor="middle" font-size="6">region: eu-west</text><text x="59" y="78" text-anchor="middle" font-size="5.5" fill="#6b6b6b">warm KV for conv-B</text>
  <circle cx="180" cy="34" r="3" fill="#24405e"/><text x="196" y="37" font-size="6">user A (turn 2)</text>
  <path d="M200 40 Q150 55 104 36" fill="none" stroke="#24405e" stroke-dasharray="3 2" marker-end="url(#mr)"/><text x="250" y="52" font-size="5.5" fill="#24405e">sticky → same region, warm cache ✓</text>
  <defs><marker id="mr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#24405e"/></marker></defs>
</svg>

- **Sticky session routing** pins a conversation to the region (and ideally the replica) that holds its warm KV — turn two lands where turn one's cache lives. LMCache-style shared KV can also *replicate* a conversation's cache to the failover region so a reroute stays warm.
- **The tension is locality vs balance.** Perfect stickiness maximises cache hits but can hot-spot one region; pure load-balancing spreads load but cold-prefills conversations. Production routes sticky-with-overflow: prefer the warm region, spill to the next when it saturates.

:::interview
"How do you serve a global chat product under a tight TTFT SLO?"

Two layers. **Geographic:** GPUs in regions near users, route to nearest, so network round-trip fits the budget. **KV locality:** sticky-route each conversation to the region holding its warm KV cache so follow-up turns skip re-prefilling the history — with cache replication to a failover region for resilience. The failure mode to call out is a naive global load-balancer that scatters a conversation across regions and cold-prefills every turn.
:::
