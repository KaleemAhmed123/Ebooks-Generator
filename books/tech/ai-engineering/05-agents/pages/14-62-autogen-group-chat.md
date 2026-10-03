## AutoGen: group chat and teams

- Two agents is a dialogue; many agents is a **team** (AutoGen calls the classic version a **group chat**). Several specialized agents share a conversation, and a **speaker-selection** policy decides who talks next.

<svg viewBox="0 0 360 96" role="img" aria-label="A manager selects which of several specialist agents speaks next in a shared conversation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="140" y="10" width="80" height="20" rx="3" fill="#24405e"/><text x="180" y="23" text-anchor="middle" fill="#fff" font-size="6">manager / selector</text>
  <circle cx="50" cy="66" r="16" fill="#6a9bd0"/><text x="50" y="69" text-anchor="middle" fill="#fff" font-size="5.5">planner</text>
  <circle cx="130" cy="66" r="16" fill="#6a9bd0"/><text x="130" y="69" text-anchor="middle" fill="#fff" font-size="5.5">coder</text>
  <circle cx="210" cy="66" r="16" fill="#6a9bd0"/><text x="210" y="69" text-anchor="middle" fill="#fff" font-size="5.5">tester</text>
  <circle cx="300" cy="66" r="16" fill="#6a9bd0"/><text x="300" y="69" text-anchor="middle" fill="#fff" font-size="5.5">reviewer</text>
  <g stroke="#888"><line x1="165" y1="30" x2="60" y2="52"/><line x1="172" y1="30" x2="135" y2="52"/><line x1="188" y1="30" x2="205" y2="52"/><line x1="196" y1="30" x2="292" y2="52"/></g>
  <text x="180" y="92" text-anchor="middle" font-size="5.5" fill="#6b6b6b">selector picks the next speaker each turn</text>
</svg>

- **Speaker selection is the core design choice.** Who talks next can be:
  - **Round-robin** — agents speak in a fixed rotation. Simple, predictable.
  - **Model-selected** — a manager/selector LLM reads the conversation and picks the most relevant next agent ("this needs the tester now"). Flexible, but the selector can choose poorly.
  - **Rule-based** — your logic decides from the state.
- **Why teams work:** a hard task splits across specialists — a planner, a coder, a tester, a reviewer — each better at its slice than one generalist agent. The conversation lets them build on each other's outputs, catching errors a single agent would miss (the coder writes, the tester finds a bug, the coder fixes).
- This is AutoGen's headline capability, and the reason it is popular for **research and complex multi-agent** tasks: standing up a team of collaborating specialists is a few lines.

:::warn
Group chats are where multi-agent systems get expensive and chaotic (Module 16's failure modes previewed). Every agent's turn is a model call over the whole growing conversation, so costs multiply; a bad speaker-selection policy loops or lets agents talk past each other; and without a firm termination condition a team debates forever. The flexibility that makes teams powerful also makes them the hardest agent shape to keep reliable and cheap.
:::
