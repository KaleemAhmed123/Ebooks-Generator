## The coding-agent landscape

- Coding is the flagship autonomous-agent application — the domain with the best verifier (tests, 14-135), the highest economic value, and the most mature tools. As of 2026 coding agents come in three form factors, each a different point on the autonomy ladder. **[VERIFY current tools]**

<svg viewBox="0 0 360 96" role="img" aria-label="Three coding-agent form factors: IDE assistant, terminal agent, and cloud agent, by autonomy" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="20" width="108" height="60" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="64" y="34" text-anchor="middle" font-size="6.5">IDE assistant</text><text x="64" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">in your editor</text><text x="64" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">suggest / edit</text><text x="64" y="70" text-anchor="middle" font-size="5.5">low autonomy</text>
  <rect x="126" y="20" width="108" height="60" rx="4" fill="#d5e8fb" stroke="#24405e"/><text x="180" y="34" text-anchor="middle" font-size="6.5">terminal agent</text><text x="180" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">CLI, whole tasks</text><text x="180" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">files+shell</text><text x="180" y="70" text-anchor="middle" font-size="5.5">mid autonomy</text>
  <rect x="242" y="20" width="108" height="60" rx="4" fill="#24405e"/><text x="296" y="34" text-anchor="middle" fill="#fff" font-size="6.5">cloud agent</text><text x="296" y="48" text-anchor="middle" fill="#cdd" font-size="5.5">async, PR-based</text><text x="296" y="58" text-anchor="middle" fill="#cdd" font-size="5.5">runs on its own</text><text x="296" y="70" text-anchor="middle" fill="#cdd" font-size="5.5">high autonomy</text>
</svg>

- **IDE assistants** — live in your editor, suggesting completions and making edits *while you drive*. Lowest autonomy (L1–L2, 15-02): you review every change in the moment. Highest trust, tightest loop, least leverage per interaction.
- **Terminal agents** — run in the CLI and take on *whole tasks*: "fix this bug," "add this feature." They read files, run commands, iterate against tests (the Claude Agent SDK shape, 14-84). Mid autonomy (L3): you set a task and review the result.
- **Cloud agents** — run *asynchronously* on a server, often triggered by an issue or a comment, and deliver a **pull request** you review. Highest autonomy (L4): they work unattended for a long horizon and hand back a finished change. The human reviews the PR, not the process.
- **The trend is up the ladder:** from autocomplete (assist) to whole-task terminal agents to async cloud agents that do a ticket end to end — each rung trading tighter oversight for more leverage.

:::note
The three form factors are the autonomy ladder (15-02) made concrete in one domain. The progression — inline suggestions → whole-task agent → async PR-producing agent — is exactly "act less supervised, produce more per interaction," and it is only possible because code has a strong verifier (tests) that lets you trust an unsupervised result. Domains with weaker verifiers lag on this progression, which is why coding leads autonomous agents: you can *check* the work.
:::
