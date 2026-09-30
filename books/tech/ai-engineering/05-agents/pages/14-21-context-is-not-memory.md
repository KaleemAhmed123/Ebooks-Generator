## The context window is not memory

- A tempting shortcut, now that context windows reach hundreds of thousands or millions of tokens: just paste everything in and skip memory engineering. It fails for reasons worth naming, because the mistake is common.

<svg viewBox="0 0 360 92" role="img" aria-label="Even a huge context degrades: cost, latency, and lost-in-the-middle attention loss" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="18" width="320" height="24" rx="3" fill="#f4f4f4" stroke="#888"/><text x="30" y="33" font-size="6">huge context: [relevant] … 200k tokens of history … [relevant]</text>
  <path d="M60 42 L60 56" stroke="#a03050" marker-end="url(#cn)"/><path d="M320 42 L320 56" stroke="#a03050" marker-end="url(#cn)"/>
  <text x="180" y="66" text-anchor="middle" font-size="6" fill="#a03050">edges attended well; the middle is under-read ("lost in the middle")</text>
  <text x="180" y="82" text-anchor="middle" font-size="6" fill="#6b6b6b">+ every token re-billed every turn, + slower prefill</text>
  <defs><marker id="cn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **Cost.** Every token in context is re-processed and re-billed on *every* turn. A 200k-token context on a 30-turn agent run is astronomically more expensive than retrieving the 2k relevant tokens each turn.
- **Latency.** Prefill (processing the prompt) scales with context length. A giant context makes every turn slow, before the model writes a word.
- **Lost in the middle.** Models attend best to the *start* and *end* of a long context; information in the middle is under-used (Booklet 3's long-context evaluation). A key fact buried at token 90,000 may be effectively ignored.
- **No persistence.** A long context still vanishes when the session ends. It does nothing for cross-session memory.

- So a big context window **raises the ceiling** of short-term memory but does not replace real memory. The discipline is the opposite of "paste everything": keep context *lean and relevant*, and lean on retrieval for the rest.

:::warn
"We have a million-token context, we don't need a memory system" is a costly misconception. Long context is a tool for a single large task (a whole codebase, a long document), not a substitute for durable, retrievable memory. Stuffing history into context wastes money, slows every turn, buries key facts, and still forgets everything at session end. Retrieve what's relevant; don't hoard what isn't.
:::
