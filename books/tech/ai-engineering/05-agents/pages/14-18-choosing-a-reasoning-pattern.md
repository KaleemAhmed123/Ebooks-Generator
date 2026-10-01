## Choosing a reasoning pattern

- With the ladder in hand, the decision is a match between task difficulty and how much compute you can spend. Start at the bottom; climb only when the task forces you.

| Task shape | Pattern | Why |
|---|---|---|
| Short, exploratory, tool-driven | **ReAct** | Cheap, adaptive, the default |
| Multi-step with known structure | **Plan-and-execute** | Plan once, stay on-goal |
| Predictable chain, cost-sensitive | **ReWOO** | Fewest reasoning calls |
| Retry-able with a success signal | **Reflexion** | Learns from failure, no training |
| Draft to polish | **Self-refine / critic** | Cheap quality lift |
| First path often wrong; needs backtracking | **Tree of Thoughts** | Explores + prunes |
| Hard agentic task, max quality | **LATS** | Search over actions; costly |
| Known workflow skeleton | **HTN + LLM leaves** | Reliable structure, flexible tips |
| Optimize an artifact you can score | **Evolutionary** | Population escapes local optima |

- **Two rules that save you:** **default to ReAct** (or plain tool calling) — most production agents need nothing fancier; and **composition beats picking one** — real systems combine (plan first, execute with ReAct, reflect on failure, reserve tree search for the hardest sub-problems). The pattern is a *tool*, not an identity.

:::interview
"There are so many agent reasoning patterns — how do you choose?"

Match structure to difficulty and budget. Default to ReAct; add plan-first (plan-and-execute/ReWOO) when the task is multi-step and you want fewer, cheaper reasoning calls; add reflection/self-refine when you have a success signal and room to retry; escalate to tree search (ToT/LATS) only for hard problems where exploration is worth 10–100× the compute. And compose them — production agents mix patterns rather than pledging to one.
:::
