## The vLLM production stack and LMCache

- One `vllm serve` is a server, not a *system*. The **vLLM production stack** is the reference deployment: a router in front of many vLLM replicas on Kubernetes, with shared observability and a shared KV layer. **LMCache** is that shared KV layer.
- **LMCache** extends the KV cache beyond one GPU's VRAM: it tiers cache across GPU → CPU RAM → local disk → remote store, and lets **any** replica reuse KV that **any** other replica computed. Prefix reuse stops being per-GPU and becomes cluster-wide.

<svg viewBox="0 0 360 104" role="img" aria-label="A router fans requests to vLLM replicas that share a tiered LMCache across GPU, CPU, and remote storage" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="42" width="44" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="32" y="55" text-anchor="middle" font-size="6">router</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="76" y="16" width="70" height="18" rx="3"/><rect x="76" y="44" width="70" height="18" rx="3"/><rect x="76" y="72" width="70" height="18" rx="3"/></g>
  <text x="111" y="28" text-anchor="middle" font-size="6">vLLM replica</text><text x="111" y="56" text-anchor="middle" font-size="6">vLLM replica</text><text x="111" y="84" text-anchor="middle" font-size="6">vLLM replica</text>
  <rect x="196" y="24" width="150" height="58" rx="4" fill="#24405e"/><text x="271" y="20" text-anchor="middle" font-size="6.5" fill="#24405e">LMCache — tiered KV</text>
  <g fill="#fff" font-size="5.5" text-anchor="middle"><text x="271" y="40">GPU VRAM → CPU RAM</text><text x="271" y="54">→ local disk → remote store</text><text x="271" y="70">shared across all replicas</text></g>
  <path d="M54 52 L74 25" stroke="#888" marker-end="url(#lm)"/><path d="M54 52 L74 53" stroke="#888" marker-end="url(#lm)"/><path d="M54 52 L74 81" stroke="#888" marker-end="url(#lm)"/>
  <path d="M146 53 L194 53" stroke="#a03050" marker-start="url(#lm2)" marker-end="url(#lm2)"/>
  <defs><marker id="lm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker><marker id="lm2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,2.5 L5,0 L5,5 Z" fill="#a03050"/></marker></defs>
</svg>

- **Two wins.** A conversation routed to a *different* replica on its next turn still hits warm KV (cluster-wide reuse). And KV that overflows VRAM offloads to CPU/disk instead of being recomputed — cheaper than re-prefill for long shared contexts.
- **The cost is transfer latency.** Fetching KV from CPU or a remote store is slower than VRAM; it wins only when the fetch is cheaper than recomputing prefill, i.e. for long, genuinely reused prefixes. It is the disaggregation idea's cache twin.

:::note
This is where "run vLLM" becomes "operate an inference cluster." The production stack answers routing, replica management, and observability; LMCache answers *cluster-wide KV reuse and offload*. Both are the standard scaffolding you assume exists when a mock design says "we self-host at scale" — you do not re-derive them, you name them.
:::
