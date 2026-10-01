## LangGraph: checkpointers and persistence

- A **checkpointer** saves the graph's state **after every node**. This one feature unlocks most of what makes LangGraph production-grade: crash recovery, pause/resume, human-in-the-loop, and time travel. Add it at compile time. **[VERIFY current API]**

:::mint
```python
from langgraph.checkpoint.memory import MemorySaver   # dev
# from langgraph.checkpoint.postgres import PostgresSaver  # prod

app = g.compile(checkpointer=MemorySaver())

config = {"configurable": {"thread_id": "user-42"}}
app.invoke({"messages": [("user", "hi")]}, config)   # state saved per step
```
:::

- **What it does:** after each node runs, the checkpointer writes the full state to storage, tagged by a **`thread_id`**. The run becomes a series of saved snapshots, not an ephemeral in-memory loop.
- **Why that changes everything:**
  - **Crash recovery.** If the process dies mid-run, you resume from the last checkpoint instead of restarting — vital for long or costly agent runs.
  - **Pause and resume.** You can stop a run, return control to your app or a user, and continue later from the exact saved state (the basis of interrupts, 14-52).
  - **Durable conversations.** The `thread_id` persists a conversation across requests — the agent's short-term memory (next page) survives between calls without you managing it.

<svg viewBox="0 0 360 66" role="img" aria-label="After each node the state is checkpointed to storage, tagged by thread id" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <circle cx="40" cy="28" r="12" fill="#24405e"/><text x="40" y="31" text-anchor="middle" fill="#fff" font-size="6">n1</text>
  <circle cx="130" cy="28" r="12" fill="#24405e"/><text x="130" y="31" text-anchor="middle" fill="#fff" font-size="6">n2</text>
  <circle cx="220" cy="28" r="12" fill="#24405e"/><text x="220" y="31" text-anchor="middle" fill="#fff" font-size="6">n3</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="24" y="46" width="32" height="12" rx="2"/><rect x="114" y="46" width="32" height="12" rx="2"/><rect x="204" y="46" width="32" height="12" rx="2"/></g>
  <path d="M52 28 L118 28" stroke="#888" marker-end="url(#cp)"/><path d="M142 28 L208 28" stroke="#888" marker-end="url(#cp)"/>
  <path d="M40 40 L40 44" stroke="#1a3a2a"/><path d="M130 40 L130 44" stroke="#1a3a2a"/><path d="M220 40 L220 44" stroke="#1a3a2a"/>
  <text x="300" y="32" font-size="6" fill="#6b6b6b">saved snapshots</text>
  <defs><marker id="cp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

:::interview
"Why is a checkpointer such a big deal in LangGraph?"

Because saving state after every node turns an ephemeral loop into a durable, resumable process. That single capability gives you crash recovery (resume from the last snapshot, not from scratch), pause/resume, human-in-the-loop approvals, time-travel debugging, and per-`thread_id` durable conversations — all for free once the checkpointer is attached. In production you point it at a real store (Postgres) instead of the in-memory dev saver.
:::
