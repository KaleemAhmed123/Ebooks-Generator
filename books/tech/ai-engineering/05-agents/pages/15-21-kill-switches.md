## Kill switches

- Every autonomous agent needs an **off switch** — a reliable way to stop it *now*, from outside, no matter what it is doing. It sounds obvious; getting it to actually work under all conditions is a real design problem, and it is the last line of defense when everything else fails. **[VERIFY]**

<svg viewBox="0 0 360 82" role="img" aria-label="A kill switch outside the agent can halt the loop and revoke its access immediately" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <circle cx="70" cy="42" r="24" fill="#24405e"/><text x="70" y="45" text-anchor="middle" fill="#fff" font-size="6.5">agent loop</text>
  <rect x="150" y="28" width="90" height="28" rx="4" fill="#a03050"/><text x="195" y="46" text-anchor="middle" fill="#fff" font-size="7">KILL SWITCH</text>
  <rect x="272" y="20" width="76" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="310" y="32" text-anchor="middle" font-size="6">stop the loop</text>
  <rect x="272" y="44" width="76" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="310" y="56" text-anchor="middle" font-size="6">revoke access</text>
  <path d="M96 42 L148 42" stroke="#a03050" stroke-width="1.5" marker-end="url(#ks)"/><path d="M240 38 L270 30" stroke="#888" marker-end="url(#ks)"/><path d="M240 46 L270 52" stroke="#888" marker-end="url(#ks)"/>
  <defs><marker id="ks" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **What a real kill switch does:** on trigger, immediately **stop the agent loop** *and* **revoke its access** — cut its API keys, its tool permissions, its ability to act. Stopping the loop is not enough if an in-flight action or a queued task can still fire; the switch must also pull the agent's power to affect anything.
- **Design requirements that make it real:**
  - **External to the agent.** The switch must live *outside* the agent's control — the agent cannot disable or route around it (the fixed-evaluator principle of 15-10, applied to control). A kill switch the agent can turn off is not a kill switch.
  - **Always reachable.** It must work even if the agent is looping, hung, or misbehaving — a separate control plane, not a message the busy agent must choose to read.
  - **Fast and total.** Stops everything, including sub-agents and in-flight tools, not just the main loop.
- **Levels:** pause (resumable), stop (end this run), and emergency shutdown (halt *all* agents, revoke *all* access) — the biggest hammer, for when something is going badly wrong at scale.

:::interview
"What makes a kill switch actually effective for an autonomous agent?"

Three things beyond 'stop the loop'. It must be *external* — outside the agent's control, so the agent can't disable or route around it. It must be *always reachable* — a separate control plane that works even when the agent is hung or looping, not a message the busy agent has to choose to read. And it must be *total* — it stops the loop *and* revokes access (API keys, tool permissions, sub-agents, in-flight actions), because halting the reasoning is useless if a queued side effect still fires. Effectively: cut the power, from outside, instantly, for everything.
:::
