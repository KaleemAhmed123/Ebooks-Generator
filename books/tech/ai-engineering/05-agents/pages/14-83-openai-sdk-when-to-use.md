## OpenAI SDK: failure modes and when to use

- The Agents SDK's strength — minimalism — is also its ceiling. Know where it runs out.

<svg viewBox="0 0 360 84" role="img" aria-label="OpenAI SDK fits straightforward agents; complex control needs a heavier framework" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="165" height="58" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="92" y="30" text-anchor="middle" font-size="6.5" fill="#1a3a2a">reach for the SDK</text><text x="92" y="44" text-anchor="middle" font-size="6">straightforward tool agent</text><text x="92" y="55" text-anchor="middle" font-size="6">simple handoff routing</text><text x="92" y="66" text-anchor="middle" font-size="6">want tracing/guardrails free</text>
  <rect x="185" y="16" width="165" height="58" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="267" y="30" text-anchor="middle" font-size="6.5" fill="#a03050">outgrow it when</text><text x="267" y="44" text-anchor="middle" font-size="6">complex custom control flow</text><text x="267" y="55" text-anchor="middle" font-size="6">durable resume / time-travel</text><text x="267" y="66" text-anchor="middle" font-size="6">intricate multi-agent graphs</text>
</svg>

- **Failure modes:**
  - **Too minimal for complex flows.** No first-class graph, so branching, cyclic, or intricately-structured control flow is awkward — you are fighting the abstraction where LangGraph would express it naturally.
  - **Limited durable execution.** Sessions give memory, but the deep persistence/resume/time-travel of a checkpointed graph is not the model here.
  - **Hidden loop.** The Runner hides the loop — great until you need to intervene mid-loop, which it does not expose.
- **Choose the SDK when:** you want a **straightforward agent** (tools, maybe handoffs) with tracing and guardrails included, minimal ceremony, fast to ship. It is an excellent default for the common case.
- **Outgrow it when:** you need explicit complex control flow, durable resume/replay, or elaborate multi-agent orchestration → LangGraph. Migrating is a rewrite, so pick with the *end* state in mind if you can foresee it.

:::interview
**"When is the OpenAI Agents SDK the right choice, and when do you outgrow it?"** Right for straightforward agents — tool use, simple handoff-based routing — where you want built-in tracing, guardrails, and sessions with minimal code. You outgrow it when you need what its minimalism omits: explicit complex or cyclic control flow, durable resume/time-travel, or intricate multi-agent graphs — that's LangGraph territory. The honest tradeoff: it's the fastest path to a solid simple agent, but its hidden loop and thin control surface become a wall on complex systems, and switching later is a rewrite.
:::
