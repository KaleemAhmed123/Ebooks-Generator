## The agent framework landscape

- You can build an agent in raw code — the loop is ten lines (14-03). Frameworks add structure, persistence, streaming, observability, and multi-agent plumbing so you do not rebuild them each time. Seven matter as of 2026; the next clusters cover each in depth.

| Framework | Core abstraction | Best at |
|---|---|---|
| **LangGraph** | a graph of nodes + state | control, persistence, reliability |
| **AutoGen** ⟶ MS Agent Framework | conversing agents (actors) | research, multi-agent chat |
| **CrewAI** | role-based "crew" | quick multi-agent, intuitive |
| **OpenAI Agents SDK** | agents + handoffs | lightweight, OpenAI-native |
| **Claude Agent SDK** | the agent harness | long-running coding agents |
| **LlamaIndex** | data + agents | RAG-heavy agents |
| **DSPy** | compiled programs | optimizing prompts/pipelines |

<svg viewBox="0 0 360 74" role="img" aria-label="Frameworks range from low-level control to high-level convenience" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="20" y1="44" x2="340" y2="44" stroke="#888"/>
  <text x="20" y="58" font-size="6" fill="#6b6b6b">low-level / control</text><text x="300" y="58" font-size="6" fill="#6b6b6b">high-level / convenience</text>
  <text x="40" y="34" font-size="6" fill="#24405e">LangGraph</text><text x="130" y="34" font-size="6" fill="#24405e">OpenAI/Claude SDK</text><text x="245" y="34" font-size="6" fill="#24405e">CrewAI</text><text x="300" y="24" font-size="6" fill="#24405e">DSPy*</text>
</svg>

- **How to read the landscape:** it is a spectrum from **low-level control** (LangGraph — you wire the graph) to **high-level convenience** (CrewAI — you describe roles). DSPy sits apart — it *compiles and optimizes* prompt pipelines rather than orchestrating a loop. There is no single winner; each optimizes a different thing.
- **Advice before the deep dives:** learn the raw loop first (you now have it), then pick a framework for what it *adds*, not for hype. Many production agents use LangGraph for control or a provider SDK for simplicity; some use none.

:::note
A recurring interview trap is treating frameworks as interchangeable or as the *point*. They are not — the agent loop is the point, and frameworks are infrastructure over it. The value of the next ~60 pages is being able to say, for any framework, *what abstraction it exposes, what it makes easy, where it fails, and when you'd choose it* — which is exactly what separates someone who has read a tutorial from someone who has shipped.
:::
