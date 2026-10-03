## A2A: Agent Cards, tasks, artifacts

- Three concepts run A2A: discovery via an **Agent Card**, work as a **task**, and results as **artifacts**.

<svg viewBox="0 0 360 104" role="img" aria-label="A client agent reads a remote agent's card, sends a task, and receives artifacts with status updates" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="40" width="70" height="28" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="45" y="57" text-anchor="middle" font-size="6.5">client agent</text>
  <rect x="280" y="40" width="70" height="28" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="315" y="57" text-anchor="middle" font-size="6.5">remote agent</text>
  <path d="M80 46 L278 46" stroke="#888" marker-end="url(#ac)"/><text x="180" y="42" text-anchor="middle" font-size="6">GET /.well-known/agent card → skills</text>
  <path d="M80 58 L278 58" stroke="#888" marker-end="url(#ac)"/><text x="180" y="54" text-anchor="middle" font-size="6">send task ("book a visa appt")</text>
  <path d="M278 80 L80 80" stroke="#888" marker-end="url(#ac)"/><text x="180" y="94" text-anchor="middle" font-size="6">status updates + artifacts (result files)</text>
  <defs><marker id="ac" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Agent Card** — a JSON document at a well-known URL advertising the agent: its name, what **skills** it offers, its endpoint, and how to authenticate. Discovery is "fetch the card" — like a `robots.txt` for agents. A client reads cards to decide whom to delegate to.
- **Task** — the unit of work. The client sends a task; the remote agent works on it, possibly for a long time, sending **status updates** (submitted → working → input-required → completed). Because it is task-based (not request/response), A2A natively handles long-running, asynchronous delegation.
- **Artifacts** — the outputs a task produces: text, files, structured data. A task can stream multiple artifacts (a report, then its charts). Messages within a task carry the back-and-forth (including the peer asking for clarification — the `input-required` state).

:::interview
"How does one agent discover and delegate to another in A2A?"

It fetches the other agent's **Agent Card** (JSON at a well-known URL) to learn its skills, endpoint, and auth. It then opens a **task** and sends it; the remote agent works asynchronously, emitting status updates and, if it needs more info, an `input-required` state, and returns results as **artifacts**. The task model — not simple request/response — is what lets delegation be long-running and interactive across organizational boundaries.
:::
