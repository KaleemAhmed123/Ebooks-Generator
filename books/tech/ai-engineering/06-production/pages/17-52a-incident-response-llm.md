## Incident response for LLM systems

- When an LLM system misbehaves, the on-call playbook has moves ordinary services lack — because the failure might be *quality*, not availability, and the fix might be a prompt or model rollback, not a code deploy.
- The triage order that works:

<svg viewBox="0 0 360 78" role="img" aria-label="Incident triage: detect, classify availability vs quality vs safety vs cost, mitigate with the matching lever, then root-cause" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="30" width="52" height="20" rx="3" fill="#24405e"/><text x="36" y="43" text-anchor="middle" font-size="6" fill="#fff">detect</text>
  <rect x="76" y="30" width="60" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="106" y="43" text-anchor="middle" font-size="6">classify</text>
  <rect x="150" y="10" width="90" height="14" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="195" y="20" text-anchor="middle" font-size="5.5">quality regression → rollback</text>
  <rect x="150" y="30" width="90" height="14" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="195" y="40" text-anchor="middle" font-size="5.5">provider outage → failover</text>
  <rect x="150" y="50" width="90" height="14" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="195" y="60" text-anchor="middle" font-size="5.5">overload → shed load</text>
  <rect x="256" y="30" width="94" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="303" y="43" text-anchor="middle" font-size="6">mitigate, then root-cause</text>
  <path d="M62 40 L74 40" stroke="#888" marker-end="url(#ir)"/><path d="M136 40 L148 40" stroke="#888" marker-end="url(#ir)"/><path d="M240 40 L254 40" stroke="#888" marker-end="url(#ir)"/>
  <defs><marker id="ir" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Classify first — availability, quality, safety, or cost.** Down/slow is the classic case (failover, scale, shed). A *quality* incident (outputs got worse, users complain, live eval dropped) has no 5xx and needs a **version rollback** of the prompt or model. A *safety* incident (a jailbreak or injection is landing) needs the guardrail tightened or the path killed. A *cost* incident (spend spiking) needs the runaway key capped.
- **Mitigate before root-causing.** Roll the prompt/model back to the last-good version, fail over to the second provider, or shed load *first* — restore users, then investigate. Fast rollback demands you **version and pin** every prompt and model (17-51); if you cannot roll back in one command, you cannot mitigate quickly.

:::interview
**"Users say the assistant 'got worse' overnight, but all your dashboards are green. What do you do?"** This is a **quality** incident, invisible to availability metrics — so I check the live quality signal (17-46a) and diff what *changed*: a prompt edit, a model-version update from the provider, a retrieval-index rebuild, or a data drift. Mitigate by **rolling the prompt/model back to last-known-good** while I confirm, then reproduce from logged prompts/outputs. The tell is knowing that "green dashboards + unhappy users" means quality, not uptime, and that the first move is rollback, not a code fix.
:::
