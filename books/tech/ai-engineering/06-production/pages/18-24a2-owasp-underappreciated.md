## OWASP LLM Top 10: the ones people miss

- Two entries name failures the rest of this cluster hasn't spotlighted, and they're the ones teams most often overlook — worth their own treatment.
- **Insecure output handling** — the danger isn't just what the model *says*, it's what your *downstream code does with it*. If model output flows unvalidated into a shell command, a SQL query, an HTML page, or an `eval`, an attacker can make the model emit a payload that injects into *your* system — the model becomes a vector for classic injection into the sink behind it.

<svg viewBox="0 0 360 66" role="img" aria-label="Model output flowing unvalidated into a shell, SQL, or HTML sink becomes an injection into the downstream system" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="24" width="70" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="45" y="36" text-anchor="middle" font-size="6">model output</text>
  <rect x="110" y="24" width="90" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="155" y="33" text-anchor="middle" font-size="5.5">used unvalidated in</text><text x="155" y="41" text-anchor="middle" font-size="5.5">shell / SQL / HTML</text>
  <rect x="230" y="24" width="90" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="275" y="36" text-anchor="middle" font-size="6">injection in YOUR system</text>
  <path d="M80 33 L108 33 M200 33 L228 33" stroke="#888" marker-end="url(#oo)"/>
  <defs><marker id="oo" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Model DoS** — inputs crafted to exhaust resources: a prompt that induces a huge output, an agent loop that never terminates, or a request that maximises expensive computation. It's a cost-and-availability attack (17-30a), defended by output caps, budgets, and admission control.
- **Excessive agency** — the framework's name for the central agent-safety theme: an LLM given more tools, permissions, and autonomy than the task requires is the single largest agent risk (Booklet 5, Module 18). The mitigation is least privilege — grant the minimum, gate the consequential.

:::interview
"Is there a standard framework for LLM security?"

Yes — the **OWASP Top 10 for LLM Applications**, the community standard a security team expects you to map to. I'd use it as a *coverage checklist* in a threat model, walking each of the ten risks against my system and naming the mitigation. And I'd flag the two most under-appreciated: **insecure output handling** — validate/escape model output before it reaches a shell, SQL, or HTML sink, because the model can be tricked into emitting an injection payload for *your* downstream system — and **excessive agency** — least-privilege tools, since over-permissioned autonomy is the largest agent risk. Naming the framework, using it as a structured checklist, and calling out the commonly-missed entries is exactly what a security review wants to hear.
:::
