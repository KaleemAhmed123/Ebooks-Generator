## Sleep-time compute and consolidation

- Humans consolidate memory during sleep — replaying the day, moving what matters into long-term storage. Agents can do the same: **sleep-time compute** is background processing *between* interactions that reorganizes memory while the user is away.

<svg viewBox="0 0 360 96" role="img" aria-label="Between sessions, a background process summarizes and reorganizes raw memory into clean facts" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="34" width="80" height="30" rx="3" fill="#f4f4f4" stroke="#888"/><text x="54" y="46" text-anchor="middle" font-size="6">raw session</text><text x="54" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">messy transcript</text>
  <rect x="140" y="30" width="90" height="38" rx="4" fill="#24405e"/><text x="185" y="45" text-anchor="middle" fill="#fff" font-size="6.5">sleep-time job</text><text x="185" y="58" text-anchor="middle" fill="#cdd" font-size="5.5">summarize, dedupe, link</text>
  <rect x="276" y="34" width="70" height="30" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="311" y="46" text-anchor="middle" font-size="6">clean memory</text><text x="311" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">facts, blocks</text>
  <path d="M94 49 L138 49" stroke="#888" marker-end="url(#sl)"/><path d="M230 49 L274 49" stroke="#888" marker-end="url(#sl)"/>
  <text x="180" y="86" text-anchor="middle" font-size="5.5" fill="#6b6b6b">runs when idle — off the user's latency path</text>
  <defs><marker id="sl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The idea:** after a session, run a background job that reads the raw transcript and **consolidates** it — summarize what happened, extract durable facts into memory blocks, deduplicate against existing memories, resolve contradictions ("user *used* to prefer X, now prefers Y"), and index everything for retrieval.
- **Why do it between sessions, not during:** it is expensive reasoning you do not want on the user's latency path. During a chat, speed matters; between chats, you have time and idle compute to think hard about memory — the same logic as offline batch jobs.
- **The payoff:** the next session starts with clean, organized memory instead of a raw pile. The agent "wakes up" knowing the consolidated truth about the user and past work, not needing to re-derive it from transcripts live.

:::note
Sleep-time compute reframes memory as an *ongoing background process*, not a live afterthought. It mirrors the biological insight that consolidation is a separate phase from experience. Practically, it is where you can afford expensive operations — cross-session summarization, contradiction resolution, knowledge-graph building — that would be too slow to run mid-conversation, so the interactive path stays fast while memory quietly improves.
:::
