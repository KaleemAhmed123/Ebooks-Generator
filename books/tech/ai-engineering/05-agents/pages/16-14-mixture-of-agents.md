## Mixture-of-Agents

- **Mixture-of-Agents (MoA)** (2024) is a concrete, strong Society-of-Mind architecture: layers of agents where each layer's agents read *all* the previous layer's outputs and refine them, producing a final answer better than any single model — even beating larger models by combining smaller ones. **[VERIFY]**

<svg viewBox="0 0 360 96" role="img" aria-label="Layered agents where each layer reads all prior outputs and refines, aggregated into a final answer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="40" y="14" text-anchor="middle" font-size="5.5" fill="#6b6b6b">layer 1</text>
  <g fill="#6a9bd0"><rect x="16" y="18" width="48" height="16" rx="2"/><rect x="16" y="40" width="48" height="16" rx="2"/><rect x="16" y="62" width="48" height="16" rx="2"/></g>
  <text x="150" y="14" text-anchor="middle" font-size="5.5" fill="#6b6b6b">layer 2 (reads all)</text>
  <g fill="#24405e"><rect x="126" y="18" width="48" height="16" rx="2"/><rect x="126" y="40" width="48" height="16" rx="2"/><rect x="126" y="62" width="48" height="16" rx="2"/></g>
  <rect x="250" y="38" width="90" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="295" y="52" text-anchor="middle" font-size="6">aggregator</text>
  <g stroke="#bbb"><line x1="64" y1="26" x2="126" y2="26"/><line x1="64" y1="26" x2="126" y2="48"/><line x1="64" y1="48" x2="126" y2="26"/><line x1="64" y1="48" x2="126" y2="70"/><line x1="64" y1="70" x2="126" y2="48"/></g>
  <g stroke="#888"><line x1="174" y1="26" x2="248" y2="46"/><line x1="174" y1="48" x2="248" y2="48"/><line x1="174" y1="70" x2="248" y2="52"/></g>
</svg>

- **The architecture:** in each **layer**, several "proposer" agents independently answer the query. The next layer's agents receive *all* of the previous layer's responses as context and **synthesize/refine** them into improved answers. After a few layers, an **aggregator** produces the final response. Each layer builds on the collective wisdom of the last — like the transformer's own layer stacking, but over whole agents.
- **The striking result:** MoA of several *open, smaller* models can **outperform a single much larger model** on quality benchmarks. The collaboration extracts more than the sum — different models have different strengths, and layered refinement combines them, plus each layer catches the previous layer's errors.
- **The tradeoff:** it is *expensive and slow* — many model calls across layers, in sequence. It buys quality with latency and cost, so it fits offline or quality-critical tasks, not real-time. It is the highest-quality end of the Society-of-Mind spectrum, and the clearest demonstration that *structured collaboration* is a real capability lever, not just redundancy.

:::interview
"What is Mixture-of-Agents and why is it notable?"

A layered multi-agent architecture: in each layer several proposer agents answer the query, and the next layer reads *all* prior responses and refines them, with a final aggregator producing the answer — collective wisdom compounding across layers. It's notable because a MoA of several *smaller* models can beat a single much *larger* model on quality, since different models have complementary strengths and each layer corrects the previous one's errors. The catch is cost and latency (many sequential calls), so it fits offline or quality-critical work. It's strong evidence that structured collaboration — not just redundancy — is a genuine capability lever.
:::
