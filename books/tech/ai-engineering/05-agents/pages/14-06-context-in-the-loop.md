## Context management in the loop

- Every loop turn resends the whole transcript. Left alone, it grows until it hits the context limit or costs a fortune — a long agent run can spend most of its tokens re-reading its own history. **Context management** is keeping the working set small without losing what matters.

<svg viewBox="0 0 360 96" role="img" aria-label="As turns accumulate, context grows; trimming, summarizing, and offloading keep it bounded" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g fill="#6a9bd0"><rect x="20" y="60" width="16" height="16"/><rect x="20" y="44" width="16" height="16"/><rect x="40" y="60" width="16" height="16"/><rect x="40" y="44" width="16" height="16"/><rect x="40" y="28" width="16" height="16"/><rect x="60" y="60" width="16" height="16"/><rect x="60" y="44" width="16" height="16"/><rect x="60" y="28" width="16" height="16"/><rect x="60" y="12" width="16" height="16"/></g>
  <text x="48" y="90" text-anchor="middle" font-size="6" fill="#a03050">grows every turn →</text>
  <text x="120" y="46" font-size="7">→</text>
  <rect x="150" y="20" width="90" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="195" y="33" text-anchor="middle" font-size="6">summarize old turns</text>
  <rect x="150" y="44" width="90" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="195" y="57" text-anchor="middle" font-size="6">trim/prune stale</text>
  <rect x="150" y="68" width="90" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="195" y="81" text-anchor="middle" font-size="6">offload to memory</text>
  <rect x="270" y="40" width="80" height="24" rx="3" fill="#24405e"/><text x="310" y="55" text-anchor="middle" fill="#fff" font-size="6">small live context</text>
</svg>

- **The techniques, cheapest first:**
  - **Trim / prune.** Drop stale content — a giant tool result from ten turns ago the model no longer needs. Keep the goal, recent turns, and key facts.
  - **Summarize.** Compress old turns into a short running summary ("so far: found Paris, pop 2.1M, computing…"). Trades detail for space.
  - **Offload to memory.** Move information out of the prompt into an external store the agent can *retrieve* when needed (the memory cluster, next) — the context holds a pointer, not the payload.
  - **Structured scratchpad.** Keep a compact state object (current plan, findings) instead of the raw message log.
- **Why it is load-bearing:** context is a *scarce, re-billed* resource. A well-managed agent keeps a lean working set and remembers the rest externally — which is exactly what the memory architectures ahead formalize.

:::note
"Context engineering" is becoming the core agent skill (Booklet 4 introduced the term). An agent's competence is bounded by what is in its context *now*, and that space is small and expensive. The art is curating it — right facts in, stale bulk out — turn after turn. The memory cluster next is this problem solved systematically; frameworks like LangGraph provide the machinery.
:::
