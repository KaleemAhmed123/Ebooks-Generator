## Group chat and speaker selection

- When several agents share one conversation (the AutoGen team, 14-62), the defining problem is **who speaks next.** Speaker selection is the control mechanism of group-chat multi-agent systems — get it wrong and the chat loops, stalls, or descends into noise. **[VERIFY]**

<svg viewBox="0 0 360 92" role="img" aria-label="Speaker-selection strategies: round-robin, model-picks-next, and rule-based, choosing which agent talks" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="56" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="64" y="30" text-anchor="middle" font-size="6.5">round-robin</text><text x="64" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">fixed rotation</text><text x="64" y="55" text-anchor="middle" font-size="5.5" fill="#1a3a2a">predictable</text><text x="64" y="65" text-anchor="middle" font-size="5.5" fill="#a03050">rigid</text>
  <rect x="126" y="16" width="108" height="56" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="180" y="30" text-anchor="middle" font-size="6.5">model-selected</text><text x="180" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">manager picks</text><text x="180" y="55" text-anchor="middle" font-size="5.5" fill="#1a3a2a">adaptive</text><text x="180" y="65" text-anchor="middle" font-size="5.5" fill="#a03050">can misroute</text>
  <rect x="242" y="16" width="108" height="56" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="296" y="30" text-anchor="middle" font-size="6.5">rule-based</text><text x="296" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">your logic</text><text x="296" y="55" text-anchor="middle" font-size="5.5" fill="#1a3a2a">controllable</text><text x="296" y="65" text-anchor="middle" font-size="5.5" fill="#a03050">manual</text>
</svg>

- **The three strategies** (14-62, revisited as the design decision):
  - **Round-robin** — agents speak in fixed order. Predictable and simple; wastes turns on agents with nothing to add and cannot adapt to the conversation.
  - **Model-selected** — a manager LLM reads the conversation and picks the most relevant next speaker. Adaptive and natural, but the selector can misroute (pick the wrong agent), stall, or loop — its quality gates the whole system.
  - **Rule-based** — your code decides the next speaker from the state ("after the coder, always the tester"). Controllable and cheap, but you must anticipate the flow.
- **Why it is the crux:** in a group chat, the *only* control you have over the emergent conversation is who talks when. A good speaker-selection policy keeps the chat purposeful and terminating; a bad one produces the group-chat failure modes (agents talking past each other, endless debate, 14-66). It is the group-chat analogue of a supervisor's routing — just distributed into a selection rule.
- **Plus a termination condition, always** (14-64): a group chat with no stop rule never ends. Speaker selection decides *who*; termination decides *when to stop*.

:::interview
**"In a group-chat multi-agent system, what controls the behavior and what's the failure mode?"** Speaker selection — who talks next — is essentially the only lever over the emergent conversation. Round-robin is predictable but rigid; model-selected (a manager picks the next speaker) is adaptive but can misroute or loop and its quality gates everything; rule-based is controllable but manual. The failure mode is a bad selection policy producing agents talking past each other, endless debate, or non-termination. You pair speaker selection (who) with a firm termination condition (when to stop) — without both, group chats either stall or run forever, burning cost each turn.
:::
