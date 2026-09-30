## The four inference metrics

- Chat serving has its own vocabulary because latency is not one number — a response *streams*, so users feel two different delays. Get these four terms exact; interviewers use them precisely.

<svg viewBox="0 0 360 96" role="img" aria-label="Timeline showing TTFT to first token then TPOT between each subsequent token, with total end-to-end latency" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="20" y1="40" x2="340" y2="40" stroke="#888"/>
  <line x1="20" y1="34" x2="20" y2="46" stroke="#1a1a1a"/><text x="20" y="30" text-anchor="middle" font-size="6">request</text>
  <line x1="120" y1="34" x2="120" y2="46" stroke="#24405e" stroke-width="1.5"/><text x="120" y="30" text-anchor="middle" font-size="6" fill="#24405e">token 1</text>
  <g stroke="#a03050"><line x1="160" y1="36" x2="160" y2="44"/><line x1="200" y1="36" x2="200" y2="44"/><line x1="240" y1="36" x2="240" y2="44"/><line x1="280" y1="36" x2="280" y2="44"/></g>
  <path d="M20 58 L120 58" stroke="#24405e" marker-start="url(#m1)" marker-end="url(#m1)"/><text x="70" y="70" text-anchor="middle" font-size="6" fill="#24405e">TTFT (prefill)</text>
  <path d="M160 22 L200 22" stroke="#a03050" marker-start="url(#m2)" marker-end="url(#m2)"/><text x="180" y="16" text-anchor="middle" font-size="6" fill="#a03050">TPOT / ITL</text>
  <path d="M20 84 L280 84" stroke="#888" marker-start="url(#m3)" marker-end="url(#m3)"/><text x="150" y="94" text-anchor="middle" font-size="6" fill="#6b6b6b">end-to-end latency</text>
  <defs><marker id="m1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,3 L6,0 L6,6 Z" fill="#24405e"/></marker><marker id="m2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,3 L6,0 L6,6 Z" fill="#a03050"/></marker><marker id="m3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,3 L6,0 L6,6 Z" fill="#888"/></marker></defs>
</svg>

- **TTFT** — Time To First Token. How long until the response *starts*. Set by prefill, so it grows with prompt length. This is the "is it alive?" delay users feel most.
- **TPOT** — Time Per Output Token (also **ITL**, Inter-Token Latency). The gap between streamed tokens. Set by decode; roughly constant. Determines how fast the text *reads*.
- **Throughput** — total tokens/second across all concurrent requests. The server-side number that drives cost-per-token.
- **End-to-end latency** ≈ TTFT + (output_tokens × TPOT). The full wait for a complete answer.

:::note
TTFT and throughput **fight each other**. Packing more requests into each batch raises throughput but slows every user's TPOT and TTFT; serving one user at a time gives them the best latency and wastes the GPU. Every serving decision is a point on that curve — which is exactly why a single metric that captures *both* is needed. That metric is **goodput**, next page.
:::
