## Claude Agent SDK: when to use it

- The SDK is opinionated toward one shape of agent; match it to that shape.

<svg viewBox="0 0 360 84" role="img" aria-label="Claude Agent SDK fits computer-operating long-horizon agents; other frameworks fit orchestration or simple agents" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="165" height="58" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="92" y="30" text-anchor="middle" font-size="6.5" fill="#1a3a2a">reach for it</text><text x="92" y="44" text-anchor="middle" font-size="6">coding / dev-automation agent</text><text x="92" y="55" text-anchor="middle" font-size="6">long-horizon, files + shell</text><text x="92" y="66" text-anchor="middle" font-size="6">operates a real environment</text>
  <rect x="185" y="16" width="165" height="58" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="267" y="30" text-anchor="middle" font-size="6.5" fill="#a03050">prefer others when</text><text x="267" y="44" text-anchor="middle" font-size="6">complex custom graph → LangGraph</text><text x="267" y="55" text-anchor="middle" font-size="6">simple tool agent → OpenAI SDK</text><text x="267" y="66" text-anchor="middle" font-size="6">role-team prototype → CrewAI</text>
</svg>

- **Choose the Claude Agent SDK when:**
  - You are building a **coding agent** or **dev-automation** tool — fix bugs, run migrations, manage a repo, operate CI.
  - The task is **long-horizon** and touches **files and a shell** — the built-in tools, context compaction, subagents, and permissions are exactly this workload's needs.
  - You want a **production-hardened harness** rather than assembling the loop, context management, and permissioning yourself.
- **Prefer another framework when:**
  - You need **intricate custom control flow** or durable graph replay → LangGraph.
  - It is a **simple tool-using agent** with no computer-operating needs → the OpenAI Agents SDK's minimalism.
  - You want a **role-based multi-agent prototype** fast → CrewAI.
- **Model-family note:** the harness is built around Claude; weigh that if you need provider flexibility. **[VERIFY]**

:::interview
**"When is the Claude Agent SDK the right tool?"** When the agent's job is to *operate a computer* over a long horizon — coding, dev automation, file-and-shell workflows. It ships the exact infrastructure that shape needs and that home-grown agents get wrong: a capable built-in toolset (files, bash, search), automatic context compaction for long transcripts, subagents for context isolation, and a permission/hook layer to make autonomous execution safe. For a simple tool agent it's heavier than the OpenAI SDK; for an intricate custom graph you'd want LangGraph; for a role-based prototype, CrewAI. Its sweet spot is autonomous, environment-operating agents.
:::
