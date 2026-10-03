## LangGraph: building a graph (worked)

- Everything so far, assembled into a complete, runnable ReAct agent. This is the canonical LangGraph program.

:::mint
```python
from langgraph.graph import StateGraph, START, END, add_messages
from typing import Annotated, TypedDict

class State(TypedDict):
    messages: Annotated[list, add_messages]

llm_with_tools = llm.bind_tools(tools)

def think(s): return {"messages": [llm_with_tools.invoke(s["messages"])]}
def act(s):   return {"messages": [run_tool(tc) for tc in s["messages"][-1].tool_calls]}
def route(s): return "act" if s["messages"][-1].tool_calls else END

g = StateGraph(State)
g.add_node("think", think);  g.add_node("act", act)
g.add_edge(START, "think")
g.add_conditional_edges("think", route, ["act", END])
g.add_edge("act", "think")
app = g.compile()                              # a runnable graph
app.invoke({"messages": [("user", "weather in Paris?")]})
```
:::

- **Read the assembly:** define state → bind tools → write `think`/`act` nodes → wire edges (`START`→think, think→act-or-END, act→think) → `compile()` → `invoke()`.
- **`compile()` makes the graph real.** It validates the graph and returns an object you can `invoke`, `stream` (14-54), or `resume` (with a checkpointer, 14-50). The same graph gains persistence, interrupts, and streaming by passing options — no rewrite.
- This ~20-line program is the 10-line loop of 14-03 made inspectable and extensible. The rest of the cluster is `compile()` options and structure over *this* skeleton.

:::note
You *built the ReAct agent by hand* here, in a few lines — worth internalizing before the next page's one-line prebuilt version, which is a wrapper over exactly this graph. Knowing the hand-built version means you can customize it (add nodes, change routing) when the prebuilt does not fit — which, in production, is often.
:::
