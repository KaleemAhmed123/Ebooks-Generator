## LlamaIndex: agents and workflows

- LlamaIndex offers both a high-level agent and a low-level **Workflows** system for control — the same convenience-vs-control pairing as the other frameworks. **[VERIFY current API]**

:::mint
```python
from llama_index.core.agent.workflow import FunctionAgent
from llama_index.core.tools import QueryEngineTool

docs_tool = QueryEngineTool.from_defaults(
    query_engine=engine,
    description="Answers questions about the product documentation.")

agent = FunctionAgent(tools=[docs_tool, calculator], llm=llm)
await agent.run("How many seats does the Pro plan include, times 3?")
```
:::

- **The high-level agent** (a function/tool-calling agent) runs the standard loop — think, pick a tool (a query engine or a function), observe, repeat — over the tools you give it. For most RAG-agent needs, this is all you write.
- **Workflows** is LlamaIndex's **event-driven** low-level framework: you define steps that emit and listen for **events**, and the framework routes between them. It is LlamaIndex's answer to LangGraph's graph — explicit, controllable orchestration for complex multi-step or multi-agent flows, with the data/retrieval machinery close at hand.
- **Why event-driven:** steps are decoupled — a step emits an event, and whichever step listens for it runs next. This makes branching, looping, and parallel flows composable, and complex RAG pipelines (retrieve → re-rank → check → maybe re-retrieve → synthesize) expressible as a graph of event handlers.

:::note
By now the meta-pattern is unmistakable: **every serious framework offers a high-level agent for the common case and a low-level, explicit orchestration layer for control** — LangGraph's graph, AutoGen's Core, CrewAI's Flows, LlamaIndex's Workflows. They differ in *center of gravity* (control, conversation, roles, data), not in whether they provide both levels. Choose by which center of gravity matches your problem, then use the high level until you must drop to the low.
:::
