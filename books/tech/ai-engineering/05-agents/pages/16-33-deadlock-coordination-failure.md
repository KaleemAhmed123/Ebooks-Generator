## Deadlock and coordination failure

- The classic distributed-systems failures appear in multi-agent LLM systems too: agents that *wait on each other forever* (deadlock), *never settle* (livelock), or *never stop* (non-termination). These are failures of *flow*, not of any agent's answer. **[VERIFY]**

- **Deadlock** — agent A waits for agent B to do something, while B waits for A — neither proceeds. In LLM systems this shows up as agents each expecting the other to act ("I'll wait for the researcher's input" / "I'll wait for the writer's request"), and the whole system hangs.
- **Livelock / oscillation** — agents keep *acting* but make no progress — two agents politely deferring to each other forever ("you decide" / "no, you decide"), or handing a task back and forth (the network-topology loop, 16-09).
- **Non-termination** — the collective never decides it is *done*. A group chat with no termination condition (16-11) debates endlessly; a supervisor keeps re-delegating; agents cannot agree the task is complete (a consensus failure, 16-17).
- **Defenses — mostly the single-agent stops (14-05), applied to the system:**
  - **Global step/turn budget** — a hard cap on total agent turns, not just per-agent (the system-level loop guard).
  - **Timeouts** — every agent's wait has a deadline; on timeout, escalate or default, do not hang.
  - **Clear ownership + termination rules** — one agent owns "is this done?", and there is an explicit completion condition, so the system can *decide to stop* (propose-then-commit, 15-23, at the system level).
  - **Loop/handoff detection** — spot A→B→A→B and break it.

:::interview
"What coordination failures are unique to multi-agent systems and how do you prevent them?"

The distributed-systems classics: deadlock (A waits for B while B waits for A, so nothing proceeds), livelock/oscillation (agents keep acting but make no progress — deferring to each other or passing a task back and forth), and non-termination (the group never decides it's done, debating or re-delegating forever). Prevent them with system-level versions of single-agent stops: a global turn/step budget (not just per-agent), timeouts on every wait with an escalation default, clear ownership of the "are we done?" decision plus an explicit termination condition, and loop/handoff detection to break A→B→A→B cycles. These are flow failures, independent of whether any agent's answer is correct.
:::
