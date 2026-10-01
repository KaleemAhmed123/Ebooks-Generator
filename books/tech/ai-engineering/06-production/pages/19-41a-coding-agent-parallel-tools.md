## Coding agent: parallel tools and speed

- A coding agent that does everything sequentially — read one file, wait, read the next, wait — is slow and expensive over a long task. Two techniques cut wall-clock time and token cost: **parallel tool calls** and **speculative exploration**.
- **Parallel tool execution.** When the model requests several *independent* tool calls in one turn (read three files, run two searches), the harness runs them concurrently rather than one-by-one — the agent loop (19-39) dispatches them in parallel and returns all observations together.

:::mint
```python
import asyncio
async def dispatch_parallel(tool_calls, registry):
    # independent calls run concurrently; one round-trip instead of N
    results = await asyncio.gather(*[
        registry.dispatch_async(c.name, c.args) for c in tool_calls])
    return list(zip([c.id for c in tool_calls], results))
```
:::

- **The win is fewer model round-trips.** Each model turn has latency and cost; batching independent tool calls into one turn (read all the relevant files at once, then reason) instead of one-file-per-turn cuts both. Modern models are trained to request multiple tools per turn for exactly this reason.
- **Sub-agents parallelize exploration** (19-39a): spin up several sub-agents to investigate different parts of a codebase concurrently, each returning a focused summary — the map step of a map-reduce over the repo. This is where multi-agent (Flagship 8) genuinely pays: independent, parallelizable sub-tasks.

:::note
Agent *speed* is mostly about round-trips, not model speed. A long task is a sequence of model turns, each with its latency and cost, so the levers are: **parallelize** independent tool calls within a turn, **batch** what the model needs so it reasons over more per turn (fewer turns), **compact** context so each turn is cheaper (19-39a), and **delegate** parallelizable exploration to sub-agents. The same task can take 40 sequential turns or 12 well-batched parallel ones — a 3× difference in latency and cost from harness design alone, with the same model. Efficient agents are an engineering achievement, not just a capable-model one.
:::
