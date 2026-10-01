## LangGraph: failure modes and when not to use

- LangGraph is powerful, and that power has costs. Knowing where it hurts — and when to reach for something simpler — is the mark of using it well.

<svg viewBox="0 0 360 84" role="img" aria-label="LangGraph's strengths of control and persistence versus its costs of verbosity and learning curve" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="165" height="56" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="92" y="30" text-anchor="middle" font-size="6.5" fill="#1a3a2a">worth it when</text><text x="92" y="44" text-anchor="middle" font-size="6">long-running · must-be-reliable</text><text x="92" y="55" text-anchor="middle" font-size="6">needs resume/approval/replay</text><text x="92" y="66" text-anchor="middle" font-size="6">complex or multi-agent flow</text>
  <rect x="185" y="16" width="165" height="56" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="267" y="30" text-anchor="middle" font-size="6.5" fill="#a03050">overkill when</text><text x="267" y="44" text-anchor="middle" font-size="6">a simple chatbot / single call</text><text x="267" y="55" text-anchor="middle" font-size="6">a fixed linear workflow</text><text x="267" y="66" text-anchor="middle" font-size="6">a quick prototype</text>
</svg>

- **Failure modes:**
  - **Over-engineering.** Building a full graph for a task a single LLM call or a plain script handles. The machinery is pure overhead when you do not need persistence or branching.
  - **Verbosity.** Even simple agents take real boilerplate (state, nodes, edges). For fast prototyping, role-based frameworks (CrewAI) or a provider SDK are quicker to stand up.
  - **Learning curve.** State, reducers, checkpointers, and the graph model take time to internalize — a cost for a team new to it.
  - **Debugging the graph itself.** A mis-wired edge or a reducer that clobbers state produces confusing behavior; you debug the *graph*, not just the prompts.
- **When to reach for something else:** a chatbot or single-shot task (just call the model); a fixed pipeline (a plain function or prompt chaining); a quick demo (a lighter framework). Use LangGraph when you genuinely need **control, persistence, and reliability** — and accept the verbosity as the price of that control.

:::interview
"When would you NOT use LangGraph?"

When you don't need its core value — explicit control flow plus durable state. A simple chatbot or single-call task should just call the model. A fixed linear pipeline is better as a plain function or prompt chain. A quick prototype is faster in a role-based framework or a provider SDK. LangGraph earns its verbosity only when the agent is long-running, must be reliable and resumable, needs human-in-the-loop or replay, or is a complex/multi-agent flow. Reaching for it by default is over-engineering.
:::
