# When It Breaks

## The incident method

- Under pressure, a **repeatable method** beats improvisation. An incident has a shape, and the single most important rule inverts most engineers' instinct: **mitigate before you diagnose.** Stop the user pain first; understand the root cause after. A rollback that restores service in two minutes beats a brilliant diagnosis that takes an hour while users suffer.

<svg viewBox="0 0 360 70" role="img" aria-label="Incident flow: detect, triage and declare with roles, mitigate to stop the bleeding, then diagnose and resolve, then follow up with a postmortem" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="4" y="24" width="60" height="22" rx="3" fill="#fbe9ee" stroke="#a63d57"/><text x="34" y="38" text-anchor="middle" font-size="5.8">detect</text>
  <rect x="72" y="24" width="64" height="22" rx="3" fill="#fbe9ee" stroke="#a63d57"/><text x="104" y="35" text-anchor="middle" font-size="5.8">triage +</text><text x="104" y="43" text-anchor="middle" font-size="5.2" fill="#777">declare, roles</text>
  <rect x="144" y="24" width="72" height="22" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="180" y="35" text-anchor="middle" font-size="5.8" fill="#c0392b">MITIGATE</text><text x="180" y="43" text-anchor="middle" font-size="5.2" fill="#777">stop the bleeding</text>
  <rect x="224" y="24" width="70" height="22" rx="3" fill="#fbe9ee" stroke="#a63d57"/><text x="259" y="35" text-anchor="middle" font-size="5.8">diagnose +</text><text x="259" y="43" text-anchor="middle" font-size="5.2" fill="#777">resolve</text>
  <rect x="302" y="24" width="54" height="22" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="329" y="38" text-anchor="middle" font-size="5.8">postmortem</text>
  <path d="M64 35 L72 35" stroke="#1a1a1a" marker-end="url(#in)"/><path d="M136 35 L144 35" stroke="#1a1a1a" marker-end="url(#in)"/><path d="M216 35 L224 35" stroke="#1a1a1a" marker-end="url(#in)"/><path d="M294 35 L302 35" stroke="#1a1a1a" marker-end="url(#in)"/>
  <defs><marker id="in" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Triage and declare.** Set a severity (how many users, how bad), **declare an incident**, and assign roles — crucially an **Incident Commander (IC)** who coordinates and decides, separate from the people hands-on-keyboard. Clear roles stop the chaos of five people debugging the same thing while no one talks to stakeholders.
- **Mitigate.** Reach for the fast levers first: **roll back** the recent deploy (the cause of most incidents — Booklet 6's rollout), **scale out**, **fail over** to a healthy AZ/region (Booklet 5/12), **shed load** or flip a feature flag. "What changed recently?" is the highest-yield first question — correlate the incident start with the last deploy, config change, or traffic shift.
- **Diagnose with the signals, methodically.** Apply **USE/RED** (Module 1.2): is it a service symptom or a resource cause? **Bisect** the request path (next page) to localise the failing hop. Form a hypothesis, check it against a trace/metric/log, confirm or discard — don't fix by guessing and don't change five things at once (you won't know which worked).

:::note
The **"what changed?"** reflex is worth internalising because it's right so often: the overwhelming majority of incidents trace to a **recent change** — a deploy, a config edit, a dependency's new version, a traffic pattern. Your deploy/change log (GitOps history, Booklet 6–7) is the first thing to pull up. If an incident starts minutes after a merge, the merge is your prime suspect, and `rollout undo` is your fastest mitigation — diagnose *why* afterward.
:::
