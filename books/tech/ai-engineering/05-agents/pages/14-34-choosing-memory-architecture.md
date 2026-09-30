## Choosing a memory architecture

- You do not need every memory type. Match the architecture to what the agent actually requires — most agents need far less than the full menu.

<svg viewBox="0 0 360 96" role="img" aria-label="A decision ladder from no memory to full hybrid memory by application need" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="8" y="20" width="80" height="60" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="48" y="34" text-anchor="middle">single task</text><text x="48" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">context only,</text><text x="48" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">no memory</text>
  <rect x="96" y="20" width="80" height="60" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="136" y="34" text-anchor="middle">long chat</text><text x="136" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">summarization</text><text x="136" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">+ blocks</text>
  <rect x="184" y="20" width="80" height="60" rx="3" fill="#d5e8fb" stroke="#24405e"/><text x="224" y="34" text-anchor="middle">assistant</text><text x="224" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">semantic +</text><text x="224" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">episodic</text>
  <rect x="272" y="20" width="80" height="60" rx="3" fill="#24405e"/><text x="312" y="34" text-anchor="middle" fill="#fff">complex</text><text x="312" y="48" text-anchor="middle" font-size="5.5" fill="#cdd">full hybrid +</text><text x="312" y="57" text-anchor="middle" font-size="5.5" fill="#cdd">graph + skills</text>
</svg>

- **No memory.** A single-shot task or short session needs only the context window. Do not add a memory system you will not use.
- **Summarization + blocks.** A long single conversation (a coding session, a support chat) needs to survive its own length — rolling summary for continuity, memory blocks for the few must-keep facts.
- **Semantic + episodic.** A returning **assistant** needs cross-session memory: a semantic profile (who you are, preferences) always loaded, plus episodic recall of past interactions by similarity. A hybrid library (mem0/framework) is the pragmatic choice.
- **Full hybrid + graph + skills.** A complex, long-lived agent (a research assistant, a team copilot) benefits from entity graphs (relationships), procedural memory (learned skills), and sleep-time consolidation.

- **The rule:** add the *cheapest* memory that meets the need, and add types only when a real requirement demands them. Memory is engineering cost and a failure surface — every store is something to keep correct, current, and private.

:::interview
**"How do you decide what memory an agent needs?"** Work up from nothing. A one-shot task needs only context. A long session needs summarization plus a few memory blocks. A returning assistant needs semantic (a persistent profile) plus episodic recall. Only a complex, long-lived agent justifies the full stack — entity graphs, skill libraries, sleep-time consolidation. Each memory type is a maintenance and privacy liability, so add the least that meets the requirement rather than building the whole taxonomy by default.
:::
