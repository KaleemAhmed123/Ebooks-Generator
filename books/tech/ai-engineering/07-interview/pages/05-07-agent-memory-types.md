## What kinds of memory does an agent need?

- "Memory" is several different things; conflating them is a common mistake.
  - **Short-term / working memory** — the current context window: the running conversation and recent tool results. Limited and volatile.
  - **Long-term memory** — persisted across sessions, stored outside the context and retrieved when relevant. Subtypes borrowed from cognitive science:
    - **Episodic** — specific past events/interactions ("last time the user asked X").
    - **Semantic** — facts/knowledge the agent has accumulated (user preferences, domain facts).
    - **Procedural** — learned skills/how-to (reusable routines, e.g. Voyager's skill library).
- The engineering problem: the context window is small and expensive, so you **store** most memory externally and **retrieve** the relevant slice into context each turn (usually via embeddings + a store).
- Context ≠ memory: what's in the window now is working memory; durable memory is the retrieval system around it.

:::interview
What's really being tested: that you distinguish short-term context from persisted long-term memory, name episodic/semantic/procedural, and frame the real task as store-externally-retrieve-relevant.
:::
