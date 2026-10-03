## Role specialization

- The single biggest source of value in multi-agent systems is **specialization** — giving each agent a focused role, tools, and context so it outperforms a generalist at its slice. Getting specialization *right* is what makes a team more than the sum of overlapping agents.

<svg viewBox="0 0 360 84" role="img" aria-label="Specialized agents each with a distinct role, prompt, and toolset covering the task without overlap" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="10" y="18" width="82" height="48" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="51" y="32" text-anchor="middle" font-size="6.5">researcher</text><text x="51" y="45" text-anchor="middle" fill="#6b6b6b">tools: search</text><text x="51" y="56" text-anchor="middle" fill="#6b6b6b">goal: gather facts</text>
  <rect x="98" y="18" width="82" height="48" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="139" y="32" text-anchor="middle" font-size="6.5">coder</text><text x="139" y="45" text-anchor="middle" fill="#6b6b6b">tools: edit,test</text><text x="139" y="56" text-anchor="middle" fill="#6b6b6b">goal: implement</text>
  <rect x="186" y="18" width="82" height="48" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="227" y="32" text-anchor="middle" font-size="6.5">reviewer</text><text x="227" y="45" text-anchor="middle" fill="#6b6b6b">tools: read</text><text x="227" y="56" text-anchor="middle" fill="#6b6b6b">goal: find flaws</text>
  <rect x="274" y="18" width="76" height="48" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="312" y="32" text-anchor="middle" font-size="6.5">writer</text><text x="312" y="45" text-anchor="middle" fill="#6b6b6b">tools: none</text><text x="312" y="56" text-anchor="middle" fill="#6b6b6b">goal: explain</text>
</svg>

- **What a good role gives an agent:** a **focused objective** (one job, done well), a **scoped toolset** (only the tools that job needs, 13-15), a **tailored prompt/persona** (how to approach the job), and **just the context** it needs (not the whole system's state). Each of these makes the agent more reliable at its slice — a reviewer told only "find flaws" and given read-only tools reviews better than a generalist also trying to write.
- **Two rules for effective specialization:**
  - **Non-overlapping roles.** If two agents have similar jobs, they duplicate work, contradict each other, or the system cannot decide who owns a task. Roles should *partition* the work, like a scope contract (14-134) per agent.
  - **Complementary coverage.** Together the roles must cover the whole task with no gaps — a team that researches and writes but never reviews ships unchecked work.
- **Why specialization beats a generalist:** the same reason it does for humans (14-136) and for models (task-specific heads, Booklet 2) — focus reduces the cognitive load per agent, so each makes fewer errors, and diverse perspectives (a critic vs a creator) catch what a single viewpoint misses.

:::note
Specialization is where multi-agent value is *real* rather than hype. The systems that genuinely benefit from multiple agents almost always do so because the agents are *meaningfully different* — different tools, context, and objectives that a single agent could not hold simultaneously. When people build multi-agent systems where every agent is basically the same generalist, they pay the coordination cost (16-01) and get little back. Ask of any multi-agent design: are these agents *actually specialized*, or am I just running one agent five times?
:::
