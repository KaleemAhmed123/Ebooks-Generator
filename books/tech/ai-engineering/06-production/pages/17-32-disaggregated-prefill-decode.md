## Disaggregated prefill and decode

- Prefill is compute-bound; decode is memory-bound (page 17-09). Running both on the same GPU forces a compromise: a batch tuned for decode throughput stalls on long prefills, and vice versa. **Disaggregated serving** splits them onto **separate GPU pools**, each tuned for its phase.

<svg viewBox="0 0 360 100" role="img" aria-label="A router sends prefill to a prefill pool, which transfers KV cache to a decode pool that streams tokens" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="42" width="46" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="33" y="55" text-anchor="middle" font-size="6">router</text>
  <rect x="86" y="16" width="86" height="24" rx="3" fill="#24405e"/><text x="129" y="28" text-anchor="middle" font-size="6" fill="#fff">prefill pool</text><text x="129" y="37" text-anchor="middle" font-size="5.5" fill="#cdd">compute-heavy GPUs</text>
  <rect x="86" y="62" width="86" height="24" rx="3" fill="#a03050"/><text x="129" y="74" text-anchor="middle" font-size="6" fill="#fff">decode pool</text><text x="129" y="83" text-anchor="middle" font-size="5.5" fill="#fbd8e0">memory-heavy GPUs</text>
  <rect x="250" y="42" width="60" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="280" y="55" text-anchor="middle" font-size="6">stream out</text>
  <path d="M56 50 L84 30" stroke="#888" marker-end="url(#dd)"/>
  <path d="M172 28 L200 28 Q216 28 216 50 L216 66 Q216 74 172 74" fill="none" stroke="#a03050" marker-end="url(#dd2)"/><text x="240" y="24" font-size="5.5" fill="#a03050">KV cache transfer →</text>
  <path d="M172 74 L248 55" stroke="#888" marker-end="url(#dd)"/>
  <defs><marker id="dd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker><marker id="dd2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- A request prefills on the prefill pool; its **KV cache is transferred** to a decode pool GPU, which streams the answer. Each pool batches only its own phase, so a long prefill never stalls anyone's decode, and TTFT and TPOT are tuned independently.
- **The cost is the KV transfer** — moving a request's cache between GPUs over the interconnect. Worth it at scale, where the phase interference it removes is larger than the transfer it adds; not worth it for small deployments, where two pools just fragment your GPUs.

:::note
Disaggregation is the natural end-state of the prefill/decode split: once you accept the two phases are different workloads, running them on the same hardware is a compromise, and separating them lets you scale and tune each to its own SLO. It is standard in the largest deployments (and the point of the vLLM production stack + LMCache, next page), overkill for a two-GPU service.
:::
