## Semantic memory

- **Semantic memory** stores *general facts and knowledge*, stripped of when or how they were learned — "the user's name is Sam," "this codebase uses pytest," "the API rate limit is 100/min." It is the distilled truth an agent knows, not the events it experienced.

<svg viewBox="0 0 360 88" role="img" aria-label="Many episodes distill into durable semantic facts the agent knows" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g fill="#f4f4f4" stroke="#888" font-size="5.5"><rect x="14" y="18" width="84" height="14" rx="2"/><rect x="14" y="36" width="84" height="14" rx="2"/><rect x="14" y="54" width="84" height="14" rx="2"/></g><text x="56" y="28" text-anchor="middle" font-size="5">"asked in Python again"</text><text x="56" y="46" text-anchor="middle" font-size="5">"Python again"</text><text x="56" y="64" text-anchor="middle" font-size="5">"prefers Python"</text>
  <text x="130" y="45" font-size="7">→ distill →</text>
  <rect x="200" y="30" width="150" height="26" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="275" y="46" text-anchor="middle" font-size="6.5">fact: "user prefers Python"</text>
  <text x="56" y="82" text-anchor="middle" font-size="5.5" fill="#6b6b6b">episodes</text>
</svg>

- **How it differs from episodic:** episodic = "on Tuesday the user asked for Python" (an event); semantic = "the user prefers Python" (a fact). Semantic memory is what you get when you **distill** many episodes into a durable generalization — often the job of sleep-time consolidation (14-24).
- **Storage:** semantic facts fit naturally into **memory blocks** (the `human` block), a key-value store, or a knowledge graph (entities and relations). They are usually small and precise, so they can live *directly in context* rather than needing retrieval — you just keep the user's facts loaded.
- **Why both types:** an agent needs episodic ("how did I do this before?") *and* semantic ("what do I know to be true?"). They answer different questions and are retrieved differently — semantic by lookup/key, episodic by similarity.

:::note
The episodic/semantic split (from human cognitive science) is a genuinely useful design tool. Ask of any memory: *is this a specific event or a general fact?* Events → episodic store, retrieved by similarity, used as examples. Facts → semantic store or memory blocks, kept precise and current, often held directly in context. Mixing them (dumping raw events where you need facts) is a common cause of bloated, imprecise agent memory.
:::
