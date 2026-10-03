## OpenAI SDK: sessions and tracing

- Two more built-ins round out the SDK: **sessions** (memory) and **tracing** (observability), both on by default-ish so you get them without extra wiring.

### Sessions — automatic memory
- A **session** keeps conversation history across `Runner.run` calls, so the agent remembers earlier turns without you managing a message list. Pass the same session and the second turn sees the first — the short-term memory of 14-20, handled by the SDK (the equivalent of LangGraph's thread, 14-51).

:::mint
```python
from agents import Runner, SQLiteSession
session = SQLiteSession("user-42")            # persisted history
await Runner.run(assistant, "I'm Sam.", session=session)
await Runner.run(assistant, "What's my name?", session=session)  # → "Sam"
```
:::

### Tracing — observability built in
- The SDK **traces every run** — model calls, tool calls, handoffs, guardrail checks — as spans (13-43), viewable in a dashboard. You get the debuggability of 13-44 for free: see exactly what the agent did, where time and tokens went, and where a run failed.

<svg viewBox="0 0 360 50" role="img" aria-label="A trace shows the agent run with nested spans for tool calls and handoffs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="20" y="10" width="320" height="12" rx="2" fill="#24405e"/><text x="26" y="19" fill="#fff">trace: run</text>
  <rect x="40" y="26" width="120" height="10" rx="2" fill="#6a9bd0"/><text x="44" y="34" fill="#fff" font-size="5">tool: get_weather</text>
  <rect x="40" y="38" width="90" height="10" rx="2" fill="#a03050"/><text x="44" y="46" fill="#fff" font-size="5">handoff: billing</text>
</svg>

- **Why built-in tracing matters:** agents are hard to debug (14-53). Getting spans automatically — no instrumentation — lowers the barrier to actually seeing what your agent does, which is often the difference between fixing a problem and guessing.

:::note
Notice how much the minimal SDK gives you for free: a bounded loop, handoffs, guardrails, persisted sessions, and full tracing — the operational essentials, without configuration. That is the appeal of the "batteries-included-but-thin" design: the *concepts* are few, but each carries production-grade defaults. It is a strong default choice precisely because you do not have to assemble observability and memory yourself.
:::
