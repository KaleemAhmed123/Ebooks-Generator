## AutoGen: failure modes

- AutoGen's conversation-first flexibility is also its liability. The failures cluster around **uncontrolled conversation**.

<svg viewBox="0 0 360 92" role="img" aria-label="AutoGen failure modes: endless chat, cost blowup, agents talking past each other, bad speaker selection" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="64" y="31" text-anchor="middle">non-termination</text>
  <rect x="126" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="31" text-anchor="middle">cost blowup</text>
  <rect x="242" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="296" y="31" text-anchor="middle">talking past</text>
  <rect x="68" y="48" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="122" y="63" text-anchor="middle">bad speaker pick</text>
  <rect x="184" y="48" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="238" y="63" text-anchor="middle">hard to debug</text>
</svg>

- **Non-termination.** Agents keep conversing with no natural stop — the critic always finds a nitpick. Fix: firm termination conditions (keyword, max turns) and a hard message cap.
- **Cost blowup.** Each turn is a model call over the *entire growing* conversation, and teams add more agents each contributing turns. Costs scale super-linearly. Fix: cap turns, prune the shared history, use cheaper models for simple roles.
- **Agents talking past each other.** Without tight roles, agents repeat, contradict, or ignore each other's outputs — no real progress. Fix: sharp, non-overlapping system prompts and a clear task owner.
- **Bad speaker selection.** A model-based selector picks the wrong next agent, stalling the team. Fix: round-robin or rule-based selection for predictability; reserve model selection for genuinely dynamic teams.
- **Debugging difficulty.** Emergent multi-agent conversations are hard to trace — why did they reach *this*? Fix: log the full message flow, and prefer AutoGen's tracing/observability hooks.

:::warn
The pattern behind every AutoGen failure is **too much freedom, too little control**. Conversation-first is fast to prototype and genuinely powerful for open-ended tasks, but a team of agents chatting freely is expensive, non-deterministic, and hard to bound. If your task actually has a knowable structure, a controlled graph (LangGraph) or a plain workflow will be cheaper and more reliable than a free-form conversation. Match the freedom to the task.
:::
