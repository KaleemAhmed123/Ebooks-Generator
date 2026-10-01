## How do you give an agent useful long-term memory?

- The context window can't hold everything, so long-term memory lives **outside** it and is pulled in on demand.
- Mechanisms:
  - **Vector memory** — embed past interactions/facts, retrieve the most relevant at each turn (RAG over the agent's own history). Simple, scalable.
  - **Summarisation / compaction** — periodically compress old turns into a running summary so the gist survives without the tokens (used by MemGPT-style virtual context).
  - **Structured memory** — write facts to a key-value or graph store (user preferences, entities) and query it explicitly.
  - **Managed memory layers** (e.g. mem0, Letta/MemGPT) automate extract→store→retrieve. [VERIFY: current memory tools.]
- The hard parts: **what to write** (not everything — noise hurts retrieval), **when to retrieve** and how much, and **conflict/stale handling** (update or supersede old facts).
- Interview framing: long-term memory is a **retrieval problem over a curated store**, not a bigger context window.

:::interview
What's really being tested: that durable memory = external store + retrieval (vector/summary/structured), and awareness of the curation problems — what to write, staleness, retrieval relevance.
:::
