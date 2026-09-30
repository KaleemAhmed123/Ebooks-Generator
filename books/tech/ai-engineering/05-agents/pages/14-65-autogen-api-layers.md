## AutoGen: the API layers

- After its v0.4 rewrite, AutoGen is layered — a low-level core for control, a high-level API for speed, and a no-code studio for exploration. Knowing which layer you are in avoids confusion when reading docs. **[VERIFY layer names/status]**

<svg viewBox="0 0 360 100" role="img" aria-label="Three AutoGen layers: Core actor runtime, AgentChat high-level API, and Studio no-code" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="40" y="14" width="280" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="28" text-anchor="middle" font-size="6.5">Studio — no-code, drag-and-drop prototyping</text>
  <rect x="40" y="42" width="280" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="56" text-anchor="middle" font-size="6.5">AgentChat — high-level API (agents, teams, conditions)</text>
  <rect x="40" y="70" width="280" height="22" rx="3" fill="#24405e"/><text x="180" y="84" text-anchor="middle" fill="#fff" font-size="6.5">Core — async event-driven actor runtime</text>
</svg>

- **Core** — the async, event-driven **actor runtime** (14-60). Agents as actors, message passing, distributed execution. Use it when you need full control over a custom multi-agent architecture or to scale across processes. Verbose, powerful.
- **AgentChat** — the high-level API most people use: `AssistantAgent`, teams, termination conditions (the last pages). It packages common multi-agent patterns so you write a team in a few lines. Built *on* Core.
- **Studio** — a no-code GUI to prototype and debug agent teams visually, without writing Python. Good for exploration and for non-engineers; you graduate to AgentChat for real systems.

- **Choosing a layer:** start in **AgentChat** (or Studio to explore); drop to **Core** only when you need a bespoke architecture the high-level API cannot express. This mirrors LangGraph's prebuilt-vs-custom split (14-49) — a convenience layer over a control layer.

:::note
Almost every modern agent framework has this shape: a **high-level convenience API** for the 80% case and a **low-level control API** underneath for the rest. LangGraph has `create_react_agent` over `StateGraph`; AutoGen has AgentChat over Core; the provider SDKs (next) do the same. The skill is starting high and dropping low *only when forced* — the ladder discipline again, applied to framework APIs.
:::
