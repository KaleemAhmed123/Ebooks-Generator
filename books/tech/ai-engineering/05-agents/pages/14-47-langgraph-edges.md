## LangGraph: edges and conditional edges

- **Edges** connect nodes — they define what runs next. A normal edge is unconditional ("after `act`, always `think`"). A **conditional edge** branches based on the state, which is how the agent *loops* and *decides*.

:::mint
```python
from langgraph.graph import START, END

graph.add_edge(START, "think")          # entry point
graph.add_edge("act", "think")          # after acting, think again

def should_continue(state) -> str:      # a router function
    last = state["messages"][-1]
    return "act" if last.tool_calls else END

graph.add_conditional_edges("think", should_continue, ["act", END])
```
:::

- **`START` and `END`** are special nodes: `START` is where the graph begins, `END` where it stops. `add_edge(START, "think")` sets the entry; routing to `END` terminates the run (the graceful stop of 14-05).
- **The conditional edge is the brain of the loop.** After `think`, `should_continue` inspects the state: if the model requested tools, go to `act`; otherwise go to `END`. This single function is the whole "keep looping or finish?" decision, made explicit and testable — where a raw loop buries it in an `if`.

<svg viewBox="0 0 360 86" role="img" aria-label="From think, a conditional edge routes to act if tools were called, else to END" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <circle cx="70" cy="44" r="18" fill="#24405e"/><text x="70" y="47" text-anchor="middle" fill="#fff" font-size="6.5">think</text>
  <path d="M88 40 L150 24" stroke="#1a1a1a" marker-end="url(#lge)"/><text x="120" y="20" font-size="6" fill="#1a3a2a">tool_calls → act</text>
  <path d="M88 50 L150 66" stroke="#888" marker-end="url(#lge)"/><text x="120" y="78" font-size="6" fill="#6b6b6b">else → END</text>
  <circle cx="180" cy="22" r="16" fill="#6a9bd0"/><text x="180" y="25" text-anchor="middle" fill="#fff" font-size="6">act</text>
  <rect x="164" y="58" width="40" height="16" rx="3" fill="#1a3a2a"/><text x="184" y="69" text-anchor="middle" fill="#fff" font-size="6">END</text>
  <path d="M180 38 Q120 44 88 44" stroke="#c0392b" fill="none" marker-end="url(#lger)"/><text x="130" y="46" font-size="5" fill="#c0392b">loop back</text>
  <defs><marker id="lge" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker><marker id="lger" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

:::interview
"How does a LangGraph agent loop and know when to stop?"

With a conditional edge. After the model node, a router function inspects the state — if the last message has tool calls, it routes to the tool node (which loops back to the model); otherwise it routes to `END`. The loop and its exit are an explicit, testable function over state, not an implicit `while`. That explicitness is the point: you can see, test, and modify exactly when the agent continues versus finishes.
:::
