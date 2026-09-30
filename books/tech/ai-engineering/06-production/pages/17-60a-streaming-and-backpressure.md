## Streaming and backpressure

- Chat *streams* tokens as they generate, because a 3-second answer that appears word-by-word feels instant while the same answer delivered whole feels slow. The transport is usually **Server-Sent Events (SSE)** — a one-way HTTP stream of token deltas — or a WebSocket for two-way (voice, interruption).
- Streaming changes the failure model: the connection is open for the whole generation, so client disconnects, slow readers, and mid-stream errors all become things you must handle.

<svg viewBox="0 0 360 80" role="img" aria-label="Server streams token deltas over SSE; a client disconnect must stop generation to avoid wasting GPU" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="30" width="56" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="40" y="43" text-anchor="middle" font-size="6">GPU decode</text>
  <rect x="288" y="30" width="56" height="20" rx="3" fill="#f4f4f4" stroke="#888"/><text x="316" y="43" text-anchor="middle" font-size="6">client</text>
  <g fill="#24405e"><rect x="96" y="36" width="10" height="8"/><rect x="130" y="36" width="10" height="8"/><rect x="164" y="36" width="10" height="8"/><rect x="198" y="36" width="10" height="8"/></g>
  <text x="150" y="26" text-anchor="middle" font-size="5.5" fill="#24405e">SSE token deltas →</text>
  <path d="M232 40 L286 40" stroke="#888" marker-end="url(#st)"/>
  <path d="M316 50 Q316 66 60 66 Q40 66 40 52" fill="none" stroke="#a03050" stroke-dasharray="3 2" marker-end="url(#st2)"/><text x="180" y="76" text-anchor="middle" font-size="5.5" fill="#a03050">disconnect → cancel generation, stop billing GPU</text>
  <defs><marker id="st" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker><marker id="st2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **Client disconnects must cancel generation.** If a user closes the tab, the request must propagate a cancel to the engine and free the slot — otherwise you keep decoding tokens no one will read, burning GPU and holding KV cache. A serving stack that does not honour disconnects wastes a surprising fraction of capacity on abandoned streams.
- **Backpressure the other way, too.** A slow client (mobile, poor network) can read tokens slower than the GPU produces them; the server buffers, memory grows, and one slow reader ties up a slot. Bound the buffer and time out stalled streams.

:::note
Streaming is the difference between a chat product that feels alive and one that feels broken, so it is a functional requirement, not a nicety — which is why the API contract (17-60) exposes it directly. The two production disciplines it forces — **cancel on disconnect** to reclaim GPU, and **bound buffers** for slow readers — are exactly the details that separate a demo streaming endpoint from one that survives real, flaky clients at scale.
:::
