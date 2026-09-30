## Claude Agent SDK: context management

- Long-horizon agents — ones that work for many steps on a big task — run into the context wall (14-06) fast: a coding session touches dozens of files and runs many commands, and the transcript overflows. The SDK's **automatic context management** is a headline feature. **[VERIFY current behavior]**

<svg viewBox="0 0 360 84" role="img" aria-label="As context fills, the SDK compacts older content into a summary so the agent keeps working" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g fill="#6a9bd0"><rect x="20" y="52" width="14" height="14"/><rect x="20" y="36" width="14" height="14"/><rect x="20" y="20" width="14" height="14"/><rect x="38" y="52" width="14" height="14"/><rect x="38" y="36" width="14" height="14"/><rect x="38" y="20" width="14" height="14"/></g>
  <text x="36" y="78" text-anchor="middle" font-size="5.5" fill="#a03050">fills up</text>
  <text x="90" y="46" font-size="7">→ compact →</text>
  <rect x="150" y="30" width="80" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="190" y="45" text-anchor="middle" font-size="6">summary + recent</text>
  <text x="260" y="46" font-size="7">→</text>
  <rect x="286" y="32" width="64" height="20" rx="3" fill="#24405e"/><text x="318" y="45" text-anchor="middle" fill="#fff" font-size="6">keeps going</text>
</svg>

- **Automatic compaction.** When the context approaches its limit, the SDK **summarizes older parts of the conversation** — collapsing completed steps and stale tool output into a compact summary — while keeping recent, relevant content verbatim. The agent continues a long task without you managing the window (the summarization memory of 14-29, automated and tuned for agent transcripts).
- **Why it is essential for this SDK specifically:** its target tasks are *long*. A refactor across a repo, a multi-hour debugging session, a build-and-fix loop — these generate huge transcripts. Without automatic compaction the agent would hit the wall and fail mid-task; with it, the agent works far past a single context window's worth of steps.
- It also **prunes tool results** — a giant file read or command output that is no longer needed gets trimmed, so old bulk does not sit in context being re-billed (the fat-result cost sink of 13-17).

:::note
Context management is the unglamorous feature that makes long-horizon agents *possible*, and it is exactly what naive agents get wrong (they hit the limit and crash or forget the goal). The SDK's value here is that this is *solved and tuned* from running real long sessions at scale — replicating good automatic compaction yourself is subtle work. For long-running agentic tasks, this alone can justify using the harness over rolling your own loop.
:::
