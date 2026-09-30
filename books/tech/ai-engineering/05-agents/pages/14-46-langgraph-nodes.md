## LangGraph: nodes

- A **node** is a step in the graph: a plain function (or async function) that takes the current state and returns an update to it. A node can call the model, run a tool, transform data, or make a decision. Nodes are where *work* happens. **[VERIFY current API]**

:::mint
```python
def call_model(state: AgentState) -> dict:
    response = llm.invoke(state["messages"])   # the LLM call
    return {"messages": [response]}            # append via the reducer

def run_tools(state: AgentState) -> dict:
    last = state["messages"][-1]
    results = [execute(tc) for tc in last.tool_calls]
    return {"messages": results}

graph.add_node("think", call_model)            # register nodes by name
graph.add_node("act", run_tools)
```
:::

- **A node is just a function of state.** In → the current state; out → a partial update (merged by reducers, 14-45). That is the entire contract. Because a node is an ordinary function, you can unit-test it in isolation — pass a state, assert the update — which is a big reason LangGraph agents are testable where raw loops are not.
- **Nodes are named.** `add_node("think", call_model)` registers the function under a name; edges (next page) reference nodes by that name. The name is also what shows up in traces and the visual graph.
- **Nodes should be focused.** One node = one clear step (think, act, decide, summarize). Fine-grained nodes make the graph readable, the edges meaningful, and failures easy to localize — the opposite of one giant do-everything function.

:::note
The mental model: LangGraph is a **state machine** where nodes are the states' handlers and the state object is the data passed between them. If you have written a reducer-based UI (Redux) or a workflow engine, this is the same shape — pure-ish functions transforming a shared state, with the framework orchestrating who runs when. That familiarity is deliberate; it is a proven pattern for complex, inspectable control flow.
:::
