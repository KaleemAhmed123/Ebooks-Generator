## Choosing an agent framework

- Seven frameworks, one decision. The trick is to choose by your problem's **center of gravity** — what the hard part actually is — not by popularity.

| Your hard part | Framework |
|---|---|
| Explicit control, persistence, reliability | **LangGraph** |
| Dynamic multi-agent conversation, code exec | **AutoGen** (new work: MS Agent Framework) |
| Fast, intuitive role-based multi-agent | **CrewAI** |
| Simple tool agent, minimal ceremony | **OpenAI Agents SDK** |
| Operating a computer / codebase, long-horizon | **Claude Agent SDK** |
| Retrieval over lots of data (RAG) | **LlamaIndex** |
| Optimizing prompts at scale, portability | **DSPy** |

- **The rules that cut through the noise:**
  - **Start without a framework.** The loop is ten lines (14-03). If a plain loop or a provider SDK does the job, you need nothing more. Frameworks are for what the loop lacks.
  - **Choose by center of gravity**, per the table. Control → LangGraph; multi-agent → AutoGen/CrewAI; data → LlamaIndex; computer → Claude SDK; optimization → DSPy.
  - **They compose.** Real systems mix — LangGraph orchestrating, LlamaIndex retrieving in a node, DSPy-optimized prompts inside. Do not force one framework to do everything.
  - **Beware lock-in and churn.** These frameworks change fast — AutoGen was folded into the Microsoft Agent Framework within a year (14-60), and every page here is dated *as of 2026* for that reason. Keep your *business logic* separable from the framework so you can swap it.

:::interview
"How do you choose an agent framework?"

By the problem's hard part, and only after checking a plain loop won't do. If it's control/reliability → LangGraph; dynamic multi-agent → AutoGen or CrewAI (CrewAI for speed, AutoGen for flexible conversation/code exec); retrieval-heavy → LlamaIndex; operating a computer → the Claude Agent SDK; a simple tool agent → the OpenAI Agents SDK; prompt optimization at scale → DSPy. And they compose — don't force one to do everything. The senior signal is starting minimal and choosing by center of gravity, not by hype.
:::
