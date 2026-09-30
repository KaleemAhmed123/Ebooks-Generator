## Memory: a worked example

- Trace a personal coding assistant across two sessions to see the types work together. **[VERIFY — illustrative]**

:::mint
```text
── Session 1 (Monday) ──────────────────────────────
User: "Hi, I'm Sam. Building a CLI in Python. Use pytest."
  → semantic: human block ← {name: Sam, lang: Python, tests: pytest}
User: "The auth module keeps failing on token expiry."
  → [agent debugs, fixes it]
  → episodic: store event {task: fix auth token expiry, solution: …}
  → sleep-time job: consolidate session → clean facts + summary

── Session 2 (Thursday, new session, model remembers nothing) ──
  → load semantic (human block): "Sam, Python, pytest" into context
User: "Auth is broken again."
  → vector-search episodic: finds Monday's "auth token expiry" event
  → inject: "Last time this was a token-expiry bug; you fixed it by …"
Agent: "This looks like the token-expiry issue from Monday. Checking…"
```
:::

- **Watch each type do its job:**
  - **Semantic** (the `human` block) is loaded every session — the agent always knows Sam uses Python and pytest, no search needed (key lookup).
  - **Episodic** stores the specific debugging event, retrieved by **vector similarity** when a similar problem recurs.
  - **Sleep-time** consolidation (14-24) between sessions turns the raw Monday transcript into clean facts and a summary.
  - The stateless model in Session 2 **appears to remember** — because the right memories were retrieved and injected, not because the model recalled anything.

:::note
This is the whole cluster in one flow: short-term (the live session) plus long-term (semantic facts + episodic events), consolidated in the background, retrieved by the method that fits (key for identity, vector for past problems), and injected into a stateless model to simulate continuity. Every production "assistant that remembers you" is some version of this pipeline.
:::
