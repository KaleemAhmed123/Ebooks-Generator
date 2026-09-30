## OpenAI Agents SDK

- The **OpenAI Agents SDK** (2025, the production successor to the "Swarm" experiment) is a deliberately **lightweight** framework: a small set of primitives — agents, handoffs, guardrails, sessions — and little else. Its philosophy is "few concepts, Python-first, get out of your way." **[VERIFY version/status]**

<svg viewBox="0 0 360 88" role="img" aria-label="Four small primitives: agents, handoffs, guardrails, sessions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="28" width="78" height="32" rx="4" fill="#24405e"/><text x="49" y="42" text-anchor="middle" fill="#fff" font-size="6.5">agents</text><text x="49" y="53" text-anchor="middle" fill="#cdd" font-size="5.5">LLM + tools</text>
  <rect x="98" y="28" width="78" height="32" rx="4" fill="#6a9bd0"/><text x="137" y="42" text-anchor="middle" fill="#fff" font-size="6.5">handoffs</text><text x="137" y="53" text-anchor="middle" fill="#eef" font-size="5.5">delegate</text>
  <rect x="186" y="28" width="78" height="32" rx="4" fill="#a03050"/><text x="225" y="42" text-anchor="middle" fill="#fff" font-size="6.5">guardrails</text><text x="225" y="53" text-anchor="middle" fill="#fc8" font-size="5.5">validate</text>
  <rect x="274" y="28" width="78" height="32" rx="4" fill="#1a3a2a"/><text x="313" y="42" text-anchor="middle" fill="#fff" font-size="6.5">sessions</text><text x="313" y="53" text-anchor="middle" fill="#cec" font-size="5.5">memory</text>
</svg>

- **The whole framework in four ideas:**
  - **Agent** — an LLM with instructions and tools (the familiar unit).
  - **Handoff** — one agent delegating to another (multi-agent, done minimally).
  - **Guardrail** — a validation check on inputs or outputs that can halt the run.
  - **Session** — automatic conversation history across turns (memory).
- **Why so minimal:** OpenAI's bet is that most teams over-adopt heavy frameworks. A thin, unopinionated SDK with a fast learning curve covers the common agent needs without the ceremony of graphs or actor systems. It is **provider-flexible** too — despite the name, it works with many models via a standard interface. **[VERIFY]**

:::note
The Agents SDK is the "start here for a straightforward agent" option: if you do not need LangGraph's persistence machinery or a full multi-agent framework, its four primitives get you a tool-using, optionally multi-agent system with tracing built in, in very little code. The risk is the opposite of over-engineering — reaching for it and later hitting a wall it is too minimal to climb, at which point you migrate to something with more control.
:::
