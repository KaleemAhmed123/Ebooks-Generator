## Episodic memory

- **Episodic memory** stores *specific past events* — "on Tuesday the user asked me to refactor the auth module, and I did X." It is the agent's autobiography: individual experiences, timestamped, recallable when a similar situation arises.

<svg viewBox="0 0 360 86" role="img" aria-label="Episodic memory stores timestamped past events retrieved by similarity to the current situation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="20" y1="30" x2="230" y2="30" stroke="#888"/><g font-size="5.5" fill="#24405e"><circle cx="50" cy="30" r="3"/><text x="50" y="22" text-anchor="middle">Mon</text><circle cx="120" cy="30" r="3"/><text x="120" y="22" text-anchor="middle">Tue</text><circle cx="190" cy="30" r="3"/><text x="190" y="22" text-anchor="middle">Wed</text></g>
  <text x="120" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"refactored auth" event stored</text>
  <rect x="250" y="18" width="100" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="300" y="30" text-anchor="middle" font-size="6">now: similar task?</text><text x="300" y="40" text-anchor="middle" font-size="5.5">→ recall Tue's event</text>
  <path d="M230 30 L248 30" stroke="#888" marker-end="url(#ep)"/>
  <text x="180" y="72" text-anchor="middle" font-size="6" fill="#6b6b6b">retrieved by similarity: "how did I handle this last time?"</text>
  <defs><marker id="ep" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How it is stored and used:** each event (a task, an outcome, a lesson) is written to a store, usually **embedded** so it is retrievable by similarity. When the agent faces a new situation, it searches for *similar past episodes* and pulls them into context — "last time a test failed like this, I checked the imports."
- **Why it matters for agents:** it enables **few-shot learning from experience**. An agent that recalls how it solved a similar problem before is faster and more reliable than one starting cold each time. Successful trajectories become examples; failures become warnings (the Reflexion idea, persisted across sessions).
- Episodic memory is *particular* — concrete events with time and context. That distinguishes it from semantic memory (next), which is the *general* knowledge distilled from many episodes.

:::interview
**"What is episodic memory in an agent, and how is it stored?"** It holds specific past experiences — this task, this outcome, this lesson — as discrete, usually timestamped events, typically embedded so they're retrievable by similarity. When the agent hits a new situation it recalls similar past episodes ("how did I handle this before?") and uses them as few-shot guidance. It's the autobiography layer, distinct from semantic memory's distilled general facts; successful episodes become examples and failed ones become cautions.
:::
