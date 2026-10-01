## LangGraph: state

- **State** is the object that flows through the graph — the agent's working memory for a run. Every node reads it and returns updates to it. You define its shape as a typed dictionary. **[VERIFY current API]**

:::mint
```python
from typing import Annotated, TypedDict
from langgraph.graph import add_messages

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]   # a REDUCER (see below)
    step_count: int                            # plain field: replaced on update
```
:::

- **A node returns a partial update, not the whole state.** A node that returns `{"step_count": 3}` updates only that field; everything else is untouched. This keeps nodes focused and composable — each touches only what it owns.
- **Reducers decide how updates merge.** By default a returned field *replaces* the old value. But `messages` uses the `add_messages` **reducer** (the `Annotated[list, add_messages]` part), which *appends* new messages instead of overwriting — so the conversation grows rather than resets. A reducer is a function saying "given the old value and the update, produce the new value."

<svg viewBox="0 0 360 76" role="img" aria-label="A node returns a partial update; the reducer merges it into state, appending messages" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="26" width="80" height="24" rx="3" fill="#f4f4f4" stroke="#888"/><text x="50" y="41" text-anchor="middle" font-size="6">old state</text>
  <rect x="120" y="26" width="90" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="165" y="38" text-anchor="middle" font-size="6">node returns</text><text x="165" y="47" text-anchor="middle" font-size="5.5">{messages:[new]}</text>
  <rect x="250" y="24" width="60" height="28" rx="3" fill="#a03050"/><text x="280" y="42" text-anchor="middle" fill="#fff" font-size="6">reducer</text>
  <rect x="320" y="26" width="34" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="337" y="41" text-anchor="middle" font-size="6">new</text>
  <path d="M90 38 L118 38" stroke="#888" marker-end="url(#lgs)"/><path d="M210 38 L248 38" stroke="#888" marker-end="url(#lgs)"/><path d="M310 38 L318 38" stroke="#888" marker-end="url(#lgs)"/>
  <defs><marker id="lgs" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- Why this matters: state + reducers are how LangGraph turns the agent loop's growing `messages` list (14-03) into something *managed*. Parallel nodes both returning `messages` merge correctly via the reducer instead of clobbering each other — the foundation for the persistence and multi-agent features ahead.

:::interview
"What is a reducer in LangGraph and why does `messages` need one?"

A reducer defines how a node's returned update merges into existing state. By default a field is replaced. `messages` uses the `add_messages` reducer so new messages **append** to the history instead of overwriting it — essential because the conversation must accumulate across turns, and because parallel nodes both adding messages must merge, not clobber. Reducers are how LangGraph makes state updates composable and safe.
:::
