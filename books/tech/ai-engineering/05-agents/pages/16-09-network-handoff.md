## The network and handoff pattern

- Opposite the supervisor's central control is the **network** topology: agents talk **peer-to-peer**, any agent handing off to any other, with no central coordinator. It is the most flexible and the hardest to control. **[VERIFY]**

<svg viewBox="0 0 360 96" role="img" aria-label="A fully connected network of agents that can each hand off to any other" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <circle cx="120" cy="30" r="15" fill="#24405e"/><text x="120" y="33" text-anchor="middle" fill="#fff" font-size="5.5">triage</text>
  <circle cx="240" cy="30" r="15" fill="#24405e"/><text x="240" y="33" text-anchor="middle" fill="#fff" font-size="5.5">billing</text>
  <circle cx="120" cy="76" r="15" fill="#24405e"/><text x="120" y="79" text-anchor="middle" fill="#fff" font-size="5.5">tech</text>
  <circle cx="240" cy="76" r="15" fill="#24405e"/><text x="240" y="79" text-anchor="middle" fill="#fff" font-size="5.5">refund</text>
  <g stroke="#888"><line x1="135" y1="30" x2="225" y2="30"/><line x1="120" y1="45" x2="120" y2="61"/><line x1="240" y1="45" x2="240" y2="61"/><line x1="135" y1="76" x2="225" y2="76"/><line x1="132" y1="41" x2="228" y2="65"/><line x1="228" y1="41" x2="132" y2="65"/></g>
</svg>

- **How it works:** each agent, when it decides another is better suited for the current state, **hands off** control (14-79) — passing the task and context to a peer, which continues. There is no supervisor; the "routing" is distributed, each agent deciding locally where the task should go next. A support system where triage → tech → escalation → refund, each agent forwarding as needed, is a network.
- **Why use it:** maximum **flexibility** — any interaction pattern can emerge, agents route dynamically based on the actual situation, and there is no central bottleneck. It suits problems where the path genuinely cannot be pre-structured and specialists need to pass work fluidly.
- **Why it is dangerous:** with no central control, it is **hard to predict, debug, and bound.** Agents can hand off in loops (A→B→A→B), lose the thread across many handoffs, or collectively fail to terminate. The emergent flexibility that is the point is also the source of the worst multi-agent failure modes (16-35). Network topologies need strong guards — handoff limits, loop detection, a global step budget.

:::interview
"Supervisor vs network topology — the tradeoff?"

Supervisor centralizes control: one coordinator delegates and synthesizes, so it's predictable, debuggable, and bounded, at the cost of a bottleneck and a single point of failure. Network is peer-to-peer: any agent hands off to any other with no central coordinator, giving maximum flexibility and dynamic routing with no bottleneck — but it's hard to predict, debug, and terminate, and prone to handoff loops, lost threads, and non-termination. Default to supervisor for production reliability; reach for network only when the interaction genuinely can't be structured, and then add strong guards (handoff limits, loop detection, global step budget).
:::
