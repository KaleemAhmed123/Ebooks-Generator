## Parallel tool calls

- When a turn needs several *independent* pieces of data, a good model requests them **all at once** — one assistant message with multiple `tool_use` blocks — instead of one at a time. You run them concurrently and return all results together.

<svg viewBox="0 0 360 104" role="img" aria-label="One model turn emits three tool calls run in parallel, results returned together" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="130" y="8" width="100" height="22" rx="4" fill="#24405e"/><text x="180" y="22" text-anchor="middle" fill="#fff" font-size="6.5">one model turn</text>
  <rect x="14" y="44" width="96" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="62" y="57" text-anchor="middle" font-size="6">weather(Paris)</text>
  <rect x="132" y="44" width="96" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="57" text-anchor="middle" font-size="6">weather(Tokyo)</text>
  <rect x="250" y="44" width="96" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="298" y="57" text-anchor="middle" font-size="6">weather(Lima)</text>
  <rect x="90" y="80" width="180" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="93" text-anchor="middle" font-size="6">3 tool_results returned together → model answers</text>
  <path d="M155 30 L62 42" stroke="#888" marker-end="url(#pa)"/><path d="M180 30 L180 42" stroke="#888" marker-end="url(#pa)"/><path d="M205 30 L298 42" stroke="#888" marker-end="url(#pa)"/>
  <path d="M62 64 L150 78" stroke="#888" marker-end="url(#pa)"/><path d="M180 64 L180 78" stroke="#888" marker-end="url(#pa)"/><path d="M298 64 L210 78" stroke="#888" marker-end="url(#pa)"/>
  <defs><marker id="pa" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why it matters: latency.** Three sequential weather calls are three round trips through the model (slow). Three parallel calls are **one** round trip — the model asks for all three, you fire them concurrently (async / thread pool), and reply once. For independent lookups this is a large speedup.
- **The rule:** parallelize only *independent* calls. If call B needs call A's result (get user id, then fetch their orders), they are sequential by nature — the model must see A's result before it can form B. Parallel is for siblings, not for a chain.
- Your code must run them concurrently and return **all** `tool_result` blocks in one user message, each matched by its `tool_use_id`. Return them one at a time and you have thrown away the benefit.

:::interview
**"How do you speed up an agent that makes many API calls?"** First, let the model batch independent calls into one parallel turn and run them concurrently — turning N round trips into one. Then cache repeated calls, and only chain calls that genuinely depend on each other. The biggest agent latency win is usually collapsing sequential-but-independent tool calls into a single parallel turn.
:::
