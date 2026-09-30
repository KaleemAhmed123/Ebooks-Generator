## The batching problem

- A GPU serving one request at a time is mostly idle — decode is memory-bound, so the math units starve while weights stream in. **Batching** many requests amortises that weight read across many tokens, and is the single biggest throughput lever in serving.
- But LLM requests are ragged: they arrive at different times and finish at wildly different lengths. Naive batching wastes most of the win.

<svg viewBox="0 0 360 112" role="img" aria-label="Static batching wastes GPU when short requests finish early; continuous batching backfills finished slots with new requests" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#a03050">static batch — wait for the slowest</text>
  <g><rect x="20" y="18" width="70" height="10" fill="#a03050"/><rect x="20" y="30" width="30" height="10" fill="#a03050"/><rect x="50" y="30" width="40" height="10" fill="#f0d0d8"/><rect x="20" y="42" width="50" height="10" fill="#a03050"/><rect x="70" y="42" width="20" height="10" fill="#f0d0d8"/></g>
  <text x="150" y="37" font-size="5.5" fill="#a03050">pink = GPU idle, slot done but stuck</text>
  <text x="90" y="70" text-anchor="middle" font-size="6.5" fill="#1a3a2a">continuous batch — backfill immediately</text>
  <g><rect x="20" y="76" width="70" height="10" fill="#1a3a2a"/><rect x="20" y="88" width="30" height="10" fill="#1a3a2a"/><rect x="50" y="88" width="40" height="10" fill="#6a9bd0"/><rect x="20" y="100" width="50" height="10" fill="#1a3a2a"/><rect x="70" y="100" width="20" height="10" fill="#6a9bd0"/></g>
  <text x="150" y="95" font-size="5.5" fill="#1a3a2a">blue = new request drops into freed slot</text>
</svg>

- **Static (request-level) batching** groups N requests, runs them together, and cannot release the batch until the *slowest* finishes. A 20-token reply is held hostage by a 2,000-token one — the GPU idles on finished slots.
- **Continuous (iteration-level) batching** schedules at every *token step*: the moment a request finishes, its slot is refilled with a waiting request. The GPU stays full. This is the innovation that made vLLM, and it is now table stakes.

:::note
Continuous batching is why LLM serving throughput jumped several-fold without new hardware. It works *because* of the prefill/decode split: decode steps are uniform and interruptible, so the scheduler can mix tokens from dozens of requests in one forward pass and swap membership every step. Static batching treated a request as an indivisible unit; continuous batching treats a **token step** as the unit.
:::
