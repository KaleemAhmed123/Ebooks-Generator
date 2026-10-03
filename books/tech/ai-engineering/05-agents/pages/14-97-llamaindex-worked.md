## LlamaIndex: a worked RAG agent

- A knowledge assistant over two data sources, choosing between them and computing on results.

:::mint
```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.tools import QueryEngineTool
from llama_index.core.agent.workflow import FunctionAgent

policies = VectorStoreIndex.from_documents(
    SimpleDirectoryReader("./policies").load_data()).as_query_engine()
pricing  = VectorStoreIndex.from_documents(
    SimpleDirectoryReader("./pricing").load_data()).as_query_engine()

agent = FunctionAgent(tools=[
    QueryEngineTool.from_defaults(policies,
        description="Company policies: refunds, support, SLAs."),
    QueryEngineTool.from_defaults(pricing,
        description="Plan prices, seat limits, tiers."),
    calculator,
], llm=llm)

await agent.run("If a 5-seat Pro plan is refunded 40%, how much is returned?")
```
:::

- **Trace it:** the agent recognizes it needs pricing → queries the *pricing* engine for the Pro plan's price × 5 seats → then the *policies* engine to confirm refunds are allowed → then the `calculator` for the 40% → synthesizes the answer. It chose sources, retrieved, and computed — agentic RAG (14-94) end to end.
- **What made it work:** clear `description`s on each `QueryEngineTool` (so the agent picks the right source, 13-13) and separate indexes per corpus (so retrieval stays focused). The data machinery is LlamaIndex's; the agent loop is standard.

:::note
This example is the whole cluster's thesis: for a *data-centric* agent, the hard part is not the loop — every framework has that — it is **getting the right information out of your corpus reliably**, then reasoning over it. LlamaIndex front-loads that with mature connectors, indexes, retrievers, and re-rankers, so your agent stands on a solid retrieval foundation instead of a hand-rolled one. Match the framework to where your difficulty actually lives.
:::
