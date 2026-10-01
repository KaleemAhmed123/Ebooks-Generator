## When multi-agent beats single-agent

- The decision is not "is multi-agent cooler?" but "do the benefits (16-01) outweigh the coordination cost for *this* task?" A concrete test.

- **Multi-agent wins when:**
  - The task **decomposes into parallel, independent** sub-tasks (research 10 topics; edit 10 files) — parallelism pays.
  - It needs **genuinely different specializations** with different tools and context (a coder, a security auditor, a designer) — specialization pays.
  - **Cross-checking adds real value** — high-stakes decisions where a reviewer or a vote catches errors (16-19) — robustness pays.
  - The **context is too large** for one agent's window, and splitting it across agents keeps each focused — isolation pays.
- **Single agent wins when:**
  - Steps are **sequential and dependent** — each needs the last's result, so there is nothing to parallelize; agents just pass a baton with overhead.
  - **One skill/context suffices** — no real specialization to exploit.
  - **Latency or cost is tight** — multi-agent multiplies model calls; the coordination tax is unaffordable.
  - **Coordination would cost more than the work** — the classic over-engineering trap (16-01).
- **The heuristic:** start with one agent. Add agents only when you can name *which* of the four benefits you are buying and confirm it exceeds the coordination cost. "It felt more sophisticated" is not a reason.

:::interview
"How do you decide between a single agent and a multi-agent system?"

By whether the task's structure pays for the coordination overhead. Multi-agent wins with genuinely parallel independent sub-tasks, distinct specializations (different tools/context per role), high-stakes work that benefits from cross-checking, or context too large for one window. A single agent wins when steps are sequential and dependent (nothing to parallelize), one skill suffices, latency/cost is tight, or coordination would cost more than the work itself. Default to one agent and add more only when you can name the specific benefit — parallelism, specialization, robustness, or isolation — that outweighs the extra calls and failure modes.
:::
