## Memory blocks

- Raw conversation history is a poor long-term memory — it is long, repetitive, and buries facts. **Memory blocks** (from the MemGPT/Letta line) replace the transcript with a small set of **structured, rewritable units** the agent actively maintains, always kept in context.

<svg viewBox="0 0 360 100" role="img" aria-label="Structured memory blocks for persona, human, and task, each rewritten as facts change" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="18" width="106" height="74" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="67" y="32" text-anchor="middle" font-size="6.5">persona</text><text x="67" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"I am a helpful</text><text x="67" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">coding assistant"</text>
  <rect x="128" y="18" width="106" height="74" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="181" y="32" text-anchor="middle" font-size="6.5">human</text><text x="181" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"user: Sam,</text><text x="181" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">prefers Python,</text><text x="181" y="64" text-anchor="middle" font-size="5.5" fill="#6b6b6b">tz Pacific"</text>
  <rect x="242" y="18" width="104" height="74" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="294" y="32" text-anchor="middle" font-size="6.5">task</text><text x="294" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"building a CLI;</text><text x="294" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">step 3 of 5"</text>
</svg>

- **Each block is a small, labeled slot** the agent rewrites as it learns — a `human` block accreting user facts, a `persona` block for the agent's own identity, a `task` block for the current goal's state. They stay in context always, so the agent never "forgets" who the user is mid-session.
- **Rewritten, not appended.** When it learns the user moved to Pacific time, the agent *edits* the `human` block (via a memory tool), replacing the old fact — unlike a transcript that just grows. The block is a compact, current summary, not a log.
- **Why blocks beat raw history:** they are compact (a few facts vs thousands of tokens), structured (the model finds the right fact fast), and current (stale facts are overwritten). They turn "remember everything said" into "maintain a small, accurate profile."

:::note
Memory blocks are the practical heart of production agent memory: instead of hoping the model recalls a fact from turn 200, you keep a living, editable summary of what matters — the user, the persona, the task — always in view. Combine that small always-present core with a large searchable archive (MemGPT tiers), and you have short-term precision plus long-term reach. This is the design most memory frameworks converge on.
:::
