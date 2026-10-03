## LangGraph: the prebuilt ReAct agent

- Building the graph by hand (14-48) is the right first exercise; in practice, LangGraph ships a **prebuilt** ReAct agent so you skip the boilerplate for the common case.

:::mint
```python
from langgraph.prebuilt import create_react_agent

agent = create_react_agent(
    model=llm,
    tools=[get_weather, search],
    prompt="You are a helpful assistant.",     # optional system prompt
)

agent.invoke({"messages": [("user", "weather in Paris, times two people?")]})
```
:::

- **One call builds the whole think→act→loop graph** you wrote by hand — the nodes, the conditional edge, the reducer state. It returns the same kind of compiled graph, so it still supports checkpointers, streaming, interrupts, and everything ahead. The prebuilt is a *starting point*, not a walled garden.
- **When the prebuilt is enough:** a single agent that thinks, calls tools, and loops — the majority of agents. Reach for it first; drop to the hand-built graph only when you need custom nodes (a validation step, a summarizer, a human-approval node) or non-standard routing.
- **When to go custom:** anything the prebuilt loop does not express — multiple cooperating nodes, a plan-and-execute structure, a mid-loop guard, branching beyond think/act. Then you build the graph explicitly (14-48) and get full control.

:::interview
"Do you always hand-build a LangGraph agent?"

No — start with the prebuilt `create_react_agent` for the standard think-act-loop; it's the same graph you'd write by hand, minus the boilerplate, and it keeps all the persistence/streaming/interrupt features. Drop to an explicit `StateGraph` only when you need something the prebuilt loop can't express — extra nodes (validation, summarization, human approval), custom routing, or a non-ReAct structure like plan-and-execute. Knowing both means you use the shortcut when it fits and control the graph when it doesn't.
:::
