## Blackboard and shared memory

- The **blackboard** pattern (another classical MAS idea) coordinates agents through a **shared workspace** instead of direct messages. Agents read the current state, contribute what they can, and the solution emerges on the shared board — like specialists collaborating around a physical whiteboard.

<svg viewBox="0 0 360 96" role="img" aria-label="Multiple specialist agents read from and write to a shared blackboard that accumulates the solution" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="100" y="16" width="160" height="34" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="30" text-anchor="middle" font-size="6.5">blackboard (shared state)</text><text x="180" y="43" text-anchor="middle" font-size="5.5" fill="#6b6b6b">facts · partial results · plan</text>
  <circle cx="60" cy="78" r="13" fill="#24405e"/><circle cx="140" cy="80" r="13" fill="#24405e"/><circle cx="220" cy="80" r="13" fill="#24405e"/><circle cx="300" cy="78" r="13" fill="#24405e"/>
  <g stroke="#888"><path d="M64 66 L110 50" marker-end="url(#bb)"/><path d="M140 67 L150 52" marker-end="url(#bb)"/><path d="M220 67 L210 52" marker-end="url(#bb)"/><path d="M296 66 L250 50" marker-end="url(#bb)"/></g>
  <defs><marker id="bb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How it works:** a shared data structure (the blackboard) holds the evolving problem state — known facts, partial solutions, the current plan. Agents watch it; when one sees something it can act on, it contributes its piece (adds a fact, refines a sub-solution). No agent needs to know about the others directly — they coordinate entirely through the shared state. A control component may decide which agent acts next.
- **Why it scales and decouples:** agents are independent — you can add or remove one without rewiring, and they need not address each other (16-04). It suits problems solved by *incremental contribution from diverse specialists* — each adding what it knows until the board holds the answer.
- **In LLM systems:** the blackboard is often a shared document, a scratchpad in the state (LangGraph state, 14-45, is a blackboard), or a shared memory store (14-56) all agents read/write. A shared "research notes" doc that multiple research agents append to is a blackboard.
- **The catch — concurrency.** When several agents write the shared state at once, you get races and conflicts (two agents editing the same field). You need concurrency control — reducers that merge safely (14-45), locks, or a turn-based controller — or the board corrupts.

:::interview
"What is the blackboard pattern and when does it fit?"

Agents coordinate through a *shared workspace* rather than direct messages: the blackboard holds the evolving problem state (facts, partial results, the plan), agents watch it and each contributes the piece it can, and the solution accumulates on the board. It fits problems solved by incremental contributions from diverse specialists, and it decouples agents (add/remove one without rewiring, no direct addressing) so it scales. The main risk is concurrency — simultaneous writes race and conflict — so you need safe merging (reducers), locking, or a turn controller. In LLM systems the shared graph state or a shared doc *is* the blackboard.
:::
