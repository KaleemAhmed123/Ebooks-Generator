## Parallel swarms and map-reduce

- The simplest and often most valuable multi-agent pattern: **fan out** a task to many agents working in parallel, then **fan in** their results. It is **map-reduce** (the classic distributed-computing pattern) applied to agents, and it is where multi-agent parallelism pays most cleanly.

<svg viewBox="0 0 360 96" role="img" aria-label="One task splits to many parallel worker agents whose results are combined by a reducer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="40" width="56" height="20" rx="3" fill="#24405e"/><text x="42" y="53" text-anchor="middle" fill="#fff">split (map)</text>
  <g fill="#6a9bd0"><rect x="110" y="16" width="70" height="16" rx="2"/><rect x="110" y="42" width="70" height="16" rx="2"/><rect x="110" y="68" width="70" height="16" rx="2"/></g>
  <text x="145" y="27" text-anchor="middle" fill="#fff" font-size="5.5">agent 1</text><text x="145" y="53" text-anchor="middle" fill="#fff" font-size="5.5">agent 2</text><text x="145" y="79" text-anchor="middle" fill="#fff" font-size="5.5">agent 3</text>
  <rect x="230" y="40" width="60" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="260" y="53" text-anchor="middle">reduce</text>
  <rect x="308" y="40" width="44" height="20" rx="3" fill="#24405e"/><text x="330" y="53" text-anchor="middle" fill="#fff">result</text>
  <g stroke="#888"><path d="M70 46 L108 24" marker-end="url(#ps2)"/><path d="M70 50 L108 50" marker-end="url(#ps2)"/><path d="M70 54 L108 76" marker-end="url(#ps2)"/><path d="M180 24 L228 46" marker-end="url(#ps2)"/><path d="M180 50 L228 50" marker-end="url(#ps2)"/><path d="M180 76 L228 54" marker-end="url(#ps2)"/><path d="M290 50 L306 50" marker-end="url(#ps2)"/></g>
  <defs><marker id="ps2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Map** — split the task into independent chunks and dispatch each to its own agent, all running **concurrently**. Research 20 companies (one agent each), review 50 files (one agent each), summarize 100 documents (one agent each).
- **Reduce** — combine the parallel results into the final output — concatenate, merge, rank, or synthesize (a reducer agent, or code).
- **Why it is the cleanest win:** the chunks are *genuinely independent*, so there is **no coordination overhead** (16-01) — agents do not talk to each other, only to the splitter and reducer. You get near-linear speedup (20 agents ≈ 20× faster than one doing them sequentially) with none of the emergent-failure risk of interacting agents. This is multi-agent at its safest and most effective.
- **The requirements:** the task must genuinely decompose into independent parts (16-02), and you need infrastructure to run many agents concurrently (16-32) and to handle partial failures (one chunk's agent fails — retry it, do not fail the whole batch).

:::interview
"What's the safest, most effective multi-agent pattern, and why?"

Parallel map-reduce: fan a task out to many agents working on *independent* chunks concurrently, then fan their results back in via a reducer. It's the cleanest win because the chunks are genuinely independent, so there's zero inter-agent coordination — none of the emergent-failure, looping, or miscommunication risk of interacting agents — while you get near-linear speedup. It requires that the task actually decomposes into independent parts and infrastructure to run agents concurrently and retry failed chunks. When a task fits this shape (research N items, review N files), it's almost always the right multi-agent choice.
:::
