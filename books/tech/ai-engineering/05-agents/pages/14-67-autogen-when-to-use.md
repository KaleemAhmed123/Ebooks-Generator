## AutoGen: when to use it

- Place AutoGen against its neighbors so the choice is deliberate, not default.

<svg viewBox="0 0 360 88" role="img" aria-label="AutoGen fits research and dynamic multi-agent tasks; LangGraph fits controlled reliable flows" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="165" height="60" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="92" y="30" text-anchor="middle" font-size="6.5" fill="#1a3a2a">reach for AutoGen</text><text x="92" y="44" text-anchor="middle" font-size="6">research / exploration</text><text x="92" y="55" text-anchor="middle" font-size="6">dynamic multi-agent chat</text><text x="92" y="66" text-anchor="middle" font-size="6">code-executing analysis</text>
  <rect x="185" y="16" width="165" height="60" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="267" y="30" text-anchor="middle" font-size="6.5" fill="#a03050">prefer LangGraph / workflow</text><text x="267" y="44" text-anchor="middle" font-size="6">reliable production flow</text><text x="267" y="55" text-anchor="middle" font-size="6">needs persistence/approval</text><text x="267" y="66" text-anchor="middle" font-size="6">known step structure</text>
</svg>

- **Choose AutoGen when:**
  - The task is **exploratory or research-flavored** — you want to try multi-agent collaboration without engineering a rigid flow.
  - You need **dynamic multi-agent conversations** where the interaction pattern is not fixed.
  - **Code execution** is central (data analysis, computational tasks) — AutoGen's executor loop is a strength.
- **Choose something else when:**
  - You need **production reliability, persistence, or human approval gates** → LangGraph's explicit, checkpointed graphs.
  - The task has a **known structure** → a workflow (14-35) is cheaper and more predictable than a conversation.
  - You want the **simplest** multi-agent setup with intuitive roles → CrewAI (next) is faster to stand up.
- **Starting fresh in 2026?** Build new systems on the **Microsoft Agent Framework** (GA April 2026), which absorbs AutoGen's actor/conversation model; AutoGen is now maintenance-only (14-60). The decision logic above is unchanged — it is the *lineage* you are choosing.

:::interview
"AutoGen vs LangGraph — how do you decide?"

They optimize different things. AutoGen is conversation-first: you define agents and let them talk, which is fast to set up and great for research, dynamic multi-agent collaboration, and code-executing analysis — but it's harder to make reliable and bound. LangGraph is control-flow-first: you engineer an explicit, checkpointed graph, which is more verbose but gives persistence, human-in-the-loop, replay, and production reliability. Pick AutoGen to explore emergent collaboration; pick LangGraph when the flow must be controlled and dependable.
:::
