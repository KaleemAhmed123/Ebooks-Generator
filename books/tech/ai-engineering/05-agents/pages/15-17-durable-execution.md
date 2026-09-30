## Durable execution

- A long-horizon agent (15-03) runs for minutes to hours across many steps and external calls. Any of a thousand things can interrupt it — a crash, a timeout, a deploy, a network blip. **Durable execution** is the discipline of making an agent's run *survive* interruptions: pause, and resume from exactly where it stopped, not from the beginning. **[VERIFY]**

<svg viewBox="0 0 360 90" role="img" aria-label="Without durability a crash restarts the whole run; with durability it resumes from the last saved step" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#a03050">fragile</text>
  <g fill="#fdeef2" stroke="#a03050"><rect x="14" y="18" width="28" height="14" rx="2"/><rect x="46" y="18" width="28" height="14" rx="2"/><rect x="78" y="18" width="28" height="14" rx="2"/></g><text x="120" y="29" font-size="5.5" fill="#a03050">crash → restart all ✗</text>
  <text x="90" y="52" text-anchor="middle" font-size="6.5" fill="#1a3a2a">durable</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="14" y="58" width="28" height="14" rx="2"/><rect x="46" y="58" width="28" height="14" rx="2"/><rect x="78" y="58" width="28" height="14" rx="2"/></g><text x="120" y="69" font-size="5.5" fill="#1a3a2a">crash → resume from step 3 ✓</text>
</svg>

- **Why an agent needs it more than ordinary code:** each step can be *expensive* (a model call costs money and seconds) and *irreversible* (a tool that sent an email). Restarting from scratch re-pays every cost and — worse — *re-runs side effects* (sends the email twice). Durability preserves progress *and* prevents duplicate actions.
- **The core mechanism is checkpointing** (14-50): persist the agent's state after each step to durable storage. On interruption, reload the last checkpoint and continue. LangGraph's checkpointer, the Claude Agent SDK's session, and workflow engines (next pages) all provide this — it is why "just a while-loop" is not enough for production autonomy.
- **The two guarantees you want:** *resumability* (continue from the last good state) and *exactly-once side effects* (a tool that already ran does not run again on resume) — the latter is the idempotency problem of the next page.

:::note
Durable execution is the difference between an agent that is a *demo* and one that is a *system*. A demo runs once on a laptop and if it crashes you restart it. A production autonomous agent runs for hours, unattended, across infrastructure that *will* restart under it — so surviving interruption is not a nice-to-have, it is the baseline. The whole field of workflow engines (Temporal, 15-19) exists because durable execution is hard to get right, and agents inherit exactly that need.
:::
