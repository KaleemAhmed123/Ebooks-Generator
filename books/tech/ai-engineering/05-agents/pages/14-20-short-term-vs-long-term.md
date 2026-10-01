## Short-term vs long-term memory

- The first split in every agent memory design: **short-term** (this session) vs **long-term** (across sessions). They live in different places and solve different problems.

<svg viewBox="0 0 360 104" role="img" aria-label="Short-term memory is the in-context conversation; long-term memory is an external store retrieved on demand" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="16" width="150" height="80" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="89" y="30" text-anchor="middle" font-size="7">short-term</text><text x="89" y="46" text-anchor="middle" font-size="6">= the context window</text><text x="89" y="60" text-anchor="middle" font-size="6">this session's messages</text><text x="89" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">fast, full detail, volatile</text><text x="89" y="88" text-anchor="middle" font-size="5.5" fill="#a03050">gone when session ends</text>
  <rect x="196" y="16" width="150" height="80" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="271" y="30" text-anchor="middle" font-size="7">long-term</text><text x="271" y="46" text-anchor="middle" font-size="6">= external store (DB)</text><text x="271" y="60" text-anchor="middle" font-size="6">facts across sessions</text><text x="271" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">retrieved when relevant</text><text x="271" y="88" text-anchor="middle" font-size="5.5" fill="#1a3a2a">survives forever</text>
</svg>

- **Short-term memory** *is* the context window — the current session's messages, tool results, and scratchpad. It is fast and fully detailed, but **volatile** (gone when the session ends) and **bounded** (the window limit). Managing it is the context-management of 14-06: trim, summarize, keep the working set lean.
- **Long-term memory** is an **external store** — a database, vector index, or knowledge graph — holding facts that must outlive a session: user preferences, past conversations, learned procedures. It is effectively unbounded and durable, but the model can only use what you **retrieve** back into context.
- **The interface between them is retrieval.** Long-term memory is useless until relevant pieces are pulled into short-term (the context) for a given turn. This is RAG (Booklet 4) pointed at the agent's own history instead of documents.

:::interview
"How does an agent remember a user across sessions when the model is stateless?"

Long-term memory. You persist facts (preferences, past events, learned info) in an external store keyed to the user. At the start of — or during — a session, you retrieve the relevant memories and inject them into the context (short-term memory), so the model *appears* to remember. The model itself still recalls nothing between calls; the "memory" is an external store plus retrieval, exactly like RAG applied to the user's own history.
:::
