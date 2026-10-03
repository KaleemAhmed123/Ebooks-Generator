## GPU autoscaling on Kubernetes

- Self-hosting at any real scale means Kubernetes: pods run the serving engine, each pod claims one or more GPUs, and a scaler adds or removes pods with load. The problem is that **GPUs are slow and expensive to add** — a cold pod must pull a multi-gigabyte model into VRAM before it serves a single token.
- The default CPU-based autoscaler is useless here: GPU utilisation, queue depth, and pending requests are the real signals, so you scale on custom metrics (typically via **KEDA**, the event-driven autoscaler).

<svg viewBox="0 0 360 100" role="img" aria-label="Requests queue at a gateway; KEDA scales GPU pods on queue depth; cold pods must load the model before serving" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="40" width="52" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="36" y="54" text-anchor="middle" font-size="6.5">gateway</text>
  <rect x="80" y="40" width="46" height="22" rx="3" fill="#f4f4f4" stroke="#888"/><text x="103" y="51" text-anchor="middle" font-size="6">queue</text><text x="103" y="59" text-anchor="middle" font-size="5.5" fill="#a03050">depth=42</text>
  <rect x="150" y="40" width="44" height="22" rx="3" fill="#24405e"/><text x="172" y="54" text-anchor="middle" font-size="6.5" fill="#fff">KEDA</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="222" y="14" width="52" height="18" rx="3"/><rect x="222" y="38" width="52" height="18" rx="3"/></g>
  <rect x="222" y="62" width="52" height="18" rx="3" fill="#fdeef2" stroke="#a03050" stroke-dasharray="3 2"/>
  <text x="248" y="26" text-anchor="middle" font-size="6">GPU pod ✓</text><text x="248" y="50" text-anchor="middle" font-size="6">GPU pod ✓</text><text x="248" y="74" text-anchor="middle" font-size="6" fill="#a03050">cold pod…</text>
  <text x="315" y="70" text-anchor="middle" font-size="5.5" fill="#a03050">40–120s model load</text>
  <path d="M62 51 L78 51" stroke="#888" marker-end="url(#ka)"/><path d="M126 51 L148 51" stroke="#888" marker-end="url(#ka)"/><path d="M194 47 L220 23" stroke="#888" marker-end="url(#ka)"/><path d="M194 51 L220 47" stroke="#888" marker-end="url(#ka)"/><path d="M194 55 L220 71" stroke="#a03050" marker-end="url(#ka)"/>
  <defs><marker id="ka" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Scale on queue depth or pending tokens, not CPU.** When the queue exceeds a threshold, add a pod; when GPUs idle, remove one — but drain in-flight requests first so you never kill a generation mid-stream.
- **Scale-to-zero is tempting and dangerous.** Zero pods means the next request eats the full cold-start (model load, next page). Keep a warm floor for interactive traffic; scale to zero only for batch or rare endpoints.

:::note
The GPU autoscaling problem is fundamentally *cold-start latency*, not *provisioning speed*. Kubernetes can schedule a pod in seconds; the model load behind it takes 40–120 seconds. Every serious GPU autoscaling design is really a cold-start-mitigation design (page 17-34) wearing a scheduler's clothes.
:::
